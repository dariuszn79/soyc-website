import type { Block } from "payload";

/** Course card — picks a course from the Courses collection.
 * → components/molecules/CardCourse.tsx */
export const CardCourseBlock: Block = {
  slug: "cardCourse",
  interfaceName: "CardCourseBlock",
  labels: { singular: "Card: Course", plural: "Cards: Course" },
  fields: [
    {
      name: "course",
      type: "relationship",
      relationTo: "courses",
      required: true,
      label: "Course",
    },
  ],
};
