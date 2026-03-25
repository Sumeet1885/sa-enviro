
import {
  useEffect,
  useRef,

} from "react";

export const BIG = 140;   
export const SMALL = 62;  

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export const HERO_ANCHOR_ID  = "sab-hero-anchor";
export const TEAM_SLOT_ID    = "sab-team-slot";
export const FLOATING_AV_ID  = "sab-floating-avatar";


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
        flexShrink: 0,
        pointerEvents: "none",
      }}
    />
  );
}


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
  const coordsRef = useRef({ hx: 0, hy: 0, tx: 0, ty: 0, heroDocY: 0, teamDocY: 0 });

  useEffect(() => {
    const updateCoords = () => {
      const heroEl = document.getElementById(HERO_ANCHOR_ID);
      const slotEl = document.getElementById(TEAM_SLOT_ID);
      if (!heroEl || !slotEl) return;

      const hRect = heroEl.getBoundingClientRect();
      const tRect = slotEl.getBoundingClientRect();
      const scrollY = window.scrollY;

      coordsRef.current = {
        hx: hRect.left + hRect.width / 2,
        hy: hRect.top + hRect.height / 2,
        tx: tRect.left + tRect.width / 2,
        ty: tRect.top + tRect.height / 2,
        heroDocY: hRect.top + scrollY + hRect.height / 2,
        teamDocY: tRect.top + scrollY + tRect.height / 2,
      };
    };

    updateCoords();
    const ro = new ResizeObserver(updateCoords);
    const heroEl = document.getElementById(HERO_ANCHOR_ID);
    const slotEl = document.getElementById(TEAM_SLOT_ID);
    if (heroEl) ro.observe(heroEl);
    if (slotEl) ro.observe(slotEl);
    window.addEventListener("resize", updateCoords);

    function tick() {
      const av = document.getElementById(FLOATING_AV_ID);
      if (!av) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const { hx, hy, tx, ty, heroDocY, teamDocY } = coordsRef.current;

      const halfVh = vh / 2;
      const denom = teamDocY - heroDocY;
      const raw = denom === 0 ? 0 : (scrollY - (heroDocY - halfVh)) / (teamDocY - heroDocY);
      
      const p = Math.min(1, Math.max(0, raw));
      const e = easeInOut(p);

      const size = lerp(BIG, SMALL, e);
      const glow = 1 - e;

      // Current viewport positions
      const curHx = hx;
      const curHy = heroDocY - scrollY;
      const curTx = tx;
      const curTy = teamDocY - scrollY;

      const x = lerp(curHx, curTx, e);
      const y = lerp(curHy, curTy, e);

      av.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      av.style.width = `${size}px`;
      av.style.height = `${size}px`;

      av.style.background = `radial-gradient(circle at 35% 35%, ${color}dd, ${color}88)`;
      av.style.boxShadow = [
        `0 0 0 1px ${color}30`,
        `0 0 ${55 * glow}px ${28 * glow}px ${color}28`,
        `0 ${6 + 18 * glow}px ${28 + 44 * glow}px rgba(0,0,0,${0.35 + 0.2 * glow})`,
        `inset 0 1px 0 rgba(255,255,255,0.13)`,
      ].join(", ");

      av.style.fontSize = `${size * 0.38}px`;

      const wasLanded = landedRef.current;
      landedRef.current = p >= 0.97;

      if (landedRef.current && !wasLanded) onLand?.();
      if (!landedRef.current && wasLanded) onLift?.();

      av.style.pointerEvents = landedRef.current ? "auto" : "none";
      av.style.opacity = landedRef.current ? "0" : "1";

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize", updateCoords);
    };
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