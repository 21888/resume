'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/components/role-adaptive';
import { m } from 'framer-motion';
import PageLayout from '@/components/ui/PageLayout';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import SalarySection from '@/components/sections/SalarySection';
import ContactSection from '@/components/sections/ContactSection';
import ProjectAchievementSection from '@/components/sections/ProjectAchievementSection';

export default function HomePage() {
  const router = useRouter();
  const { role, isLoading } = useRole();

  // Redirect to landing if no role is selected
  useEffect(() => {
    if (!role && !isLoading) {
      router.push('/');
    }
  }, [role, isLoading, router]);

  // Ensure scrolling to hash after navigation from other pages (e.g., project detail)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isLoading || !role) return;

    const hash = window.location.hash ? window.location.hash.replace('#', '') : '';
    if (!hash) return;

    let attempts = 0;
    const maxAttempts = 20;
    let mo: MutationObserver | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const tryScroll = () => {
      const element = document.getElementById(hash);
      if (element) {
        const navOffset = 80; // approximate fixed nav height
        const rect = element.getBoundingClientRect();
        const targetTop = rect.top + window.pageYOffset - navOffset;
        window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });

        // Nudge observers multiple times + tiny wiggle to force IO callbacks
        const nudge = () => window.dispatchEvent(new Event('scroll'));
        requestAnimationFrame(nudge);
        setTimeout(nudge, 120);
        setTimeout(() => window.scrollBy({ top: 2, behavior: 'auto' }), 140);
        setTimeout(() => window.scrollBy({ top: -2, behavior: 'auto' }), 180);
        setTimeout(nudge, 280);

        // Clean up mutation observer and timeout
        if (mo) {
          mo.disconnect();
          mo = null;
        }
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      } else if (attempts < maxAttempts) {
        attempts += 1;
        setTimeout(tryScroll, 120);
      } else {
        // Fallback: set hash to let browser attempt default behavior
        if (hash && window.location.hash.replace('#', '') !== hash) {
          window.location.hash = `#${hash}`;
        }
      }
    };

    // Wait for next frame so observers/refs are attached, then retry until element is ready
    requestAnimationFrame(tryScroll);

    // Additionally observe DOM mutations to catch late mounts
    try {
      mo = new MutationObserver(() => {
        const element = document.getElementById(hash);
        if (element) {
          tryScroll();
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    } catch {}

    // Safety timeout to stop observing
    timeoutId = setTimeout(() => {
      if (mo) mo.disconnect();
      mo = null;
    }, 4000);

    return () => {
      if (mo) mo.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [role, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">正在加载简历内容...</p>
        </m.div>
      </div>
    );
  }

  if (!role) {
    return null; // Will redirect
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Salary Section */}
      <SalarySection />

      {/* Contact Section */}
      <ContactSection />

      {/* Project Achievement Section */}
      <ProjectAchievementSection />
    </PageLayout>
  );
}