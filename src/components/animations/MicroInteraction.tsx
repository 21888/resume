/**
 * Micro-interaction component for buttons and cards
 */

'use client';

import { m } from 'framer-motion';
import { MicroInteractionProps } from '@/types';
import useAppStore from '@/store/app-store';

const MicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  type,
  scale = 1.05,
  duration = 0.2,
  className = '',
}) => {
  const { reduceMotion } = useAppStore();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getAnimationProps = () => {
    const baseProps = {
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
        duration,
      },
    };

    switch (type) {
      case 'hover':
        return {
          ...baseProps,
          whileHover: {
            scale,
            y: -2,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
        };

      case 'tap':
        return {
          ...baseProps,
          whileTap: {
            scale: scale * 0.95,
            transition: { duration: 0.1 },
          },
          whileHover: {
            scale: scale * 1.02,
          },
        };

      case 'focus':
        return {
          ...baseProps,
          whileFocus: {
            scale: scale * 1.02,
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
          },
        };

      default:
        return baseProps;
    }
  };

  return (
    <m.div
      className={className}
      {...getAnimationProps()}
    >
      {children}
    </m.div>
  );
};

export default MicroInteraction;