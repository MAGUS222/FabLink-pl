import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
  isScrolled?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", showText = true, isScrolled = false }) => {
  const containerVariants = {
    initial: {},
    hover: {}
  };

  const nodeVariants = {
    top: { initial: { y: 0 }, hover: { y: -8 } },
    bottom: { initial: { y: 0 }, hover: { y: 8 } },
    left: { initial: { x: 0 }, hover: { x: -8 } },
    right: { initial: { x: 0 }, hover: { x: 8 } }
  };

  return (
    <motion.div 
      className={`flex items-center gap-3 cursor-pointer group ${className}`}
      initial="initial"
      whileHover="hover"
      variants={containerVariants}
    >
      <svg 
        viewBox="-10 -10 120 120" 
        className="h-full w-auto overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rounded Square with Gaps */}
        <path 
          d="M25 22H42 M58 22H75C77.7614 22 80 24.2386 80 27V42 M80 58V73C80 75.7614 77.7614 78 75 78H58 M42 78H25C22.2386 78 20 75.7614 20 73V58 M20 42V27C20 24.2386 22.2386 22 25 22" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        
        {/* Interlocking Links (Chain) - Two distinct links */}
        <g transform="translate(50, 50) rotate(-45) scale(0.85)">
          {/* Bottom-Left Link */}
          <rect 
            x="-24" y="-10" width="34" height="20" rx="10" 
            stroke="currentColor" strokeWidth="8" strokeLinecap="round"
          />
          {/* Top-Right Link */}
          <rect 
            x="-10" y="-10" width="34" height="20" rx="10" 
            stroke="currentColor" strokeWidth="8" strokeLinecap="round"
            className="fill-white" // To create the interlocking effect
          />
          {/* Redraw part of the first link to complete the interlock look */}
          <path 
            d="M-10 0 A10 10 0 0 1 -20 -10" 
            stroke="currentColor" strokeWidth="8" strokeLinecap="round"
            fill="none"
            transform="translate(0, 0)"
          />
        </g>

        {/* Top Node */}
        <motion.g variants={nodeVariants.top} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <line x1="50" y1="22" x2="50" y2="8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="8" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        </motion.g>
        
        {/* Bottom Node */}
        <motion.g variants={nodeVariants.bottom} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <line x1="50" y1="78" x2="50" y2="92" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="92" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        </motion.g>
        
        {/* Left Node */}
        <motion.g variants={nodeVariants.left} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <line x1="20" y1="50" x2="6" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="6" cy="50" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        </motion.g>
        
        {/* Right Node */}
        <motion.g variants={nodeVariants.right} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <line x1="80" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="94" cy="50" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        </motion.g>
      </svg>
      
      {showText && (
        <div className="flex items-baseline font-bold text-2xl tracking-tight">
          <span className="text-slate-900">Fab</span>
          <span className="text-accent-blue">Link</span>
          <span className="text-slate-400 text-sm ml-0.5">.pl</span>
        </div>
      )}
    </motion.div>
  );
};

export default Logo;
