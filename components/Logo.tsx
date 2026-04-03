import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  isScrolled?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", showText = true, isScrolled = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Rounded Square Frame */}
        <path 
          d="M25 20H75C77.7614 20 80 22.2386 80 25V75C80 77.7614 77.7614 80 75 80H25C22.2386 80 20 77.7614 20 75V25C20 22.2386 22.2386 20 25 20Z" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        
        {/* Top Node */}
        <line x1="50" y1="20" x2="50" y2="10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <circle cx="50" cy="10" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        
        {/* Bottom Node */}
        <line x1="50" y1="80" x2="50" y2="90" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <circle cx="50" cy="90" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        
        {/* Left Node */}
        <line x1="20" y1="50" x2="10" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <circle cx="10" cy="50" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        
        {/* Right Node */}
        <line x1="80" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <circle cx="90" cy="50" r="5" fill="white" stroke="currentColor" strokeWidth="4" />
        
        {/* Interlocking Links */}
        <g transform="translate(32, 32) scale(0.35)">
          {/* Top Link */}
          <path 
            d="M75.5 24.5C84.3 33.3 84.3 47.7 75.5 56.5L56.5 75.5C47.7 84.3 33.3 84.3 24.5 75.5C15.7 66.7 15.7 52.3 24.5 43.5L34 34" 
            stroke="currentColor" 
            strokeWidth="12" 
            strokeLinecap="round"
          />
          {/* Bottom Link */}
          <path 
            d="M66 66L75.5 56.5C84.3 47.7 84.3 33.3 75.5 24.5C66.7 15.7 52.3 15.7 43.5 24.5L24.5 43.5C15.7 52.3 15.7 66.7 24.5 75.5C33.3 84.3 47.7 84.3 56.5 75.5L66 66" 
            stroke="currentColor" 
            strokeWidth="12" 
            strokeLinecap="round"
          />
        </g>
      </svg>
      
      {showText && (
        <div className="flex items-baseline font-bold text-2xl tracking-tight">
          <span className="text-slate-900">Fab</span>
          <span className="text-accent-blue">Link</span>
          <span className="text-slate-400 text-sm ml-0.5">.pl</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
