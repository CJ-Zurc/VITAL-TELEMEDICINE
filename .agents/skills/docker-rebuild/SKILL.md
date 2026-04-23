---
name: VITAL-TELEMEDICINE Docker Rebuild
description: Rebuild or recreate the repo-local VITAL-TELEMEDICINE Docker service when the user explicitly asks.
---

# VITAL-TELEMEDICINE Docker Rebuild

Use this skill only when the user explicitly asks for Docker or container work for this repo.

## Current Repo Reality

- a Dockerfile is checked in
- `docker-compose.yml` defines `vital-telemedicine-api`
- the application can run either in Docker or directly from the host process

## Read First

1. `README.md`
2. `docs/deployment.md`
3. `.agents/rules/docker-rebuild.md`

## Procedure

1. Confirm the user explicitly wants Docker/container work.
2. Rebuild and recreate the repo-local app service:

```bash
docker compose up -d --build --force-recreate vital-telemedicine-api
```

## Verification

- confirm the requested container is running
- when app code changed, do not skip rebuilding `vital-telemedicine-api`
