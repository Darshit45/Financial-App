"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, Chart, inr } from "./Calculator";

// Discounts a future target back to the one-time investment needed today.
function computeTarget({ target, years, rate }) {
  const required = target / Math.pow(1 + rate / 100, years);
  const yearly = [];
  for (let y = 1; y <= years; y++) {
    const balance = required * Math.pow(1 + rate / 100, y);
    yearly.push({
      year: y,
      balance,
      invested: required,
      interest: balance - required,
    });
  }
  return { required, growth: target - required, yearly };
}

export default function LumpsumTargetCalculator() {
  const [target, setTarget] = useState(10000000); // ₹1 Cr goal
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const result = useMemo(
    () => computeTarget({ target, years, rate }),
    [target, years, rate]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Your target
          </h2>

          <div className="mt-6 space-y-6">
            <MoneyField
              label="Amount you want to reach"
              value={target}
              onChange={setTarget}
            />
            <SliderField
              label="Years until you need it"
              value={years}
              onChange={setYears}
              min={1}
              max={40}
              step={1}
              suffix=" yrs"
            />
            <SliderField
              label="Expected return rate"
              value={rate}
              onChange={setRate}
              min={1}
              max={20}
              step={0.5}
              suffix="% p.a."
            />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-navy-700/60">
            Tells you the one-time investment needed today so compounding
            alone carries you to your target amount.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            Invest this much today
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.required))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label="Target amount"
              value={inr.format(Math.round(target))}
              dot="bg-cream/60"
            />
            <Stat
              label="Growth earned"
              value={inr.format(Math.round(result.growth))}
              dot="bg-gold-500"
            />
            <Stat
              label="Time to goal"
              value={`${years} ${years === 1 ? "yr" : "yrs"}`}
              dot="bg-navy-600"
            />
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-navy-900">
              Journey to your target
            </h3>
            <div className="flex items-center gap-4 text-xs text-navy-700/80">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-navy-700" /> Invested
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-gold-500" /> Growth
              </span>
            </div>
          </div>
          <Chart yearly={result.yearly} maxBalance={target || 1} years={years} />
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          For illustration only and assumes a constant rate of return. Actual
          returns vary and are subject to market risk.
        </p>
      </div>
    </div>
  );
}
