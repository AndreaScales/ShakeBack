import { NavLink, useLocation } from "react-router-dom";
import { FileText, Target, Briefcase, MessageSquare, LayoutDashboard, Zap } from "lucide-react";
import HealthScore from "./HealthScore";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume Analysis", icon: FileText },
  { to: "/strategy", label: "Career Strategy", icon: Target },
  { to: "/match", label: "Job Match", icon: Zap },
  { to: "/interview", label: "Interview Coach", icon: MessageSquare },
  { to: "/tracker", label: "Applications", icon: Briefcase },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex w-[280px] border-r border-border bg-card flex-col p-6 gap-8 shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-foreground tracking-tight">ShakeBack</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                active
                  ? "bg-secondary text-foreground pulse-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-3 pt-6 border-t border-border">
        <span className="label-uppercase">Health Score</span>
        <HealthScore score={78} size="sm" />
      </div>
    </aside>
  );
};

export default AppSidebar;
