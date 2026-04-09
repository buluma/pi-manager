import * as p from "@clack/prompts";
import { t } from "@ifi/pi-man-core";

/**
 * Presents an interactive prompt for the user to select an agent template
 * (e.g. general developer, fullstack, security, data/AI, colony operator).
 *
 * Exits the process if the user cancels the selection.
 *
 * @returns The selected agent template identifier string.
 */
export async function selectAgents(initialValue?: string): Promise<string> {
	const agent = await p.select({
		message: t("agent.select"),
		options: [
			{ value: "general-developer", label: t("agent.general"), hint: t("agent.generalHint") },
			{ value: "fullstack-developer", label: t("agent.fullstack"), hint: t("agent.fullstackHint") },
			{ value: "security-researcher", label: t("agent.security"), hint: t("agent.securityHint") },
			{ value: "data-ai-engineer", label: t("agent.dataai"), hint: t("agent.dataaiHint") },
			{ value: "crew-operator", label: t("agent.crew"), hint: t("agent.crewHint") },
		],
		initialValue,
	});
	if (p.isCancel(agent)) {
		p.cancel(t("cancelled"));
		process.exit(0);
	}
	return agent;
}
