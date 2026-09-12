"use client";

import { useState } from "react";
import { CardCourse } from "@/components/molecules/CardCourse";
import { StickyTabs } from "@/components/molecules/StickyTabs";
import type { Course, CourseTab } from "@/data/courses";
import type { TrainingPageContent } from "@/data/page-types";

/**
 * TabsCourses — client component rendering the training course tab selector
 * and course cards grid on the Training page.
 *
 * Figma: tab bar (Beginner | Intermediate | Advanced | All Levels) + 2-column
 * CardCourse grid + info note.
 *
 * Business logic (active tab state) lives here; all rendering is delegated to
 * CardCourse molecules.
 */

export function TabsCourses({
  content,
  courseTabs,
  coursesByTab,
}: {
  content: TrainingPageContent["courseTabs"];
  courseTabs: Array<{ value: CourseTab; label: string }>;
  coursesByTab: Record<CourseTab, Course[]>;
}) {
  const [activeTab, setActiveTab] = useState<CourseTab>("Beginner");
  const courses = coursesByTab[activeTab];

  return (
    <div className="flex flex-col gap-spacing-md bg-brand-tertiary-100 pb-spacing-md pt-[60px]">
      <StickyTabs<CourseTab>
        tabs={courseTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        ariaLabel={content.ariaLabel}
      >

      {courses.length > 0 && (
        <div className="grid items-stretch gap-spacing-md lg:grid-cols-2">
          {courses.map((course) => (
            <CardCourse key={course.title} {...course} />
          ))}
        </div>
      )}

      {courses.length === 0 && (
        <p className="border border-[#e3e3e3] p-spacing-md font-gill text-[18px] leading-[24px] text-brand-ink">
          {content.emptyMessage}
        </p>
      )}

      <p className="px-spacing-md text-center font-gill text-[16px] font-semibold leading-[19px] text-brand-secondary-100">
        {content.rateNote}
      </p>
      </StickyTabs>
    </div>
  );
}
