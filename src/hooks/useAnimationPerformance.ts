/**
 * Animation Performance Hook
 * Hook for monitoring animation performance and frame rates
 */

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
interface AnimationPerformanceMetrics {
  frameRate: number;
  droppedFrames: number;
  animationDuration: number;
  memoryUsage: number;
  cpuUsage: number;
}

interface UseAnimationPerformanceOptions {
  enabled?: boolean;
  sampleRate?: number; // How often to sample (0-1)
  reportThreshold?: number; // Report when frame rate drops below this
  onPerformanceReport?: (metrics: AnimationPerformanceMetrics) => void;
}

export function useAnimationPerformance(options: UseAnimationPerformanceOptions = {}) {
  const {
    enabled = false,
    sampleRate = 0.1,
    reportThreshold = 30,
    onPerformanceReport,
  } = options;

  const [metrics, setMetrics] = useState<AnimationPerformanceMetrics>({
    frameRate: 60,
    droppedFrames: 0,
    animationDuration: 0,
    memoryUsage: 0,
    cpuUsage: 0,
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationStartRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Start performance monitoring
  const startMonitoring = useCallback(() => {
    if (!enabled) return;

    animationStartRef.current = performance.now();
    frameCountRef.current = 0;
    lastTimeRef.current = performance.now();

    const measureFrame = () => {
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      
      frameCountRef.current++;
      
      // Sample based on sampleRate
      if (Math.random() < sampleRate) {
        const currentFPS = 1000 / delta;
        
        // Get memory usage if available
        const memoryInfo = (performance as any).memory;
        const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0;

        const newMetrics: AnimationPerformanceMetrics = {
          frameRate: Math.round(currentFPS),
          droppedFrames: currentFPS < 55 ? frameCountRef.current : 0,
          animationDuration: animationStartRef.current ? now - animationStartRef.current : 0,
          memoryUsage,
          cpuUsage: 0, // CPU usage is harder to measure in browser
        };

        setMetrics(newMetrics);

        // Report performance issues
        if (currentFPS < reportThreshold && onPerformanceReport) {
          onPerformanceReport(newMetrics);
        }
      }

      lastTimeRef.current = now;
      rafIdRef.current = requestAnimationFrame(measureFrame);
    };

    rafIdRef.current = requestAnimationFrame(measureFrame);
  }, [enabled, sampleRate, reportThreshold, onPerformanceReport]);

  // Stop performance monitoring
  const stopMonitoring = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  // Reset metrics
  const resetMetrics = useCallback(() => {
    setMetrics({
      frameRate: 60,
      droppedFrames: 0,
      animationDuration: 0,
      memoryUsage: 0,
      cpuUsage: 0,
    });
    frameCountRef.current = 0;
    animationStartRef.current = null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMonitoring();
    };
  }, [stopMonitoring]);

  // Auto-start monitoring if enabled
  useEffect(() => {
    if (enabled) {
      startMonitoring();
    } else {
      stopMonitoring();
    }
  }, [enabled, startMonitoring, stopMonitoring]);

  return {
    metrics,
    startMonitoring,
    stopMonitoring,
    resetMetrics,
    isMonitoring: rafIdRef.current !== null,
  };
}