export const compiledPackages = [
	{ name: "@ifi/pi-man-core", dir: "packages/core" },
	{ name: "@ifi/pi-man-cli", dir: "packages/cli" },
	{ name: "@ifi/pi-web-client", dir: "packages/web-client" },
	{ name: "@ifi/pi-web-server", dir: "packages/web-server" },
];

export const publishedPackages = [
	...compiledPackages,
	{ name: "@ifi/pi-man-extensions", dir: "packages/extensions" },
	{ name: "@ifi/pi-man-crews", dir: "packages/crews" },
	{ name: "@ifi/pi-man-prompts", dir: "packages/prompts" },
	{ name: "@ifi/pi-man-skills", dir: "packages/skills" },
	{ name: "@ifi/pi-man-agents", dir: "packages/agents" },
	{ name: "@ifi/pi-extension-subagents", dir: "packages/subagents" },
	{ name: "@ifi/pi-shared-qna", dir: "packages/shared-qna" },
	{ name: "@ifi/pi-plan", dir: "packages/plan" },
	{ name: "@ifi/pi-spec", dir: "packages/spec" },
	{ name: "@ifi/pi-provider-cursor", dir: "packages/cursor" },
	{ name: "@ifi/pi-provider-ollama", dir: "packages/ollama" },
	{ name: "@ifi/pi-web-remote", dir: "packages/web-remote" },
	{ name: "@ifi/pi-man", dir: "packages/pi-man" },
];
