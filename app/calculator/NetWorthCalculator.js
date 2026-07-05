"use client";

import { useMemo, useState } from "react";
import { MoneyField, Stat, inr } from "./Calculator";

const ASSET_FIELDS = [
  { id: "equity", label: "Shares & equity mutual funds" },
  { id: "fixedIncome", label: "Fixed income (FDs, bonds, debt funds, PPF)" },
  { id: "cash", label: "Cash & bank accounts" },
  { id: "property", label: "Property" },
  { id: "gold", label: "Gold & jewellery" },
  { id: "otherAssets", label: "Other assets" },
];

const LIABILITY_FIELDS = [
  { id: "homeLoan", label: "Home loan outstanding" },
  { id: "personalLoans", label: "Personal & other loans" },
  { id: "tax", label: "Income tax owed" },
  { id: "bills", label: "Outstanding bills / payments" },
  { id: "creditCards", label: "Credit card dues" },
  { id: "otherLiabilities", label: "Other liabilities" },
];

export default function NetWorthCalculator() {
  const [values, setValues] = useState({
    equity: 1000000,
    fixedIncome: 800000,
    cash: 300000,
    property: 5000000,
    gold: 500000,
    otherAssets: 0,
    homeLoan: 2500000,
    personalLoans: 0,
    tax: 0,
    bills: 0,
    creditCards: 50000,
    otherLiabilities: 0,
  });

  const set = (id) => (v) => setValues((s) => ({ ...s, [id]: v }));

  const { assets, liabilities, netWorth } = useMemo(() => {
    const assets = ASSET_FIELDS.reduce((a, f) => a + (values[f.id] || 0), 0);
    const liabilities = LIABILITY_FIELDS.reduce(
      (a, f) => a + (values[f.id] || 0),
      0
    );
    return { assets, liabilities, netWorth: assets - liabilities };
  }, [values]);

  const barMax = Math.max(assets, liabilities, 1);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Financial assets
          </h2>
          <div className="mt-5 space-y-5">
            {ASSET_FIELDS.map((f) => (
              <MoneyField
                key={f.id}
                label={f.label}
                value={values[f.id]}
                onChange={set(f.id)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Liabilities
          </h2>
          <div className="mt-5 space-y-5">
            {LIABILITY_FIELDS.map((f) => (
              <MoneyField
                key={f.id}
                label={f.label}
                value={values[f.id]}
                onChange={set(f.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 text-cream shadow-sm sm:p-8">
          <p className="text-sm font-medium text-cream/70">Your net worth</p>
          <p
            className={`mt-1 font-serif text-4xl font-bold sm:text-5xl ${
              netWorth >= 0 ? "text-gold-400" : "text-red-300"
            }`}
          >
            {inr.format(Math.round(netWorth))}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Stat
              label="Total assets"
              value={inr.format(Math.round(assets))}
              dot="bg-gold-500"
            />
            <Stat
              label="Total liabilities"
              value={inr.format(Math.round(liabilities))}
              dot="bg-navy-600"
            />
          </div>

          {/* Assets vs liabilities bars */}
          <div className="mt-7 space-y-4">
            <div>
              <div className="flex justify-between text-xs text-cream/70">
                <span>Assets</span>
                <span>{inr.format(Math.round(assets))}</span>
              </div>
              <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gold-500"
                  style={{ width: `${(assets / barMax) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-cream/70">
                <span>Liabilities</span>
                <span>{inr.format(Math.round(liabilities))}</span>
              </div>
              <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-navy-600"
                  style={{ width: `${(liabilities / barMax) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Composition */}
        <div className="mt-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-7">
          <h3 className="font-serif text-lg font-semibold text-navy-900">
            Where your wealth sits
          </h3>
          <div className="mt-4 space-y-3">
            {ASSET_FIELDS.filter((f) => values[f.id] > 0).map((f) => (
              <div key={f.id}>
                <div className="flex justify-between text-sm text-navy-700/90">
                  <span>{f.label}</span>
                  <span className="font-semibold text-navy-900">
                    {inr.format(values[f.id])}{" "}
                    <span className="font-normal text-navy-700/60">
                      ({Math.round((values[f.id] / (assets || 1)) * 100)}%)
                    </span>
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-navy-900/5">
                  <div
                    className="h-full rounded-full bg-navy-700"
                    style={{ width: `${(values[f.id] / (assets || 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-navy-700/60">
          Net worth = everything you own minus everything you owe. Tracking it
          yearly is the simplest scorecard of financial progress.
        </p>
      </div>
    </div>
  );
}
