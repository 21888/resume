/**
 * Animation demo component showcasing all animation features
 * This component can be used for testing and demonstration purposes
 */

'use client';

import { useState } from 'react';
import {
  ScrollTriggeredAnimation,
  StaggerAnimation,
  MicroInteraction,
  FadeIn,
  SlideUp,
  ScaleIn,
  Floating,
  Pulse,
} from './index';
import { useScroll, useScrollDirection } from '@/hooks/useScroll';

const AnimationDemo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollState = useScroll();
  const scrollDirection = useScrollDirection();

  const demoItems = [
    'First animated item',
    'Second animated item', 
    'Third animated item',
    'Fourth animated item',
  ];

  return (
    <div className="min-h-screen p-8 space-y-16">
      {/* Scroll Info */}
      <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50">
        <p className="text-sm">Scroll Y: {Math.round(scrollState.scrollY)}</p>
        <p className="text-sm">Progress: {Math.round(scrollState.scrollYProgress * 100)}%</p>
        <p className="text-sm">Direction: {scrollDirection || 'none'}</p>
        <p className="text-sm">Has Scrolled: {scrollState.hasScrolled ? 'Yes' : 'No'}</p>
      </div>

      {/* Basic Animations */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Basic Animations</h2>
        
        <FadeIn delay={0.2}>
          <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <h3 className="text-xl font-semibold">Fade In Animation</h3>
            <p>This content fades in smoothly</p>
          </div>
        </FadeIn>

        <SlideUp delay={0.4}>
          <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg">
            <h3 className="text-xl font-semibold">Slide Up Animation</h3>
            <p>This content slides up from below</p>
          </div>
        </SlideUp>

        <ScaleIn delay={0.6}>
          <div className="p-6 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <h3 className="text-xl font-semibold">Scale In Animation</h3>
            <p>This content scales in from smaller size</p>
          </div>
        </ScaleIn>
      </section>

      {/* Scroll Triggered Animations */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Scroll Triggered Animations</h2>
        
        <ScrollTriggeredAnimation animation="fadeIn">
          <div className="p-6 bg-red-100 dark:bg-red-900 rounded-lg">
            <h3 className="text-xl font-semibold">Scroll Fade In</h3>
            <p>This appears when scrolled into view</p>
          </div>
        </ScrollTriggeredAnimation>

        <ScrollTriggeredAnimation animation="slideUp" delay={0.2}>
          <div className="p-6 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <h3 className="text-xl font-semibold">Scroll Slide Up</h3>
            <p>This slides up when scrolled into view</p>
          </div>
        </ScrollTriggeredAnimation>

        <ScrollTriggeredAnimation animation="slideLeft" delay={0.4}>
          <div className="p-6 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <h3 className="text-xl font-semibold">Scroll Slide Left</h3>
            <p>This slides from right when scrolled into view</p>
          </div>
        </ScrollTriggeredAnimation>
      </section>

      {/* Stagger Animation */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Stagger Animation</h2>
        
        <StaggerAnimation staggerDelay={0.15} animation="slideUp">
          {demoItems.map((item, index) => (
            <div key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
              <h4 className="font-semibold">{item}</h4>
              <p>Item {index + 1} in the staggered list</p>
            </div>
          ))}
        </StaggerAnimation>
      </section>

      {/* Micro Interactions */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Micro Interactions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MicroInteraction type="hover">
            <div className="p-6 bg-pink-100 dark:bg-pink-900 rounded-lg cursor-pointer">
              <h4 className="font-semibold">Hover Effect</h4>
              <p>Hover over me!</p>
            </div>
          </MicroInteraction>

          <MicroInteraction type="tap">
            <button className="p-6 bg-cyan-100 dark:bg-cyan-900 rounded-lg w-full">
              <h4 className="font-semibold">Tap Effect</h4>
              <p>Click me!</p>
            </button>
          </MicroInteraction>

          <MicroInteraction type="focus">
            <button className="p-6 bg-orange-100 dark:bg-orange-900 rounded-lg w-full">
              <h4 className="font-semibold">Focus Effect</h4>
              <p>Tab to focus me!</p>
            </button>
          </MicroInteraction>
        </div>
      </section>

      {/* Continuous Animations */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Continuous Animations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Floating amplitude={5} duration={2}>
            <div className="p-6 bg-teal-100 dark:bg-teal-900 rounded-lg text-center">
              <h4 className="font-semibold">Floating Animation</h4>
              <p>I float up and down</p>
            </div>
          </Floating>

          <Pulse scale={1.02} duration={3}>
            <div className="p-6 bg-rose-100 dark:bg-rose-900 rounded-lg text-center">
              <h4 className="font-semibold">Pulse Animation</h4>
              <p>I pulse gently</p>
            </div>
          </Pulse>
        </div>
      </section>

      {/* Toggle Demo */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Interactive Demo</h2>
        
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Toggle Animation Demo
        </button>

        {isVisible && (
          <FadeIn>
            <div className="p-6 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
              <h4 className="font-semibold">Dynamically Animated Content</h4>
              <p>This content appears with animation when toggled</p>
            </div>
          </FadeIn>
        )}
      </section>

      {/* Spacer for scroll testing */}
      <div className="h-96"></div>
    </div>
  );
};

export default AnimationDemo;