import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Target, Zap, MessageSquare, Briefcase } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/strategy", label: "Plan", icon: Target },
  { to: "/match", label: "Match", icon: Zap },
  { to: "/interview", label: "Coach", icon: MessageSquare },
  { to: "/tracker", label: "Track", icon: Briefcase },
];

const MobileNav = () => {
  const { pathname } = useLocation();

  return (
    <header className="lg:hidden sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <nav className="overflow-x-auto px-3">
        <ul className="flex items-center gap-2 py-2 min-w-max">
          {links.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default MobileNav;
