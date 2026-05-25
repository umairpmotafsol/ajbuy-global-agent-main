const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "ajbuy-global-agent-main", ".vercel", "output");
const target = path.join(root, ".vercel", "output");

if (!fs.existsSync(source)) {
  throw new Error(`Vercel build output not found: ${source}`);
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.cpSync(source, target, { recursive: true });

console.log(`Copied Vercel build output to ${target}`);
