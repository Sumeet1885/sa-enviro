"use client";
/**
 * ScrollAvatarBridge.tsx
 *
 * Drop this file into your project. It exports:
 *   1. <HeroAvatarAnchor />   — invisible anchor you place in HeroSection (right side)
 *   2. <TeamSliderSlot />     — invisible slot you place as first avatar in TestimonialSlider
 *   3. <FloatingAvatar />     — the ONE real floating avatar (place once, near root / layout)
 *
 * How it works:
 *   The rAF loop reads both anchor rects every frame, interpolates position/size
 *   based on scroll progress, and moves the floating avatar via direct DOM manipulation.
 *   No extra re-renders.
 *
 * Usage:
 *   // In your Layout or Page root:
 *   <FloatingAvatar firstMember={team_member[0]} />
 *
 *   // In HeroSection (right side of heading area):
 *   <HeroAvatarAnchor />
 *
 *   // In TestimonialSlider, replace the i===0 circle with:
 *   <TeamSliderSlot isActive={active === 0} memberColor="..." />
 */

import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  createContext,
  useContext,
} from "react";

// ─── Sizes ────────────────────────────────────────────────────────────────────
export const BIG = 140;   // hero avatar size px
export const SMALL = 62;  // team grid slot size px

// ─── Utils ────────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ─── Shared DOM-id contract ───────────────────────────────────────────────────
export const HERO_ANCHOR_ID  = "sab-hero-anchor";
export const TEAM_SLOT_ID    = "sab-team-slot";
export const FLOATING_AV_ID  = "sab-floating-avatar";

// ─── 1. HeroAvatarAnchor ─────────────────────────────────────────────────────
/**
 * Place this wherever you want the avatar to START in the hero.
 * It is completely invisible — just a positioned box the rAF reads.
 *
 * Example (right side of hero, vertically centered with the heading):
 *
 *   <div className="flex items-center justify-between">
 *     <AnimatedSection>...</AnimatedSection>
 *     <HeroAvatarAnchor />          ← right column
 *   </div>
 */
export function HeroAvatarAnchor() {
  return (
    <div
      id={HERO_ANCHOR_ID}
      aria-hidden="true"
      style={{
        width: BIG,
        height: BIG,
        borderRadius: "50%",
        visibility: "hidden",
        flexShrink: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── 2. TeamSliderSlot ────────────────────────────────────────────────────────
/**
 * Replace the i===0 circle in your TestimonialSlider with this.
 * It renders an invisible placeholder of the same size so layout is preserved.
 * The real floating avatar sits exactly on top of it once landed.
 *
 * Props:
 *   isActive   — pass (active === 0) so the button width/transform still works
 */
export function TeamSliderSlot({ isActive }: { isActive: boolean }) {
  return (
    <div
      id={TEAM_SLOT_ID}
      aria-hidden="true"
      style={{
        width: "100%",
        aspectRatio: "1",
        borderRadius: "50%",
        visibility: "hidden",
        // Mirror the active/inactive size so the slot occupies exactly the
        // same space as a real avatar circle would
        flexShrink: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── 3. FloatingAvatar ───────────────────────────────────────────────────────
/**
 * The ONE real avatar. Place it once near your layout root (outside scroll containers).
 * It is `position:fixed` and moved entirely by the rAF loop.
 *
 * Props:
 *   firstMember  — the team_member[0] object (needs .name, .image?, .color?)
 *   color        — accent color string, e.g. "#38bdf8"
 *   onLand       — called when avatar lands into team section (optional)
 *   onLift       — called when avatar lifts back to hero (optional)
 */
interface FloatingAvatarProps {
  firstMember: {
    name: string;
    image?: string;
    color?: string;
  };
  color?: string;
  onLand?: () => void;
  onLift?: () => void;
}

export function FloatingAvatar({
  firstMember,
  color = "#38bdf8",
  onLand,
  onLift,
}: FloatingAvatarProps) {
  const rafRef    = useRef<number>(0);
  const landedRef = useRef(false);

  useEffect(() => {
    function tick() {
      const heroEl  = document.getElementById(HERO_ANCHOR_ID);
      const slotEl  = document.getElementById(TEAM_SLOT_ID);
      const av      = document.getElementById(FLOATING_AV_ID);

      if (!heroEl || !slotEl || !av) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const scrollY = window.scrollY;
      const vh      = window.innerHeight;

      const hRect = heroEl.getBoundingClientRect();
      const tRect = slotEl.getBoundingClientRect();

      // Viewport-space centers
      const hx = hRect.left + hRect.width  / 2;
      const hy = hRect.top  + hRect.height / 2;
      const tx = tRect.left + tRect.width  / 2;
      const ty = tRect.top  + tRect.height / 2;

      // Document-space Y for stable progress calculation
      const heroDocY = heroEl.getBoundingClientRect().top  + scrollY + hRect.height / 2;
      const teamDocY = slotEl.getBoundingClientRect().top  + scrollY + tRect.height / 2;

      const halfVh = vh / 2;
      const raw =
        (scrollY - (heroDocY - halfVh)) /
        (teamDocY - halfVh - (heroDocY - halfVh));
      const p = Math.min(1, Math.max(0, raw));
      const e = easeInOut(p);

      const size = lerp(BIG, SMALL, e);
      const glow = 1 - e;

      const x = lerp(hx, tx, e);
      const y = lerp(hy, ty, e);

      // ── Position & size ──────────────────────────────────────────────────
      av.style.left   = `${x - size / 2}px`;
      av.style.top    = `${y - size / 2}px`;
      av.style.width  = `${size}px`;
      av.style.height = `${size}px`;

      // ── Glow / shadow ────────────────────────────────────────────────────
      av.style.background  = `radial-gradient(circle at 35% 35%, ${color}dd, ${color}88)`;
      av.style.boxShadow   = [
        `0 0 0 1px ${color}30`,
        `0 0 ${55 * glow}px ${28 * glow}px ${color}28`,
        `0 ${6 + 18 * glow}px ${28 + 44 * glow}px rgba(0,0,0,${0.35 + 0.2 * glow})`,
        `inset 0 1px 0 rgba(255,255,255,0.13)`,
      ].join(", ");

      // ── Font size for initial ─────────────────────────────────────────────
      av.style.fontSize    = `${size * 0.38}px`;

      // ── Landing detection ────────────────────────────────────────────────
      const wasLanded = landedRef.current;
      landedRef.current   = p >= 0.97;

      if (landedRef.current && !wasLanded) onLand?.();
      if (!landedRef.current && wasLanded) onLift?.();

      av.style.pointerEvents = landedRef.current ? "auto" : "none";
      av.style.opacity       = landedRef.current ? "0" : "1"; 
      // Hide it once landed so the real slot (which becomes visible) takes over.
      // If you want the avatar to remain clickable on top, set opacity to "1"
      // and make the slot stay hidden — your choice.

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [color, onLand, onLift]);

  return (
    <div
      id={FLOATING_AV_ID}
      aria-hidden="true"
      style={{
        position : "fixed",
        zIndex   : 9999,
        borderRadius: "50%",
        overflow : "hidden",
        willChange: "left, top, width, height",
        display  : "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "serif",
        fontStyle : "italic",
        fontWeight: 300,
        color     : "white",
        left      : -400,
        top       : -400,
        width     : BIG,
        height    : BIG,
        fontSize  : BIG * 0.38,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {firstMember.image ? (
        <img
          src={firstMember.image}
          alt={firstMember.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        firstMember.name.charAt(0).toUpperCase()
      )}
    </div>
  );
}