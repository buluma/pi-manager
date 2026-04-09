# 🐜 pi-man

**Dev-tool focused setup for [pi-coding-agent](https://github.com/badlogic/pi-mono).**

Personal experimental repo — extensions, prompts, skills, and ant-colony swarm.

```bash
npx @ifi/pi-man
```

## Packages

| Package                       | Description                           |
| ----------------------------- | ------------------------------------- |
| `@ifi/pi-man`                | One-command installer                  |
| `@ifi/pi-man-core`           | Shared types, registries, i18n         |
| `@ifi/pi-man-extensions`     | git-guard, auto-session, custom-footer, compact-header, auto-update, bg-process, watchdog |
| `@ifi/pi-man-ant-colony`     | Multi-agent swarm extension            |
| `@ifi/pi-extension-subagents`| Subagent orchestration                 |
| `@ifi/pi-plan`               | Planning mode extension                |
| `@ifi/pi-spec`               | Spec-driven workflow                   |
| `@ifi/pi-man-prompts`        | Prompt templates                       |
| `@ifi/pi-man-skills`         | Skill packs                            |
| `@ifi/pi-man-agents`         | AGENTS.md templates                    |

## Setup

```bash
npx @ifi/pi-man       # install all packages
pi                    # start coding
```

### Options

```bash
npx @ifi/pi-man --local       # install project-scoped
npx @ifi/pi-man --remove      # uninstall
```

## Development

```bash
pnpm install        # install deps
pnpm build          # build all packages
pnpm typecheck      # type check
pnpm test           # run tests
```
