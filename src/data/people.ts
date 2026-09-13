import data from "./json/people.json";
import type { Person } from "./content-types";

export type { Person } from "./content-types";
export const people: Person[] = data.people;
