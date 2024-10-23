import { createLocalDatabaseClient } from "@astrojs/db/runtime";
import { type SQL, sql } from "drizzle-orm";
import { SQLiteAsyncDialect } from "drizzle-orm/sqlite-core";
import dbConfig from "../../db/config";
import { getCreateIndexQueries, getCreateTableQuery } from "../../node_modules/@astrojs/db/dist/core/queries";

export async function recreateTables() {
	const sqlite = new SQLiteAsyncDialect();
	const client = createLocalDatabaseClient({
		dbUrl: new URL(import.meta.env.ASTRO_DATABASE_FILE).href,
		enableTransations: true,
	});

	const setupQueries: SQL[] = [];

	for (const [name, table] of Object.entries(dbConfig.tables ?? {})) {
		const dropQuery = sql.raw(`DROP TABLE IF EXISTS ${sqlite.escapeName(name)}`);
		const createQuery = sql.raw(getCreateTableQuery(name, table));
		const indexQueries = getCreateIndexQueries(name, table);
		setupQueries.push(dropQuery, createQuery, ...indexQueries.map((s) => sql.raw(s)));
	}

	await client.batch([client.run(sql`pragma defer_foreign_keys=true;`), ...setupQueries.map((q) => client.run(q))]);
}
