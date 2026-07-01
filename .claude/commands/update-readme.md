---
name: update-readme
description: Workflow command scaffold for update-readme in postbot.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /update-readme

Use this workflow when working on **update-readme** in `postbot`.

## Goal

Keeps the project documentation up to date by updating the README.md file.

## Common Files

- `README.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit README.md with new information or updates.
- Commit the changes with a message indicating the update.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.