import { useEffect, useState } from "react";
import Sidebar, { type View } from "@/components/Sidebar";
import DashboardView from "@/views/DashboardView";
import AlertsView from "@/views/AlertsView";
import TransactionsView from "@/views/TransactionsView";
import AccountsView from "@/views/AccountsView";
import { fetchMetrics } from "@/lib/api";

export default function App() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [openAlerts, setOpenAlerts] = useState<number | undefined>(undefined);

  useEffect(() => {
    function poll() {
      fetchMetrics()
        .then((m) => setOpenAlerts(m.open_alerts))
        .catch(() => {});
    }
    poll();
    const t = window.setInterval(poll, 30000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar activeView={activeView} onNavigate={setActiveView} openAlerts={openAlerts} />
      <main className="flex-1 min-w-0 overflow-auto">
        {activeView === "dashboard" && <DashboardView />}
        {activeView === "alerts" && <AlertsView />}
        {activeView === "transactions" && <TransactionsView />}
        {activeView === "accounts" && <AccountsView />}
      </main>
    </div>
  );
}
