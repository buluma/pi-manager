# @ifi/pi-man-cli

Interactive TUI configurator for `pi-coding-agent`.

## What it does

`@ifi/pi-man-cli` powers the interactive `oh-pi` setup experience. It helps configure:
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
npx @ifi/pi-man-cli
```

Most users will want the meta-installer instead:

```bash
npx @ifi/pi-man
```

## Package role

This is a compiled Node.js CLI package. It is part of the oh-pi monorepo and depends on the other
workspace packages for content and installation targets.

## Development

```bash
pnpm --filter @ifi/pi-man-cli build
pnpm --filter @ifi/pi-man-cli typecheck
```

## Related packages

- `@ifi/pi-man` — one-command installer
- `@ifi/pi-man-core` — shared registries and types
