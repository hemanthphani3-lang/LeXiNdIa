import { motion } from 'motion/react';

export default function AshokaChakra({ size = 200, animate = true }) {
  return (
    <motion.div
      animate={animate ? { rotate: 360 } : {}}
      transition={animate ? { duration: 60, repeat: Infinity, ease: "linear" } : {}}
      className="w-full h-full"
    >
      <svg viewBox="0 0 200 200" width={size} height={size} className="w-full h-full">
        {/* Outer Circle */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#0A1F44" strokeWidth="2" />
        
        {/* Center Circle */}
        <circle cx="100" cy="100" r="15" fill="#0A1F44" />
        
        {/* 24 Spokes */}
        {[...Array(24)].map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + 20 * Math.cos(rad);
          const y1 = 100 + 20 * Math.sin(rad);
          const x2 = 100 + 90 * Math.cos(rad);
          const y2 = 100 + 90 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#0A1F44"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </motion.div>
  );
}
