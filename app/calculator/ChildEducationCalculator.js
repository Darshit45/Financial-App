"use client";

import { useMemo, useState } from "react";
import { MoneyField, SliderField, Stat, inr } from "./Calculator";

// Plans both children's education together. Current savings are split in
// proportion to each child's inflation-adjusted cost, and each child gets
// their own monthly SIP for the remainder.
function planChild({ amount, years, inflation, rate, savingsShare }) {
  const months = Math.max(1, years) * 12;
  const adjTarget = amount * Math.pow(1 + inflation / 100, years);
  const grownSavings = savingsShare * Math.pow(1 + rate / 100, years);
  const netTarget = Math.max(0, adjTarget - grownSavings);

  const i = rate / 100 / 12;
  const factor = (Math.pow(1 + i, months) - 1) / i;
  const monthly = netTarget > 0 ? netTarget / (factor * (1 + i)) : 0;

  return { adjTarget, grownSavings, netTarget, monthly };
}

function computePlan(inputs) {
  const { inflation, rate, savings } = inputs;
  const kids = [
    {
      id: 1,
      name: inputs.name1 || "First child",
      amount: inputs.amount1,
      years: Math.max(1, inputs.eduAge1 - inputs.age1),
    },
    {
      id: 2,
      name: inputs.name2 || "Second child",
      amount: inputs.amount2,
      years: Math.max(1, inputs.eduAge2 - inputs.age2),
    },
  ].filter((k) => k.amount > 0);

  const adj = kids.map((k) => k.amount * Math.pow(1 + inflation / 100, k.years));
  const adjSum = adj.reduce((a, b) => a + b, 0) || 1;

  const planned = kids.map((k, idx) => ({
    ...k,
    savingsShare: savings * (adj[idx] / adjSum),
    ...planChild({
      amount: k.amount,
      years: k.years,
      inflation,
      rate,
      savingsShare: savings * (adj[idx] / adjSum),
    }),
  }));

  return {
    kids: planned,
    totals: {
      amount: planned.reduce((a, k) => a + k.amount, 0),
      adjTarget: planned.reduce((a, k) => a + k.adjTarget, 0),
      monthly: planned.reduce((a, k) => a + k.monthly, 0),
    },
  };
}

function TextField({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy-900">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-navy-900/15 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-700"
      />
    </label>
  );
}

export default function ChildEducationCalculator() {
  const [name1, setName1] = useState("");
  const [age1, setAge1] = useState(5);
  const [eduAge1, setEduAge1] = useState(18);
  const [amount1, setAmount1] = useState(2500000);

  const [name2, setName2] = useState("");
  const [age2, setAge2] = useState(2);
  const [eduAge2, setEduAge2] = useState(18);
  const [amount2, setAmount2] = useState(2500000);

  const [inflation, setInflation] = useState(6);
  const [rate, setRate] = useState(12);
  const [savings, setSavings] = useState(500000);

  const result = useMemo(
    () =>
      computePlan({
        name1,
        age1,
        eduAge1,
        amount1,
        name2,
        age2,
        eduAge2,
        amount2,
        inflation,
        rate,
        savings,
      }),
    [name1, age1, eduAge1, amount1, name2, age2, eduAge2, amount2, inflation, rate, savings]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="space-y-6 lg:col-span-2">
        {[
          {
            title: "First child",
            name: name1, setName: setName1,
            age: age1, setAge: setAge1,
            eduAge: eduAge1, setEduAge: setEduAge1,
            amount: amount1, setAmount: setAmount1,
          },
          {
            title: "Second child (optional)",
            name: name2, setName: setName2,
            age: age2, setAge: setAge2,
            eduAge: eduAge2, setEduAge: setEduAge2,
            amount: amount2, setAmount: setAmount2,
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7"
          >
            <h2 className="font-serif text-xl font-semibold text-navy-900">
              {c.title}
            </h2>
            <div className="mt-5 space-y-5">
              <TextField
                label="Name"
                value={c.name}
                onChange={c.setName}
                placeholder="Child's name"
              />
              <SliderField
                label="Current age"
                value={c.age}
                onChange={c.setAge}
                min={0}
                max={17}
                step={1}
                suffix=" yrs"
              />
              <SliderField
                label="Age for professional education"
                value={c.eduAge}
                onChange={c.setEduAge}
                min={15}
                max={25}
                step={1}
                suffix=" yrs"
              />
              <MoneyField
                label="Education cost at today's prices (0 to skip)"
                value={c.amount}
                onChange={c.setAmount}
              />
            </div>
          </div>
        ))}

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
            Total monthly savings for{" "}
            {result.kids.length === 2 ? "both children" : "your child"}
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
            {inr.format(Math.round(result.totals.monthly))}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {result.kids.map((k) => (
              <Stat
                key={k.id}
                label={`${k.name} / month`}
                value={inr.format(Math.round(k.monthly))}
                dot={k.id === 1 ? "bg-gold-500" : "bg-navy-600"}
              />
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-900/10 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-900/5 text-navy-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Education planner</th>
                {result.kids.map((k) => (
                  <th key={k.id} className="px-4 py-3 font-semibold">
                    {k.name}
                  </th>
                ))}
                {result.kids.length === 2 && (
                  <th className="px-4 py-3 font-semibold">Total</th>
                )}
              </tr>
            </thead>
            <tbody className="text-navy-700/90">
              <tr className="border-t border-navy-900/5">
                <td className="px-4 py-3">Cost at today&apos;s prices</td>
                {result.kids.map((k) => (
                  <td key={k.id} className="px-4 py-3">
                    {inr.format(Math.round(k.amount))}
                  </td>
                ))}
                {result.kids.length === 2 && (
                  <td className="px-4 py-3 font-semibold text-navy-900">
                    {inr.format(Math.round(result.totals.amount))}
                  </td>
                )}
              </tr>
              <tr className="border-t border-navy-900/5">
                <td className="px-4 py-3">Years until college</td>
                {result.kids.map((k) => (
                  <td key={k.id} className="px-4 py-3">
                    {k.years} yrs
                  </td>
                ))}
                {result.kids.length === 2 && <td className="px-4 py-3">—</td>}
              </tr>
              <tr className="border-t border-navy-900/5">
                <td className="px-4 py-3">
                  Future cost (inflation adjusted at {inflation}%)
                </td>
                {result.kids.map((k) => (
                  <td key={k.id} className="px-4 py-3">
                    {inr.format(Math.round(k.adjTarget))}
                  </td>
                ))}
                {result.kids.length === 2 && (
                  <td className="px-4 py-3 font-semibold text-navy-900">
                    {inr.format(Math.round(result.totals.adjTarget))}
                  </td>
                )}
              </tr>
              <tr className="border-t border-navy-900/5">
                <td className="px-4 py-3">Current savings applied</td>
                {result.kids.map((k) => (
                  <td key={k.id} className="px-4 py-3">
                    {inr.format(Math.round(k.savingsShare))}
                  </td>
                ))}
                {result.kids.length === 2 && (
                  <td className="px-4 py-3">{inr.format(Math.round(savings))}</td>
                )}
              </tr>
              <tr className="border-t border-navy-900/5 bg-cream/60">
                <td className="px-4 py-3 font-semibold text-navy-900">
                  Monthly savings required
                </td>
                {result.kids.map((k) => (
                  <td key={k.id} className="px-4 py-3 font-semibold text-navy-900">
                    {inr.format(Math.round(k.monthly))}
                  </td>
                ))}
                {result.kids.length === 2 && (
                  <td className="px-4 py-3 font-serif font-bold text-gold-700">
                    {inr.format(Math.round(result.totals.monthly))}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          Your current savings are apportioned between the children by the
          size of each inflation-adjusted goal. Set the second child&apos;s
          cost to zero if you&apos;re planning for one child.
        </p>
      </div>
    </div>
  );
}
