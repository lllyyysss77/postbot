```markdown
# postbot Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches you the core development patterns, coding conventions, and collaborative workflows used in the `postbot` repository—a TypeScript project built with the Vue framework. You'll learn how to structure code, follow commit and file naming conventions, and participate in key workflows such as updating documentation and improving logic with localization support.

## Coding Conventions

**File Naming**
- Use camelCase for file names.
  - Example: `postbotModal.tsx`, `globalStyles.css`

**Import Style**
- Use absolute imports for modules.
  - Example:
    ```typescript
    import { PostbotModal } from 'src/contents/components/PostbotModal';
    ```

**Export Style**
- Use named exports.
  - Example:
    ```typescript
    export function openModal() { /* ... */ }
    export const MODAL_TITLE = 'Postbot';
    ```

**Commit Patterns**
- Commit messages are freeform, typically short (~12 characters).
  - Example: `fix modal bug`

## Workflows

### Update README

**Trigger:** When you need to update documentation or reflect recent changes in the README.

**Command:** `/update-readme`

1. Edit `README.md` with new information or updates.
2. Commit the changes with a message indicating the update.
   - Example commit: `update readme`
3. Push your changes and open a pull request if required.

---

### Logic Improvement and Localization Update

**Trigger:** When refining core logic, fixing bugs, or enhancing internationalization/localization.

**Command:** `/improve-logic-localization`

1. Modify TypeScript source files to improve logic.
   - Example: Update `src/contents/components/PostbotModal.tsx` for better state handling.
2. Update or add localization files:
   - `src/locales/en/postbot.json`
   - `src/locales/zh/postbot.json`
   - Example:
     ```json
     // src/locales/en/postbot.json
     {
       "modalTitle": "Postbot",
       "submitButton": "Submit"
     }
     ```
3. Update UI components as needed, such as `src/sidepanel/index.vue`.
4. Commit all related changes together.
   - Example commit: `improve logic and update locales`
5. Push your changes and open a pull request if required.

---

## Testing Patterns

- Test files follow the pattern `*.test.*`.
  - Example: `postbotModal.test.ts`
- The specific testing framework is unknown, but standard TypeScript/Vue testing practices likely apply.

**Example Test File:**
```typescript
// postbotModal.test.ts
import { openModal } from 'src/contents/components/PostbotModal';

test('modal opens correctly', () => {
  expect(openModal()).toBe(true);
});
```

## Commands

| Command                       | Purpose                                                |
|-------------------------------|--------------------------------------------------------|
| /update-readme                | Update project documentation in `README.md`            |
| /improve-logic-localization   | Refine logic and update localization/UI components      |
```
