#!/usr/bin/env node
// Fetches leaderboard.json from the 3we-robot-platform GitHub repo at build time.

const fs = require("fs");
const https = require("https");
const path = require("path");

const LEADERBOARD_URL =
  "https://raw.githubusercontent.com/telleroutlook/3we-robot-platform/main/data/leaderboard.json";
const OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "public",
  "data",
  "leaderboard.json",
);

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          return fetch(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function main() {
  console.log("[leaderboard] Fetching from", LEADERBOARD_URL);
  try {
    const data = await fetch(LEADERBOARD_URL);
    JSON.parse(data); // validate JSON
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, data);
    console.log("[leaderboard] Written to", OUTPUT_PATH);
  } catch (err) {
    console.warn(
      "[leaderboard] WARN: Could not fetch remote data:",
      err.message,
    );
    console.warn("[leaderboard] Using fallback (empty entries)");
    const fallback = JSON.stringify(
      { version: "1.0.0", last_updated: "", entries: [] },
      null,
      2,
    );
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, fallback);
  }
}

main();
