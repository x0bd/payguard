import { useState } from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiChevronLeft,
  FiChevronRight,
  FiList,
  FiShield,
  FiUser,
} from "react-icons/fi";

export type View = "dashboard" | "alerts" | "transactions" | "accounts";

const NAV: { id: View; label: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "dashboard",    label: "Dashboard",     Icon: FiActivity },
  { id: "alerts",       label: "Alerts",        Icon: FiAlertTriangle },
  { id: "transactions", label: "Transactions",   Icon: FiList },
  { id: "accounts",     label: "Accounts",       Icon: FiUser },
];

type Props = { activeView: View; onNavigate: (v: View) => void; openAlerts?: number };

export default function Sidebar({ activeView, onNavigate, openAlerts = 0 }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const W = collapsed ? 52 : 208;

  return (
    <aside
      className="relative flex shrink-0 flex-col border-r border-border bg-card"
      style={{ width: W, transition: "width 180ms ease" }}
    >
      {/* Brand */}
      <div className="flex h-12 items-center gap-2.5 border-b border-border px-3.5">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary">
          <FiShield size={12} className="text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="mono truncate text-[11px] font-semibold tracking-[0.2em] text-foreground/80 uppercase">
            PayGuard
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-0.5 p-2 pt-2.5">
        {NAV.map(({ id, label, Icon }) => {
          const active = activeView === id;
          const badge = id === "alerts" && openAlerts > 0;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              title={collapsed ? label : undefined}
              className={[
                "group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-100",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              ].join(" ")}
            >
              <Icon
                size={15}
                className={active ? "text-primary shrink-0" : "shrink-0 transition-colors group-hover:text-foreground"}
              />
              {!collapsed && (
                <span className="mono truncate text-[11px] tracking-widest uppercase leading-none">
                  {label}
                </span>
              )}
              {badge && !collapsed && (
                <span className="mono ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-primary-foreground leading-none">
                  {openAlerts}
                </span>
              )}
              {badge && collapsed && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border p-2">
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
        >
          {collapsed
            ? <FiChevronRight size={14} />
            : <FiChevronLeft size={14} />
          }
        </button>
      </div>
    </aside>
  );
}
