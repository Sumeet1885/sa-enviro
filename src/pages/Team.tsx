

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SEO } from "@/components/layout/SEO";
import { seoData, team_member } from "@/constants/siteData";
import TeamSlider from "@/components/Sections/Team_Section";
import HeroSection from "@/components/Sections/HeroSection";

const ATTACH_THRESHOLD = 0.97;
const AVATAR_SIZE = 150; 
const SPEED = 1.0;

interface FloatState {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  progress: number;
  active: boolean;
}

export default function Team() {

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

    const tgtDocTop = scrollY + tgtRect.top;

    const animStart = 0;
    const animEnd = tgtDocTop - vh * 0.5;
    const animRange = Math.max((animEnd - animStart) / SPEED, 1);
    const progress = Math.min(
      1,
      Math.max(0, (scrollY - animStart) / animRange),
    );

    const e =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    const srcCX = srcRect.left + srcRect.width / 2;
    const srcCY = srcRect.top + srcRect.height / 2;
    const tgtCX = tgtRect.left + tgtRect.width / 2;
    const tgtCY = tgtRect.top + tgtRect.height / 2;

    const cx = srcCX + (tgtCX - srcCX) * e;
    const cy = srcCY + (tgtCY - srcCY) * e;

    const scale = 1 + (tgtRect.width / AVATAR_SIZE - 1) * e;

    const x = cx - AVATAR_SIZE / 2;
    const y = cy - AVATAR_SIZE / 2;

    const opacity =
      progress <= 0.6 ? 1 : Math.max(0, 1 - (progress - 0.6) / 0.4);

    setFloat({ x, y, scale, opacity, progress, active: true });
  }, []);

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

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  const isAttached = !isDesktop || float.progress >= ATTACH_THRESHOLD;


  return (
    <>
      <SEO title={seoData.team.title} description={seoData.team.description} />

      <HeroSection
        title="Our Team"
        heading="🤝 The People Behind SAES"
        subtitle="Experienced Professionals Committed to Excellence in Water, Wastewater & Pollution Control"
        spotlightMember={firstMember}
        avatarFlying={float.active && float.opacity > 0.005}
        rightContent={

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

      <TeamSlider
        firstAvatarRef={firstAvatarRef}
        holdPrimaryDetails={!isAttached}
        freezeCarousel={!isAttached}
      />
    </>
  );
}
