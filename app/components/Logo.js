/**
 * DhanVega logo — exact brand DV monogram (image, background removed)
 * above a crisp two-tone HTML wordmark. Subtly animated: the mark floats
 * upward echoing the arrow, and a gold shine sweeps the wordmark.
 * `dark` renders the light-on-navy variant for dark backgrounds.
 */
export default function Logo({ dark = false, className = "" }) {
  const shine = dark ? "logo-gold-shine-dark" : "logo-gold-shine";
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <img
        src={dark ? "/logo-mark-dv-dark.png" : "/logo-mark-dv.png"}
        alt=""
        className="logo-mark h-12 w-auto"
      />
      <span className="mt-1 font-serif text-lg font-black leading-none tracking-[0.06em]">
        <span className={shine}>DHAN</span>
        <span className={dark ? "text-cream" : "text-navy-900"}>VEGA</span>
      </span>
      <span className="mt-1 text-[0.55rem] font-bold leading-none tracking-[0.26em]">
        <span className={shine}>FINANCIAL </span>
        <span className={dark ? "text-cream/90" : "text-navy-800"}>
          SERVICES
        </span>
      </span>
    </span>
  );
}
