"use client";

import { useState } from "react";
import Calculator from "./Calculator";
import SipCalculator from "./SipCalculator";
import SipReturnCalculator from "./SipReturnCalculator";

const tabs = [
  { id: "sipreturn", label: "SIP" },
  { id: "sip", label: "SIP Step-Up" },
  { id: "compound", label: "Compound Interest" },
];

export default function CalculatorTabs() {
  const [tab, setTab] = useState("sipreturn");

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === t.id
                ? "bg-navy-900 text-cream"
                : "border border-navy-900/15 text-navy-700/80 hover:border-navy-900/30"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "sipreturn" ? (
        <SipReturnCalculator />
      ) : tab === "sip" ? (
        <SipCalculator />
      ) : (
        <Calculator />
      )}
    </div>
  );
}
