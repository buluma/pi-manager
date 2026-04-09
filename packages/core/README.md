# @buluma/pi-man-core

Shared types, registries, icons, and i18n helpers for pi-man packages.

## What this package is for

`@buluma/pi-man-core` is an internal library used by other packages in this monorepo. It provides
common building blocks for the CLI and other compiled packages.

## Typical consumers

- `@buluma/pi-man-cli`
- other first-party pi-man packages that need shared registries or presentation helpers

## Install

This package is primarily intended for internal monorepo use rather than direct end-user
installation.

## Development

```bash
pnpm --filter @buluma/pi-man-core build
pnpm --filter @buluma/pi-man-core typecheck
```

## Exports

The package publishes compiled output from `dist/` and exposes its public API through the package
root export.

## Agent path helpers

`@buluma/pi-man-core` exposes a small set of path helpers for packages that need to resolve the pi
agent directory, extension config locations, and shared workspace-scoped storage paths without
hardcoding `~/.pi/agent` throughout the codebase.

Use these helpers when a package needs to:

- honor `PI_CODING_AGENT_DIR`
- expand `~` consistently across platforms
- mirror a workspace path into shared storage
- compute stable extension config file locations

### `expandHomeDir(inputPath, options?)`

Expand a leading `~` in a path using the configured home directory override when present.

This helper leaves non-home-relative paths unchanged so callers can safely normalize optional user
input before resolving it further.

### `resolvePiAgentDir(options?)`

Resolve the effective pi agent directory.

The resolver prefers `PI_CODING_AGENT_DIR` when it is set, expands `~` consistently, and otherwise
falls back to the standard `~/.pi/agent` location.

### `getExtensionConfigPath(extensionName, fileName?, options?)`

Build the config file path for a named extension under the resolved pi agent directory.

Use this helper instead of manually concatenating `extensions/<name>/config.json` so every package
shares the same config-root resolution behavior.

### `getMirroredWorkspacePathSegments(cwd)`

Convert a workspace path into stable mirrored path segments for shared storage.

The first segment encodes the filesystem root and the remaining segments mirror the resolved
workspace path, which keeps shared state unique across repositories and drives.

### `getSharedStoragePath(namespace, cwd, relativeSegments?, options?)`

Build a shared storage path inside the pi agent directory for a workspace-scoped namespace.

This helper combines the resolved pi agent directory, a package namespace, the mirrored workspace
segments, and any additional relative path segments into one canonical storage location.
