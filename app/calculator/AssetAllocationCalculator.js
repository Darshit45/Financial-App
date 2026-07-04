"use client";

import { useMemo, useState } from "react";

const AGES = [
  { id: "21-30", label: "21–30 yrs", equity: 10 },
  { id: "31-45", label: "31–45 yrs", equity: 5 },
  { id: "46-60", label: "46–60 yrs", equity: -5 },
  { id: "60+", label: "> 60 yrs", equity: -15 },
];

const RISKS = [
  { id: "very-low", label: "Very Low", equity: 20 },
  { id: "low", label: "Low", equity: 35 },
  { id: "medium", label: "Medium", equity: 50 },
  { id: "high", label: "High", equity: 65 },
  { id: "very-high", label: "Very High", equity: 75 },
];

const HORIZONS = [
  { id: "2-5", label: "2–5 yrs", equity: -10 },
  { id: "5-10", label: "5–10 yrs", equity: 0 },
  { id: "10+", label: "> 10 yrs", equity: 10 },
];

const MIDCAPS = [
  { id: "yes", label: "Yes", split: [55, 30, 15] },
  { id: "not-sure", label: "Not sure", split: [70, 20, 10] },
  { id: "no", label: "No, I prefer big companies", split: [85, 15, 0] },
];

function computeAllocation({ age, risk, horizon, midcap }) {
  const equity = Math.min(
    85,
    Math.max(10, risk.equity + age.equity + horizon.equity)
  );
  const rest = 100 - equity;
  const gold = Math.round(rest * 0.2);
  const debt = rest - gold;

  const [largePct, midPct, smallPct] = midcap.split;
  const profile =
    equity >= 65
      ? "Aggressive"
      : equity >= 45
        ? "Moderate"
        : equity >= 30
          ? "Conservative"
          : "Capital protection";

  return {
    equity,
    debt,
    gold,
    profile,
    equitySplit: [
      { label: "Large cap", pct: largePct },
      { label: "Mid cap", pct: midPct },
      { label: "Small cap", pct: smallPct },
    ],
  };
}

// Donut chart drawn with SVG stroke segments.
function Donut({ segments }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" className="h-44 w-44">
      {segments.map((s) => {
        const dash = (s.pct / 100) * c;
        const el = (
          <circle
            key={s.label}
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="18"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 60 60)"
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

function Question({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-sm font-semibold text-navy-900">{label}</p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              value.id === o.id
                ? "bg-navy-900 text-cream"
                : "border border-navy-900/15 text-navy-700/80 hover:border-navy-900/30"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AssetAllocationCalculator() {
  const [age, setAge] = useState(AGES[1]);
  const [risk, setRisk] = useState(RISKS[2]);
  const [horizon, setHorizon] = useState(HORIZONS[1]);
  const [midcap, setMidcap] = useState(MIDCAPS[1]);

  const result = useMemo(
    () => computeAllocation({ age, risk, horizon, midcap }),
    [age, risk, horizon, midcap]
  );

  const segments = [
    { label: "Equity", pct: result.equity, color: "var(--color-navy-700)" },
    { label: "Debt", pct: result.debt, color: "var(--color-gold-500)" },
    { label: "Gold", pct: result.gold, color: "var(--color-gold-300)" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Questions */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Your investor profile
          </h2>

          <div className="mt-6 space-y-6">
            <Question
              label="Your current age"
              options={AGES}
              value={age}
              onChange={setAge}
            />
            <Question
              label="How much risk can you take?"
              options={RISKS}
              value={risk}
              onChange={setRisk}
            />
            <Question
              label="Your investment horizon"
              options={HORIZONS}
              value={horizon}
              onChange={setHorizon}
            />
            <Question
              label="Comfortable with mid & small caps?"
              options={MIDCAPS}
              value={midcap}
              onChange={setMidcap}
            />
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            Suggested asset allocation
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-gold-400 sm:text-4xl">
            {result.profile} investor
          </p>

          <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row">
            <Donut segments={segments} />
            <div className="w-full max-w-xs space-y-3">
              {segments.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.label}
                    </span>
                    <span className="font-semibold">{s.pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equity split */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h3 className="font-serif text-lg font-semibold text-navy-900">
            Within your equity ({result.equity}%)
          </h3>
          <p className="mt-1 text-sm text-navy-700/70">
            How the equity portion could be spread across market caps.
          </p>
          <div className="mt-5 flex h-4 w-full overflow-hidden rounded-full">
            {result.equitySplit.map(
              (s, idx) =>
                s.pct > 0 && (
                  <div
                    key={s.label}
                    className={
                      ["bg-navy-800", "bg-navy-600", "bg-gold-500"][idx]
                    }
                    style={{ width: `${s.pct}%` }}
                  />
                )
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-700/90">
            {result.equitySplit.map((s, idx) => (
              <span key={s.label} className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-sm ${
                    ["bg-navy-800", "bg-navy-600", "bg-gold-500"][idx]
                  }`}
                />
                {s.label}: <strong>{s.pct}%</strong> of equity
              </span>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          Indicative allocation for illustration only, based on your profile
          answers. Speak to us for a plan tailored to your goals, income and
          existing portfolio.
        </p>
      </div>
    </div>
  );
}
