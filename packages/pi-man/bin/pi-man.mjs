#!/usr/bin/env node

/**
 * pi-man installer — registers all pi-man sub-packages with pi.
 *
 * Usage:
 *   npx @buluma/pi-man              # install latest from npm
 *   npx @buluma/pi-man --git        # install from git (main branch)
 *   npx @buluma/pi-man --git --ref v0.2.0  # install from git (specific tag/branch)
 *   npx @buluma/pi-man --local      # install to project .pi/settings.json
 *   npx @buluma/pi-man --remove     # uninstall all pi-man packages from pi
 */

import { execFileSync } from "node:child_process";
import process from "node:process";

const IS_WINDOWS = process.platform === "win32";

const PACKAGES = [
	"@buluma/pi-man-extensions",
	"@buluma/pi-man-crews",
	"@buluma/pi-man-subagents",
	"@buluma/pi-man-plan",
	"@buluma/pi-man-spec",
	"@buluma/pi-man-prompts",
	"@buluma/pi-man-skills",
];

const GIT_BASE = "https://github.com/buluma/pi-man.git";
const GIT_PREFIX = "https://github.com/buluma/pi-man.git#";

function parseArgs(argv) {
	const args = argv.slice(2);
	let version = null;
	let local = false;
	let remove = false;
	let help = false;
	let useGit = false;
	let gitRef = null;

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg === "--version" || arg === "-v") {
			version = args[++i] ?? null;
			if (!version) {
				console.error("Error: --version requires a value");
				process.exit(1);
			}
		} else if (arg === "--git" || arg === "-g") {
			useGit = true;
		} else if (arg === "--ref") {
			gitRef = args[++i] ?? null;
			if (!gitRef) {
				console.error("Error: --ref requires a value");
				process.exit(1);
			}
		} else if (arg === "--local" || arg === "-l") {
			local = true;
		} else if (arg === "--remove" || arg === "-r") {
			remove = true;
		} else if (arg === "--help" || arg === "-h") {
			help = true;
		} else {
			console.error(`Unknown argument: ${arg}`);
			process.exit(1);
		}
	}

	return { version, local, remove, help, useGit, gitRef };
}

function printHelp() {
	console.log(`
pi-man — install all pi-man packages into pi

Usage:
  npx @buluma/pi-man                    Install latest versions from npm (global)
  npx @buluma/pi-man --git              Install from git main branch (global)
  npx @buluma/pi-man --git --ref v0.2.0 Install from git tag/branch (global)
  npx @buluma/pi-man --local            Install to project (.pi/settings.json)
  npx @buluma/pi-man --remove           Uninstall all pi-man packages from pi

Options:
  -g, --git          Install from git instead of npm
      --ref <ref>    Git ref (tag/branch) when using --git
  -v, --version <ver>   Pin npm packages to a specific version
  -l, --local           Install project-locally instead of globally
  -r, --remove          Remove all pi-man packages from pi
  -h, --help            Show this help

Packages installed:
${PACKAGES.map((p) => `  • ${p}`).join("\n")}
`.trim());
}

function findPi() {
	const candidates = IS_WINDOWS ? ["pi.cmd", "pi"] : ["pi"];

	for (const cmd of candidates) {
		try {
			execFileSync(cmd, ["--version"], { stdio: "ignore", shell: IS_WINDOWS });
			return cmd;
		} catch {
			// try next candidate
		}
	}

	console.error("Error: 'pi' command not found. Install pi-coding-agent first:");
	console.error("  npm install -g @mariozechner/pi-coding-agent");
	process.exit(1);
}

function run(pi, command, args, { label }) {
	const display = [pi, command, ...args].join(" ");
	process.stdout.write(`  ${label} ... `);
	try {
		execFileSync(pi, [command, ...args], { stdio: "pipe", timeout: 60_000, shell: IS_WINDOWS });
		console.log("✓");
	} catch (error) {
		const stderr = error.stderr?.toString().trim();
		// pi install exits 0 on success; treat already-installed as success
		if (stderr?.includes("already installed") || stderr?.includes("already exists")) {
			console.log("✓ (already installed)");
		} else {
			console.log("✗");
			if (stderr) {
				console.error(`    ${stderr.split("\n")[0]}`);
			}
			return false;
		}
	}
	return true;
}

function getGitSource(pkg) {
	const subpath = pkg.replace("@ifi/", "packages/");
	const ref = gitRef ? `:${gitRef}` : ":main";
	return `${GIT_PREFIX}${ref}/${subpath}`;
}

const opts = parseArgs(process.argv);

if (opts.help) {
	printHelp();
	process.exit(0);
}

const { local, remove, useGit, gitRef } = opts;

const pi = findPi();
const localFlag = local ? ["-l"] : [];

if (remove) {
	console.log("\n🐜 Removing pi-man packages from pi...\n");
	let failures = 0;
	for (const pkg of PACKAGES) {
		const ok = run(pi, "remove", [`npm:${pkg}`, ...localFlag], { label: pkg });
		if (!ok) failures++;
	}
	console.log(failures === 0 ? "\n✅ All pi-man packages removed." : `\n⚠️  ${failures} package(s) could not be removed.`);
	process.exit(failures > 0 ? 1 : 0);
}

const scope = local ? "project" : "global";

if (useGit) {
	const refText = gitRef ? ` (ref: ${gitRef})` : " (main branch)";
	console.log(`\n🐜 Installing pi-man packages from git into pi (${scope})${refText}...\n`);

	let failures = 0;
	for (const pkg of PACKAGES) {
		const source = getGitSource(pkg);
		const ok = run(pi, "install", [source, ...localFlag], { label: pkg });
		if (!ok) failures++;
	}

	if (failures === 0) {
		console.log("\n✅ All pi-man packages installed from git. Restart pi to load them.");
	} else {
		console.log(`\n⚠️  ${failures} package(s) failed to install. Check the errors above.`);
	}
	process.exit(failures > 0 ? 1 : 0);
}

const { version } = opts;
const suffix = version ? `@${version}` : "";

console.log(`\n🐜 Installing pi-man packages from npm into pi (${scope})...\n`);

let failures = 0;
for (const pkg of PACKAGES) {
	const source = `npm:${pkg}${suffix}`;
	const ok = run(pi, "install", [source, ...localFlag], { label: pkg });
	if (!ok) failures++;
}

if (failures === 0) {
	console.log("\n✅ All pi-man packages installed. Restart pi to load them.");
} else {
	console.log(`\n⚠️  ${failures} package(s) failed to install. Check the errors above.`);
}

process.exit(failures > 0 ? 1 : 0);
