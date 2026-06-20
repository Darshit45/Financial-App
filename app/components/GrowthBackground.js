// Growth-themed ambient background for the home hero.
// Conveys "rising wealth & thriving clients" with an ascending bar chart,
// an upward-drawing trend line topped by a pulsing peak, and rising gold
// coins — all pure CSS/SVG (keyframes in globals.css), so it stays light
// and works with the static export. Decorative only; calms down under
// prefers-reduced-motion. Deterministic values avoid hydration mismatch.

const BARS = [34, 46, 40, 58, 52, 72, 66, 88, 80, 100];

const COINS = [
  { left: "12%", size: 14, delay: 0, duration: 9 },
  { left: "27%", size: 10, delay: 3, duration: 11 },
  { left: "43%", size: 16, delay: 1.5, duration: 8 },
  { left: "59%", size: 11, delay: 5, duration: 12 },
  { left: "73%", size: 13, delay: 2.5, duration: 10 },
  { left: "88%", size: 9, delay: 4, duration: 13 },
];

export default function GrowthBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Drifting aurora orbs (base / fallback layer) */}
      <div className="bg-orb absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl" />
      <div className="bg-orb-alt absolute -right-20 -top-24 h-96 w-96 rounded-full bg-navy-600/40 blur-3xl" />

      {/* Ascending bar chart along the bottom */}
      <div className="absolute inset-x-0 bottom-0 flex h-2/5 items-end justify-evenly gap-[1.5%] px-[4%] opacity-[0.14]">
        {BARS.map((h, i) => (
          <div
            key={i}
            className="bg-bar w-full rounded-t-md bg-gradient-to-t from-gold-500/30 to-gold-300"
            style={{ height: `${h}%`, animationDelay: `${i * 0.22}s` }}
          />
        ))}
      </div>

      {/* Upward trend line that draws itself, with a pulsing peak */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#c9a14a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e6cd92" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <polyline
          className="bg-trend"
          points="2,80 20,71 38,75 56,53 72,47 88,25 99,15"
          fill="none"
          stroke="url(#trendGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          className="bg-trend-tip"
          cx="99"
          cy="15"
          r="1.6"
          fill="#f2dca5"
        />
      </svg>

      {/* Rising, flipping gold coins */}
      {COINS.map((c, i) => (
        <span
          key={i}
          className="bg-coin absolute rounded-full"
          style={{
            left: c.left,
            bottom: "12%",
            width: `${c.size}px`,
            height: `${c.size}px`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            background:
              "radial-gradient(circle at 35% 30%, #f7e4b0, #c9a14a 72%)",
            boxShadow: "0 0 6px rgba(201, 161, 74, 0.5)",
          }}
        />
      ))}

      {/* Slow sweeping light */}
      <div className="bg-sweep absolute -inset-y-10 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold-300/10 to-transparent" />
    </div>
  );
}
