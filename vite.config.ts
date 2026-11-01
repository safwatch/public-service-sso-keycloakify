import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import { buildEmailTheme } from "keycloakify-emails";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            environmentVariables: [
                { name: "PORTAL_URL", default: "https://portal.civic-services.org" },
                { name: "PORTAL_LABEL", default: "Back to Public Service Portal" },
            ],
            accountThemeImplementation: "none",
            themeName: "public-service-sso",
            postBuild: async buildContext => {
                const { config: loadConfig } = await import("./jsx-email.config.js");

                const config = await loadConfig;

                await buildEmailTheme({
                    templatesSrcDirPath: path.join(
                        buildContext.themeSrcDirPath,
                        "email",
                        "templates"
                    ),
                    i18nSourceFile: path.join(
                        buildContext.themeSrcDirPath,
                        "email",
                        "i18n.ts"
                    ),
                    themeNames: buildContext.themeNames,
                    keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
                    locales: ["en", "id"],
                    esbuild: config.esbuild,
                    cwd: import.meta.dirname
                });
            }
        })
    ]
});
