"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, Chart, inr } from "./Calculator";

// Projects today's cost forward at the inflation rate, and shows what a
// rupee today will be worth at the same horizon.
function computeInflation({ cost, inflation, years }) {
  const futureCost = cost * Math.pow(1 + inflation / 100, years);
  const purchasingPower = cost / Math.pow(1 + inflation / 100, years);
  const yearly = [];
  for (let y = 1; y <= years; y++) {
    const balance = cost * Math.pow(1 + inflation / 100, y);
    yearly.push({
      year: y,
      balance,
      invested: cost,
      interest: balance - cost,
    });
  }
  return { futureCost, purchasingPower, added: futureCost - cost, yearly };
}

export default function InflationCalculator() {
  const [cost, setCost] = useState(100000); // ₹1 lakh today
  const [inflation, setInflation] = useState(6);
  const [years, setYears] = useState(20);

  const result = useMemo(
    () => computeInflation({ cost, inflation, years }),
    [cost, inflation, years]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Cost today
          </h2>

          <div className="mt-6 space-y-6">
            <MoneyField label="Current cost" value={cost} onChange={setCost} />
            <SliderField
              label="Expected inflation"
              value={inflation}
              onChange={setInflation}
              min={1}
              max={15}
              step={0.5}
              suffix="% p.a."
            />
            <SliderField
              label="Number of years"
              value={years}
              onChange={setYears}
              min={1}
              max={40}
              step={1}
              suffix=" yrs"
            />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-navy-700/60">
            Inflation quietly raises the price of everything — this shows what
            today&apos;s expense will cost in the future, and why investing
            needs to outpace it.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            Future cost after {years} {years === 1 ? "year" : "years"} at{" "}
            {inflation}% inflation
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.futureCost))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label="Cost today"
              value={inr.format(Math.round(cost))}
              dot="bg-navy-600"
            />
            <Stat
              label="Added by inflation"
              value={inr.format(Math.round(result.added))}
              dot="bg-gold-500"
            />
            <Stat
              label={`${inr.format(cost)} then buys`}
              value={inr.format(Math.round(result.purchasingPower))}
              dot="bg-cream/60"
            />
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-navy-900">
              Cost rising year by year
            </h3>
            <div className="flex items-center gap-4 text-xs text-navy-700/80">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-navy-700" /> Today&apos;s
                cost
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-gold-500" /> Inflation
              </span>
            </div>
          </div>
          <Chart
            yearly={result.yearly}
            maxBalance={result.futureCost || 1}
            years={years}
          />
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          Assumes a constant inflation rate. Actual inflation varies year to
          year and by spending category.
        </p>
      </div>
    </div>
  );
}
