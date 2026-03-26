"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";



type DrawerSide = "bottom";

interface DrawerProps {
  side?: DrawerSide;
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  onClose: (open: boolean) => void;
}



const panelVariants: Record<DrawerSide, object> = {
  bottom: {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 250, 
        damping: 36, 
        mass: 1.1,
        restDelta: 0.001,
      },
    },
    exit: {
      y: "100%",
      transition: {
        duration: 0.38,
        ease: [0.4, 0, 1, 1],
      },
    },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.38, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.32, ease: "easeIn" } },
};


const panelShape: Record<DrawerSide, string> = {
  bottom: "inset-x-0 bottom-0 w-full max-h-[90vh] rounded-t-3xl",
};


export default function Drawer({
  side = "bottom",
  title = "Panel",
  children,
  open,
  onClose,
}: DrawerProps) {
  return (

    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50"
          style={{ willChange: "transform" }}
        >
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/50 backdrop-blur-[4px]"
            onClick={() => onClose(false)}
            style={{ willChange: "opacity" }}
          />

          <motion.div
            key="panel"
            variants={panelVariants[side] as any}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute ${panelShape[side]} flex flex-col bg-popover overflow-hidden`}
            style={{
              willChange: "transform",
              boxShadow: "0 -12px 80px rgba(0,0,0,0.6)",
            }}
          >
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 60%, transparent)",
              }}
            />

            <div className="relative z-10 flex items-center justify-between px-6 pt-3 pb-3 border-b border-border shrink-0">
              {side === "bottom" && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-popover-foreground/20" />
              )}

              <h2 className="text-2xl font-bold tracking-tight text-popover-foreground">
                {title}
              </h2>

              <button
                type="button"
                onClick={() => onClose(false)}
                className="flex items-center justify-center size-8 rounded-full border border-border bg-popover-foreground/10 hover:bg-popover-foreground/15 text-popover-foreground/60 hover:text-popover-foreground transition-all duration-150"
              >
                <XMarkIcon className="size-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto px-6 py-2 text-sm leading-relaxed">
              {children ?? (
                <div className="space-y-3 py-4">
                  {[75, 55, 88, 45, 68, 80].map((w, i) => (
                    <div
                      key={i}
                      className="h-2.5 rounded-full bg-popover-foreground/[0.06]"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                  <div className="mt-6 h-36 rounded-2xl bg-popover-foreground/[0.04] border border-border" />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[1, 2].map((k) => (
                      <div
                        key={k}
                        className="h-24 rounded-xl bg-popover-foreground/[0.04] border border-border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
