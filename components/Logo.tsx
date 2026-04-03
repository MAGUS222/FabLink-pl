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
    top: { initial: { y: 0 }, hover: { y: -6 } },
    bottom: { initial: { y: 0 }, hover: { y: 6 } },
    left: { initial: { x: 0 }, hover: { x: -6 } },
    right: { initial: { x: 0 }, hover: { x: 6 } }
  };

  return (
    <motion.div 
      className={`flex items-center gap-3 cursor-pointer group ${className}`}
      initial="initial"
      whileHover="hover"
      variants={containerVariants}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto"
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
        
        {/* Interlocking Links (Chain) */}
        <g transform="translate(32, 32) scale(0.36)">
          <path 
            d="M75.5 24.5C84.3 33.3 84.3 47.7 75.5 56.5L56.5 75.5C47.7 84.3 33.3 84.3 24.5 75.5C15.7 66.7 15.7 52.3 24.5 43.5L34 34" 
            stroke="currentColor" 
            strokeWidth="12" 
            strokeLinecap="round"
          />
          <path 
            d="M66 66L75.5 56.5C84.3 47.7 84.3 33.3 75.5 24.5C66.7 15.7 52.3 15.7 43.5 24.5L24.5 43.5C15.7 52.3 15.7 66.7 24.5 75.5C33.3 84.3 47.7 84.3 56.5 75.5L66 66" 
            stroke="currentColor" 
            strokeWidth="12" 
            strokeLinecap="round"
          />
        </g>

        {/* Top Node */}
        <motion.g variants={nodeVariants.top} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <line x1="50" y1="22" x2="50" y2="10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="10" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        </motion.g>
        
        {/* Bottom Node */}
        <motion.g variants={nodeVariants.bottom} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <line x1="50" y1="78" x2="50" y2="90" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="90" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        </motion.g>
        
        {/* Left Node */}
        <motion.g variants={nodeVariants.left} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <line x1="20" y1="50" x2="8" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="8" cy="50" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        </motion.g>
        
        {/* Right Node */}
        <motion.g variants={nodeVariants.right} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <line x1="80" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="92" cy="50" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
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
