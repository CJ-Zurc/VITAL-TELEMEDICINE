# Configuration

This document records current and planned configuration for `VITAL-TELEMEDICINE`.

## 1. Current Checked-In Runtime Inputs

Current repo reality:

- `src/main.ts` reads `PORT` and falls back to `3000`
- `src/internal/internal.controller.ts` reads `INTERNAL_API_KEY` for the Auth-facing placeholder endpoint
- no checked-in Nest configuration module or env schema exists yet for Gateway trust or outbound Auth calls
- the repo now includes a Dockerfile plus repo-local compose stack for the app
- `.env.example` documents the canonical local app port as `8010`

## 2. Local Development

Application:

```bash
npm install
npm run start:dev
```

Repo-local Docker:

```bash
docker compose up -d --build
```

## 3. Planned Integration-Facing Settings

When this service gains real Gateway/Auth integration, prefer explicit env-backed settings such as:

- `PORT`
- `INTERNAL_API_KEY`
- `GATEWAY_SECRET`
- `GATEWAY_TRUST_ENABLED`
- `AUTH_SERVICE_URL`
- `AUTH_INTERNAL_SERVICE_NAME` with default `vital-telemedicine`
- `AUTH_INTERNAL_SERVICE_KEY`
- `INTERNAL_API_KEY` only if legacy compatibility is required

Add third-party integration settings explicitly when code is introduced rather than keeping secrets implicit inside services.

## 4. Configuration Rules

- do not hardcode Gateway secrets or Auth internal credentials
- keep `.env.example` aligned with runtime config once env files are introduced
- when adding integration config, update this document in the same change
