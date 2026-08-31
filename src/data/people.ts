import data from "./json/people.json";
import type { Person } from "./content-types";

export type { Person } from "./content-types";
export const boardMembers: Person[] = data.boardMembers;
export const trainingInstructors: Person[] = data.trainingInstructors;
export const communitySkippers: Person[] = data.communitySkippers;
