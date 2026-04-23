# VITAL-TELEMEDICINE Agent Rules

This repository is part of the Bernardino General Hospital workspace. Use this file as the root entry point for agent behavior in `VITAL-TELEMEDICINE`.

## 1. Read These First

Before changing code or docs in this repo, read:

1. `.agents/rules/telemedicine-context-documents.md`
2. `.agents/rules/telemedicine-gateway-auth-contract.md` when the task touches auth, routing, trusted headers, roles, or internal service calls
3. `README.md`
4. `docs/README.md`
5. `package.json` when the task touches runtime, scripts, or tooling

For cross-service work, also read:

- `../.agents/rules/root-repo-routing.md`
- `../.agents/rules/root-workspace-context.md`
- `../Documents/Auth_Backend_Integration_Guide_v4.md`

## 2. Repo Reality

- The checked-in application code lives under `src/`.
- This repo is still early-stage.
- Current business modules are placeholders plus the default root hello endpoint.
- A minimal `GET /internal/users/{user_id}/roles` endpoint exists for Auth role aggregation and currently returns an empty role list.
- The repo now includes a Dockerfile plus a repo-local app compose stack.
- Some Gateway/Auth behavior described in docs is target-state integration guidance, not implemented runtime behavior.

Do not describe planned integration behavior as if it is already live in this repository.

## 3. Critical Integration Rules

- Browser-facing traffic should enter through `BGH_API_GATEWAY`.
- This repo should remain inside the shared `vital` system boundary, not invent a new public system slug.
- Do not trust `X-User-*` headers until `X-Gateway-Secret` has been validated.
- Treat `X-User-System` as the Gateway-calculated effective context.
- Do not use browser JWT parsing inside this service as the primary authorization source.
- Preserve `X-Correlation-ID` across logs, events, and any direct Auth calls.
- Auth-owned enrichment or stale-session signaling must call Auth directly over `/internal/*`, not back through the Gateway.
- This repo now exposes `GET /internal/users/{user_id}/roles` as an Auth-facing placeholder and currently returns an empty role list.
- If this repo later contributes real local roles to Auth claims, keep `GET /internal/users/{user_id}/roles` and call Auth `POST /internal/users/{user_id}/stale` after relevant local role or access changes.

## 4. Documentation Parity

When changing Gateway/Auth integration behavior, update the matching docs in the same change:

- `docs/integration_guide.md`
- `docs/security.md`
- `docs/configuration.md`
- `docs/api_reference.md`
- `docs/deployment.md`

## 5. Local Guidance

- Repo-local rules live under `.agents/rules/`.
- Repo-local skills live under `.agents/skills/`.
- If repo docs and checked-in code disagree, describe the current code honestly and update the docs as part of the same change when appropriate.
