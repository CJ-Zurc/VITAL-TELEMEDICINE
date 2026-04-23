# Integration Guide

This document describes how `VITAL-TELEMEDICINE` should integrate with `BGH_API_GATEWAY` and `UHSE_AUTH`.

## 1. Gateway Is The Browser Boundary

The intended production request path is:

```text
browser -> BGH_API_GATEWAY -> /vital | /vital/public* | /vital/staff* | other /vital/* -> VITAL-TELEMEDICINE
```

Rules:

- browser-facing traffic should enter through `BGH_API_GATEWAY`
- this repo should stay within the shared `vital` system slug
- do not invent a separate public system slug such as `/telemedicine/*` unless the Gateway contract is intentionally changed and documented

Current repo reality:

- the checked-in workspace Gateway routes `/vital`, `/vital/public*`, `/vital/staff*`, and other unmatched `/vital/*` paths to `VITAL-TELEMEDICINE`
- Auth treats this repo as part of the shared `vital` system and may union its local roles with `VITAL-APPOINTMENT` under one `vital` claim
- the current repo does not yet implement Gateway trust validation middleware
- the current repo does expose `GET /internal/users/{user_id}/roles` for Auth role aggregation

## 2. Trusted Headers From Gateway

Once this service is integrated behind the Gateway, it should consume the current trusted downstream header contract:

| Header | Meaning |
|---|---|
| `X-User-Id` | acting user UUID |
| `X-User-Email` | acting user email |
| `X-User-System` | effective system context |
| `X-User-Systems` | accessible systems |
| `X-User-Is-Admin` | admin flag for the effective context |
| `X-User-Is-Super-Admin` | platform-level admin |
| `X-User-Admin-Systems` | systems where the user is admin |
| `X-User-System-Roles` | roles for the effective context |
| `X-User-Profile-Picture-Url` | browser-ready avatar URL |
| `X-Gateway-Secret` | Gateway trust proof |
| `X-Correlation-ID` | distributed trace ID |

Rules:

- trust `X-User-*` only after validating `X-Gateway-Secret`
- treat `X-User-System` as the authoritative effective request context
- do not parse browser JWTs as this service's primary trust model
- do not expect `X-System-Context` here; that header is frontend-to-Gateway only

## 3. Direct Auth Internal Calls

If this service needs Auth-owned metadata or control-plane behavior, it should call Auth directly over `/internal/*`.

Preferred internal auth headers:

```http
X-Internal-Service: vital-telemedicine
X-Internal-Service-Key: <service-specific-secret>
X-Correlation-ID: <same-trace-id>
```

Legacy compatibility when required:

```http
X-Internal-Api-Key: <shared-internal-key>
```

Planned direct-call examples:

- `GET /internal/users/{user_id}/profile`
- `POST /internal/users/{user_id}/stale`

Important boundary:

- do not route Auth internal enrichment back through the Gateway

## 4. Role Aggregation Contract

If this service later contributes local roles to Auth-issued claims, it should support:

- `GET /internal/users/{user_id}/roles`
- `POST /internal/users/{user_id}/stale` after local role changes

Current repo reality:

- `GET /internal/users/{user_id}/roles` exists and currently returns an empty role list placeholder
- local role assignment and outbound stale-session signaling are not implemented yet

## 5. Correlation ID Propagation

`X-Correlation-ID` should remain stable across:

- incoming Gateway-routed requests
- application logs
- direct calls to Auth
- future audit or integration events

## 6. Current Integration Gaps

Not implemented in this repo today:

- Gateway trust middleware
- direct Auth client wrapper
- stale-session invalidation flow
- audit or event publishing contract

These gaps are documented so future work starts from the correct platform contract.
