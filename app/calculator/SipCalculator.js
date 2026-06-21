"use client";

import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import { MoneyField, SliderField, Stat, Chart, inr } from "./Calculator";

// Plain Indian-grouped number (no currency symbol on the symbol-prefixed cells).
const num = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

// SIP with an annual step-up: the monthly amount increases by `stepUp`% at the
// start of every year. Simulated month by month so growth is accurate.
function computeSip({ monthly, stepUp, rate, years }) {
  const i = rate / 100 / 12;
  const months = Math.round(years * 12);

  let balance = 0;
  let invested = 0;
  const yearly = [];

  for (let m = 1; m <= months; m++) {
    const yearIndex = Math.floor((m - 1) / 12); // 0-based year
    const amount = monthly * Math.pow(1 + stepUp / 100, yearIndex);
    balance += amount; // contribute at the start of the month
    invested += amount;
    balance *= 1 + i; // grow for the month

    if (m % 12 === 0) {
      const yr = m / 12;
      const sipMonthly = monthly * Math.pow(1 + stepUp / 100, yr - 1);
      yearly.push({
        year: yr,
        sipMonthly,
        investedYear: sipMonthly * 12,
        invested,
        balance,
        gains: balance - invested,
      });
    }
  }

  return {
    futureValue: balance,
    totalInvested: invested,
    totalGains: balance - invested,
    yearly,
  };
}

function SumRow({ label, value, accent, strong }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
      <span className="text-navy-700/70">{label}</span>
      <span
        className={`font-semibold ${
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

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [stepUp, setStepUp] = useState(10);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo(
    () => computeSip({ monthly, stepUp, rate, years }),
    [monthly, stepUp, rate, years]
  );

  const chartYearly = result.yearly.map((y) => ({
    year: y.year,
    balance: y.balance,
    interest: y.gains,
  }));
  const maxBalance = result.yearly.length
    ? result.yearly[result.yearly.length - 1].balance
    : 1;
  const lastSip = result.yearly.length
    ? result.yearly[result.yearly.length - 1].sipMonthly
    : monthly;
  const multiplier = result.totalInvested
    ? result.futureValue / result.totalInvested
    : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Your SIP details
          </h2>

          <div className="mt-6 space-y-6">
            <MoneyField
              label="Monthly investment"
              value={monthly}
              onChange={setMonthly}
            />
            <SliderField
              label="Annual step-up"
              value={stepUp}
              onChange={setStepUp}
              min={0}
              max={25}
              step={1}
              suffix="%"
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
            <SliderField
              label="Investment period"
              value={years}
              onChange={setYears}
              min={1}
              max={40}
              step={1}
              suffix=" yrs"
            />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-navy-700/60">
            Step-up raises your monthly SIP by this percentage at the start of
            every year — a simple way to grow investments along with your income.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            Maturity value after {years} {years === 1 ? "year" : "years"}
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.futureValue))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label="Total invested"
              value={inr.format(Math.round(result.totalInvested))}
              dot="bg-navy-600"
            />
            <Stat
              label="Est. returns"
              value={inr.format(Math.round(result.totalGains))}
              dot="bg-gold-500"
            />
            <Stat
              label="Maturity value"
              value={inr.format(Math.round(result.futureValue))}
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
          <Chart yearly={chartYearly} maxBalance={maxBalance} years={years} />
        </div>

        {/* Step-up amount invested summary */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h3 className="font-serif text-lg font-semibold text-navy-900">
            Step-up amount invested summary
          </h3>
          <p className="mt-1 text-sm text-navy-700/70">
            How your monthly SIP steps up and the amount invested grows each
            year.
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-5">
            {/* Quick summary */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-navy-900/10 bg-cream/50 p-5">
                <SumRow label="Starting SIP" value={`₹${num.format(monthly)}/mo`} />
                <SumRow
                  label={`SIP by year ${years}`}
                  value={`₹${num.format(Math.round(lastSip))}/mo`}
                />
                <SumRow label="Annual step-up" value={`${stepUp}%`} />
                <SumRow label="Duration" value={`${years} yrs`} />
                <div className="my-3 border-t border-navy-900/10" />
                <SumRow
                  label="Total invested"
                  value={`₹${num.format(Math.round(result.totalInvested))}`}
                />
                <SumRow
                  label="Est. returns"
                  value={`₹${num.format(Math.round(result.totalGains))}`}
                  accent
                />
                <SumRow
                  label="Maturity value"
                  value={`₹${num.format(Math.round(result.futureValue))}`}
                  strong
                />
                <SumRow
                  label="Wealth multiplier"
                  value={`${multiplier.toFixed(2)}×`}
                />
              </div>
            </div>

            {/* Year-by-year table */}
            <div className="overflow-x-auto rounded-xl border border-navy-900/10 lg:col-span-3">
              <table className="w-full text-left text-sm">
                <thead className="bg-navy-900/5 text-navy-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Year</th>
                    <th className="px-4 py-3 font-semibold">SIP / Month</th>
                    <th className="px-4 py-3 font-semibold">Invested / Year</th>
                    <th className="px-4 py-3 font-semibold">Total Invested</th>
                  </tr>
                </thead>
                <tbody className="text-navy-700/90">
                  {result.yearly.map((y) => (
                    <tr key={y.year} className="border-t border-navy-900/5">
                      <td className="px-4 py-3">Year {y.year}</td>
                      <td className="px-4 py-3">₹{num.format(Math.round(y.sipMonthly))}</td>
                      <td className="px-4 py-3">₹{num.format(Math.round(y.investedYear))}</td>
                      <td className="px-4 py-3 font-semibold text-navy-900">
                        ₹{num.format(Math.round(y.invested))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="mt-6">
          <button
            onClick={() => setShowSchedule((s) => !s)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600"
          >
            {showSchedule ? "Hide" : "Show"} yearly breakdown
            <Icon
              name="arrow"
              className={`h-3.5 w-3.5 rotate-90 transition-transform ${
                showSchedule ? "rotate-[270deg]" : ""
              }`}
            />
          </button>

          {showSchedule && (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-navy-900/10 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-navy-900/5 text-navy-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Year</th>
                    <th className="px-4 py-3 font-semibold">Invested</th>
                    <th className="px-4 py-3 font-semibold">Returns</th>
                    <th className="px-4 py-3 font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody className="text-navy-700/90">
                  {result.yearly.map((y) => (
                    <tr key={y.year} className="border-t border-navy-900/5">
                      <td className="px-4 py-3">{y.year}</td>
                      <td className="px-4 py-3">
                        {inr.format(Math.round(y.invested))}
                      </td>
                      <td className="px-4 py-3 text-gold-700">
                        {inr.format(Math.round(y.gains))}
                      </td>
                      <td className="px-4 py-3 font-semibold text-navy-900">
                        {inr.format(Math.round(y.balance))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          For illustration only and assumes a constant rate of return. Actual
          mutual fund returns vary and are subject to market risk.
        </p>
      </div>
    </div>
  );
}
