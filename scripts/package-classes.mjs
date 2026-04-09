export const compiledPackages = [
	{ name: "@buluma/pi-man-core", dir: "packages/core" },
	{ name: "@buluma/pi-man-cli", dir: "packages/cli" },
	{ name: "@ifi/pi-web-client", dir: "packages/web-client" },
	{ name: "@ifi/pi-web-server", dir: "packages/web-server" },
];

export const publishedPackages = [
	...compiledPackages,
	{ name: "@buluma/pi-man-extensions", dir: "packages/extensions" },
	{ name: "@buluma/pi-man-crews", dir: "packages/crews" },
	{ name: "@buluma/pi-man-prompts", dir: "packages/prompts" },
	{ name: "@buluma/pi-man-skills", dir: "packages/skills" },
	{ name: "@buluma/pi-man-agents", dir: "packages/agents" },
	{ name: "@ifi/pi-extension-subagents", dir: "packages/subagents" },
	{ name: "@ifi/pi-shared-qna", dir: "packages/shared-qna" },
	{ name: "@ifi/pi-plan", dir: "packages/plan" },
	{ name: "@ifi/pi-spec", dir: "packages/spec" },
	{ name: "@ifi/pi-provider-cursor", dir: "packages/cursor" },
	{ name: "@ifi/pi-provider-ollama", dir: "packages/ollama" },
	{ name: "@ifi/pi-web-remote", dir: "packages/web-remote" },
	{ name: "@buluma/pi-man", dir: "packages/pi-man" },
];
