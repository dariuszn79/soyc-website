import data from "./json/courses.json";
import type {
  Course,
  CoursePrice,
  CourseTab,
  TrainingEvent,
} from "./content-types";

export type { Course, CoursePrice, CourseTab, TrainingEvent } from "./content-types";

export const courseTabs = data.courseTabs as Array<{ value: CourseTab; label: string }>;
export const coursesByTab = data.coursesByTab as unknown as Record<CourseTab, Course[]>;
export const upcomingTrainingCourses: TrainingEvent[] = data.upcomingTrainingCourses;