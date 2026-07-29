/**
 * Count how many properties in the DB have no real image (placeholder only).
 * Run with: node scripts/count-no-image.mjs
 */
import { neon } from "@neondatabase/serverless";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const [totals] = await sql`
  SELECT
    COUNT(*)                                                                   AS total,
    SUM(CASE WHEN display_image LIKE '%placeholder%' THEN 1 ELSE 0 END)::int  AS no_image,
    SUM(CASE WHEN display_image NOT LIKE '%placeholder%' THEN 1 ELSE 0 END)::int AS has_image
  FROM properties
`;

console.log("\n=== Image Coverage Report ===");
console.log(`Total properties          : ${totals.total}`);
console.log(`Have real image           : ${totals.has_image}`);
console.log(`No image (placeholder)    : ${totals.no_image}`);
console.log(`Coverage                  : ${((totals.has_image / totals.total) * 100).toFixed(1)}%`);

// Breakdown by developer
const byDev = await sql`
  SELECT developer, COUNT(*) AS no_image_count
  FROM properties
  WHERE display_image LIKE '%placeholder%'
  GROUP BY developer
  ORDER BY no_image_count DESC
`;

console.log("\n=== No-Image Count by Developer ===");
for (const row of byDev) {
  console.log(`  ${String(row.developer).padEnd(30)} ${row.no_image_count} properties`);
}
console.log("");
