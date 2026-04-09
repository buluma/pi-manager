# @buluma/pi-man-cli

Interactive TUI configurator for `pi-coding-agent`.

## What it does

`@buluma/pi-man-cli` powers the interactive `oh-pi` setup experience. It helps configure:
- providers and auth
- models
- extensions
- prompts
- skills
- themes
- agent templates
- installer presets

## Usage

Run the CLI with:

```bash
npx @buluma/pi-man-cli
```

Most users will want the meta-installer instead:

```bash
npx @buluma/pi-man
```

## Package role

This is a compiled Node.js CLI package. It is part of the oh-pi monorepo and depends on the other
workspace packages for content and installation targets.

## Development

```bash
pnpm --filter @buluma/pi-man-cli build
pnpm --filter @buluma/pi-man-cli typecheck
```

## Related packages

- `@buluma/pi-man` — one-command installer
- `@buluma/pi-man-core` — shared registries and types
