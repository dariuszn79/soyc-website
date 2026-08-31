import data from "./json/fleet.json";
import type { Boat, SpecItem } from "./content-types";

export type { Boat, SpecItem } from "./content-types";
export const fleet: Boat[] = data;
