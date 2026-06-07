import { PageHeader } from "../about/page";
import { CtaBand } from "../page";
import Calculator from "./Calculator";

export const metadata = {
  title: "Compound Interest Calculator — Aarav Wealth",
  description:
    "See how your money can grow over time with regular contributions and compounding returns.",
};

export default function CalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free tool"
        title="Compound interest calculator"
        subtitle="See how consistent investing and the power of compounding can grow your wealth over time."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <Calculator />
      </section>
      <CtaBand />
    </>
  );
}
