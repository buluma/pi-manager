# @buluma/pi-man

> Dev-tool focused setup for pi-coding-agent — extensions, prompts, skills, and crews.

## Install

### From npm (recommended)

```bash
npx @buluma/pi-man
```

### From git (latest main)

```bash
npx @buluma/pi-man --git
```

### From git (specific tag/branch)

```bash
npx @buluma/pi-man --git --ref v0.2.0
```

## Options

| Command | Description |
|---------|-------------|
| `npx @buluma/pi-man` | Install latest from npm (global) |
| `npx @buluma/pi-man --git` | Install from git main branch (global) |
| `npx @buluma/pi-man --git --ref v0.2.0` | Install from git tag/branch |
| `npx @buluma/pi-man --version 0.2.0` | Install specific npm version |
| `npx @buluma/pi-man --local` | Install to project `.pi/settings.json` |
| `npx @buluma/pi-man --remove` | Uninstall all packages |

## Packages

| Package | Contents |
|---------|----------|
| `@buluma/pi-man-extensions` | git-guard, auto-session, custom-footer, compact-header, auto-update, bg-process, watchdog |
| `@buluma/pi-man-crews` | Multi-agent crew extension (`/crew`, status commands) |
| `@ifi/pi-extension-subagents` | Subagent orchestration (`/run`, `/chain`, `/parallel`) |
| `@ifi/pi-plan` | Planning mode (`/plan`, `Alt+P`) |
| `@ifi/pi-spec` | Spec-driven workflow (`/spec`) |
| `@buluma/pi-man-prompts` | review, fix, explain, test, commit, pr, etc. |
| `@buluma/pi-man-skills` | web-search, debug-helper, git-workflow, etc. |
| `@buluma/pi-man-agents` | AGENTS.md templates |

## Getting Started

```bash
npx @buluma/pi-man
pi
```
