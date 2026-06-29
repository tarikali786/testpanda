import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Clock, ArrowRight, LogOut } from "lucide-react";
import { getAdminClient } from "@/lib/supabase/admin";
import { getUser, createUser, getTrial, createTrial, getTrialDaysLeft, getUserSubscriptions } from "@/lib/supabase/db";
import { PaymentSuccessBanner } from "@/components/dashboard/payment-success-banner";
import { CourseTabs } from "@/components/dashboard/course-tabs";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const firstName = user.firstName ?? "there";
  const email = user.emailAddresses[0]?.emailAddress ?? "";
  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U";

  // Auto-create user + trial in Supabase on first login
  const supabase = getAdminClient();
  let dbUser = await getUser(supabase, user.id);
  if (!dbUser) {
    await createUser(supabase, {
      id: user.id,
      email,
      name: user.fullName ?? firstName,
      photo_url: user.imageUrl ?? "",
      is_verified: true,
    });
  }
  let trial = await getTrial(supabase, user.id);
  if (!trial) {
    await createTrial(supabase, user.id);
    trial = await getTrial(supabase, user.id);
  }

  const daysLeft = trial ? getTrialDaysLeft(trial) : 0;
  const trialPercent = Math.round(((30 - daysLeft) / 30) * 100);
  const trialActive = daysLeft > 0;

  // Fetch purchased courses
  const subscriptions = await getUserSubscriptions(supabase, user.id);
  const purchasedSlugs = subscriptions.map((s) => s.course_id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-xl z-50 border-b border-foreground/10 px-6 lg:px-12 h-20 flex items-center justify-between">
        <a href="/">
          <img src="/logo.png" alt="TestPanda" className="h-auto w-40" />
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

        <PaymentSuccessBanner />

        {/* Welcome + trial card */}
        <div className="p-6 lg:p-8 mb-8 border border-foreground/10 bg-card" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ffffff 60%)" }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">Dashboard</p>
              <h1 className="text-2xl lg:text-3xl font-display mb-1">Welcome back, {firstName}!</h1>
              <p className="text-muted-foreground text-sm">{trialActive ? "Your free trial is active — explore all demo papers below." : "Your free trial has expired. Upgrade to continue."}</p>
            </div>

            <div className="lg:min-w-[300px] bg-white/80 border border-foreground/10 rounded-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="w-4 h-4 text-[#a78bfa]" />
                  Free Trial
                </div>
                <span className="text-sm font-mono font-medium" style={{ color: trialActive ? "#a78bfa" : "#f472b6" }}>
                  {trialActive ? `${daysLeft} days left` : "Expired"}
                </span>
              </div>
              <div className="h-2 bg-foreground/8 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${trialPercent}%`, background: "linear-gradient(90deg, #a78bfa, #f472b6)" }}
                />
              </div>
              <a
                href="/#pricing"
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
            { label: "Courses Purchased", value: `${purchasedSlugs.length}`, color: "#f472b6" },
            { label: "Days Remaining",    value: trialActive ? `${daysLeft}` : "0", color: "#34d399" },
            { label: "Active Plan",       value: trialActive ? "Trial" : "Expired", color: "#60a5fa" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 border border-foreground/10 bg-card">
              <div className="text-2xl font-display mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Course Tabs */}
        <CourseTabs purchasedSlugs={purchasedSlugs} />
      </main>
    </div>
  );
}
