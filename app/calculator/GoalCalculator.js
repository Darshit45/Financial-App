"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, Chart, inr } from "./Calculator";

// Dream-goal planner: inflate today's cost to the target date, net off what
// current savings will grow to, then find the monthly SIP for the rest.
function computeGoal({ target, years, inflation, rate, savings }) {
  const months = years * 12;
  const adjTarget = target * Math.pow(1 + inflation / 100, years);
  const grownSavings = savings * Math.pow(1 + rate / 100, years);
  const netTarget = Math.max(0, adjTarget - grownSavings);

  const i = rate / 100 / 12;
  const factor = (Math.pow(1 + i, months) - 1) / i;
  const monthly = netTarget > 0 ? netTarget / (factor * (1 + i)) : 0;

  const invested = monthly * months;
  const growth = netTarget - invested;

  const yearly = [];
  let balance = savings;
  let investedSoFar = 0;
  for (let m = 1; m <= months; m++) {
    balance += monthly;
    investedSoFar += monthly;
    balance *= 1 + i;
    if (m % 12 === 0) {
      yearly.push({
        year: m / 12,
        balance,
        invested: savings + investedSoFar,
        interest: balance - savings - investedSoFar,
      });
    }
  }

  return { adjTarget, grownSavings, netTarget, monthly, invested, growth, yearly };
}

function Row({ label, value, accent, strong }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
      <span className="text-navy-700/70">{label}</span>
      <span
        className={`text-right font-semibold ${
          accent
            ? "text-gold-700"
            : strong
              ? "font-serif text-base text-navy-900"
              : "text-navy-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function GoalCalculator() {
  const [target, setTarget] = useState(5000000); // ₹50 lakh dream today
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);
  const [rate, setRate] = useState(12);
  const [savings, setSavings] = useState(500000);

  const result = useMemo(
    () => computeGoal({ target, years, inflation, rate, savings }),
    [target, years, inflation, rate, savings]
  );

  const maxBalance = result.yearly.length
    ? result.yearly[result.yearly.length - 1].balance
    : 1;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Your dream goal
          </h2>

          <div className="mt-6 space-y-6">
            <MoneyField
              label="Cost of your dream today (car, home, holiday…)"
              value={target}
              onChange={setTarget}
            />
            <SliderField
              label="Years until you need it"
              value={years}
              onChange={setYears}
              min={1}
              max={30}
              step={1}
              suffix=" yrs"
            />
            <SliderField
              label="Expected inflation"
              value={inflation}
              onChange={setInflation}
              min={2}
              max={12}
              step={0.5}
              suffix="% p.a."
            />
            <SliderField
              label="Expected return on investments"
              value={rate}
              onChange={setRate}
              min={4}
              max={20}
              step={0.5}
              suffix="% p.a."
            />
            <MoneyField
              label="Savings you have now"
              value={savings}
              onChange={setSavings}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            Monthly savings required for {years} {years === 1 ? "year" : "years"}
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.monthly))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label="Dream cost at target date"
              value={inr.format(Math.round(result.adjTarget))}
              dot="bg-cream/60"
            />
            <Stat
              label="Total invested"
              value={inr.format(Math.round(result.invested))}
              dot="bg-navy-600"
            />
            <Stat
              label="Growth earned"
              value={inr.format(Math.round(Math.max(0, result.growth)))}
              dot="bg-gold-500"
            />
          </div>
        </div>

        {/* Breakdown */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h3 className="font-serif text-lg font-semibold text-navy-900">
            How we got there
          </h3>
          <div className="mt-4 rounded-xl border border-navy-900/10 bg-cream/50 p-5">
            <Row
              label={`Dream amount (inflation adjusted at ${inflation}%)`}
              value={inr.format(Math.round(result.adjTarget))}
              strong
            />
            <Row
              label={`Growth of your current savings (${rate}% p.a.)`}
              value={`− ${inr.format(Math.round(result.grownSavings))}`}
              accent
            />
            <div className="my-3 border-t border-navy-900/10" />
            <Row
              label="Amount your monthly savings must build"
              value={inr.format(Math.round(result.netTarget))}
              strong
            />
            <Row label="Years to achieve your goal" value={`${years} yrs`} />
            <Row
              label="Monthly savings required"
              value={inr.format(Math.round(result.monthly))}
              strong
            />
          </div>
          {result.netTarget === 0 && (
            <p className="mt-4 text-sm font-medium text-gold-700">
              Great news — your current savings alone are projected to meet
              this goal.
            </p>
          )}
        </div>

        {/* Chart */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-navy-900">
              Progress towards your goal
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
          <Chart yearly={result.yearly} maxBalance={maxBalance} years={years} />
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          For illustration only and assumes constant inflation and returns.
          Actual outcomes vary with markets.
        </p>
      </div>
    </div>
  );
}
