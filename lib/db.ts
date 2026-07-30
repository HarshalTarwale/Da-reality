import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "@/db/schema";

// The Node runtime needs a WebSocket implementation; browsers/edge already have one.
neonConfig.webSocketConstructor = ws;

const connectionString =
  process.env.DATABASE_URL || "postgres://placeholder:placeholder@localhost:5432/placeholder";

// A pooled WebSocket connection, reused across queries within a request instead
// of neon-http's one-HTTPS-round-trip-per-query — this is what actually removes
// most of the ~240ms-per-query overhead we measured.
const pool = new Pool({ connectionString });

export const db = drizzle(pool, { schema });

export { schema };
