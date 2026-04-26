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

const NAV_ITEMS: { id: View; label: string; icon: React.ComponentType<{ className?: string }> }[] =
  [
    { id: "dashboard", label: "Dashboard", icon: FiActivity },
    { id: "alerts", label: "Alerts", icon: FiAlertTriangle },
    { id: "transactions", label: "Transactions", icon: FiList },
    { id: "accounts", label: "Accounts", icon: FiUser },
  ];

type Props = {
  activeView: View;
  onNavigate: (view: View) => void;
  openAlerts?: number;
};

export default function Sidebar({ activeView, onNavigate, openAlerts }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="relative flex flex-shrink-0 flex-col border-r border-border/70 bg-[var(--sidebar)] transition-all duration-200"
      style={{ width: collapsed ? 56 : 220 }}
    >
      {/* Brand */}
      <div className="flex h-14 items-center gap-2.5 border-b border-border/70 px-3.5">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
          <FiShield className="text-[13px] text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="mono truncate text-[11px] font-semibold tracking-[0.18em] text-foreground/90 uppercase">
            PayGuard
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 p-2 pt-3">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeView === id;
          const showBadge = id === "alerts" && (openAlerts ?? 0) > 0;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={[
                "group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors",
                active
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              ].join(" ")}
            >
              <Icon
                className={[
                  "flex-shrink-0 text-base transition-colors",
                  active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                ].join(" ")}
              />
              {!collapsed && (
                <span className="mono truncate text-[11px] tracking-[0.12em] uppercase">
                  {label}
                </span>
              )}
              {showBadge && !collapsed && (
                <span className="mono ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-primary-foreground">
                  {openAlerts}
                </span>
              )}
              {showBadge && collapsed && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border/70 p-2">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex w-full items-center justify-center rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <FiChevronRight className="text-base" />
          ) : (
            <FiChevronLeft className="text-base" />
          )}
        </button>
      </div>
    </aside>
  );
}
