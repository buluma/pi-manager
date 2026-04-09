# @ifi/pi-man

> Dev-tool focused setup for pi-coding-agent — extensions, prompts, skills, and crews.

## Install

### From npm (recommended)

```bash
npx @ifi/pi-man
```

### From git (latest main)

```bash
npx @ifi/pi-man --git
```

### From git (specific tag/branch)

```bash
npx @ifi/pi-man --git --ref v0.2.0
```

## Options

| Command | Description |
|---------|-------------|
| `npx @ifi/pi-man` | Install latest from npm (global) |
| `npx @ifi/pi-man --git` | Install from git main branch (global) |
| `npx @ifi/pi-man --git --ref v0.2.0` | Install from git tag/branch |
| `npx @ifi/pi-man --version 0.2.0` | Install specific npm version |
| `npx @ifi/pi-man --local` | Install to project `.pi/settings.json` |
| `npx @ifi/pi-man --remove` | Uninstall all packages |

## Packages

| Package | Contents |
|---------|----------|
| `@ifi/pi-man-extensions` | git-guard, auto-session, custom-footer, compact-header, auto-update, bg-process, watchdog |
| `@ifi/pi-man-crews` | Multi-agent crew extension (`/crew`, status commands) |
| `@ifi/pi-extension-subagents` | Subagent orchestration (`/run`, `/chain`, `/parallel`) |
| `@ifi/pi-plan` | Planning mode (`/plan`, `Alt+P`) |
| `@ifi/pi-spec` | Spec-driven workflow (`/spec`) |
| `@ifi/pi-man-prompts` | review, fix, explain, test, commit, pr, etc. |
| `@ifi/pi-man-skills` | web-search, debug-helper, git-workflow, etc. |
| `@ifi/pi-man-agents` | AGENTS.md templates |

## Getting Started

```bash
npx @ifi/pi-man
pi
```
