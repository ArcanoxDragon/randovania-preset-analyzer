import fs from "fs";
import path from "path";

import { PresetFile, PresetSummary } from "./types.js";
import { overlapCount, safeGet } from "./helpers.js";
import { ECHOES_CHARGE_COMBO_DOORS, PRIME_CHARGE_COMBO_DOORS } from "./constants.js";

export function analyzePresets(presetDirectory: string): PresetSummary[] {
	const presetFiles = fs.readdirSync(presetDirectory).filter(f => /\.rdvpreset$/i.test(f)).map(f => path.join(presetDirectory, f));
	const presetSummaries: PresetSummary[] = [];

	for (const filePath of presetFiles) {
		const fileName = path.basename(filePath);
		const match = fileName.match(/^World(\d+)-([^-]+)-([^-]+)-(.+)\.rdvpreset$/i);

		if (!match) {
			console.warn(`Skipping file "${fileName}" because it does not match the expected format.`);
			continue;
		}

		const [_, worldNumStr, gameName, playerName, worldName] = match;
		const worldNum = +worldNumStr;

		const json = fs.readFileSync(filePath, { encoding: "utf8" });
		const presetFile = JSON.parse(json) as PresetFile;
		const summary = analyzePreset(worldNum, gameName, playerName, worldName, presetFile);

		presetSummaries.push(summary);
	}

	presetSummaries.sort((a, b) => a.worldNum - b.worldNum);

	return presetSummaries;
}

function analyzePreset(worldNum: number, gameName: string, playerName: string, worldName: string, presetFile: PresetFile): PresetSummary {
	const { name: presetName, game, configuration: cfg } = presetFile;

	const minimalLogic = safeGet(cfg, "trick_level.minimal_logic", false);
	const firstProgressionLocal = safeGet(cfg, "first_progression_must_be_local", false);
	const lastResortDangerousActions = safeGet(cfg, "logical_resource_action", "") !== "randomly";
	const highlyDangerousActions = safeGet(cfg, "allow_highly_dangerous_logic", false);
	const minStartingItems = safeGet(cfg, "standard_pickup_configuration.minimum_random_starting_pickups", 0);
	const maxStartingItems = safeGet(cfg, "standard_pickup_configuration.maximum_random_starting_pickups", 0);
	const excludedLocationCount = safeGet(cfg, "available_locations.excluded_indices", []).length;
	const randomStartLocation = safeGet(cfg, "starting_location", []).length > 1;
	const randomTransports = safeGet(cfg, "teleporters.mode", "vanilla") !== "vanilla";
	const randomDoors = safeGet(cfg, "dock_rando.mode", "vanilla") !== "vanilla";
	const dockRandoChangeTo = safeGet(cfg, "dock_rando.types_state.door.can_change_to", []);
	const energyTankStartingCount = safeGet(cfg, "standard_pickup_configuration.pickups_state.Energy Tank.num_included_in_starting_pickups", 0);
	const energyTankShuffledCount = safeGet(cfg, "standard_pickup_configuration.pickups_state.Energy Tank.num_shuffled_pickups", 0);
	const energyTankTotalCount = energyTankStartingCount + energyTankShuffledCount;
	let chargeComboDoors = undefined;
	let randomPortals = undefined;
	let randomTranslators = undefined;

	switch (game) {
		case "prime1":
			chargeComboDoors = overlapCount(dockRandoChangeTo, PRIME_CHARGE_COMBO_DOORS) > 0;
			break;
		case "prime2":
			chargeComboDoors = overlapCount(dockRandoChangeTo, ECHOES_CHARGE_COMBO_DOORS) > 0;
			randomPortals = safeGet(cfg, "portal_rando", false);
			randomTranslators = false;

			for (const value of Object.values(safeGet(cfg, "translator_configuration.translator_requirement", {}))) {
				randomTranslators ||= typeof value === "string" && value.indexOf("random") >= 0;
			}

			break;
	}

	return {
		worldNum,
		playerName,
		worldName,
		game: gameName, // Nicer name from the filename than from the preset itself
		presetName,

		minimalLogic,
		firstProgressionLocal,
		lastResortDangerousActions,
		highlyDangerousActions,
		minStartingItems,
		maxStartingItems,
		excludedLocationCount: excludedLocationCount > 0 ? excludedLocationCount : undefined,
		randomStartLocation,
		randomTransports,
		randomDoors,
		chargeComboDoors,
		randomPortals,
		randomTranslators,
		energyTankStartingCount,
		energyTankShuffledCount,
		energyTankTotalCount,
	};
}
