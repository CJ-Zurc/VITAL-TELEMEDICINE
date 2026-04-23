---
trigger: always_on
description: Commit message rules for the VITAL-TELEMEDICINE repository, aligned with the shared BGH developer guidelines.
---

# Git Commit Rules

Use the shared workspace commit conventions from `../../Documents/BGH_Developer_Guidelines_v2.md`.

## 1. Commit Structure

Use this format:

```text
<type>(<scope>): <short summary> [<SYSTEM>-M#-F#]

- <past-tense detail>
- <past-tense detail>
```

### Types

- `feat`
- `fix`
- `chore`
- `docs`
- `refactor`
- `test`
- `style`
- `perf`
- `ci`
- `revert`

## 2. Scope And Path Rules

- Use a scope that matches the area changed, such as `telemedicine`, `consultation`, `provider`, `integration`, `docs`, `auth`, or `gateway`.
- When referring to files, use paths relative to the repo root such as `docs/integration_guide.md` or `src/consultation/consultation.service.ts`.
- Do not use absolute paths, markdown links, or `file:///` URIs inside commit bodies.

## 3. System Tag Rule

- Use the owning team's approved system tag from the shared BGH developer guidelines.
- The current shared guideline exposes `TELE` for the VITAL or telemedicine domain; use that unless the team has standardized a more specific code for this repo.
- If the ticket code is unknown, keep the message draft generic and ask the user before finalizing a commit message.

## 4. AI Assistant Rule

- Do not run `git commit` automatically.
- If the user asks for a commit message, return a copy-friendly message that follows the shared format.
