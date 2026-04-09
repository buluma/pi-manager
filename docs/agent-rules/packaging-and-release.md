# Packaging and Release Rules

## Changesets

- Every change must include a changeset.
- Create a changeset with:

```bash
knope document-change
```

## Change types

- `major` — breaking API or behavior changes
- `minor` — new features, extensions, or config options
- `patch` — bug fixes, docs updates, and internal refactors

## Packaging model

`@ifi/pi-man` is a bin installer, not a bundling meta-package.

- Each sub-package is a standalone pi package with its own `pi` field in `package.json`.
- Pi loads each package with its own module root.
- Extensions that depend on pi peer dependencies must be installed separately so peer dependency resolution works correctly.

## Installation commands

```bash
npx @ifi/pi-man
npx @ifi/pi-man --version 0.2.13
npx @ifi/pi-man --local
npx @ifi/pi-man --remove
```

Individual packages can also be installed directly:

```bash
pi install npm:@ifi/pi-man-extensions
pi install npm:@ifi/pi-man-crews
pi install npm:@ifi/pi-man-prompts
pi install npm:@ifi/pi-man-skills
pi install npm:@ifi/pi-extension-subagents
pi install npm:@ifi/pi-plan
pi install npm:@ifi/pi-spec
pi install npm:@ifi/pi-provider-cursor
pi install npm:@ifi/pi-provider-ollama
```

## Release flow

```bash
./scripts/release.sh
./scripts/release.sh --dry-run
knope publish
```
