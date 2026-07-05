"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, Chart, inr } from "./Calculator";

// One-time investment compounding annually at the expected rate.
function computeLumpsum({ amount, years, rate }) {
  const yearly = [];
  for (let y = 1; y <= years; y++) {
    const balance = amount * Math.pow(1 + rate / 100, y);
    yearly.push({
      year: y,
      balance,
      invested: amount,
      interest: balance - amount,
    });
  }
  const futureValue = yearly.length
    ? yearly[yearly.length - 1].balance
    : amount;
  return { futureValue, gains: futureValue - amount, yearly };
}

export default function LumpsumCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const result = useMemo(
    () => computeLumpsum({ amount, years, rate }),
    [amount, years, rate]
  );

  const maxBalance = result.futureValue || 1;
  const multiplier = amount ? result.futureValue / amount : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Your lumpsum investment
          </h2>

          <div className="mt-6 space-y-6">
            <MoneyField
              label="Amount you want to invest"
              value={amount}
              onChange={setAmount}
            />
            <SliderField
              label="Investment period"
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
            A lumpsum investment puts your money to work immediately, letting
            the full amount compound from day one.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            Future value after {years} {years === 1 ? "year" : "years"}
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.futureValue))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label="Amount invested"
              value={inr.format(Math.round(amount))}
              dot="bg-navy-600"
            />
            <Stat
              label="Est. returns"
              value={inr.format(Math.round(result.gains))}
              dot="bg-gold-500"
            />
            <Stat
              label="Wealth multiplier"
              value={`${multiplier.toFixed(2)}×`}
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
                <span className="h-2.5 w-2.5 rounded-sm bg-gold-500" /> Returns
              </span>
            </div>
          </div>
          <Chart yearly={result.yearly} maxBalance={maxBalance} years={years} />
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          For illustration only and assumes a constant rate of return. Actual
          returns vary and are subject to market risk.
        </p>
      </div>
    </div>
  );
}
