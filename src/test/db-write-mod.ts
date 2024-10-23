import fs from "node:fs";
import * as db from "../../node_modules/@astrojs/db/dist/core/integration/vite-plugin-db";
import { resolveDbConfig } from "../../node_modules/@astrojs/db/dist/core/load-file";

export async function writeVirtualMod(filename: string, root: URL) {
	const resolvedConfig = await resolveDbConfig({ root, integrations: [] });
	const virtualMod = db.getLocalVirtualModContents({ tables: resolvedConfig.dbConfig.tables, root });
	fs.writeFileSync(filename, virtualMod);
}
