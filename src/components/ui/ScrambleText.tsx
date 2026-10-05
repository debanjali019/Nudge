import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frame = 0;
    const maxFrames = 20;
    let animationFrame: number;

    const timeout = setTimeout(() => {
      const animate = () => {
        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (frame >= maxFrames * (i / text.length)) {
            result += text[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayText(result);

        if (frame < maxFrames) {
          frame++;
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animate();
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
}
