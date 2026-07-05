"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, Chart, inr } from "./Calculator";

// PPF: fixed yearly deposit at the start of each financial year,
// interest compounded annually. Tenure is 15 years, extendable.
function computePpf({ yearly, rate, years }) {
  let balance = 0;
  let invested = 0;
  const rows = [];

  for (let y = 1; y <= years; y++) {
    balance += yearly;
    invested += yearly;
    balance *= 1 + rate / 100;
    rows.push({
      year: y,
      balance,
      invested,
      interest: balance - invested,
    });
  }

  return {
    maturity: balance,
    invested,
    interest: balance - invested,
    yearly: rows,
  };
}

export default function PpfCalculator() {
  const [yearlyAmt, setYearlyAmt] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const result = useMemo(
    () => computePpf({ yearly: yearlyAmt, rate, years }),
    [yearlyAmt, rate, years]
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
            Your PPF details
          </h2>

          <div className="mt-6 space-y-6">
            <MoneyField
              label="Yearly investment"
              value={yearlyAmt}
              onChange={setYearlyAmt}
            />
            <SliderField
              label="Interest rate"
              value={rate}
              onChange={setRate}
              min={4}
              max={12}
              step={0.1}
              suffix="% p.a."
            />
            <SliderField
              label="Duration"
              value={years}
              onChange={setYears}
              min={15}
              max={30}
              step={1}
              suffix=" yrs"
            />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-navy-700/60">
            PPF runs for 15 years and can be extended in 5-year blocks.
            Deposits up to ₹1.5 lakh a year qualify for Section 80C, and the
            interest is tax-free.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            PPF maturity value after {years} years
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.maturity))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label="Total invested"
              value={inr.format(Math.round(result.invested))}
              dot="bg-navy-600"
            />
            <Stat
              label="Interest earned"
              value={inr.format(Math.round(result.interest))}
              dot="bg-gold-500"
            />
            <Stat
              label="Maturity value"
              value={inr.format(Math.round(result.maturity))}
              dot="bg-cream/60"
            />
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-navy-900">
              Growth over time
            </h3>
            <div className="flex items-center gap-4 text-xs text-navy-700/80">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-navy-700" /> Invested
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-gold-500" /> Interest
              </span>
            </div>
          </div>
          <Chart yearly={result.yearly} maxBalance={maxBalance} years={years} />
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          Assumes the current PPF rate stays constant; the government revises
          it quarterly. Deposits are capped at ₹1.5 lakh per financial year.
        </p>
      </div>
    </div>
  );
}
