export type Widen<T> =
	T extends string ? string :
	T extends number ? number :
	T extends boolean ? boolean :
	T;

export interface ExpandoObject {
	[key: string]: ExpandoObject | unknown;
};

export interface PresetFile {
	name: string;
	game: string;
	configuration: ExpandoObject;
}

export interface PresetSummary {
	worldNum: number;
	playerName: string;
	worldName: string;
	game: string;
	presetName: string;

	minimalLogic: boolean;
	firstProgressionLocal: boolean;
	lastResortDangerousActions: boolean;
	highlyDangerousActions: boolean;
	minStartingItems: number;
	maxStartingItems: number;
	excludedLocationCount: number | undefined;
	randomStartLocation: boolean;
	randomTransports: boolean;
	randomDoors: boolean;
	chargeComboDoors: boolean | undefined;
	randomPortals: boolean | undefined;
	randomTranslators: boolean | undefined;
	energyTankStartingCount: number;
	energyTankShuffledCount: number;
	energyTankTotalCount: number;
}
