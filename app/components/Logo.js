const GOLD = "#c5a24c";

/**
 * DhanVega logo — speed-lines italic "D" with a gold swoosh arrow
 * (recreation of approved concept #8), stacked above the wordmark
 * and the "Vision. Value. Velocity." tagline.
 * `dark` renders the light-on-navy variant for dark backgrounds.
 */
export default function Logo({ dark = false, className = "" }) {
  const ink = dark ? "#f8f5ee" : "#0c1c30";
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <svg
        viewBox="0 0 130 100"
        aria-hidden="true"
        className="h-10 w-auto"
        fill="none"
      >
        {/* italic D with speed lines trailing left */}
        <g fill={ink} transform="skewX(-8) translate(8 0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M34 8h26c32 0 48 18 48 42s-16 42-48 42H34V8Zm18 17v50h9c17 0 29-9 29-25s-12-25-29-25h-9Z"
          />
          <rect x="4" y="10" width="24" height="7" rx="3.5" />
          <rect x="12" y="26" width="16" height="7" rx="3.5" />
          <rect x="4" y="42" width="24" height="7" rx="3.5" />
          <rect x="12" y="58" width="16" height="7" rx="3.5" />
          <rect x="4" y="74" width="24" height="7" rx="3.5" />
        </g>
        {/* gold swoosh arrow along the D, rising to the top right */}
        <path
          d="M14 88c30 8 52 2 72-24l10-14"
          stroke={GOLD}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <polygon points="112,20 108,45 89,32" fill={GOLD} />
      </svg>
      <span
        className={`mt-1.5 font-serif text-lg font-bold leading-none tracking-[0.08em] ${
          dark ? "text-cream" : "text-navy-900"
        }`}
      >
        DHAN
        <span style={{ color: GOLD }}>VEGA</span>
      </span>
      <span
        className={`mt-1 text-[0.5rem] font-semibold leading-none tracking-[0.3em] ${
          dark ? "text-cream/70" : "text-navy-800/80"
        }`}
      >
        VISION. VALUE. VELOCITY.
      </span>
    </span>
  );
}
