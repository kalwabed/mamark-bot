import { createClient } from "https://esm.sh/@libsql/client@0.6.0/web";
import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";

const env = await load();

export const db = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});
