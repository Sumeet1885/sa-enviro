"use client"; // remove if NOT using Next.js App Router

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SEO } from "@/components/layout/SEO";
import { seoData, team_member } from "@/constants/siteData";
import TeamSlider from "@/components/Sections/Team_Section";
import HeroSection from "@/components/Sections/HeroSection";

// ─── Tuning ───────────────────────────────────────────────────────────────────
const ATTACH_THRESHOLD = 0.97;
const AVATAR_SIZE = 150; // must match w-[150px] h-[150px] in the circle below
const SPEED = 1.0;

// ─── Types ────────────────────────────────────────────────────────────────────
interface FloatState {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  progress: number;
  active: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Team() {
  // heroSpotRef  → the invisible anchor sitting in the hero right column
  // It is the SAME SIZE as the circle (150×150) so position math is exact.
  const heroSpotRef = useRef<HTMLDivElement>(null);
  const firstAvatarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const [float, setFloat] = useState<FloatState>({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 0,
    progress: 0,
    active: false,
  });

  const firstMember = team_member[0];

  // ─── Core animation tick ───────────────────────────────────────────────────
  const computeFloat = useCallback(() => {
    if (window.innerWidth < 1024) {
      setFloat((p) =>
        p.active ? { ...p, active: false, opacity: 0, progress: 1 } : p,
      );
      return;
    }

    const src = heroSpotRef.current;
    const tgt = firstAvatarRef.current;
    if (!src || !tgt) return;

    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    const srcRect = src.getBoundingClientRect();
    const tgtRect = tgt.getBoundingClientRect();

    // ── Document-space Y (stable across all scroll positions) ──────────────
    const tgtDocTop = scrollY + tgtRect.top;

    // ── Progress: 0 at first scroll, 1 when target is centered in viewport ─
    const animStart = 0;
    const animEnd = tgtDocTop - vh * 0.5;
    const animRange = Math.max((animEnd - animStart) / SPEED, 1);
    const progress = Math.min(
      1,
      Math.max(0, (scrollY - animStart) / animRange),
    );

    // ── Smooth ease-in-out cubic ───────────────────────────────────────────
    const e =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    // ── Both rects give viewport-space centers (correct for position:fixed) ─
    // Use CENTER of each element so the circle travels center-to-center.
    // This eliminates the jump caused by top-left offset mismatch.
    const srcCX = srcRect.left + srcRect.width / 2;
    const srcCY = srcRect.top + srcRect.height / 2;
    const tgtCX = tgtRect.left + tgtRect.width / 2;
    const tgtCY = tgtRect.top + tgtRect.height / 2;

    // Interpolated center position
    const cx = srcCX + (tgtCX - srcCX) * e;
    const cy = srcCY + (tgtCY - srcCY) * e;

    // ── Scale: shrink from AVATAR_SIZE → target avatar's actual rendered size
    const scale = 1 + (tgtRect.width / AVATAR_SIZE - 1) * e;

    // ── Convert center back to top-left for the fixed div ─────────────────
    // The floating div is AVATAR_SIZE wide, centered via translate.
    // We position it so its center lands exactly on (cx, cy).
    const x = cx - AVATAR_SIZE / 2;
    const y = cy - AVATAR_SIZE / 2;

    // ── Opacity: full 0→60%, fade to 0 by 100% ────────────────────────────
    const opacity =
      progress <= 0.6 ? 1 : Math.max(0, 1 - (progress - 0.6) / 0.4);

    setFloat({ x, y, scale, opacity, progress, active: true });
  }, []);

  // ── rAF-throttled scroll ────────────────────────────────────────────────
  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(computeFloat);
  }, [computeFloat]);

  useEffect(() => {
    computeFloat();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeFloat);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeFloat);
    };
  }, [computeFloat, onScroll]);

  // ── Derived ────────────────────────────────────────────────────────────
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  const isAttached = !isDesktop || float.progress >= ATTACH_THRESHOLD;

  // AvatarCircle removed — visual circle now lives inside HeroSection's spotlight card

  return (
    <>
      <SEO title={seoData.team.title} description={seoData.team.description} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <HeroSection
        title="Our Team"
        heading="🤝 The People Behind SAES"
        subtitle="Experienced Professionals Committed to Excellence in Water, Wastewater & Pollution Control"
        spotlightMember={firstMember}
        avatarFlying={float.active && float.opacity > 0.005}
        rightContent={
          /*
            Invisible anchor div — exact same size as the visual circle (AVATAR_SIZE).
            heroSpotRef reads its bounding rect every rAF frame as the "from" position.
            position:absolute so it overlays the circle inside the card.
            Goes transparent while the floating clone is in flight.
          */
          <div
            ref={heroSpotRef}
            style={{
              position: "absolute",
              inset: 0,
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              pointerEvents: "none",
            }}
          />
        }
      />

      {/* ── Floating clone ────────────────────────────────────────────────── */}
      {/*
        Exactly AVATAR_SIZE × AVATAR_SIZE, position:fixed.
        Translated so its CENTER tracks the interpolated (cx, cy).
        transformOrigin: "center" so scale expands/shrinks from the circle's
        own center — eliminates the corner-jump glitch from "top left".
      */}
      {float.active && float.opacity > 0.005 && (
        <div
          aria-hidden="true"
          className="hidden lg:block fixed z-30 pointer-events-none font-serif"
          style={{
            top: 0,
            left: 0,
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            transform: `translate3d(${float.x}px, ${float.y}px, 0) scale(${float.scale})`,
            transformOrigin: "center",
            opacity: float.opacity,
            willChange: "transform, opacity",
          }}
        >
          {/* Floating clone shows the avatar circle directly */}
          <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-water-sky/60 shadow-[0_0_30px_rgba(56,189,248,0.4)]">
            {firstMember.image ? (
              <img
                src={firstMember.image}
                alt={firstMember.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white font-semibold text-2xl"
                style={{
                  background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)",
                }}
              >
                {firstMember.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Team Slider ───────────────────────────────────────────────────── */}
      <TeamSlider
        firstAvatarRef={firstAvatarRef}
        holdPrimaryDetails={!isAttached}
        freezeCarousel={!isAttached}
      />
    </>
  );
}
