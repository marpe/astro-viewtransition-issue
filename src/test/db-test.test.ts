import { beforeEach, describe, expect, test } from "vitest";
import { getUsers } from "../pages/api/users.ts";
import { recreateTables } from "./db-recreate-tables.ts";
import seed from "../../db/seed.ts";

describe("with local database", () => {
  beforeEach(async () => {
    await recreateTables();
    await seed();
  });

  test("findUsers", async () => {
    const results = await getUsers();
    expect.soft(results).toStrictEqual([
      {
        "id": "mario",
        "password": "itsame",
        "username": "Mario",
      },
    ]);
  });
});
