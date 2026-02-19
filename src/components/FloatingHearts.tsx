import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  sway: number;
  delay: number;
  char: string;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const symbols = ["💜", "💜", "💜", "🤍", "💚", "💜"];
    const initial: Heart[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.random() * 14 + 12,
      duration: Math.random() * 8 + 7,
      sway: Math.random() * 3 + 2,
      delay: Math.random() * 6,
      char: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    setHearts(initial);

    const interval = setInterval(() => {
      setHearts((prev) => {
        const newHeart: Heart = {
          id: Date.now(),
          left: Math.random() * 95,
          size: Math.random() * 14 + 12,
          duration: Math.random() * 8 + 7,
          sway: Math.random() * 3 + 2,
          delay: 0,
          char: symbols[Math.floor(Math.random() * symbols.length)],
        };
        return [...prev.slice(-14), newHeart];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-particle select-none"
          style={{
            left: `${h.left}%`,
            bottom: "-30px",
            "--size": `${h.size}px`,
            "--duration": `${h.duration}s`,
            "--sway": `${h.sway}s`,
            animationDelay: `${h.delay}s`,
          } as React.CSSProperties}
        >
          {h.char}
        </span>
      ))}
    </>
  );
};

export default FloatingHearts;
