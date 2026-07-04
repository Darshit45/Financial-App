import { PageHeader } from "../about/page";
import { CtaBand } from "../page";
import CalculatorTabs from "./CalculatorTabs";

export const metadata = {
  title: "Investment Calculators — Dhanvega",
  description:
    "Plan your wealth with our mutual-fund SIP, SIP step-up and compound-interest calculators.",
};

export default function CalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free tools"
        title="Investment calculators"
        subtitle="Estimate your mutual-fund SIP returns, model an annual step-up, or project compound-interest growth."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <CalculatorTabs />
      </section>
      <CtaBand />
    </>
  );
}
