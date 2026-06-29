"use client";

import { useState } from "react";
import { BookOpen, ArrowRight, ExternalLink, ShoppingCart } from "lucide-react";

const DEMO_CLASSROOM_URL = "https://classroom.google.com/c/ODY4NDYxOTk5MDc4?cjc=xphljpcw";

type Course = {
  slug: string;
  name: string;
  color: string;
  subjects: string[];
  classroomUrl: string;
};

const allCourses: Course[] = [
  { slug: "naplan-year-3",    name: "NAPLAN | Year 3",    color: "#a78bfa", subjects: ["Reading", "Writing", "Language", "Numeracy"],                          classroomUrl: "https://classroom.google.com/c/NzgyODk5MjMwMTY1?cjc=wy5aceqw" },
  { slug: "oc-year-4",        name: "OC | Year 4",        color: "#f472b6", subjects: ["Mathematical Reasoning", "Thinking Skills", "Reading"],                classroomUrl: "https://classroom.google.com/c/Nzg4NjM2ODcwNTQz?cjc=ks7n4i2c" },
  { slug: "naplan-year-5",    name: "NAPLAN | Year 5",    color: "#34d399", subjects: ["Reading", "Writing", "Language", "Numeracy"],                          classroomUrl: "https://classroom.google.com/c/NzgyODQ5Mjc3Njg0?cjc=2xnlj7ba" },
  { slug: "selective-year-6", name: "Selective | Year 6", color: "#60a5fa", subjects: ["Mathematical Reasoning", "Thinking Skills", "Reading", "Writing"],     classroomUrl: "https://classroom.google.com/c/NzcwNDYxNTQ4MjEw?cjc=cphp4ivz" },
  { slug: "naplan-year-7",    name: "NAPLAN | Year 7",    color: "#fbbf24", subjects: ["Reading", "Writing", "Language", "Numeracy"],                          classroomUrl: "https://classroom.google.com/c/Nzg4NjM2NzEzMzA5?cjc=u6ff3z2t" },
  { slug: "naplan-year-9",    name: "NAPLAN | Year 9",    color: "#818cf8", subjects: ["Reading", "Writing", "Language", "Numeracy"],                          classroomUrl: "https://classroom.google.com/c/Nzg5NjU0NTcxNTc4?cjc=jacj3tz5" },
];

type Tab = "demo" | "purchased" | "browse";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "demo",      label: "Free Demo",     icon: <BookOpen className="w-4 h-4" /> },
  { key: "purchased", label: "My Courses",     icon: <ExternalLink className="w-4 h-4" /> },
  { key: "browse",    label: "Get More",       icon: <ShoppingCart className="w-4 h-4" /> },
];

interface CourseTabsProps {
  purchasedSlugs: string[];
}

export function CourseTabs({ purchasedSlugs }: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("demo");

  const purchasedCourses = allCourses.filter((c) => purchasedSlugs.includes(c.slug));
  const unpurchasedCourses = allCourses.filter((c) => !purchasedSlugs.includes(c.slug));

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-foreground/10 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.key
                ? "border-[#a78bfa] text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.key === "purchased" && purchasedSlugs.length > 0 && (
              <span className="text-xs bg-[#a78bfa] text-white px-1.5 py-0.5 rounded-full ml-1">
                {purchasedSlugs.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "demo" && (
        <div>
          <p className="text-sm text-muted-foreground mb-6">
            Try our demo classroom with sample papers for all courses — no purchase required.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCourses.map((course) => (
              <CourseCard
                key={course.slug}
                course={course}
                linkUrl={DEMO_CLASSROOM_URL}
                linkLabel="Open Demo"
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "purchased" && (
        <div>
          {purchasedCourses.length === 0 ? (
            <div className="border border-foreground/10 p-10 text-center bg-card">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm mb-5">You haven't purchased any courses yet.</p>
              <button
                onClick={() => setActiveTab("browse")}
                className="inline-flex items-center gap-2 text-sm font-medium text-white px-6 py-3 hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
              >
                Browse Courses <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {purchasedCourses.map((course) => (
                <CourseCard
                  key={course.slug}
                  course={course}
                  linkUrl={course.classroomUrl}
                  linkLabel="Open Classroom"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "browse" && (
        <div>
          {unpurchasedCourses.length === 0 ? (
            <div className="border border-foreground/10 p-10 text-center bg-card">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">You've purchased all available courses!</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Courses you haven't purchased yet — buy to unlock full classroom access.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unpurchasedCourses.map((course) => (
                  <BrowseCard key={course.slug} course={course} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function CourseCard({ course, linkUrl, linkLabel }: { course: Course; linkUrl: string; linkLabel: string }) {
  return (
    <div
      className="group flex flex-col p-6 border transition-all duration-300 bg-card hover:-translate-y-0.5"
      style={{ borderColor: `${course.color}30`, background: `linear-gradient(135deg, ${course.color}08 0%, white 55%)` }}
    >
      <div className="w-8 h-1 mb-5 rounded-full" style={{ backgroundColor: course.color }} />
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-display text-base">{course.name}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {course.subjects.map((s) => (
          <span
            key={s}
            className="text-xs px-2 py-0.5 rounded-sm border"
            style={{ borderColor: `${course.color}30`, color: `${course.color}cc` }}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
          style={{ color: course.color }}
        >
          {linkLabel} <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

function BrowseCard({ course }: { course: Course }) {
  return (
    <div
      className="group flex flex-col p-6 border transition-all duration-300 bg-card hover:-translate-y-0.5"
      style={{ borderColor: `${course.color}30`, background: `linear-gradient(135deg, ${course.color}08 0%, white 55%)` }}
    >
      <div className="w-8 h-1 mb-5 rounded-full" style={{ backgroundColor: course.color }} />
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-display text-base">{course.name}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {course.subjects.map((s) => (
          <span
            key={s}
            className="text-xs px-2 py-0.5 rounded-sm border"
            style={{ borderColor: `${course.color}30`, color: `${course.color}cc` }}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <a
          href="/#pricing"
          className="inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: course.color }}
        >
          Buy Course <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
