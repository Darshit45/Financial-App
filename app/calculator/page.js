import { PageHeader } from "../about/page";
import { CtaBand } from "../page";
import CalculatorTabs from "./CalculatorTabs";

export const metadata = {
  title: "Investment Calculators — Dhanvega",
  description:
    "Plan your wealth with our compound-interest and mutual-fund SIP step-up calculators.",
};

export default function CalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free tools"
        title="Investment calculators"
        subtitle="Project your wealth with compound interest, or model a mutual-fund SIP with an annual step-up."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <CalculatorTabs />
      </section>
      <CtaBand />
    </>
  );
}
