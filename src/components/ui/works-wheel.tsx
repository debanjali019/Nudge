"use client";

import * as React from "react";
import { ArrowUpRight, ChevronUp, ChevronDown, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project/Friction point title. */
  title: string;
  /** Background or cover imagery. */
  image: string;
  /** Link target if applicable. */
  href?: string;
  /** Item identifier badge (e.g. '01', '02'). */
  id?: string;
  /** Descriptive body copy. */
  desc?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the center during initial transition. */
  label?: string;
  /** Label on the card affordance badge. */
  action?: string;
  /** Whether the wheel auto-rotates continuously when idle. @default true */
  autoPlay?: boolean;
  /** Milliseconds between auto steps. @default 3200 */
  autoPlayInterval?: number;
}

/* 3D Geometry tuning */
const CARD_H = 0.44; // Card height as fraction of stage
const CARD_MAX_W = 0.44; // Card width max limit
const CARD_RATIO = 1.48; // Aspect ratio (width / height)
const STEP = 48; // Degrees between items along the drum cylinder
const DRUM = 2.15; // Drum radius in card heights
const LENS = 2.8; // Perspective distance
const BOW = 1.4; // Subtle 3/4 arc perspective
const DRAG_UNITS = 300;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  drumDeg: number,
  drumR: number,
  bow: number,
) {
  return (
    `translateX(${bowAt(drumDeg, bow)}px)` +
    ` rotateX(${drumDeg}deg) translateZ(${drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "6 Friction Points",
  action = "Details",
  autoPlay = true,
  autoPlayInterval = 3200,
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);

  const count = items.length;
  // Initialize turn at 0 and target at 0; will smoothly blossom into drum
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState({ w: 900, h: 540 });
  const [isPlaying, setIsPlaying] = React.useState(autoPlay);
  const isHovered = React.useRef(false);
  const isInteracting = React.useRef(false);
  const drag = React.useRef<number | null>(null);

  // ResizeObserver for responsive stage sizing
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => {
      const w = el.clientWidth || 900;
      const h = el.clientHeight || 540;
      setStage({ w, h });
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    return {
      cardW,
      cardH,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: Math.max(cardH * 0.12, 18),
      index: Math.max(cardH * 0.045, 13),
    };
  }, [stage]);

  // Main animation render loop (rAF) with wrap-around geometry
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) {
        turn.current = target.current;
      } else {
        turn.current += gap * EASE;
      }

      const pos = turn.current;

      // Position drum in 3D perspective
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        // Wrap distance into [-count / 2, count / 2] for continuous seamless cylinder
        let d = ((i - (pos % count)) + count) % count;
        if (d > count / 2) d -= count;
        if (d < -count / 2) d += count;

        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(drumDeg, drumR, bow);

          // Soft opacity fade as cards rotate along the sides of the cylinder
          const dist = Math.abs(d);
          const opacity = dist > 2.2 ? Math.max(0, 1 - (dist - 2.2) * 2) : 1;
          card.style.opacity = String(opacity);
          card.style.zIndex = String(Math.round(100 - dist * 10));
          card.style.pointerEvents = dist < 0.8 ? "auto" : dist < 1.6 ? "auto" : "none";
        }
      }

      const rawActive = Math.round(pos) % count;
      const normalizedActive = (rawActive + count) % count;
      setActive((prev) => (prev === normalizedActive ? prev : normalizedActive));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count]);

  // Navigate to target index via shortest rotational direction
  const toIndex = React.useCallback(
    (targetIdx: number) => {
      const currentIdx = ((Math.round(target.current) % count) + count) % count;
      let diff = targetIdx - currentIdx;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      target.current = Math.round(target.current) + diff;
    },
    [count],
  );

  const nextCard = React.useCallback(() => {
    target.current = Math.round(target.current) + 1;
  }, []);

  const prevCard = React.useCallback(() => {
    target.current = Math.round(target.current) - 1;
  }, []);

  // Auto-play interval: continuously turns the wheel when idle
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (!isHovered.current && !isInteracting.current && drag.current === null) {
        nextCard();
      }
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPlaying, autoPlayInterval, nextCard]);

  // Mouse wheel listener with single-notch advancement
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let wheelTimeout = 0;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 12) return;
      event.preventDefault();
      isInteracting.current = true;
      window.clearTimeout(wheelTimeout);

      const dir = event.deltaY > 0 ? 1 : -1;
      target.current = Math.round(target.current) + dir;

      wheelTimeout = window.setTimeout(() => {
        isInteracting.current = false;
      }, 500);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(wheelTimeout);
    };
  }, []);

  return (
    <section
      aria-label={label}
      className={cn(
        "relative h-full min-h-[460px] w-full overflow-hidden select-none",
        className,
      )}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
      {...props}
    >
      {/* 3D Perspective Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-label={label}
        className="absolute inset-0 cursor-grab touch-pan-x outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-white/40"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          isInteracting.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const delta = drag.current - event.clientY;
          target.current += delta / DRAG_UNITS;
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          target.current = Math.round(target.current);
          setTimeout(() => {
            isInteracting.current = false;
          }, 400);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            nextCard();
            event.preventDefault();
          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            prevCard();
            event.preventDefault();
          }
        }}
      >
        {/* Central 3D Wheel Drum */}
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, i) => {
            const isCurrent = i === active;
            return (
              <div
                key={item.title}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                onClick={() => {
                  if (!isCurrent) toIndex(i);
                }}
                className={cn(
                  "group absolute cursor-pointer transition-shadow duration-300",
                  isCurrent ? "scale-[1.02]" : "hover:brightness-110",
                )}
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Visual Card Face */}
                <div
                  className={cn(
                    "relative block size-full overflow-hidden rounded-2xl border transition-all duration-300",
                    isCurrent
                      ? "border-white/40 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.7),0_0_25px_rgba(32,56,226,0.5)] ring-1 ring-white/30"
                      : "border-white/15 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)]",
                  )}
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(20, 36, 145, 0.95) 0%, rgba(10, 20, 90, 0.98) 100%)",
                  }}
                >
                  {/* Atmospheric cover image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="size-full object-cover opacity-35 mix-blend-luminosity brightness-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none" />

                  {/* Card Content */}
                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between text-left pointer-events-none z-10">
                    <div className="flex items-center justify-between">
                      {item.id && (
                        <span className="px-3 py-1 rounded-md text-xs font-bold tracking-wider bg-[#FF5A00] text-white shadow-md">
                          {item.id}
                        </span>
                      )}
                      <span className="text-white/50 text-xs font-mono tracking-widest">
                        {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <h4
                        className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2 leading-tight"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {item.title}
                      </h4>
                      {item.desc && (
                        <p className="text-white/85 text-xs sm:text-sm lg:text-[0.95rem] leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Link / Action tag */}
                  {action && item.href && (
                    <a
                      href={item.href}
                      className="pointer-events-auto absolute right-3.5 bottom-3.5 z-20 flex items-center gap-1.5 rounded-full bg-white/20 hover:bg-[#FF5A00] text-white px-3 py-1 text-xs font-medium backdrop-blur-md transition-all duration-200"
                    >
                      <ArrowUpRight className="size-3" />
                      {action}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Vertical Navigation Arrows (Left Side) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        <button
          type="button"
          onClick={prevCard}
          aria-label="Previous reason"
          className="size-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
        >
          <ChevronUp className="size-5" />
        </button>
        <button
          type="button"
          onClick={nextCard}
          aria-label="Next reason"
          className="size-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg"
        >
          <ChevronDown className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause auto rotation" : "Play auto rotation"}
          className="size-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-lg mt-1"
          title={isPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
        >
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
        </button>
      </div>

      {/* Interactive Right-hand Index List */}
      <ol
        className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 text-right leading-[1.8] z-30 max-w-[42%] hidden sm:block"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => {
          const isSelected = i === active;
          return (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => toIndex(i)}
                className={cn(
                  "cursor-pointer transition-all duration-200 outline-none text-right block ml-auto py-0.5",
                  isSelected
                    ? "text-white font-bold scale-105"
                    : "text-white/45 hover:text-white/80",
                )}
              >
                <span className={cn(
                  "mr-2 text-xs",
                  isSelected ? "text-[#FF5A00] font-bold" : "text-white/40"
                )}>
                  {item.id || `0${i + 1}`}
                </span>
                <span>{item.title}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Bottom Step Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => toIndex(i)}
            aria-label={`Go to ${item.title}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active
                ? "w-6 bg-[#FF5A00]"
                : "w-2 bg-white/40 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </section>
  );
}

export default WorksWheel;
