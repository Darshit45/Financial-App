"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, Chart, inr } from "./Calculator";

function computeRetirement({ target, age, retireAge, inflation, rate, savings }) {
  const years = Math.max(1, retireAge - age);
  const months = years * 12;

  // Corpus needed at retirement, adjusting today's target for inflation.
  const adjTarget = target * Math.pow(1 + inflation / 100, years);
  // What current savings grow to by retirement.
  const grownSavings = savings * Math.pow(1 + rate / 100, years);
  // What the monthly investments still need to build.
  const netTarget = Math.max(0, adjTarget - grownSavings);

  const i = rate / 100 / 12;
  const factor = (Math.pow(1 + i, months) - 1) / i;
  // Contributions at the start of each month (annuity due).
  const monthly = netTarget > 0 ? netTarget / (factor * (1 + i)) : 0;

  const invested = monthly * months;
  const growth = netTarget - invested;

  // Year-by-year projection of the full corpus (savings + monthly investing).
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

  return { years, adjTarget, grownSavings, netTarget, monthly, invested, growth, yearly };
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

export default function RetirementCalculator() {
  const [target, setTarget] = useState(20000000); // ₹2 Cr in today's money
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [inflation, setInflation] = useState(6);
  const [rate, setRate] = useState(12);
  const [savings, setSavings] = useState(1000000);

  const result = useMemo(
    () => computeRetirement({ target, age, retireAge, inflation, rate, savings }),
    [target, age, retireAge, inflation, rate, savings]
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
            Your retirement plan
          </h2>

          <div className="mt-6 space-y-6">
            <MoneyField
              label="Retirement amount in today's money"
              value={target}
              onChange={setTarget}
            />
            <SliderField
              label="Your age today"
              value={age}
              onChange={setAge}
              min={18}
              max={70}
              step={1}
              suffix=" yrs"
            />
            <SliderField
              label="Age you plan to retire"
              value={retireAge}
              onChange={setRetireAge}
              min={40}
              max={75}
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
              label="Your current savings"
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
            Monthly savings required for {result.years}{" "}
            {result.years === 1 ? "year" : "years"}
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.monthly))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label="Corpus at retirement"
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
              label={`Retirement amount (inflation adjusted at ${inflation}%)`}
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
            <Row label="Years you need to save" value={`${result.years} yrs`} />
            <Row
              label="Monthly savings required"
              value={inr.format(Math.round(result.monthly))}
              strong
            />
          </div>
          {result.netTarget === 0 && (
            <p className="mt-4 text-sm font-medium text-gold-700">
              Great news — your current savings alone are projected to meet this
              goal.
            </p>
          )}
        </div>

        {/* Chart */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-navy-900">
              Corpus growth to retirement
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
          <Chart
            yearly={result.yearly}
            maxBalance={maxBalance}
            years={result.years}
          />
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          For illustration only and assumes constant inflation and returns.
          Actual outcomes vary with markets — talk to us for a personalised
          retirement roadmap.
        </p>
      </div>
    </div>
  );
}
