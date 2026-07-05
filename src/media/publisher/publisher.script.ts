/**
 * Copyright (c) 2025-2099 GitCoffee All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { publisherEntries as cnPublisherEntries } from '@gitcoffee/postbot-publisher-cn';
import { publisherEntries as itPublisherEntries } from '@gitcoffee/postbot-publisher-it';
import { publisherEntries as industryPublisherEntries } from '@gitcoffee/postbot-publisher-industry';
import type { PublisherEntry, DebugConfig } from '@gitcoffee/postbot-publisher-debug';

const mergePublisherEntries = (...sources: any[]): any => {
    const result: any = { article: {}, moment: {}, video: {}, audio: {} };
    for (const source of sources) {
        for (const type of Object.keys(result)) {
            if (source[type]) {
                Object.assign(result[type], source[type]);
            }
        }
    }
    return result;
};

export const publisherEntries = mergePublisherEntries(
    cnPublisherEntries,
    itPublisherEntries,
    industryPublisherEntries,
);

/**
 * 在页面主世界注册发布器调试配置，供调试面板从运行时拉取选择器。
 * 函数体保持自包含，避免 chrome.scripting.executeScript 序列化时丢失闭包。
 */
function registerPublisherConfigOnPage(code: string, config: DebugConfig): void {
    const key = '__postbotPublisherDebugRegistry__';
    const w = window as unknown as Record<string, any>;
    if (!w[key]) {
        w[key] = {};
    }
    w[key][code] = config;
}

/**
 * 保留函数映射格式，兼容调用方通过 publisher[type][code] 执行发布脚本。
 */
export const publisher = {
    article: Object.fromEntries(
        Object.entries(publisherEntries.article).map(([code, entry]) => [code, (entry as PublisherEntry).publish])
    ),
    moment: Object.fromEntries(
        Object.entries(publisherEntries.moment).map(([code, entry]) => [code, (entry as PublisherEntry).publish])
    ),
    video: Object.fromEntries(
        Object.entries(publisherEntries.video).map(([code, entry]) => [code, (entry as PublisherEntry).publish])
    ),
    audio: Object.fromEntries(
        Object.entries(publisherEntries.audio).map(([code, entry]) => [code, (entry as PublisherEntry).publish])
    ),
};

export const executeScriptsToTabs = (tabs: any, data: any) => {
    console.log('executeScriptsToTabs');
    tabs?.forEach((item: any) => {
        const { tab, platform } = item;
        if (!tab?.id) {
            return;
        }
        let executed = false;
        const listener = (tabId: number, info: any) => {
            if (tabId === tab.id && info.status === 'complete' && !executed) {
                executed = true;
                chrome.tabs.onUpdated.removeListener(listener);
                console.log('tab.id', tab.id);
                console.log('platform.type', platform.type);
                console.log('platform.code', platform.code);
                if (platform) {
                    const entry: PublisherEntry | undefined =
                        publisherEntries[platform.type]?.[platform.code] ||
                        publisherEntries['moment']?.[platform.code] ||
                        publisherEntries['article']?.[platform.code];

                    const publishFunc = entry?.publish;

                    // 1. 先把该发布器的选择器配置注册到页面主世界，调试面板可实时拉取
                    if (entry?.debugConfig) {
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: registerPublisherConfigOnPage,
                            args: [platform.code, entry.debugConfig]
                        });
                    }

                    // 2. 执行发布脚本
                    if (publishFunc && typeof publishFunc === 'function') {
                        const publisherData = {
                            data: data?.data,
                            platform: platform,
                        };
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: publishFunc,
                            args: [publisherData]
                        });
                    } else {
                        console.warn(`No publish function found for platform: ${platform.type}/${platform.code}`);
                    }
                }
            }
        };
        chrome.tabs.onUpdated.addListener(listener);
    });
}