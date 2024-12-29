import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const json = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"),
);

for (const manifestPath of [
  "../dist/manifest.firefox.json",
  "../dist/manifest.json",
]) {
  const manifest = fs.readFileSync(path.join(__dirname, manifestPath), "utf8");
  fs.writeFileSync(
    path.join(__dirname, manifestPath),
    manifest.replace(/@version/g, json.version),
  );
}
