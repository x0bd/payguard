import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const quickStats = [
  { label: "Transactions Monitored", value: "12,841" },
  { label: "Open Alerts", value: "37" },
  { label: "Model Recall", value: "86.97%" },
];

const watchList = [
  { wallet: "ZW-EC-3382", event: "Amount spike", risk: "0.92", state: "critical" },
  { wallet: "ZW-EC-1046", event: "Device shift", risk: "0.81", state: "high" },
  { wallet: "ZW-EC-7809", event: "Velocity burst", risk: "0.76", state: "medium" },
];

function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".js-hero", { opacity: 0, y: 24, duration: 0.65 })
        .from(".js-stat", { opacity: 0, y: 18, duration: 0.45, stagger: 0.08 }, "-=0.25")
        .from(".js-panel", { opacity: 0, y: 18, duration: 0.55, stagger: 0.1 }, "-=0.25");
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="app-shell relative min-h-screen overflow-hidden">
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 md:px-10 md:py-12">
        <header className="js-hero space-y-6 rounded-3xl border border-border/70 bg-card/65 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge
              variant="outline"
              className="mono rounded-full border-border bg-background/70 tracking-[0.2em]"
            >
              PAYGUARD / FRAUD OPS
            </Badge>
            <Badge className="mono rounded-full bg-primary text-primary-foreground tracking-[0.12em]">
              API READY
            </Badge>
          </div>

          <h1 className="vercel-title max-w-4xl text-balance text-4xl leading-[0.98] font-semibold tracking-[-0.04em] text-foreground md:text-6xl">
            Hello, PayGuard
            <span className="mt-1 block text-muted-foreground">
              Minimal surface. Maximum fraud signal.
            </span>
          </h1>

          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            A Vercel-grade control plane for mobile-money risk detection. Clean hierarchy, aggressive
            contrast, and one accent color for fast scanning.
          </p>

          <div className="flex flex-wrap gap-2">
            <Button className="mono rounded-xl bg-primary px-4 text-[11px] tracking-[0.14em] text-primary-foreground uppercase hover:bg-primary/90">
              Open Console
            </Button>
            <Button
              variant="outline"
              className="mono rounded-xl border-border bg-background/70 px-4 text-[11px] tracking-[0.14em] uppercase hover:border-primary/60 hover:text-primary"
            >
              Run Sample Score
            </Button>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          {quickStats.map((item) => (
            <Card key={item.label} className="js-stat relative overflow-hidden rounded-2xl border-border/70 bg-card/60">
              <div className="absolute inset-x-0 top-0 h-px bg-primary/70" />
              <CardHeader>
                <CardDescription className="mono flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase">
                  <span className="inline-block size-1.5 rounded-full bg-primary" />
                  {item.label}
                </CardDescription>
                <CardTitle className="text-3xl leading-none font-semibold tracking-[-0.03em]">
                  {item.value}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="grid gap-3 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="js-panel rounded-2xl border-border/70 bg-card/60">
            <CardHeader>
              <CardDescription className="mono text-[11px] tracking-[0.16em] uppercase">
                Live Watchlist
              </CardDescription>
              <CardTitle className="text-xl tracking-[-0.02em]">High-risk transaction queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-2">
              {watchList.map((item, index) => (
                <div key={item.wallet}>
                  <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2">
                    <div>
                      <p className="mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
                        {item.wallet}
                      </p>
                      <p className="text-sm font-medium text-foreground">{item.event}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        item.state === "critical"
                          ? "rounded-full border-primary/70 bg-primary/10 text-primary"
                          : item.state === "high"
                            ? "rounded-full border-primary/60 bg-primary/8 text-primary"
                            : "rounded-full border-border text-muted-foreground"
                      }
                    >
                      risk {item.risk}
                    </Badge>
                  </div>
                  {index < watchList.length - 1 ? <div className="h-px bg-border/70" /> : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="js-panel rounded-2xl border-border/70 bg-card/60">
            <CardHeader>
              <CardDescription className="mono text-[11px] tracking-[0.16em] uppercase">
                Engineering Notes
              </CardDescription>
              <CardTitle className="text-xl tracking-[-0.02em]">Signal over noise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-2">
              <div className="space-y-1 rounded-xl border border-border bg-background/45 p-3">
                <p className="mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  Detection
                </p>
                <p className="text-sm text-foreground">Random forest model, calibrated for high recall in fraud class.</p>
              </div>
              <div className="space-y-1 rounded-xl border border-border bg-background/45 p-3">
                <p className="mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  Feature Focus
                </p>
                <p className="text-sm text-foreground">
                  Velocity, amount-vs-baseline ratio, device change, and location drift.
                </p>
              </div>
              <div className="space-y-1 rounded-xl border border-primary/40 bg-primary/8 p-3">
                <p className="mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  Runtime
                </p>
                <p className="text-sm text-primary">Model loaded and scoring endpoint healthy.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default App;
