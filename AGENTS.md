# Repository Guidelines

## Project Scope
- This repository contains the Soyio Web SDK (`@soyio/soyio-widget`).
- It exposes popup and iframe-based integrations (widget, consent box, privacy center box).
- Keep changes backward compatible unless the task explicitly requests a breaking change.

## Project Structure
- `src/widget/**`: Popup widget flow and event wiring.
- `src/embeds/**`: Iframe-based modules (`consent`, `privacy-center`, shared `base`, appearance messaging).
- `src/schemas/**`: JSON schemas exported by the package.
- `smoke-test/**`: Local playground and smoke validation app.
- `dist/**`: Build output (generated).

## Build, Test, and Development Commands
- Install: `yarn install`
- Dev server: `yarn dev`
- Build: `yarn build`
- Lint: `yarn lint`
- Unit tests: `yarn test`
- Generate schemas: `yarn generate-schema`
- Smoke test playground: `yarn smoke`

## Editing and Safety Rules
- Prefer editing source files under `src/**`; do not hand-edit generated build artifacts in `dist/**`.
- When changing appearance/config types, regenerate schemas and include updated `src/schemas/*.schema.json` files.
- Preserve public API contracts in `src/index.ts` and exported types unless requested otherwise.
- Keep package behavior browser-safe and avoid Node-only APIs in runtime code.

## Coding Conventions
- Use TypeScript and existing module boundaries.
- Keep functions focused, explicit, and side-effect aware.
- Reuse shared helpers in `src/utils.ts` and `src/embeds/base/**` before adding new utilities.
- Follow existing naming and event patterns for post-robot message handling.

## Validation Guidance
- Run the smallest relevant checks first (`yarn lint`, targeted tests), then broader checks if needed.
- For embed behavior or appearance changes, run `yarn smoke` when possible.
- If verification cannot run in this environment, report what was not run and why.

## PR Notes
- Use Conventional Commit messages.
- Call out API or event payload changes clearly because they affect integrators.
