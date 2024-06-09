import { PresetSummary } from "./types.js";

export const PRIME_CHARGE_COMBO_DOORS = [
	"Flamethrower Blast Shield",
	"Ice Spreader Blast Shield",
	"Wavebuster Blast Shield",
];

export const ECHOES_CHARGE_COMBO_DOORS = [
	"Darkburst Blast Shield",
	"Sunburst Blast Shield",
	"Sonic Boom Blast Shield",
];

export const COLUMN_NAME_MAPPING: { [K in keyof PresetSummary]: string } = {
	worldNum: "#",
	playerName: "Player",
	worldName: "World",
	game: "Game",
	presetName: "Preset",
	minimalLogic: "Minimal Logic",
	firstProgressionLocal: "First Progression Local",
	lastResortDangerousActions: "Last-Resort Dangerous Actions",
	highlyDangerousActions: "Highly-Dangerous Actions",
	minStartingItems: "Min. Starting Items",
	maxStartingItems: "Max. Starting Items",
	excludedLocationCount: "Excluded Locations",
	randomStartLocation: "Random Start",
	randomTransports: "Random Transports",
	randomDoors: "Random Doors",
	chargeComboDoors: "Charge Combo Doors",
	randomPortals: "Random Portals",
	randomTranslators: "Random Translator Gates",
	energyTankStartingCount: "Energy Tanks (Starting)",
	energyTankShuffledCount: "Energy Tanks (Shuffled)",
	energyTankTotalCount: "Energy Tanks (Total)",
};
