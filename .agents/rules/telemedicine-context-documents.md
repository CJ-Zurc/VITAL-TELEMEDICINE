---
trigger: always_on
description: Primary onboarding and documentation map for the VITAL-TELEMEDICINE repository.
---

# VITAL-TELEMEDICINE Context Documents

Docs for this repository live at the repository root in `docs/`. The checked-in NestJS application code lives under `src/`.

Before changing code or docs in this repo, read these in order:

1. `README.md`
2. `docs/README.md`
3. `docs/architecture.md`
4. `docs/integration_guide.md`
5. `docs/security.md`
6. `.agents/rules/telemedicine-gateway-auth-contract.md`

Then read any narrower document that matches the work:

- `docs/configuration.md`
- `docs/api_reference.md`
- `docs/deployment.md`

## Current Repo Reality

This repo is still early:

- the code root is `src/`
- current checked-in HTTP behavior is limited to the default root response, an Auth-facing empty-role endpoint, and placeholder business modules
- the repo now includes a Dockerfile and repo-local app compose stack
- the checked-in workspace Gateway currently routes `/vital`, `/vital/public*`, `/vital/staff*`, and other unmatched `/vital/*` paths to this repo's domain boundary
- many Gateway/Auth behaviors documented here are target-state integration rules, not implemented code

## Required Working Rule

Do not describe planned integration behavior as if it is already live in `src/`.

When a task touches Gateway/Auth integration, update the matching docs in the same change so repo guidance stays aligned with the codebase.
