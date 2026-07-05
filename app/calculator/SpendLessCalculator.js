"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, Chart, inr } from "./Calculator";

const SPEND_FIELDS = [
  { id: "house", label: "Deferring purchase of a house / flat" },
  { id: "emi", label: "Reducing the home-loan EMI" },
  { id: "car", label: "Waiting to buy a new car" },
  { id: "eatingOut", label: "Eating out less with family" },
  { id: "lifestyle", label: "Reducing lifestyle spending" },
  { id: "holidays", label: "Taking fewer holidays" },
  { id: "transport", label: "Taking public transport" },
  { id: "creditCard", label: "Reducing credit-card interest" },
  { id: "personalLoan", label: "Closing the personal loan" },
  { id: "shopping", label: "Doing less shopping" },
];

// Invests the yearly spending cut at the post-tax return until retirement.
function computeSpendLess({ yearlySaving, age, retireAge, rate, tax, inflation }) {
  const years = Math.max(1, retireAge - age);
  const postTax = (rate * (1 - tax / 100)) / 100;

  let balance = 0;
  let invested = 0;
  const yearly = [];
  for (let y = 1; y <= years; y++) {
    balance += yearlySaving;
    invested += yearlySaving;
    balance *= 1 + postTax;
    yearly.push({
      year: y,
      balance,
      invested,
      interest: balance - invested,
    });
  }

  const todaysValue = balance / Math.pow(1 + inflation / 100, years);
  return { years, corpus: balance, invested, growth: balance - invested, todaysValue, yearly };
}

export default function SpendLessCalculator() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [rate, setRate] = useState(10);
  const [tax, setTax] = useState(20);
  const [inflation, setInflation] = useState(6);
  const [spends, setSpends] = useState({
    house: 0,
    emi: 0,
    car: 50000,
    eatingOut: 24000,
    lifestyle: 36000,
    holidays: 50000,
    transport: 12000,
    creditCard: 0,
    personalLoan: 0,
    shopping: 24000,
  });

  const set = (id) => (v) => setSpends((s) => ({ ...s, [id]: v }));

  const yearlySaving = useMemo(
    () => SPEND_FIELDS.reduce((a, f) => a + (spends[f.id] || 0), 0),
    [spends]
  );

  const result = useMemo(
    () => computeSpendLess({ yearlySaving, age, retireAge, rate, tax, inflation }),
    [yearlySaving, age, retireAge, rate, tax, inflation]
  );

  const maxBalance = result.yearly.length
    ? result.yearly[result.yearly.length - 1].balance
    : 1;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Personal details
          </h2>
          <div className="mt-5 space-y-5">
            <SliderField
              label="Your current age"
              value={age}
              onChange={setAge}
              min={18}
              max={65}
              step={1}
              suffix=" yrs"
            />
            <SliderField
              label="Retirement age"
              value={retireAge}
              onChange={setRetireAge}
              min={40}
              max={75}
              step={1}
              suffix=" yrs"
            />
            <SliderField
              label="Return on investments"
              value={rate}
              onChange={setRate}
              min={4}
              max={20}
              step={0.5}
              suffix="% p.a."
            />
            <SliderField
              label="Income-tax rate"
              value={tax}
              onChange={setTax}
              min={0}
              max={40}
              step={5}
              suffix="%"
            />
            <SliderField
              label="Inflation"
              value={inflation}
              onChange={setInflation}
              min={2}
              max={12}
              step={0.5}
              suffix="% p.a."
            />
          </div>
        </div>

        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Yearly savings from spending less
          </h2>
          <div className="mt-5 space-y-5">
            {SPEND_FIELDS.map((f) => (
              <MoneyField
                key={f.id}
                label={f.label}
                value={spends[f.id]}
                onChange={set(f.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">
            Invested until {retireAge}, your spending cuts become
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.corpus))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              label="Saved per year"
              value={inr.format(Math.round(yearlySaving))}
              dot="bg-navy-600"
            />
            <Stat
              label="Growth earned"
              value={inr.format(Math.round(result.growth))}
              dot="bg-gold-500"
            />
            <Stat
              label="In today's money"
              value={inr.format(Math.round(result.todaysValue))}
              dot="bg-cream/60"
            />
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-navy-900">
              Savings growing over {result.years} years
            </h3>
            <div className="flex items-center gap-4 text-xs text-navy-700/80">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-navy-700" /> Saved
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
          Growth is taken after tax at your slab rate, and the today&apos;s-money
          figure discounts the corpus back by inflation. Small cuts compound
          into serious wealth.
        </p>
      </div>
    </div>
  );
}
