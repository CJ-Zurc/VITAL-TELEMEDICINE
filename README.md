# VITAL-TELEMEDICINE

Telemedicine domain service for the BGH VITAL platform.

This repository now follows the same top-level pattern used by the other BGH services:

- canonical docs live in [`docs/`](docs/README.md)
- AI agent rules live in [`.agents/`](.agents/rules/telemedicine-context-documents.md)
- the checked-in NestJS application code lives under `src/`

## Current Repository Reality

The checked-in codebase is still early-stage:

- one NestJS application exists at the repository root
- `src/main.ts` boots a single HTTP app on `PORT` or `3000`
- the current route surface is mostly starter-grade:
  - `GET /` returns the default hello response
  - `GET /internal/users/:userId/roles` returns an empty role list placeholder for Auth aggregation
  - consultation, provider, and integration modules exist without exposed controller routes
- the repo now includes a Dockerfile plus a repo-local compose stack for the app
- no Gateway trust middleware, direct Auth client, or local stale-session signaling is implemented yet
- the checked-in workspace Gateway currently routes `/vital`, `/vital/public*`, `/vital/staff*`, and other unmatched `/vital/*` paths to this repo's domain boundary, but the repo still lacks the business route handlers and trust middleware needed to satisfy that contract

The documentation in this repository is intentionally hybrid:

- current-state sections describe what exists in the repo today
- target-state sections describe the integration contract this service should follow as it joins the wider BGH platform

## Start Here

1. [`docs/README.md`](docs/README.md)
2. [`docs/architecture.md`](docs/architecture.md)
3. [`docs/integration_guide.md`](docs/integration_guide.md)
4. [`docs/security.md`](docs/security.md)
5. [`.agents/rules/telemedicine-context-documents.md`](.agents/rules/telemedicine-context-documents.md)

## Product Intent

This repository is intended to own VITAL telemedicine-domain backend behavior such as:

- consultation session workflows
- telemedicine provider operations
- telemedicine-specific third-party integrations
- remote-care business rules that remain inside the `vital` system context
- integration with the shared BGH Gateway and Auth services under the `vital` system slug

Those goals provide architectural direction, but they should not be described as implemented unless the code under `src/` already supports them.

## Repository Layout

```text
VITAL-TELEMEDICINE/
|-- .agents/                  # Repo-local AI guidance
|-- docs/                     # Canonical documentation for this repository
|-- src/                      # NestJS application source
|-- test/                     # E2E test setup
|-- Dockerfile               # Container build for the NestJS app
|-- docker-compose.yml        # Repo-local app stack
|-- package.json
`-- README.md
```

## Local Development

```bash
npm install
npm run start:dev
```

Repo-local Docker:

```bash
docker compose up -d --build
```

## Documentation Promise

This repository should stay truthful:

- do not document telemedicine APIs as live unless they exist in `src/`
- do not document separate public Gateway routes for this repo unless the Gateway config is checked in and aligned
- do document the Gateway/Auth contracts this service must follow so future implementation work stays consistent with the BGH workspace
