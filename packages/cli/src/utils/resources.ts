/**
 * Resource path resolver — locates resource files from sibling workspace packages.
 *
 * Uses createRequire to resolve installed package paths, which works both
 * in development (workspace:* links) and after publishing (real npm installs).
 */
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

/**
 * Resolve a subpath within an installed npm package.
 * @param pkg - Package name (e.g. "@ifi/pi-man-skills")
 * @param subpath - Relative path within the package (e.g. "skills")
 * @returns Absolute path to the resolved directory/file
 */
function resolvePackagePath(pkg: string, subpath: string): string {
	const pkgJson = require.resolve(`${pkg}/package.json`);
	return join(dirname(pkgJson), subpath);
}

/** Resource path mapping — resolves paths into installed workspace packages. */
export const resources = {
	agent: (name: string) => join(resolvePackagePath("@ifi/pi-man-agents", "agents"), `${name}.md`),
	extension: (name: string) => join(resolvePackagePath("@ifi/pi-man-extensions", "extensions"), name),
	extensionFile: (name: string) => join(resolvePackagePath("@ifi/pi-man-extensions", "extensions"), `${name}.ts`),
	crewsDir: () => resolvePackagePath("@ifi/pi-man-crews", "extensions/crews"),
	planDir: () => resolvePackagePath("@ifi/pi-plan", "."),
	subagentsDir: () => resolvePackagePath("@ifi/pi-extension-subagents", "."),
	sharedQnaDir: () => resolvePackagePath("@ifi/pi-shared-qna", "."),
	specDir: () => resolvePackagePath("@ifi/pi-spec", "extension"),
	prompt: (name: string) => join(resolvePackagePath("@ifi/pi-man-prompts", "prompts"), `${name}.md`),
	skill: (name: string) => join(resolvePackagePath("@ifi/pi-man-skills", "skills"), name),
	skillsDir: () => resolvePackagePath("@ifi/pi-man-skills", "skills"),
};
