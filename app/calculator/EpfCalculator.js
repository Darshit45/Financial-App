"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, Chart, inr } from "./Calculator";

// EPF: monthly employee + employer contributions that grow with salary,
// on top of the existing balance, earning the EPF interest rate.
function computeEpf({ age, retireAge, balance0, employee, employer, growth, rate }) {
  const years = Math.max(1, retireAge - age);
  const months = years * 12;
  const i = rate / 100 / 12;

  let balance = balance0;
  let contributed = 0;
  const rows = [];

  for (let m = 1; m <= months; m++) {
    const yearIndex = Math.floor((m - 1) / 12);
    const monthly = (employee + employer) * Math.pow(1 + growth / 100, yearIndex);
    balance += monthly;
    contributed += monthly;
    balance *= 1 + i;

    if (m % 12 === 0) {
      rows.push({
        year: m / 12,
        balance,
        invested: balance0 + contributed,
        interest: balance - balance0 - contributed,
      });
    }
  }

  return {
    corpus: balance,
    contributed,
    interest: balance - balance0 - contributed,
    years,
    yearly: rows,
  };
}

export default function EpfCalculator() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(58);
  const [balance0, setBalance0] = useState(300000);
  const [employee, setEmployee] = useState(5000);
  const [employer, setEmployer] = useState(5000);
  const [growth, setGrowth] = useState(5);
  const [rate, setRate] = useState(8.25);

  const result = useMemo(
    () => computeEpf({ age, retireAge, balance0, employee, employer, growth, rate }),
    [age, retireAge, balance0, employee, employer, growth, rate]
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
            Your EPF details
          </h2>

          <div className="mt-6 space-y-6">
            <SliderField
              label="Your current age"
              value={age}
              onChange={setAge}
              min={18}
              max={57}
              step={1}
              suffix=" yrs"
            />
            <SliderField
              label="Your retirement age"
              value={retireAge}
              onChange={setRetireAge}
              min={45}
              max={60}
              step={1}
              suffix=" yrs"
            />
            <MoneyField
              label="Current EPF balance"
              value={balance0}
              onChange={setBalance0}
            />
            <MoneyField
              label="Employee contribution / month"
              value={employee}
              onChange={setEmployee}
            />
            <MoneyField
              label="Employer contribution / month"
              value={employer}
              onChange={setEmployer}
            />
            <SliderField
              label="Yearly growth in contribution"
              value={growth}
              onChange={setGrowth}
              min={0}
              max={15}
              step={0.5}
              suffix="%"
            />
            <SliderField
              label="EPF interest rate"
              value={rate}
              onChange={setRate}
              min={6}
              max={10}
              step={0.05}
              suffix="% p.a."
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            EPF corpus at age {retireAge} ({result.years}{" "}
            {result.years === 1 ? "year" : "years"} away)
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.corpus))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label="Contributions"
              value={inr.format(Math.round(result.contributed))}
              dot="bg-navy-600"
            />
            <Stat
              label="Interest earned"
              value={inr.format(Math.round(result.interest))}
              dot="bg-gold-500"
            />
            <Stat
              label="Starting balance"
              value={inr.format(Math.round(balance0))}
              dot="bg-cream/60"
            />
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-navy-900">
              Corpus growth to retirement
            </h3>
            <div className="flex items-center gap-4 text-xs text-navy-700/80">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-navy-700" /> Contributed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-gold-500" /> Interest
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
          Assumes contributions rise once a year with salary growth and the
          EPFO interest rate stays constant. The employer share shown excludes
          the portion routed to EPS pension.
        </p>
      </div>
    </div>
  );
}
