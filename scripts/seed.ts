import { runSeed } from "../src/db/seed";

runSeed()
  .then(() => {
    console.log("[seed] Complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("[seed] Failed:", err);
    process.exit(1);
  });
