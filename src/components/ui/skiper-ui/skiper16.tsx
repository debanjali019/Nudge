"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

export const StickyCard_001 = ({
  i,
  children,
  progress,
  range,
  targetScale,
}: {
  i: number;
  children: React.ReactNode;
  progress: any;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center min-h-screen"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 40}px)`,
        }}
        className="relative origin-top flex flex-col w-full items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const Skiper16Stack = ({ cards }: { cards: React.ReactNode[] }) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <div
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pb-[50vh]"
      >
        {cards.map((card, i) => {
          const targetScale = Math.max(
            0.5,
            1 - (cards.length - i - 1) * 0.05,
          );
          return (
            <StickyCard_001
              key={`card_${i}`}
              i={i}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            >
              {card}
            </StickyCard_001>
          );
        })}
      </div>
    </ReactLenis>
  );
};
