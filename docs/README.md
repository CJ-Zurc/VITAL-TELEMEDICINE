# VITAL-TELEMEDICINE Docs

This documentation set describes the current state of the `VITAL-TELEMEDICINE` repository and the target integration contract it should follow inside the wider BGH platform.

## Start Here

1. [architecture.md](architecture.md): current checked-in structure, module boundaries, and target-state notes
2. [integration_guide.md](integration_guide.md): Gateway-first routing, Auth integration, and shared `vital` system expectations
3. [security.md](security.md): trust boundaries, trusted headers, and direct Auth call rules
4. [configuration.md](configuration.md): current runtime settings plus planned integration-facing configuration
5. [api_reference.md](api_reference.md): current HTTP surface and documented future internal contracts
6. [deployment.md](deployment.md): local startup and future production placement

## Documentation Rules

- Docs live at the repository root in `docs/`.
- The checked-in NestJS application code lives under `src/`.
- Current-state notes describe live repo behavior.
- Target-state notes must be clearly labeled when they describe planned integration behavior rather than implemented code.
- When this repo gains real Gateway/Auth integration code, update the matching docs in the same change.
