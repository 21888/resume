/**
 * Custom cursor component with trailing gradient effect
 */

'use client';

import { useEffect, useState } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { CustomCursorProps } from '@/types';
import useAppStore from '@/store/app-store';

const CustomCursor: React.FC<CustomCursorProps> = ({
  variant = 'default',
  size = 20,
  color,
}) => {
  const { reduceMotion } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (reduceMotion) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2);
      cursorY.set(e.clientY - size / 2);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [role="button"], input, textarea, select, [tabindex]');
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, size, reduceMotion]);

  if (reduceMotion || !isVisible) return null;

  const getCursorStyles = () => {
    const baseSize = isHovering ? size * 1.5 : size;
    
    switch (variant) {
      case 'hover':
        return {
          width: baseSize * 1.2,
          height: baseSize * 1.2,
          background: color || 'rgba(59, 130, 246, 0.8)',
          mixBlendMode: 'difference' as const,
        };
      case 'click':
        return {
          width: baseSize * 0.8,
          height: baseSize * 0.8,
          background: color || 'rgba(239, 68, 68, 0.8)',
          border: '2px solid rgba(239, 68, 68, 1)',
        };
      default:
        return {
          width: baseSize,
          height: baseSize,
          background: color || 'linear-gradient(45deg, #0ea5e9, #d946ef)',
        };
    }
  };

  return (
    <>
      {/* Main cursor */}
      <m.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          ...getCursorStyles(),
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Trailing effect */}
      <m.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full opacity-30"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: size * 2,
          height: size * 2,
          background: color || 'linear-gradient(45deg, #0ea5e9, #d946ef)',
          transform: `translate(-${size}px, -${size}px)`,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.2 : 0.1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
          delay: 0.1,
        }}
      />

      {/* Outer ring */}
      <m.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border-2 border-blue-500/20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: size * 3,
          height: size * 3,
          transform: `translate(-${size * 1.5}px, -${size * 1.5}px)`,
        }}
        animate={{
          scale: isHovering ? 1.3 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 25,
          delay: 0.2,
        }}
      />
    </>
  );
};

export default CustomCursor;