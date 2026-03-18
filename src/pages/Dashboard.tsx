import { motion } from "framer-motion";
import HealthScore from "@/components/HealthScore";
import { Briefcase, FileText, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };

const roadmap = [
  { week: 1, focus: "Resume improvements + networking outreach", done: true },
  { week: 2, focus: "Apply to 10 roles + interview preparation", done: false },
  { week: 3, focus: "Portfolio improvement + skill development", done: false },
  { week: 4, focus: "Follow-ups + interview practice", done: false },
];

const recentApps = [
  { company: "Stripe", role: "Product Analyst", status: "Interviewing" as const },
  { company: "Vercel", role: "Data Analyst", status: "Applied" as const },
  { company: "Linear", role: "Product Manager", status: "Applied" as const },
];

const statusColor = (s: string) => {
  if (s === "Offer") return "text-success";
  if (s === "Rejected") return "text-rose";
  return "text-muted-foreground";
};

const Dashboard = () => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
    <header className="mb-12">
      <h1 className="text-4xl font-serif text-foreground">Good morning, Alex.</h1>
      <p className="text-muted-foreground mt-2">You are 4 applications away from your weekly goal.</p>
    </header>

    <div className="grid lg:grid-cols-[1fr_280px] gap-8">
      {/* Left column */}
      <div className="space-y-8">
        {/* Quick actions */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { to: "/resume", label: "Analyze Resume", icon: FileText },
            { to: "/match", label: "Match a Job", icon: Target },
            { to: "/tracker", label: "Track Application", icon: Briefcase },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group"
            >
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-foreground">{label}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* 30-Day Roadmap */}
        <section>
          <h2 className="label-uppercase mb-4">30-Day Roadmap</h2>
          <div className="space-y-0">
            {roadmap.map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full border-2 mt-1 ${item.done ? "bg-success border-success" : "bg-card border-border"}`} />
                  {i < roadmap.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-6">
                  <span className="text-xs font-semibold text-muted-foreground">Week {item.week}</span>
                  <p className="text-sm text-foreground mt-0.5">{item.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Applications */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="label-uppercase">Recent Applications</h2>
            <Link to="/tracker" className="text-xs text-primary font-medium hover:underline">View all</Link>
          </div>
          <div className="border border-border rounded-xl overflow-hidden bg-card">
            {recentApps.map((app, i) => (
              <div key={i} className={`flex items-center justify-between px-4 py-3 ${i < recentApps.length - 1 ? "border-b border-border" : ""}`}>
                <div>
                  <p className="text-sm font-medium text-foreground">{app.company}</p>
                  <p className="text-xs text-muted-foreground">{app.role}</p>
                </div>
                <span className={`text-xs font-medium tabular-nums ${statusColor(app.status)}`}>{app.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right column — Health Score */}
      <div className="flex flex-col items-center gap-4">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={spring}>
          <HealthScore score={78} size="lg" />
        </motion.div>
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Your career readiness is <span className="font-medium text-foreground">above average</span>.</p>
          <Link to="/resume" className="text-xs text-primary font-medium hover:underline">Improve your score →</Link>
        </div>
      </div>
    </div>
  </motion.div>
);

export default Dashboard;
