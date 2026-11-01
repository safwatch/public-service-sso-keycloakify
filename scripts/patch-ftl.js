// scripts/patch-ftl.js
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const jar = fs.readdirSync("dist_keycloak")
  .find(n => n.startsWith("keycloak-theme-for-") && n.endsWith(".jar"));

if (!jar) process.exit(0);

// Unpack JAR
execSync(`mkdir -p .jarwork && cd .jarwork && jar xf ../dist_keycloak/${jar}`);

// Copy our stub into the unpacked theme
const themeDir = fs.readdirSync(".jarwork/theme")[0];
const target = path.join(".jarwork", "theme", themeDir, "login", "login-actions-required.ftl");
const target2 = path.join(".jarwork", "theme", themeDir, "login", "keycloakify.ftl");
fs.copyFileSync("src/login/ftl/login-actions-required.ftl", target);
fs.copyFileSync("src/login/ftl/keycloakify.ftl", target2);

// Repack JAR
execSync(`cd .jarwork && jar cf ../dist_keycloak/${jar} *`);
execSync(`rm -rf .jarwork`);
console.log("✅ Injected login-actions-required.ftl & keycloakify.ftl into JAR");
