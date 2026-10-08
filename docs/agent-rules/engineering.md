# Engineering Rules

## Code standards

- Language: TypeScript in strict mode
- Formatter/linter: Biome 2 (`biome.json`) using tabs, 120 character width, and double quotes
- Type checking:
  - `tsgo` (`@typescript/native-preview`) for fast repo type-checking
  - `tsc` for emitted builds
- Tests: Vitest
- Node: `>=22.19`

## Common commands

- `pnpm lint` — run Biome checks
- `pnpm lint:fix` — apply Biome fixes
- `pnpm format` — format the repo
- `pnpm test` — run the full test suite
- `pnpm typecheck` — run repo type-checking with `tsgo`
- `pnpm build` — run every workspace package build script
- `pnpm security:check` — run dependency allowlist and audit checks

## Testing conventions

- All tests must pass before committing.
- Test files use relaxed lint rules when needed.

## Project structure

All packages live under `packages/` and share the same version.

```text
packages/
  core/                   → @ifi/pi-man-core (compiled library: types, registry, i18n)
  cli/                    → @ifi/pi-man-cli (compiled binary: TUI configurator)
  extensions/             → @ifi/pi-man-extensions (raw .ts extensions)
  crews/                  → @ifi/pi-man-crews (raw .ts multi-agent crew system)
  prompts/                → @ifi/pi-man-prompts (markdown prompt templates)
  skills/                 → @ifi/pi-man-skills (skill directories)
  agents/                 → @ifi/pi-man-agents (AGENTS.md templates)
  subagents/              → @ifi/pi-extension-subagents (raw .ts subagent orchestration package)
  shared-qna/             → @ifi/pi-shared-qna (shared TUI helper library)
  plan/                   → @ifi/pi-plan (raw .ts planning mode extension)
  spec/                   → @ifi/pi-spec (raw .ts spec-driven workflow package)
  cursor/                 → @ifi/pi-provider-cursor (raw .ts experimental Cursor provider package)
  ollama/                 → @ifi/pi-provider-ollama (raw .ts experimental Ollama local + cloud provider package)
  pi-man/                 → @ifi/pi-man (installer CLI: `npx @ifi/pi-man`)
```

## Package conventions

- Pi extensions ship raw `.ts` files; pi loads them via `jiti`.
- `core` and `cli` are compiled and emit `dist/` via `tsc`.
- CLI code imports from `@ifi/pi-man-core`, not via relative paths.
- Extensions import from pi SDK packages.
- `@ifi/pi-spec` keeps state in `.specify/` and feature artifacts in `specs/###-feature-name/`.
- `noDefaultExport: off` is intentional because extensions use default exports as their API pattern.
- Crews runs use isolated git worktrees by default, with shared-cwd fallback when worktrees are unavailable.
