const quickStats = [
  { label: "Transactions Monitored", value: "12,841" },
  { label: "Fraud Alerts Today", value: "37" },
  { label: "Average Risk Score", value: "0.18" },
];

const watchList = [
  { wallet: "ZW-EC-3382", event: "Amount spike", risk: "0.92" },
  { wallet: "ZW-EC-1046", event: "Device switch", risk: "0.81" },
  { wallet: "ZW-EC-7809", event: "Rapid burst", risk: "0.76" },
];

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="mesh-overlay pointer-events-none absolute inset-0 opacity-80" />
      <div className="orb pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="orb pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl [animation-delay:2s]" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:px-10 md:py-14">
        <header className="glass-panel space-y-5 rounded-3xl p-7 md:p-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
            Live Detection Interface
          </p>
          <h1 className="display-title text-4xl leading-tight text-balance md:text-6xl">
            Hello, PayGuard
            <span className="block text-emerald-300">
              Mobile-money fraud defense in motion
            </span>
          </h1>
          <p className="max-w-3xl text-sm text-slate-200/80 md:text-base">
            Real-time risk scoring for mobile payments. Track suspicious
            behavior, monitor alert trends, and protect customer wallets before
            fraudulent activity escalates.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-emerald-200/60 bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-emerald-200">
              Open Fraud Console
            </button>
            <button className="rounded-xl border border-slate-200/20 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-200/50 hover:text-cyan-100">
              Score Sample Transaction
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {quickStats.map((item) => (
            <article
              key={item.label}
              className="glass-panel rounded-2xl p-5 transition hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300/80">
                {item.label}
              </p>
              <p className="display-title mt-3 text-3xl text-slate-50">
                {item.value}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.15fr,0.85fr]">
          <article className="glass-panel rounded-3xl p-6">
            <h2 className="display-title text-2xl text-slate-50">
              High-Risk Watchlist
            </h2>
            <p className="mt-2 text-sm text-slate-300/80">
              Live transactions with elevated fraud probability.
            </p>
            <div className="mt-6 space-y-3">
              {watchList.map((item) => (
                <div
                  key={item.wallet}
                  className="flex items-center justify-between rounded-xl border border-slate-200/10 bg-slate-900/60 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      {item.wallet}
                    </p>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-300/80">
                      {item.event}
                    </p>
                  </div>
                  <span className="rounded-full border border-rose-300/60 bg-rose-400/15 px-3 py-1 text-xs font-semibold text-rose-100">
                    Risk {item.risk}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <aside className="glass-panel rounded-3xl p-6">
            <h2 className="display-title text-2xl text-slate-50">
              System Pulse
            </h2>
            <p className="mt-2 text-sm text-slate-300/80">
              Current readiness and model reliability snapshot.
            </p>
            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-cyan-200/30 bg-cyan-300/10 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-100/80">
                  Model Confidence
                </p>
                <p className="display-title mt-2 text-3xl text-cyan-100">
                  94.2%
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-300/80">
                  Last Detection
                </p>
                <p className="mt-2 text-sm font-medium text-slate-100">
                  16 seconds ago · Lusaka Gateway
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-300/80">
                  API Status
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-200">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
                  Healthy
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
