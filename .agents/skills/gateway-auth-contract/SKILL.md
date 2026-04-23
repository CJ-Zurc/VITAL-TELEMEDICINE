---
name: VITAL-TELEMEDICINE Gateway/Auth Contract Checklist
description: Quick checklist for VITAL-TELEMEDICINE changes that touch auth, routing, trusted headers, or role propagation.
---

# VITAL-TELEMEDICINE Gateway/Auth Contract Checklist

Use this skill when work touches telemedicine-service auth, request routing, trusted headers, local role contribution, or direct Auth calls.

Docs for this repository live at the repository root in `docs/`. The checked-in NestJS application code lives under `src/`.

## Read First

1. `README.md`
2. `docs/README.md`
3. `docs/integration_guide.md`
4. `docs/security.md`
5. `.agents/rules/telemedicine-gateway-auth-contract.md`
6. `../../../../Documents/Auth_Backend_Integration_Guide_v4.md`

## Checklist

### 1. Confirm current vs planned behavior

- Check whether the behavior already exists in `src/`.
- If it does not exist yet, document it as planned rather than live.

### 2. Preserve the Gateway boundary

- Keep browser-facing traffic on the shared `vital` system boundary.
- Do not introduce a production flow that depends on direct public access to this repo.

### 3. Validate trust before identity

- Validate `X-Gateway-Secret` before using any `X-User-*` header.
- Treat `X-User-System` as the authoritative effective context.

### 4. Keep Auth internal calls direct

- Use direct `/internal/*` Auth calls for profile enrichment or stale-session signaling.
- Preserve `X-Correlation-ID`.
- Prefer `X-Internal-Service: vital-telemedicine` and `X-Internal-Service-Key`.

### 5. Role contribution rules

If this repo starts contributing roles to Auth claims:

- expose `GET /internal/users/{user_id}/roles`
- call `POST /internal/users/{user_id}/stale` after local role or access changes

### 6. Update docs with code

When the contract changes, update:

- `docs/integration_guide.md`
- `docs/security.md`
- `docs/configuration.md`
- `docs/api_reference.md`
- `docs/deployment.md`
