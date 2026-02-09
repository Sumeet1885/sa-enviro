 import { motion, useInView } from "framer-motion";
 import { useRef, ReactNode } from "react";
 
 interface RevealProps {
   children: ReactNode;
   className?: string;
   width?: "fit-content" | "100%";
   delay?: number;
 }
 
 export const Reveal = ({
   children,
   className = "",
   width = "fit-content",
   delay = 0
 }: RevealProps) => {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once: false, amount: 0.5 });
 
   return (
     <div ref={ref} style={{ width }} className={className}>
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
         transition={{
           duration: 0.5,
           delay,
           ease: "easeOut"
         }}
       >
         {children}
       </motion.div>
     </div>
   );
 };