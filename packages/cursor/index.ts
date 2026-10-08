import { readStoredCredential, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { createCursorOAuthProvider, refreshCursorCredentialModels } from "./auth.js";
import { CURSOR_API, CURSOR_PROVIDER, getCursorRuntimeConfig } from "./config.js";
import { getFallbackCursorModels, toProviderModels, type CursorCredentials } from "./models.js";
import { streamSimpleCursor } from "./provider.js";
import { clearCursorRuntimeState, getCursorRuntimeStateSummary } from "./runtime.js";

function registerCursorProvider(pi: ExtensionAPI): void {
	pi.registerProvider(CURSOR_PROVIDER, {
		api: CURSOR_API,
		baseUrl: getCursorRuntimeConfig().apiUrl,
		oauth: createCursorOAuthProvider(),
		streamSimple: streamSimpleCursor,
		models: toProviderModels(getFallbackCursorModels()),
		async refreshModels({ credential, allowNetwork }) {
			if (!allowNetwork || credential?.type !== "oauth") {
				return toProviderModels(getFallbackCursorModels());
			}
			const refreshed = await refreshCursorCredentialModels(credential as CursorCredentials);
			return toProviderModels(refreshed.models ?? getFallbackCursorModels());
		},
	});
}

function registerCursorCommand(pi: ExtensionAPI): void {
	pi.registerCommand("cursor", {
		description: "Inspect or refresh the experimental Cursor provider: /cursor [status|refresh-models|clear-state]",
		async handler(args, ctx) {
			const action = args.trim().toLowerCase() || "status";
			if (action === "clear-state") {
				clearCursorRuntimeState();
				ctx.ui.notify("Cleared Cursor provider runtime state.", "info");
				return;
			}

			const authStatus = ctx.modelRegistry.getProviderAuthStatus(CURSOR_PROVIDER);
			if (!authStatus.configured) {
				ctx.ui.notify("Not logged in to Cursor. Run /login cursor first.", "warning");
				return;
			}

			if (action === "refresh-models") {
				await ctx.modelRegistry.refresh({ providers: [CURSOR_PROVIDER], force: true });
				const modelCount = ctx.modelRegistry.getAvailable().filter((model) => model.provider === CURSOR_PROVIDER).length;
				ctx.ui.notify(`Refreshed Cursor models (${modelCount} available).`, "info");
				return;
			}

			const credential = readStoredCredential(CURSOR_PROVIDER);
			const runtime = getCursorRuntimeStateSummary();
			const modelCount = ctx.modelRegistry.getAvailable().filter((model) => model.provider === CURSOR_PROVIDER).length;
			const expires = credential?.type === "oauth" ? (credential as CursorCredentials).expires : Date.now();
			const expiresInMinutes = Math.max(0, Math.round((expires - Date.now()) / 60_000));
			ctx.ui.notify(
				[
					`Cursor auth: configured`,
					`Models: ${modelCount}`,
					`Token expiry: ${expiresInMinutes}m`,
					`Runtime: ${runtime.activeRuns} active run(s), ${runtime.checkpoints} checkpoint(s)`,
				].join("\n"),
				"info",
			);
		},
	});
}

export { streamSimpleCursor } from "./provider.js";
export { createCursorOAuthProvider, generateCursorAuthParams, getTokenExpiry } from "./auth.js";
export { discoverCursorModels, getCredentialModels, getFallbackCursorModels, type CursorCredentials } from "./models.js";
export { clearCursorRuntimeState, deriveBridgeKey, deriveConversationKey, getCursorRuntimeStateSummary } from "./runtime.js";

export default function cursorProviderExtension(pi: ExtensionAPI): void {
	registerCursorProvider(pi);
	registerCursorCommand(pi);
}
