/**
 * Detailed Project View Component
 * Comprehensive project view with expandable sections
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { m, motion } from 'framer-motion';
import { ProjectAchievement } from '../../types/project-achievement';
import { ExpandableSection } from './ExpandableSection';
import { CardMetrics } from '../CardMetrics';
import { CardTeam } from '../CardTeam';
import { CardTimeline } from '../CardTimeline';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

interface DetailedProjectViewProps {
  project: ProjectAchievement;
  className?: string;
  onClose?: () => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const DetailedProjectView: React.FC<DetailedProjectViewProps> = ({
  project,
  className,
  onClose,
}) => {
  // Mount flag to avoid SSR/CSR mismatch when using portal
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['overview', 'metrics', 'gallery'])
  );

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Normalize images for safe access and type narrowing
  const images = project.images ?? [];
  const hasImages = images.length > 0;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    if (!hasImages) return;
    setLightboxIndex(prev => {
      if (prev === null) return prev;
      const total = images.length;
      return (prev - 1 + total) % total;
    });
  }, [hasImages, images]);

  const showNext = useCallback(() => {
    if (!hasImages) return;
    setLightboxIndex(prev => {
      if (prev === null) return prev;
      const total = images.length;
      return (prev + 1) % total;
    });
  }, [hasImages, images]);

  // Keyboard handlers for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    // Prevent body scroll when lightbox open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  // Zoom & pan state for lightbox
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Reset zoom when image changes or lightbox toggles
  useEffect(() => {
    setZoomScale(1);
    setZoomPosition({ x: 0, y: 0 });
    setIsDragging(false);
    setDragStart(null);
  }, [lightboxIndex]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale(prev => (prev === 1 ? 2 : 1));
    if (zoomScale !== 1) {
      setZoomPosition({ x: 0, y: 0 });
    }
  }, [zoomScale]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (zoomScale === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - zoomPosition.x, y: e.clientY - zoomPosition.y });
  }, [zoomScale, zoomPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    e.preventDefault();
    e.stopPropagation();
    setZoomPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const endDrag = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsDragging(false);
    setDragStart(null);
  }, []);

  const handleSectionToggle = useCallback((sectionId: string, expanded: boolean) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (expanded) {
        newSet.add(sectionId);
      } else {
        newSet.delete(sectionId);
      }
      return newSet;
    });
  }, []);

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      ongoing: 'bg-blue-100 text-blue-800 border-blue-200',
      paused: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      web: 'bg-purple-100 text-purple-800',
      mobile: 'bg-indigo-100 text-indigo-800',
      desktop: 'bg-cyan-100 text-cyan-800',
      api: 'bg-orange-100 text-orange-800',
      infrastructure: 'bg-gray-100 text-gray-800',
      research: 'bg-pink-100 text-pink-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('max-w-4xl mx-auto space-y-6', className)}
    >
      {/* Header */}
      <m.div
        variants={sectionVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Badge
                size="medium"
                className={getCategoryColor(project.category)}
              >
                {project.category}
              </Badge>
              <Badge
                size="medium"
                className={cn('border', getStatusColor(project.status))}
              >
                {project.status}
              </Badge>
              {project.team.some(member => member.isLead) && (
                <Badge size="small" variant="warning">
                  👑 主导项目
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {project.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>创建于 {formatDate(project.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>更新于 {formatDate(project.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{project.timeline.duration}</span>
              </div>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Project Image */}
        {hasImages && (
          <div
            className="mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-64 sm:h-72 md:h-80 lg:h-96 cursor-zoom-in"
            onClick={() => openLightbox(0)}
            role="button"
            aria-label="打开图片预览"
          >
            <img
              src={images[0].url}
              alt={images[0].alt}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {project.links?.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {link.title}
            </a>
          ))}
        </div>
      </m.div>

      {/* Expandable Sections */}
      <div className="space-y-4">
        {/* Overview Section */}
        <m.div variants={sectionVariants}>
          <ExpandableSection
            title="项目概览"
            defaultExpanded={expandedSections.has('overview')}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            onToggle={(expanded) => handleSectionToggle('overview', expanded)}
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">项目描述</h4>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.tags.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">标签</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 mb-2">使用技术</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {tech.name}
                        </div>
                        {tech.version && (
                          <div className="text-xs text-gray-500">
                            v{tech.version}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ExpandableSection>
        </m.div>
        {/* Gallery Section */}
        {images.length > 1 && (
          <motion.div variants={sectionVariants}>
            <ExpandableSection
              title="项目图库"
              defaultExpanded={expandedSections.has('gallery')}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              onToggle={(expanded) => handleSectionToggle('gallery', expanded)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, idx) => (
                  <div
                    key={`${image.id}-${image.url}`}
                    className="group relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
                    onClick={() => openLightbox(idx)}
                    role="button"
                    aria-label="打开图片预览"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <p className="text-white text-sm">
                          {image.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ExpandableSection>
          </motion.div>
        )}

        {/* Metrics Section */}
        {project.metrics.primary.length > 0 && (
          <m.div variants={sectionVariants}>
            <ExpandableSection
              title="项目指标与KPI"
              defaultExpanded={expandedSections.has('metrics')}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              onToggle={(expanded) => handleSectionToggle('metrics', expanded)}
            >
              <CardMetrics
                metrics={project.metrics}
                layout="grid"
                variant="detailed"
                showTrends={true}
                showTooltips={true}
              />
            </ExpandableSection>
          </m.div>
        )}

        {/* Team Section */}
        {project.team.length > 0 && (
          <m.div variants={sectionVariants}>
            <ExpandableSection
              title="团队成员"
              defaultExpanded={expandedSections.has('team')}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              }
              onToggle={(expanded) => handleSectionToggle('team', expanded)}
            >
              <CardTeam
                team={project.team}
                layout="grid"
                showRoles={true}
                showContributions={true}
                avatarSize="large"
              />
            </ExpandableSection>
          </m.div>
        )}

        {/* Timeline Section */}
        <m.div variants={sectionVariants}>
          <ExpandableSection
            title="项目时间线"
            defaultExpanded={expandedSections.has('timeline')}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            onToggle={(expanded) => handleSectionToggle('timeline', expanded)}
          >
            <CardTimeline
              timeline={project.timeline}
              showProgress={true}
              showMilestones={true}
              format="long"
            />
          </ExpandableSection>
        </m.div>

        {/* Documentation Section */}
        {project.links && project.links.length > 0 && (
          <m.div variants={sectionVariants}>
            <ExpandableSection
              title="文档与链接"
              defaultExpanded={expandedSections.has('documentation')}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              onToggle={(expanded) => handleSectionToggle('documentation', expanded)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {link.title}
                      </h4>
                      {link.description && (
                        <p className="text-sm text-gray-600 mb-2">
                          {link.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 capitalize">
                          {link.type}
                        </span>
                        <span className="text-xs text-blue-600 truncate">
                          {link.url}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </ExpandableSection>
          </m.div>
        )}


      </div>
      {/* Lightbox Modal */}
      {isMounted && hasImages && lightboxIndex !== null && images[lightboxIndex] !== undefined &&
        createPortal(
          (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50"
              aria-modal="true"
              role="dialog"
            >
              <div
                className="absolute inset-0 bg-black/80"
                onClick={closeLightbox}
                aria-label="关闭预览"
              />
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <div className="relative max-w-[95vw] max-h-[90vh]">
                  <div
                    className={cn(
                      'overflow-hidden rounded-lg shadow-2xl bg-black/20 flex items-center justify-center',
                      zoomScale === 1 ? 'cursor-zoom-in' : isDragging ? 'cursor-grabbing' : 'cursor-zoom-out'
                    )}
                    onDoubleClick={handleDoubleClick}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={endDrag}
                    onMouseLeave={endDrag}
                    role="img"
                    aria-label={images[lightboxIndex].alt || '预览图片'}
                    style={{ width: 'min(95vw, 1600px)', height: 'min(90vh, 900px)' }}
                  >
                    <img
                      src={images[lightboxIndex].url}
                      alt={images[lightboxIndex].alt}
                      className="object-contain max-w-full max-h-full select-none"
                      draggable={false}
                      style={{
                        transform: `translate3d(${zoomPosition.x}px, ${zoomPosition.y}px, 0) scale(${zoomScale})`,
                        transition: isDragging ? 'none' : 'transform 150ms ease-out',
                        willChange: 'transform'
                      }}
                    />
                  </div>
                  {images[lightboxIndex].caption && (
                    <div className="mt-3 text-center text-sm text-gray-200">
                      {images[lightboxIndex].caption}
                    </div>
                  )}
                  <button
                    className="absolute -top-3 -right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow text-gray-700"
                    onClick={closeLightbox}
                    aria-label="关闭"
                    title="关闭"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {images.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow text-gray-700"
                        onClick={(e) => { e.stopPropagation(); showPrev(); }}
                        aria-label="上一张"
                        title="上一张"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow text-gray-700"
                        onClick={(e) => { e.stopPropagation(); showNext(); }}
                        aria-label="下一张"
                        title="下一张"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {/* Thumbnails strip */}
                      <div className="mt-4 flex items-center justify-center">
                        <div className="flex gap-3 overflow-x-auto p-1 max-w-[95vw]">
                          {images.map((img, i) => (
                            <button
                              key={`thumb-${i}-${img.url}`}
                              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                              className={cn(
                                'relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border transition-all',
                                i === lightboxIndex ? 'ring-2 ring-blue-500 border-blue-500' : 'border-white/40 hover:border-white'
                              )}
                              aria-label={`查看第${i + 1}张`}
                              title={`查看第${i + 1}张`}
                            >
                              <img
                                src={img.url}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </m.div>
          ),
          document.body
        )}
    </m.div>
  );
};