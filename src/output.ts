import fs from "fs";
import path from "path";

import { PresetSummary } from "./types.js";
import { COLUMN_NAME_MAPPING } from "./constants.js";

export function writeSummaryCsv(presetDirectory: string, presetSummaries: PresetSummary[]): string {
	const outputPath = path.join(presetDirectory, "Summary.csv");
	const lines: string[] = [];

	for (const entry of presetSummaries) {
		if (lines.length === 0) {
			// Write header
			lines.push(Object.keys(entry).map(key => COLUMN_NAME_MAPPING[key as keyof PresetSummary]).join(","));
		}

		lines.push(
			Object.values(entry)
				.map(v => {
					if (v === false || v === null || typeof (v) === "undefined") {
						return "";
					}

					return v === true ? "Yes" : v.toString();
				})
				.map(v => {
					v = v.replaceAll(/"/g, `\\"`);

					if (v.indexOf(",") >= 0) {
						v = `"${v}"`;
					}

					return v;
				})
				.join(",")
		);
	}

	fs.writeFileSync(outputPath, lines.join("\n"), { encoding: "utf8" });
	return outputPath;
}
