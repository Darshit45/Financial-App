"use client";

import { useMemo, useState } from "react";
import Icon from "../components/Icon";

export const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const compoundOptions = [
  { label: "Daily", value: 365 },
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Semi-annually", value: 2 },
  { label: "Annually", value: 1 },
];

function compute({ principal, contribution, contribFreq, years, rate, compound }) {
  // Derive an effective monthly growth factor from the nominal rate and the
  // chosen compounding frequency, then simulate month by month so monthly and
  // annual contributions are both handled accurately.
  const annualFactor = Math.pow(1 + rate / 100 / compound, compound);
  const monthlyFactor = Math.pow(annualFactor, 1 / 12);
  const months = Math.round(years * 12);

  let balance = principal;
  let contributedExtra = 0;
  const yearly = [];

  for (let m = 1; m <= months; m++) {
    if (contribFreq === 12) {
      balance += contribution;
      contributedExtra += contribution;
    } else if (contribFreq === 1 && m % 12 === 1) {
      balance += contribution;
      contributedExtra += contribution;
    }
    balance *= monthlyFactor;

    if (m % 12 === 0) {
      const contributed = principal + contributedExtra;
      yearly.push({
        year: m / 12,
        balance,
        contributed,
        interest: balance - contributed,
      });
    }
  }

  const totalContributions = contributedExtra;
  const totalDeposited = principal + totalContributions;
  const totalInterest = balance - totalDeposited;

  return { balance, principal, totalContributions, totalDeposited, totalInterest, yearly };
}

export default function Calculator() {
  const [principal, setPrincipal] = useState(100000);
  const [contribution, setContribution] = useState(10000);
  const [contribFreq, setContribFreq] = useState(12); // 12 monthly, 1 annually
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(8);
  const [compound, setCompound] = useState(12);
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo(
    () => compute({ principal, contribution, contribFreq, years, rate, compound }),
    [principal, contribution, contribFreq, years, rate, compound]
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
            Your details
          </h2>

          <div className="mt-6 space-y-6">
            <MoneyField
              label="Initial deposit"
              value={principal}
              onChange={setPrincipal}
            />

            <div>
              <MoneyField
                label="Regular contribution"
                value={contribution}
                onChange={setContribution}
              />
              <div className="mt-3 flex gap-2">
                {[
                  { label: "Monthly", v: 12 },
                  { label: "Annually", v: 1 },
                ].map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setContribFreq(o.v)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      contribFreq === o.v
                        ? "border-gold-500 bg-gold-500/10 text-navy-900"
                        : "border-navy-900/15 text-navy-700/80 hover:border-navy-900/30"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <SliderField
              label="Years to grow"
              value={years}
              onChange={setYears}
              min={1}
              max={50}
              step={1}
              suffix=" yrs"
            />

            <SliderField
              label="Estimated interest rate"
              value={rate}
              onChange={setRate}
              min={0}
              max={20}
              step={0.1}
              suffix="%"
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-800">
                Compound frequency
              </label>
              <select
                value={compound}
                onChange={(e) => setCompound(Number(e.target.value))}
                className="w-full rounded-lg border border-navy-900/20 px-4 py-3 text-sm text-navy-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
              >
                {compoundOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            Future balance after {years} {years === 1 ? "year" : "years"}
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.balance))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label="Initial deposit"
              value={inr.format(Math.round(result.principal))}
              dot="bg-cream/60"
            />
            <Stat
              label="Contributions"
              value={inr.format(Math.round(result.totalContributions))}
              dot="bg-navy-600"
            />
            <Stat
              label="Interest earned"
              value={inr.format(Math.round(result.totalInterest))}
              dot="bg-gold-500"
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
                <span className="h-2.5 w-2.5 rounded-sm bg-navy-700" /> Deposits
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-gold-500" /> Interest
              </span>
            </div>
          </div>
          <Chart yearly={result.yearly} maxBalance={maxBalance} years={years} />
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
                    <th className="px-4 py-3 font-semibold">Deposits</th>
                    <th className="px-4 py-3 font-semibold">Interest</th>
                    <th className="px-4 py-3 font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody className="text-navy-700/90">
                  {result.yearly.map((y) => (
                    <tr key={y.year} className="border-t border-navy-900/5">
                      <td className="px-4 py-3">{y.year}</td>
                      <td className="px-4 py-3">
                        {inr.format(Math.round(y.contributed))}
                      </td>
                      <td className="px-4 py-3 text-gold-700">
                        {inr.format(Math.round(y.interest))}
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
          This calculator is for illustration only and assumes a constant rate of
          return. Actual investment returns vary and are subject to market risk.
        </p>
      </div>
    </div>
  );
}

export function Chart({ yearly, maxBalance, years }) {
  const W = 800;
  const H = 280;
  const pad = { top: 10, bottom: 28, left: 0, right: 0 };
  const plotH = H - pad.top - pad.bottom;
  const n = yearly.length || 1;
  const gap = 6;
  const barW = (W - gap * (n - 1)) / n;
  const labelEvery = Math.ceil(n / 10);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mt-5 h-auto w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Bar chart of balance growth per year"
    >
      {yearly.map((y, i) => {
        const x = i * (barW + gap);
        const totalH = (y.balance / maxBalance) * plotH;
        const interestH = (y.interest / maxBalance) * plotH;
        const depositH = totalH - interestH;
        const yDeposit = pad.top + plotH - depositH;
        const yInterest = yDeposit - interestH;
        const showLabel = i === n - 1 || i % labelEvery === 0;
        return (
          <g key={y.year}>
            <rect
              x={x}
              y={yDeposit}
              width={barW}
              height={Math.max(depositH, 0)}
              className="fill-navy-700"
              rx="2"
            />
            <rect
              x={x}
              y={yInterest}
              width={barW}
              height={Math.max(interestH, 0)}
              className="fill-gold-500"
              rx="2"
            />
            {showLabel && (
              <text
                x={x + barW / 2}
                y={H - 8}
                textAnchor="middle"
                className="fill-navy-700/60 text-[18px]"
                style={{ fontSize: 18 }}
              >
                {y.year}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function Stat({ label, value, dot }) {
  return (
    <div className="rounded-xl border border-white/10 bg-navy-800/60 p-3">
      <span className="flex items-center gap-1.5 text-xs text-cream/70">
        <span className={`h-2.5 w-2.5 rounded-sm ${dot}`} />
        {label}
      </span>
      <p className="mt-1.5 text-sm font-semibold text-cream sm:text-base">
        {value}
      </p>
    </div>
  );
}

export function MoneyField({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-navy-800">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-navy-900/20 focus-within:border-gold-500 focus-within:ring-2 focus-within:ring-gold-500/30">
        <span className="pl-4 pr-1 text-navy-700/70">₹</span>
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="w-full bg-transparent px-2 py-3 text-sm text-navy-900 outline-none"
        />
      </div>
    </div>
  );
}

export function SliderField({ label, value, onChange, min, max, step, suffix }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-navy-800">{label}</label>
        <span className="rounded-md bg-navy-900/5 px-2.5 py-1 text-sm font-semibold text-navy-900">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-navy-900/10 accent-gold-500"
      />
    </div>
  );
}
