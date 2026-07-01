import { createMessageHandler } from '@gitcoffee/postbot-background';
import { POSTBOT_ACTION } from '@gitcoffee/postbot-actions';
import { state } from "~contents/components/postbot.data";
import { getPlatforms } from "~media/platform";
import { getMetaInfoList } from "~media/meta";
import { windowPublish } from "~media/publisher";
import { user } from '@gitcoffee/postbot-api';

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

const getImageNameFromUrl = (url: string): string => {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
        if (filename && filename.includes('.')) {
            return filename;
        }
    } catch {}
    return `${Date.now()}.jpg`;
};

export const handleMessage = createMessageHandler({
  getPlatforms: (type?: string) => getPlatforms()[type || 'article'],
  getMetaInfoList: async () => {
    const metaInfoList = await getMetaInfoList();
    state.metaInfoList = metaInfoList;
    return metaInfoList;
  },
  setContentData: (data: any) => { state.contentData = data; },
  getContentData: () => state.contentData,
  windowPublish: (data: any) => {
    const mediaType = data.mediaType || 'article';
    const platformCodes = data.platformCodes;
    const publishPlatforms = getPlatforms();
    let allPlatforms = Object.values(publishPlatforms[mediaType]);
    const checkedPlatforms = allPlatforms.filter((item: any) => platformCodes.includes(item.code));
    checkedPlatforms.forEach((item: any) => {
      item['metaInfo'] = state.metaInfoList[item.code];
    });
    const publishData = {
      platforms: checkedPlatforms,
      data: data,
    };
    windowPublish(publishData);
  },
  isLogin: () => user.isLoginApi({}),
  fetchImage: async (imageUrl: string) => {
    console.log('fetchImage', imageUrl);
    const response = await fetch(imageUrl);
    const contentType = response.headers.get('Content-Type') || 'image/jpeg';
    const arrayBuffer = await response.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);
    const base64data = `data:${contentType};base64,${base64}`;
    const imageName = getImageNameFromUrl(imageUrl);
    console.log('fetchImage success', imageName);
    return { base64data, imageName };
  },
});
