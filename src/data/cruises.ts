import data from "./json/cruises.json";
import type { CruiseEvent } from "./content-types";

export type { CruiseEvent } from "./content-types";
export const cruiseEvents: CruiseEvent[] = data;