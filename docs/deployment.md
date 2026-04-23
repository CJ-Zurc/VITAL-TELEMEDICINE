# Deployment

This document describes the current local startup path for `VITAL-TELEMEDICINE` and notes the future production integration boundary.

## 1. Current Local Reality

The checked-in application runs as a normal NestJS process from the repo root.

Application commands:

```bash
npm install
npm run start:dev
```

Repo-local Docker stack:

```bash
docker compose up -d --build
```

Current repo reality:

- the repo contains a Dockerfile for the NestJS application
- `docker-compose.yml` provisions `vital-telemedicine-api`
- the canonical local app port is `8010`

## 2. Future Production Boundary

When this service is deployed behind the BGH platform:

- browser traffic should still reach it through `BGH_API_GATEWAY`
- the public contract should remain under the shared `vital` system boundary
- the current Gateway path ownership for this repo is `/vital`, `/vital/public*`, `/vital/staff*`, and other unmatched `/vital/*`
- trust should begin only after `X-Gateway-Secret` validation

## 3. Deployment Documentation Rule

When this repo's container/runtime shape, published ports, or Gateway-facing route contract changes, update this file in the same change.
