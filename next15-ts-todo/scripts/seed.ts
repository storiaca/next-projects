import { getClient } from "@/app/lib/server/db";

async function seed() {
  const client = getClient();
  await client.connect();

  const res = await client.query("Select 1");

  console.log(res.rows);

  await client.end();
}

seed();
