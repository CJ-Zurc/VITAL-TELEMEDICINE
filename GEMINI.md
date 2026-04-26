---
trigger: always_on
description: Core repo-specific directives for VITAL-TELEMEDICINE.
---

# VITAL Telemedicine: Core Directives

Follow the repository's live code and docs over generic assumptions.

## 1. Working Model

Before proposing or changing behavior:
- read the relevant code and `docs/` first.
- check `.agents/rules/telemedicine-context-documents.md` for architectural conventions.

## 2. Critical Constraints

- **Stack:** NestJS, TypeScript, TypeORM, PostgreSQL.
- **Gateway Trust:** Validate `X-Gateway-Secret` before trusting `X-User-*` headers.
- **Internal Enrichment:** Call Auth directly over `/internal/*` for user data.
- **Conventions:** Adhere to NestJS modular patterns (Modules, Controllers, Services).

## 3. Commit Message Protocol

Format: `<type>(<scope>): <concise description in past-tense> [<TICKET_ID>]`
Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`, `revert`.
Scopes: `consultation`, `provider`, `telemedicine`, `api`, `db`.
Default ticket: `[UHSE-M0-F0]`.
