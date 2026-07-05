"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, inr } from "./Calculator";

// Plans three goals together: child's education, a wealth target and a
// dream purchase. Current savings are split across the goals in proportion
// to their inflation-adjusted size, then each goal gets its own monthly SIP.
function planGoal({ amount, years, inflation, rate, savingsShare }) {
  const months = Math.max(1, years) * 12;
  const adjTarget = amount * Math.pow(1 + inflation / 100, years);
  const grownSavings = savingsShare * Math.pow(1 + rate / 100, years);
  const netTarget = Math.max(0, adjTarget - grownSavings);

  const i = rate / 100 / 12;
  const factor = (Math.pow(1 + i, months) - 1) / i;
  const monthly = netTarget > 0 ? netTarget / (factor * (1 + i)) : 0;

  return { adjTarget, grownSavings, netTarget, monthly };
}

function computeComposite(inputs) {
  const { inflation, rate, savings } = inputs;
  const goals = [
    {
      id: "education",
      label: "Education",
      amount: inputs.eduAmount,
      years: Math.max(1, inputs.eduAge - inputs.childAge),
    },
    {
      id: "wealth",
      label: "Wealth",
      amount: inputs.wealthAmount,
      years: Math.max(1, inputs.wealthAge - inputs.age),
    },
    {
      id: "expense",
      label: "Dream expense",
      amount: inputs.dreamAmount,
      years: Math.max(1, inputs.dreamYears),
    },
  ];

  // Split current savings by inflation-adjusted target size.
  const adj = goals.map((g) =>
    g.amount * Math.pow(1 + inflation / 100, g.years)
  );
  const adjSum = adj.reduce((a, b) => a + b, 0) || 1;

  const planned = goals.map((g, idx) => ({
    ...g,
    savingsShare: savings * (adj[idx] / adjSum),
    ...planGoal({
      amount: g.amount,
      years: g.years,
      inflation,
      rate,
      savingsShare: savings * (adj[idx] / adjSum),
    }),
  }));

  return {
    goals: planned,
    totals: {
      amount: planned.reduce((a, g) => a + g.amount, 0),
      adjTarget: planned.reduce((a, g) => a + g.adjTarget, 0),
      savings,
      monthly: planned.reduce((a, g) => a + g.monthly, 0),
    },
  };
}

export default function CompositeGoalCalculator() {
  const [eduAmount, setEduAmount] = useState(2500000);
  const [childAge, setChildAge] = useState(5);
  const [eduAge, setEduAge] = useState(18);

  const [wealthAmount, setWealthAmount] = useState(10000000);
  const [age, setAge] = useState(30);
  const [wealthAge, setWealthAge] = useState(50);

  const [dreamAmount, setDreamAmount] = useState(5000000);
  const [dreamYears, setDreamYears] = useState(10);

  const [inflation, setInflation] = useState(6);
  const [rate, setRate] = useState(12);
  const [savings, setSavings] = useState(1000000);

  const result = useMemo(
    () =>
      computeComposite({
        eduAmount,
        childAge,
        eduAge,
        wealthAmount,
        age,
        wealthAge,
        dreamAmount,
        dreamYears,
        inflation,
        rate,
        savings,
      }),
    [
      eduAmount,
      childAge,
      eduAge,
      wealthAmount,
      age,
      wealthAge,
      dreamAmount,
      dreamYears,
      inflation,
      rate,
      savings,
    ]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Child&apos;s education
          </h2>
          <div className="mt-5 space-y-5">
            <MoneyField
              label="Education cost at today's prices"
              value={eduAmount}
              onChange={setEduAmount}
            />
            <SliderField
              label="Child's age today"
              value={childAge}
              onChange={setChildAge}
              min={0}
              max={17}
              step={1}
              suffix=" yrs"
            />
            <SliderField
              label="Age for professional education"
              value={eduAge}
              onChange={setEduAge}
              min={15}
              max={25}
              step={1}
              suffix=" yrs"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Wealth target
          </h2>
          <div className="mt-5 space-y-5">
            <MoneyField
              label="Wealth you'd like at today's prices"
              value={wealthAmount}
              onChange={setWealthAmount}
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
              label="Age to acquire this wealth"
              value={wealthAge}
              onChange={setWealthAge}
              min={30}
              max={75}
              step={1}
              suffix=" yrs"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Dream expense
          </h2>
          <div className="mt-5 space-y-5">
            <MoneyField
              label="Dream purchase at today's prices"
              value={dreamAmount}
              onChange={setDreamAmount}
            />
            <SliderField
              label="Years until you need it"
              value={dreamYears}
              onChange={setDreamYears}
              min={1}
              max={30}
              step={1}
              suffix=" yrs"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Assumptions
          </h2>
          <div className="mt-5 space-y-5">
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
            Total monthly savings for all three goals
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.totals.monthly))}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {result.goals.map((g) => (
              <Stat
                key={g.id}
                label={`${g.label} / month`}
                value={inr.format(Math.round(g.monthly))}
                dot={
                  g.id === "education"
                    ? "bg-navy-600"
                    : g.id === "wealth"
                      ? "bg-gold-500"
                      : "bg-cream/60"
                }
              />
            ))}
          </div>
        </div>

        {/* Composite table */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-900/10 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-900/5 text-navy-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Composite planner</th>
                {result.goals.map((g) => (
                  <th key={g.id} className="px-4 py-3 font-semibold">
                    {g.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody className="text-navy-700/90">
              <tr className="border-t border-navy-900/5">
                <td className="px-4 py-3">Amount at today&apos;s prices</td>
                {result.goals.map((g) => (
                  <td key={g.id} className="px-4 py-3">
                    {inr.format(Math.round(g.amount))}
                  </td>
                ))}
                <td className="px-4 py-3 font-semibold text-navy-900">
                  {inr.format(Math.round(result.totals.amount))}
                </td>
              </tr>
              <tr className="border-t border-navy-900/5">
                <td className="px-4 py-3">Years to achieve</td>
                {result.goals.map((g) => (
                  <td key={g.id} className="px-4 py-3">
                    {g.years} yrs
                  </td>
                ))}
                <td className="px-4 py-3">—</td>
              </tr>
              <tr className="border-t border-navy-900/5">
                <td className="px-4 py-3">
                  Target (inflation adjusted at {inflation}%)
                </td>
                {result.goals.map((g) => (
                  <td key={g.id} className="px-4 py-3">
                    {inr.format(Math.round(g.adjTarget))}
                  </td>
                ))}
                <td className="px-4 py-3 font-semibold text-navy-900">
                  {inr.format(Math.round(result.totals.adjTarget))}
                </td>
              </tr>
              <tr className="border-t border-navy-900/5">
                <td className="px-4 py-3">Current savings applied</td>
                {result.goals.map((g) => (
                  <td key={g.id} className="px-4 py-3">
                    {inr.format(Math.round(g.savingsShare))}
                  </td>
                ))}
                <td className="px-4 py-3">
                  {inr.format(Math.round(result.totals.savings))}
                </td>
              </tr>
              <tr className="border-t border-navy-900/5 bg-cream/60">
                <td className="px-4 py-3 font-semibold text-navy-900">
                  Monthly savings required
                </td>
                {result.goals.map((g) => (
                  <td key={g.id} className="px-4 py-3 font-semibold text-navy-900">
                    {inr.format(Math.round(g.monthly))}
                  </td>
                ))}
                <td className="px-4 py-3 font-serif font-bold text-gold-700">
                  {inr.format(Math.round(result.totals.monthly))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          Your current savings are apportioned across the goals by their
          inflation-adjusted size. For illustration only — assumes constant
          inflation and returns for every goal.
        </p>
      </div>
    </div>
  );
}
