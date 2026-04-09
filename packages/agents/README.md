# @ifi/pi-man-agents

AGENTS.md templates for pi.

This package contains reusable agent profile templates such as:
- `general-developer`
- `fullstack-developer`
- `security-researcher`
- `data-ai-engineer`
- `crew-operator`

## What this package is for

`@ifi/pi-man-agents` is a content package used by the oh-pi configurator and installer. It helps seed
`AGENTS.md`-style instructions for pi projects and user setups.

## Install

Most users should install the full bundle instead:

```bash
npx @ifi/pi-man
```

This package is typically consumed by `@ifi/pi-man-cli` and is not usually installed directly.

## Contents

Templates live under:

```text
agents/
```

Each file is a markdown template intended to be copied into a pi environment or project workflow.

## Related packages

- `@ifi/pi-man` — full installer bundle
- `@ifi/pi-man-cli` — interactive configurator
