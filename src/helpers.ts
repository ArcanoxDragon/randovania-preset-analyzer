import { fileURLToPath } from "url";
import { ExpandoObject, Widen } from "./types.js";

export function isMain(importMeta: ImportMeta) {
	if (!importMeta.url.startsWith("file:")) {
		return false;
	}

	const modulePath = fileURLToPath(importMeta.url);

	return process.argv[1] === modulePath;
}

export function safeGet<T = unknown>(obj: unknown, path: string): Widen<T> | undefined;
export function safeGet<T = unknown>(obj: unknown, path: string, defaultValue: T): Widen<T>;
export function safeGet<T = unknown>(obj: unknown, path: string, defaultValue: T | undefined = undefined) {
	if (obj === null || typeof obj === "undefined") {
		return defaultValue as Widen<T>;
	}

	if (typeof obj !== "object") {
		throw new Error(`Cannot access "${path}" on non-object value`);
	}

	const segments = path.split(/\./g);
	let cur: unknown = obj;

	while (segments.length > 0) {
		const segment = segments.shift()!;

		if (cur === null || typeof cur !== "object" || !(segment in cur)) {
			return defaultValue as Widen<T>;
		}

		cur = (cur as ExpandoObject)[segment];
	}

	if (typeof cur === "undefined") {
		return defaultValue as Widen<T>;
	}

	return cur as Widen<T>;
}

export function overlapCount<T>(arr1: T[], arr2: T[]) {
	if (!Array.isArray(arr1) || !Array.isArray(arr1)) {
		return 0;
	}

	let overlap = 0;

	for (const item of arr1) {
		if (arr2.includes(item)) {
			overlap++;
		}
	}

	return overlap;
}
