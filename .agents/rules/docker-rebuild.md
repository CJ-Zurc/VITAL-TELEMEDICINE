---
trigger: always_on
description: End-of-feature reminder to rebuild the VITAL-TELEMEDICINE app container. This repo now includes a Dockerfile and repo-local compose stack.
---

# VITAL-TELEMEDICINE: Docker Reminder

This repository now includes a Dockerfile and repo-local compose stack for `vital-telemedicine-api`.

## End-of-feature reminder

When you report that a feature, bug fix, or code change touching this repo is complete, remind the user in one short sentence that the `vital-telemedicine-api` container should be rebuilt. Fire this reminder once per feature, not on every edit. Skip it when the user is clearly on a host-side dev server such as `npm run start:dev`.

## When to actually rebuild

Only rebuild or recreate containers when the user explicitly asks. When they do, invoke the `docker-rebuild` skill. The skill documents the safe repo-local command.
