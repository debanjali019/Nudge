import React from 'react';

export function StickyStack({ cards }: { cards: React.ReactNode[] }) {
  return (
    <div className="relative">
      {cards.map((card, i) => (
        <div
          key={i}
          className="sticky top-0 min-h-screen flex items-center justify-center py-24"
          style={{ zIndex: i + 1, backgroundColor: 'var(--bg-color-light)' }}
        >
          {card}
        </div>
      ))}
    </div>
  );
}
