 import { motion, useInView, Variants } from "framer-motion";
 import { useRef, ReactNode } from "react";
 
 interface AnimatedSectionProps {
   children: ReactNode;
   className?: string;
   delay?: number;
   direction?: "up" | "down" | "left" | "right" | "scale";
   once?: boolean;
   amount?: number;
 }
 
 const variants: Record<string, Variants> = {
   up: {
     hidden: { opacity: 0, y: 60 },
     visible: { opacity: 1, y: 0 }
   },
   down: {
     hidden: { opacity: 0, y: -60 },
     visible: { opacity: 1, y: 0 }
   },
   left: {
     hidden: { opacity: 0, x: -60 },
     visible: { opacity: 1, x: 0 }
   },
   right: {
     hidden: { opacity: 0, x: 60 },
     visible: { opacity: 1, x: 0 }
   },
   scale: {
     hidden: { opacity: 0, scale: 0.8 },
     visible: { opacity: 1, scale: 1 }
   }
 };
 
 export const AnimatedSection = ({
   children,
   className = "",
   delay = 0,
   direction = "up",
   once = false,
   amount = 0.3
 }: AnimatedSectionProps) => {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once, amount });
 
   return (
     <motion.div
       ref={ref}
       initial="hidden"
       animate={isInView ? "visible" : "hidden"}
       variants={variants[direction]}
       transition={{
         duration: 0.6,
         delay,
         ease: [0.25, 0.46, 0.45, 0.94]
       }}
       className={className}
     >
       {children}
     </motion.div>
   );
 };