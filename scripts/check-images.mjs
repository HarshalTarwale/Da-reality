/**
 * Fetch a sample of image URLs and check if any return non-200 or redirect to a
 * "coming soon" page. Also finds the specific Azizi Riviera 54 property.
 */
import { neon } from "@neondatabase/serverless";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const sql = neon(process.env.DATABASE_URL);

// Find the Azizi Riviera 54 property
const riviera = await sql`
  SELECT id, title, developer, source_image_url, display_image, gallery
  FROM properties
  WHERE title ILIKE '%riviera 54%'
  LIMIT 5
`;

console.log("\n=== Azizi Riviera 54 ===");
for (const r of riviera) {
  console.log(`Title: ${r.title}`);
  console.log(`Developer: ${r.developer}`);
  console.log(`source_image_url: ${r.source_image_url}`);
  console.log(`display_image: ${r.display_image}`);
  console.log(`gallery[0]: ${r.gallery?.[0]}`);
  console.log("---");
}

// Find ALL Azizi properties with their image URLs
const azizi = await sql`
  SELECT id, title, source_image_url, cardinality(gallery) AS gallery_count
  FROM properties
  WHERE developer = 'Azizi'
  ORDER BY title
`;

console.log(`\n=== All Azizi properties (${azizi.length}) ===`);
for (const r of azizi) {
  console.log(`[${r.gallery_count} imgs] ${r.title}`);
  console.log(`  ${r.source_image_url}`);
}
