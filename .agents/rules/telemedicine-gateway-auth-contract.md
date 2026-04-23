---
trigger: always_on
description: Non-negotiable Gateway and Auth integration rules for VITAL-TELEMEDICINE.
---

# VITAL-TELEMEDICINE Gateway and Auth Contract

Docs for this repository live at the repository root in `docs/`. The checked-in NestJS application code lives under `src/`.

Use these rules whenever work touches auth, trusted headers, request routing, role changes, or any future browser/API integration.

## 1. Gateway Is The Browser Boundary

- Browser-facing traffic should enter through `BGH_API_GATEWAY`.
- This repo should stay inside the shared `vital` system boundary.
- The current checked-in Gateway path ownership for this repo is `/vital`, `/vital/public*`, `/vital/staff*`, and other unmatched `/vital/*`.
- Do not create a production browser flow that depends on direct public access to this service unless the architecture is intentionally changed and documented.
- Do not invent a separate public system slug without a corresponding Gateway contract change.

## 2. Trust Starts With X-Gateway-Secret

- Never trust `X-User-*` headers until `X-Gateway-Secret` has been validated.
- Treat `X-User-System` as the Gateway-recalculated effective context.
- Do not re-parse browser JWTs inside this service as the primary authorization source.

## 3. Preserve Correlation

- Reuse the incoming `X-Correlation-ID` whenever present.
- Preserve it in logs, future audit events, future integration events, and any direct Auth internal calls.

## 4. Auth Internal Calls Must Be Direct

If this service needs Auth-owned enrichment or stale-session signaling:

- call Auth directly over `/internal/*`
- prefer `X-Internal-Service: vital-telemedicine`
- prefer `X-Internal-Service-Key`
- use `X-Internal-Api-Key` only for legacy compatibility where required

Do not route those internal calls back through the public Gateway path.

## 5. Role Contribution Rule

Current repo reality:

- `GET /internal/users/{user_id}/roles` exists and currently returns an empty role list placeholder
- Auth may aggregate roles from this repo together with `VITAL-APPOINTMENT` under the shared `vital` claim

If this repo later contributes real local roles to Auth-issued claims:

- expose `GET /internal/users/{user_id}/roles`
- call `POST /internal/users/{user_id}/stale` after relevant local role or access changes

Do not claim non-empty local role contribution until that behavior exists in `src/`.

## 6. Documentation Parity

When changing this contract, update the matching docs immediately:

- `docs/integration_guide.md`
- `docs/security.md`
- `docs/configuration.md`
- `docs/api_reference.md`
- `docs/deployment.md`
