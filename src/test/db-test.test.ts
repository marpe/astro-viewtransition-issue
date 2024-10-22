import { beforeEach, describe, expect, test } from "vitest";
import { getUsers } from "../pages/api/users.ts";

describe("with local database", () => {
  beforeEach(async () => {});

  test("findUsers", async () => {
    const results = await getUsers();
    expect(results).eq({});
  });
});
