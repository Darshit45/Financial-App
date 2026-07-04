const GOLD = "#c5a24c";

/**
 * DhanVega logo — circular DV mark (navy + gold brand image) with a
 * compact wordmark underneath. `dark` renders the light-on-navy
 * variant for dark backgrounds.
 */
export default function Logo({ dark = false, className = "" }) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      {dark ? (
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white">
          <img src="/logo-mark.png" alt="" className="h-9 w-9" />
        </span>
      ) : (
        <img src="/logo-mark.png" alt="" className="h-11 w-auto" />
      )}
      <span
        className={`mt-1 font-serif text-sm font-bold leading-none tracking-[0.08em] ${
          dark ? "text-cream" : "text-navy-900"
        }`}
      >
        DHAN
        <span style={{ color: GOLD }}>VEGA</span>
      </span>
      <span
        className={`mt-0.5 text-[0.45rem] font-semibold leading-none tracking-[0.24em] ${
          dark ? "text-cream/70" : "text-navy-800/80"
        }`}
      >
        — FINANCIAL SERVICES —
      </span>
    </span>
  );
}
