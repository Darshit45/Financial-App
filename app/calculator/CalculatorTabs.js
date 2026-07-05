"use client";

import { useState } from "react";
import Calculator from "./Calculator";
import SipCalculator from "./SipCalculator";
import SipReturnCalculator from "./SipReturnCalculator";
import AssetAllocationCalculator from "./AssetAllocationCalculator";
import RetirementCalculator from "./RetirementCalculator";
import PpfCalculator from "./PpfCalculator";
import EpfCalculator from "./EpfCalculator";
import GoalCalculator from "./GoalCalculator";
import CompositeGoalCalculator from "./CompositeGoalCalculator";
import LumpsumCalculator from "./LumpsumCalculator";
import LumpsumTargetCalculator from "./LumpsumTargetCalculator";
import InflationCalculator from "./InflationCalculator";
import HlvCalculator from "./HlvCalculator";
import NetWorthCalculator from "./NetWorthCalculator";
import SpendLessCalculator from "./SpendLessCalculator";
import ChildEducationCalculator from "./ChildEducationCalculator";

const tabs = [
  { id: "sipreturn", label: "SIP" },
  { id: "sip", label: "SIP Step-Up" },
  { id: "lumpsum", label: "Lumpsum" },
  { id: "lumpsumtarget", label: "Lumpsum Target" },
  { id: "compound", label: "Compound Interest" },
  { id: "allocation", label: "Asset Allocation" },
  { id: "retirement", label: "Retirement" },
  { id: "ppf", label: "PPF" },
  { id: "epf", label: "EPF" },
  { id: "goal", label: "Goal Setting" },
  { id: "composite", label: "Composite Goals" },
  { id: "education", label: "Children's Education" },
  { id: "networth", label: "Net Worth" },
  { id: "hlv", label: "Human Life Value" },
  { id: "inflation", label: "Inflation" },
  { id: "spendless", label: "Spend Less, Save More" },
];

const panels = {
  sipreturn: SipReturnCalculator,
  sip: SipCalculator,
  lumpsum: LumpsumCalculator,
  lumpsumtarget: LumpsumTargetCalculator,
  compound: Calculator,
  allocation: AssetAllocationCalculator,
  retirement: RetirementCalculator,
  ppf: PpfCalculator,
  epf: EpfCalculator,
  goal: GoalCalculator,
  composite: CompositeGoalCalculator,
  education: ChildEducationCalculator,
  networth: NetWorthCalculator,
  hlv: HlvCalculator,
  inflation: InflationCalculator,
  spendless: SpendLessCalculator,
};

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

      {(() => {
        const Panel = panels[tab] ?? Calculator;
        return <Panel />;
      })()}
    </div>
  );
}
