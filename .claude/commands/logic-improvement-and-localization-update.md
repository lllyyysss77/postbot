---
name: logic-improvement-and-localization-update
description: Workflow command scaffold for logic-improvement-and-localization-update in postbot.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /logic-improvement-and-localization-update

Use this workflow when working on **logic-improvement-and-localization-update** in `postbot`.

## Goal

Improves and optimizes core logic, often alongside updating localization files and UI components.

## Common Files

- `src/contents/components/PostbotModal.tsx`
- `src/contents/index.ts`
- `src/styles/global.css`
- `src/locales/en/postbot.json`
- `src/locales/zh/postbot.json`
- `src/locales/index.ts`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Modify TypeScript source files to improve logic.
- Update or add localization files (src/locales/*).
- Update UI components as needed.
- Commit all related changes together.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.