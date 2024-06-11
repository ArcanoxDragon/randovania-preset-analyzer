import fs from "fs";
import path from "path";

import { analyzePresets } from "./analyzePresets.js";
import { writeSummaryCsv } from "./output.js";
import { isMain } from "./helpers.js";

if (isMain(import.meta)) {
	main();
}

function main() {
	if (process.argv.length < 3) {
		console.error(`Usage: node randovania-preset-analyzer <preset directory>`);
		process.exit(1);
	}

	const presetDirectory = validateDirectory(process.argv[2]);
	const presetSummaries = analyzePresets(presetDirectory);
	const summaryFile = writeSummaryCsv(presetDirectory, presetSummaries);

	console.log(`Wrote summary of ${presetSummaries.length} presets to "${summaryFile}"`);
}

function validateDirectory(directory: string): string {
	const absolutePath = path.resolve(directory);

	try {
		const stat = fs.statSync(absolutePath);

		if (!stat.isDirectory()) {
			console.error(`Directory not found: ${directory}`);
			process.exit(1);
		}
	} catch (e) {
		console.error(`Directory not found or could not be accessed: ${directory}`);

		if (process.env.NODE_ENV === "development") {
			console.error(e);
		}

		process.exit(1);
	}

	return absolutePath;
}
