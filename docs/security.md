# Security

This document records the trust and integration rules `VITAL-TELEMEDICINE` should follow as it moves behind the BGH platform boundary.

## 1. Primary Trust Boundary

The intended production trust model is:

1. browser sends requests to `BGH_API_GATEWAY`
2. Gateway verifies session or token state
3. Gateway applies effective-system logic
4. Gateway injects trusted headers
5. `VITAL-TELEMEDICINE` validates `X-Gateway-Secret`
6. `VITAL-TELEMEDICINE` authorizes business actions from trusted headers and local rules

Current repo reality:

- the checked-in NestJS app does not yet implement this middleware chain

## 2. Trusted Header Rule

Never trust any `X-User-*` header until `X-Gateway-Secret` has been validated.

Without that validation, callers could forge:

- `X-User-System`
- `X-User-Is-Admin`
- `X-User-Is-Super-Admin`
- `X-User-System-Roles`

## 3. Effective Context Rule

When the Gateway forwards trusted headers:

- `X-User-System` is the authoritative request context
- `X-User-Is-Admin` is scoped to that effective context
- `X-User-System-Roles` is scoped to that effective context

This service should not authorize from stale frontend assumptions about login-time system selection.

## 4. Browser Auth Rule

Browser-facing auth flows stay behind Gateway/Auth routes such as:

- `POST /auth/login`
- `POST /auth/login/verify`
- `GET /auth/session`
- `POST /auth/sso/exchange`
- `POST /auth/sso/callback`

This repo should not invent a separate browser auth authority that bypasses the shared platform contract unless the architecture is intentionally changed and documented.

## 5. Direct Auth Internal Rule

Auth-owned enrichment and stale-session control should use direct internal calls:

- `GET /internal/users/{user_id}/profile`
- `POST /internal/users/{user_id}/stale`

Do not expose those control-plane actions as public browser flows through this service.

## 6. Correlation And Logging Rule

Preserve `X-Correlation-ID` for:

- request logs
- internal Auth calls
- future domain events
- future audit publishing

## 7. Current Security Surface

Today, the checked-in app mostly reflects Nest starter behavior plus placeholder modules:

- `GET /`
- `GET /internal/users/:userId/roles` guarded by `X-Internal-Api-Key`
- no consultation controller routes
- no provider controller routes
- no integration controller routes

Those defaults are not yet the intended final VITAL telemedicine security model.
