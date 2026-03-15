import { useEffect, useRef } from "react";
import gsap from "gsap";

const quickStats = [
  { label: "Transactions Monitored", value: "12,841" },
  { label: "Fraud Alerts Today", value: "37" },
  { label: "Model Uptime", value: "99.98%" },
];

const watchList = [
  { wallet: "ZW-EC-3382", event: "Amount spike", risk: "0.92" },
  { wallet: "ZW-EC-1046", event: "New device fingerprint", risk: "0.81" },
  { wallet: "ZW-EC-7809", event: "Velocity burst", risk: "0.76" },
];

function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".js-hero", { opacity: 0, y: 28, duration: 0.7 })
        .from(".js-stat", { opacity: 0, y: 20, duration: 0.55, stagger: 0.08 }, "-=0.35")
        .from(".js-panel", { opacity: 0, y: 24, duration: 0.65, stagger: 0.1 }, "-=0.3");
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="premium-shell relative min-h-screen overflow-hidden text-zinc-100">
      <div className="noise-layer pointer-events-none absolute inset-0" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 md:px-10 md:py-12">
        <header className="premium-panel js-hero glow-line rounded-3xl p-7 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="mono text-xs uppercase tracking-[0.22em] text-zinc-300">
              PayGuard
            </p>
            <p className="mono inline-flex items-center rounded-full border border-emerald-300/45 bg-emerald-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-emerald-200">
              Green Accent Edition
            </p>
          </div>

          <h1 className="display-title mt-6 text-4xl leading-tight md:text-6xl">
            Hello, PayGuard
            <span className="mt-2 block text-zinc-300">
              Premium fraud monitoring for mobile money
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm text-zinc-300 md:text-base">
            A cleaner command center for real-time fraud scoring. Black and white foundation,
            confidence-first hierarchy, and sharp green highlights for action states.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:bg-white">
              Open Console
            </button>
            <button className="rounded-xl border border-zinc-500/60 bg-black px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:-translate-y-0.5 hover:border-emerald-300/70 hover:text-emerald-100">
              Run Sample Score
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {quickStats.map((item) => (
            <article key={item.label} className="premium-panel js-stat rounded-2xl p-5">
              <p className="mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                {item.label}
              </p>
              <p className="display-title mt-3 text-3xl text-zinc-50">{item.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
          <article className="premium-panel js-panel rounded-3xl p-6">
            <h2 className="display-title text-2xl text-zinc-100">Watchlist</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Transactions currently above risk threshold.
            </p>

            <div className="mt-6 space-y-3">
              {watchList.map((item) => (
                <div
                  key={item.wallet}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="mono text-xs uppercase tracking-[0.14em] text-zinc-400">
                        {item.wallet}
                      </p>
                      <p className="mt-1 text-sm font-medium text-zinc-100">{item.event}</p>
                    </div>
                    <span className="mono rounded-full border border-emerald-300/40 bg-emerald-300/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-emerald-200">
                      risk {item.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="premium-panel js-panel rounded-3xl p-6">
            <h2 className="display-title text-2xl text-zinc-100">System Posture</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Current reliability and response readiness.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-zinc-700 bg-zinc-950/70 p-4">
                <p className="mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                  Model Confidence
                </p>
                <p className="display-title mt-2 text-3xl text-zinc-50">94.2%</p>
              </div>

              <div className="rounded-xl border border-zinc-700 bg-zinc-950/70 p-4">
                <p className="mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                  Last Alert
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-100">
                  16s ago - Lusaka gateway
                </p>
              </div>

              <div className="rounded-xl border border-zinc-700 bg-zinc-950/70 p-4">
                <p className="mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
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
