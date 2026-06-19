import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BookOpen, Clock, ArrowRight, CheckCircle, LogOut } from "lucide-react";

const courses = [
  { name: "NAPLAN | Year 3",    color: "#a78bfa", slug: "naplan-year-3",    subjects: ["Reading", "Writing", "Language", "Numeracy"] },
  { name: "OC | Year 4",        color: "#f472b6", slug: "oc-year-4",        subjects: ["Mathematical Reasoning", "Thinking Skills", "Reading"] },
  { name: "NAPLAN | Year 5",    color: "#34d399", slug: "naplan-year-5",    subjects: ["Reading", "Writing", "Language", "Numeracy"] },
  { name: "Selective | Year 6", color: "#60a5fa", slug: "selective-year-6", subjects: ["Mathematical Reasoning", "Thinking Skills", "Reading", "Writing"] },
  { name: "NAPLAN | Year 7",    color: "#fbbf24", slug: "naplan-year-7",    subjects: ["Reading", "Writing", "Language", "Numeracy"] },
  { name: "NAPLAN | Year 9",    color: "#818cf8", slug: "naplan-year-9",    subjects: ["Reading", "Writing", "Language", "Numeracy"] },
];

const daysLeft     = 22;
const trialPercent = Math.round(((30 - daysLeft) / 30) * 100);

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const firstName = user.firstName ?? "there";
  const email = user.emailAddresses[0]?.emailAddress ?? "";
  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-xl z-50 border-b border-foreground/10 px-6 lg:px-12 h-20 flex items-center justify-between">
        <a href="/">
          <img src="/logo.png" alt="TestPanda" className="h-16 w-auto" />
        </a>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium">{user.fullName}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)" }}>
            {initials}
          </div>
          <a href="/sign-out" className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </a>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10">

        {/* Welcome + trial card */}
        <div className="p-6 lg:p-8 mb-8 border border-foreground/10 bg-card" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ffffff 60%)" }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">Dashboard</p>
              <h1 className="text-2xl lg:text-3xl font-display mb-1">Welcome back, {firstName}!</h1>
              <p className="text-muted-foreground text-sm">Your free trial is active — explore all demo papers below.</p>
            </div>

            <div className="lg:min-w-[300px] bg-white/80 border border-foreground/10 rounded-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="w-4 h-4 text-[#a78bfa]" />
                  Free Trial
                </div>
                <span className="text-sm font-mono font-medium" style={{ color: "#a78bfa" }}>{daysLeft} days left</span>
              </div>
              <div className="h-2 bg-foreground/8 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${trialPercent}%`, background: "linear-gradient(90deg, #a78bfa, #f472b6)" }}
                />
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-sm hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)" }}
              >
                Upgrade Now <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Courses Available", value: "6", color: "#a78bfa" },
            { label: "Practice Papers",   value: "500+", color: "#f472b6" },
            { label: "Days Remaining",    value: `${daysLeft}`, color: "#34d399" },
            { label: "Active Plan",       value: "Trial", color: "#60a5fa" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 border border-foreground/10 bg-card">
              <div className="text-2xl font-display mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-display">My Courses</h2>
          <span className="text-xs font-mono text-muted-foreground">Demo papers — trial active</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {courses.map((course) => (
            <div
              key={course.slug}
              className="group flex flex-col p-6 border transition-all duration-300 bg-card hover:-translate-y-0.5"
              style={{ borderColor: `${course.color}30`, background: `linear-gradient(135deg, ${course.color}08 0%, white 55%)` }}
            >
              <div className="w-8 h-1 mb-5 rounded-full" style={{ backgroundColor: course.color }} />
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-display text-base">{course.name}</h3>
                </div>
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

              <p className="text-xs text-muted-foreground mb-5">Demo papers available</p>

              <div className="mt-auto">
                <a
                  href={`/dashboard/courses/${course.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                  style={{ color: course.color }}
                >
                  Open Course <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Subscriptions */}
        <h2 className="text-lg font-display mb-4">My Subscriptions</h2>
        <div className="border border-foreground/10 p-10 text-center bg-card">
          <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm mb-5">No active subscriptions yet.</p>
          <a
            href="/#pricing"
            className="inline-flex items-center gap-2 text-sm font-medium text-white px-6 py-3 hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
          >
            View Plans <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </main>
    </div>
  );
}
