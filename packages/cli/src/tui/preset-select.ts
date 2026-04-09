import * as p from "@clack/prompts";
import type { OhPConfig } from "@buluma/pi-man-core";
import { t } from "@buluma/pi-man-core";

interface Preset extends Omit<OhPConfig, "providers"> {}

/**
 * Registry of built-in configuration presets (Full Power / Clean / Colony).
 * Each entry maps a preset key to its i18n label/hint keys and a full {@link Preset} config object.
 */
export const PRESETS: Record<string, { labelKey: string; hintKey: string; config: Preset }> = {
	full: {
		labelKey: "preset.full",
		hintKey: "preset.fullHint",
		config: {
			theme: "dark",
			keybindings: "default",
			thinking: "high",
			extensions: [
				"git-guard",
				"auto-session-name",
				"custom-footer",
				"compact-header",
				"crews",
				"auto-update",
				"bg-process",
			],
			prompts: ["review", "fix", "explain", "commit", "test", "refactor", "optimize", "security", "document", "pr"],
			agents: "crew-operator",
		},
	},
	clean: {
		labelKey: "preset.clean",
		hintKey: "preset.cleanHint",
		config: {
			theme: "dark",
			keybindings: "default",
			thinking: "off",
			extensions: [],
			prompts: [],
			agents: "general-developer",
		},
	},
	crew: {
		labelKey: "preset.crew",
		hintKey: "preset.crewHint",
		config: {
			theme: "dark",
			keybindings: "default",
			thinking: "medium",
			extensions: ["crews", "auto-session-name", "compact-header"],
			prompts: ["review", "fix", "explain", "commit"],
			agents: "crew-operator",
		},
	},
};

/**
 * Prompts the user to select a configuration preset via an interactive TUI menu.
 * Exits the process if the user cancels the selection.
 * @returns The {@link Preset} configuration object for the chosen preset.
 */
export async function selectPreset(): Promise<Preset> {
	const key = await p.select({
		message: t("preset.select"),
		options: Object.entries(PRESETS).map(([k, v]) => ({
			value: k,
			label: t(v.labelKey),
			hint: t(v.hintKey),
		})),
	});
	if (p.isCancel(key)) {
		p.cancel(t("cancelled"));
		process.exit(0);
	}
	return PRESETS[key]?.config;
}
