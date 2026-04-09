# @ifi/pi-man

> Dev-tool focused setup for pi-coding-agent — extensions, prompts, skills, and ant-colony swarm.

## Install

```bash
npx @ifi/pi-man
```

This registers all pi-man packages with pi in one command. Each package is installed separately so pi
can load extensions with proper module resolution.

### Options

```bash
npx @ifi/pi-man                      # install latest versions (global)
npx @ifi/pi-man --version 0.2.13     # pin to a specific version
npx @ifi/pi-man --local              # install to project .pi/settings.json
npx @ifi/pi-man --remove             # uninstall all pi-man packages from pi
```

## Packages

| Package                       | Contents                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| `@ifi/pi-man-extensions`      | git-guard, auto-session, custom-footer, compact-header, auto-update, bg-process, watchdog |
| `@ifi/pi-man-ant-colony`      | Multi-agent swarm extension (`/colony`, colony commands)                                     |
| `@ifi/pi-extension-subagents` | Subagent orchestration extension (`subagent`, `subagent_status`, `/run`, `/chain`, `/parallel`) |
| `@ifi/pi-plan`                | Planning mode extension (`/plan`, `Alt+P`, `task_agents`, `set_plan`)                       |
| `@ifi/pi-spec`                | Native spec-driven workflow package with `/spec` and local `.specify/` scaffolding          |
| `@ifi/pi-man-prompts`          | review, fix, explain, refactor, test, commit, pr, and more                                  |
| `@ifi/pi-man-skills`          | web-search, debug-helper, git-workflow, rust-workspace-bootstrap, and more                  |
| `@ifi/pi-man-agents`          | AGENTS.md templates for common roles                                                        |

## Getting Started

```bash
npx @ifi/pi-man
pi
```
