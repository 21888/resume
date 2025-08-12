/**
 * Skip to content link for keyboard navigation
 */

'use client';

import { m } from 'framer-motion';

const SkipToContent: React.FC = () => {
  const handleSkip = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <m.button
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[10000] px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      whileFocus={{ scale: 1.05 }}
    >
      跳转到主要内容
    </m.button>
  );
};

export default SkipToContent;