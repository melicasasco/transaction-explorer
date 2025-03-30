'use client';
import { useState, useEffect } from 'react';

export const DESKTOP_BREAKPOINT = 1024;

type ResponsiveConfig = {
  breakpoint: number;
  dimension?: 'h';
};

export const useResponsive = (config: ResponsiveConfig) => {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (config.dimension === 'h') {
        setIsAboveBreakpoint(window.innerHeight >= config.breakpoint);
      } else { 
        setIsAboveBreakpoint(window.innerWidth >= config.breakpoint);
      }
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [config.breakpoint, config.dimension]);

  return isAboveBreakpoint;
};