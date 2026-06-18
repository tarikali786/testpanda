import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUser, getTrial, getTrialDaysLeft, getUserSubscriptions } from "@/lib/supabase/db";
import { BookOpen, Clock, ArrowRight, CheckCircle } from "lucide-react";

const courses = [
  { name: "NAPLAN | Year 3",   color: "#a78bfa", slug: "naplan-year-3"    },
  { name: "OC | Year 4",       color: "#f472b6", slug: "oc-year-4"        },
  { name: "NAPLAN | Year 5",   color: "#34d399", slug: "naplan-year-5"    },
  { name: "Selective | Year 6", color: "#60a5fa", slug: "selective-year-6" },
  { name: "NAPLAN | Year 7",   color: "#fbbf24", slug: "naplan-year-7"    },
  { name: "NAPLAN | Year 9",   color: "#818cf8", slug: "naplan-year-9"    },
];

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/auth/signin");
  const authUser = session.user;

  const [user, trial, subscriptions] = await Promise.all([
    getUser(supabase, authUser.id),
    getTrial(supabase, authUser.id),
    getUserSubscriptions(supabase, authUser.id),
  ]);

  if (!user) redirect("/auth/signin");

  const daysLeft      = trial ? getTrialDaysLeft(trial) : 0;
  const trialPercent  = trial ? Math.round(((30 - daysLeft) / 30) * 100) : 100;
  const trialExpired  = daysLeft === 0;
  const firstName     = user.name.split(" ")[0];

  const subscribedCourses = new Set(
    subscriptions
      .filter((s) => new Date(s.valid_until) > new Date())
      .map((s) => s.course_id)
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 left-0 bg-background/95 backdrop-blur-xl z-50 border-b border-foreground/10 py-2 px-6 lg:px-12 h-22 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="TestPanda" className="h-20 w-auto" />
        </a>
        <div className="flex items-center gap-4">
          {user.photo_url && (
            <img src={user.photo_url} alt={user.name} className="w-8 h-8 rounded-full" />
          )}
          <span className="text-sm text-muted-foreground hidden sm:block">{user.name}</span>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
        {/* Trial expired banner */}
        {trialExpired && (
          <div className="bg-[#eca8d6]/10 border border-[#eca8d6]/30 p-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Your free trial has expired.</p>
              <p className="text-sm text-muted-foreground mt-0.5">Subscribe to continue accessing course materials.</p>
            </div>
            <a href="/#pricing" className="inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background px-5 py-2.5 hover:bg-foreground/90 transition-colors whitespace-nowrap">
              View Plans <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Welcome + trial card */}
        <div className="bg-card border border-foreground/10 p-6 lg:p-8 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display mb-1">Welcome back, {firstName}!</h1>
              <p className="text-muted-foreground text-sm">
                {trialExpired
                  ? "Your trial has ended. Subscribe to unlock full access."
                  : "Your free trial is active — explore all demo papers below."}
              </p>
            </div>

            {!trialExpired && (
              <div className="lg:min-w-[280px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#eca8d6]" />
                    <span>Free Trial</span>
                  </div>
                  <span className="text-sm font-mono text-[#eca8d6]">{daysLeft} days left</span>
                </div>
                <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#eca8d6] rounded-full transition-all duration-500" style={{ width: `${trialPercent}%` }} />
                </div>
                <div className="mt-4">
                  <a href="/#pricing" className="inline-flex items-center gap-2 text-sm font-medium border border-foreground/20 px-4 py-2 hover:border-foreground transition-colors">
                    Upgrade Now <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Courses */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-display">My Courses</h2>
          <span className="text-xs font-mono text-muted-foreground">
            {trialExpired ? "Trial expired" : "Demo papers — trial active"}
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {courses.map((course) => {
            const hasSubscription = subscribedCourses.has(course.slug);
            const isLocked        = trialExpired && !hasSubscription;

            return (
              <div
                key={course.slug}
                className={`group flex flex-col p-6 border transition-all duration-300 ${isLocked
                  ? "bg-card border-foreground/5 opacity-60"
                  : "bg-card border-foreground/10 hover:border-foreground/30 hover:-translate-y-0.5"
                }`}
              >
                <div className="w-8 h-1 mb-4" style={{ backgroundColor: course.color }} />
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-display text-lg">{course.name}</h3>
                  </div>
                  {hasSubscription && <CheckCircle className="w-4 h-4 text-[#34d399]" />}
                </div>
                <p className="text-xs text-muted-foreground mb-5">
                  {hasSubscription ? "Full access" : isLocked ? "Subscribe to unlock" : "Demo papers available"}
                </p>
                <div className="mt-auto">
                  {isLocked ? (
                    <a href="/#pricing" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Subscribe <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <a href={`/dashboard/courses/${course.slug}`} className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3" style={{ color: course.color }}>
                      Open Course <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscriptions */}
        <h2 className="text-lg font-display mb-4">My Subscriptions</h2>
        {subscriptions.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {subscriptions.map((sub) => {
              const course = courses.find((c) => c.slug === sub.course_id);
              return (
                <div key={sub.id} className="flex items-center gap-4 p-5 border border-foreground/10 bg-card">
                  <CheckCircle className="w-5 h-5 text-[#34d399] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{course?.name ?? sub.course_id}</p>
                    <p className="text-xs text-muted-foreground">
                      Valid until{" "}
                      {new Date(sub.valid_until).toLocaleDateString("en-AU", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </p>
                  </div>
                  {!sub.drive_access_granted && (
                    <span className="text-xs font-mono text-[#eca8d6]">Drive pending</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-foreground/10 p-8 text-center">
            <p className="text-muted-foreground text-sm mb-4">No active subscriptions yet.</p>
            <a href="/#pricing" className="inline-flex items-center gap-2 text-sm font-medium border border-foreground/20 px-5 py-2.5 hover:border-foreground transition-colors">
              View Plans <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
