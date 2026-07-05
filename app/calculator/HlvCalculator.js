"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, inr } from "./Calculator";

// Income method: the life cover should replace the income your family would
// receive over the coming years, plus clear any outstanding loans.
function computeHlv({ income, growth, loans, years }) {
  let cumulative = 0;
  let current = income;
  const rows = [];
  for (let y = 1; y <= years; y++) {
    cumulative += current;
    rows.push({ year: y, income: current, cumulative });
    current *= 1 + growth / 100;
  }
  return { cumulative, cover: cumulative + loans, rows };
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
      <span className="text-navy-700/70">{label}</span>
      <span
        className={`text-right font-semibold ${
          strong ? "font-serif text-base text-navy-900" : "text-navy-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function HlvCalculator() {
  const [income, setIncome] = useState(1200000); // ₹12 lakh a year
  const [growth, setGrowth] = useState(8);
  const [loans, setLoans] = useState(2000000);
  const [years, setYears] = useState(20);
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo(
    () => computeHlv({ income, growth, loans, years }),
    [income, growth, loans, years]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Your income details
          </h2>

          <div className="mt-6 space-y-6">
            <MoneyField
              label="Current annual income"
              value={income}
              onChange={setIncome}
            />
            <SliderField
              label="Expected increase in income"
              value={growth}
              onChange={setGrowth}
              min={0}
              max={20}
              step={0.5}
              suffix="% p.a."
            />
            <MoneyField
              label="Outstanding loan amount"
              value={loans}
              onChange={setLoans}
            />
            <SliderField
              label="Years your family needs cover"
              value={years}
              onChange={setYears}
              min={1}
              max={40}
              step={1}
              suffix=" yrs"
            />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-navy-700/60">
            Human Life Value (income method) estimates the term-insurance
            cover that would replace your earnings for your family and clear
            your loans.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            Your ideal life cover
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.cover))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label={`Income over ${years} yrs`}
              value={inr.format(Math.round(result.cumulative))}
              dot="bg-navy-600"
            />
            <Stat
              label="Loans to clear"
              value={inr.format(Math.round(loans))}
              dot="bg-gold-500"
            />
            <Stat
              label="Cover ÷ income"
              value={`${(result.cover / (income || 1)).toFixed(1)}×`}
              dot="bg-cream/60"
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
              label="Current annual income"
              value={inr.format(Math.round(income))}
            />
            <Row label="Income growth assumed" value={`${growth}% p.a.`} />
            <Row
              label={`Cumulative income over ${years} years`}
              value={inr.format(Math.round(result.cumulative))}
              strong
            />
            <Row
              label="Outstanding loans"
              value={`+ ${inr.format(Math.round(loans))}`}
            />
            <div className="my-3 border-t border-navy-900/10" />
            <Row
              label="Ideal life cover"
              value={inr.format(Math.round(result.cover))}
              strong
            />
          </div>

          <button
            onClick={() => setShowSchedule((s) => !s)}
            className="mt-4 text-sm font-semibold text-navy-900 hover:text-gold-600"
          >
            {showSchedule ? "Hide" : "Show"} year-by-year income
          </button>
          {showSchedule && (
            <div className="mt-4 overflow-x-auto rounded-xl border border-navy-900/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-navy-900/5 text-navy-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Year</th>
                    <th className="px-4 py-3 font-semibold">Annual income</th>
                    <th className="px-4 py-3 font-semibold">Cumulative</th>
                  </tr>
                </thead>
                <tbody className="text-navy-700/90">
                  {result.rows.map((r) => (
                    <tr key={r.year} className="border-t border-navy-900/5">
                      <td className="px-4 py-3">{r.year}</td>
                      <td className="px-4 py-3">
                        {inr.format(Math.round(r.income))}
                      </td>
                      <td className="px-4 py-3 font-semibold text-navy-900">
                        {inr.format(Math.round(r.cumulative))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          A simple income-replacement estimate — your ideal cover also depends
          on existing assets, insurance and your family&apos;s expenses.
        </p>
      </div>
    </div>
  );
}
