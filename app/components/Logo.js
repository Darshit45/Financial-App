/**
 * DhanVega logo — navy circle with silver DV monogram (brand image)
 * above a compact all-navy wordmark, matching the brand artwork.
 * `dark` renders the light-on-navy variant for dark backgrounds.
 */
export default function Logo({ dark = false, className = "" }) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <img src="/logo-mark.png" alt="" className="h-11 w-auto" />
      <span
        className={`mt-1 font-serif text-sm font-bold leading-none tracking-[0.08em] ${
          dark ? "text-cream" : "text-navy-900"
        }`}
      >
        DHANVEGA
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
