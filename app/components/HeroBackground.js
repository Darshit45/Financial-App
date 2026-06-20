import GrowthBackground from "./GrowthBackground";

// ---------------------------------------------------------------------------
// Cinematic hero background video (self-hosted).
//
// Drop your video at:   public/videos/hero.mp4
// It is served at /videos/hero.mp4 locally and copied into the static export
// automatically.
//
// The growth animation always renders behind the video, so if the file is
// missing (or still loading) the hero still looks great. Set VIDEO_ENABLED to
// false to turn the video off entirely and use the animation alone.
// ---------------------------------------------------------------------------
const VIDEO_ENABLED = true;

const HERO_VIDEO_URL = "/videos/hero.mp4";

export default function HeroBackground() {
  if (!VIDEO_ENABLED) {
    return <GrowthBackground />;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-navy-900"
    >
      {/* Base layer — shows through if the video is missing or still loading. */}
      <GrowthBackground />

      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      {/* Legibility overlay — darkest on the left where the headline sits,
          fading right so the footage still reads through. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-900/78 to-navy-900/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
    </div>
  );
}
