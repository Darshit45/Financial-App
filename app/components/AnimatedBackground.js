// Ambient, premium background animation for dark navy sections.
// Pure CSS (see globals.css) so it stays light and works with static export.
// Renders drifting aurora orbs, faint rising gold particles, and a slow
// sweeping light line. Decorative only — hidden from assistive tech.

// Deterministic particle config (no Math.random) to avoid hydration mismatch.
const PARTICLES = [
  { left: "6%", size: 3, delay: 0, duration: 15 },
  { left: "14%", size: 2, delay: 5, duration: 18 },
  { left: "22%", size: 4, delay: 2, duration: 13 },
  { left: "31%", size: 2, delay: 8, duration: 20 },
  { left: "39%", size: 3, delay: 1, duration: 16 },
  { left: "47%", size: 2, delay: 6, duration: 19 },
  { left: "55%", size: 4, delay: 3, duration: 14 },
  { left: "63%", size: 2, delay: 9, duration: 21 },
  { left: "71%", size: 3, delay: 4, duration: 17 },
  { left: "79%", size: 2, delay: 7, duration: 15 },
  { left: "87%", size: 4, delay: 2, duration: 18 },
  { left: "94%", size: 3, delay: 10, duration: 16 },
];

export default function AnimatedBackground({ particles = true, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Drifting aurora orbs */}
      <div className="bg-orb absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl" />
      <div className="bg-orb-alt absolute -right-20 -top-24 h-96 w-96 rounded-full bg-navy-600/40 blur-3xl" />
      <div
        className="bg-orb absolute -bottom-24 right-1/3 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl"
        style={{ animationDelay: "-7s" }}
      />

      {/* Slow sweeping light line */}
      <div className="bg-sweep absolute -inset-y-10 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold-300/10 to-transparent" />

      {/* Faint rising gold particles */}
      {particles &&
        PARTICLES.map((p, i) => (
          <span
            key={i}
            className="bg-particle absolute rounded-full bg-gold-300/60"
            style={{
              left: p.left,
              bottom: "-12px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
    </div>
  );
}
