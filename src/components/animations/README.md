# Animation System Documentation

This directory contains a comprehensive animation system built with Framer Motion for the personalized resume website. The system provides scroll-triggered animations, micro-interactions, and utility components that respect user preferences for reduced motion.

## Components Overview

### Core Animation Components

#### 1. ScrollTriggeredAnimation
Triggers animations when elements come into view during scrolling.

```tsx
import { ScrollTriggeredAnimation } from '@/components/animations';

<ScrollTriggeredAnimation 
  animation="fadeIn" 
  delay={0.2} 
  threshold={0.1}
>
  <div>Content that animates on scroll</div>
</ScrollTriggeredAnimation>
```

**Props:**
- `animation`: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'slideDown' | 'scaleIn' | 'stagger'
- `delay`: Animation delay in seconds (default: 0)
- `duration`: Animation duration in seconds (default: 0.6)
- `threshold`: Intersection threshold (default: 0.1)
- `className`: Additional CSS classes

#### 2. StaggerAnimation
Animates child elements with a staggered delay.

```tsx
import { StaggerAnimation } from '@/components/animations';

<StaggerAnimation staggerDelay={0.15} animation="slideUp">
  {items.map((item, index) => (
    <div key={index}>{item}</div>
  ))}
</StaggerAnimation>
```

**Props:**
- `children`: Array of React nodes
- `staggerDelay`: Delay between each child animation (default: 0.1)
- `animation`: Animation type for children
- `className`: Additional CSS classes

#### 3. MicroInteraction
Provides hover, tap, and focus effects for interactive elements.

```tsx
import { MicroInteraction } from '@/components/animations';

<MicroInteraction type="hover" scale={1.05}>
  <button>Hover me!</button>
</MicroInteraction>
```

**Props:**
- `type`: 'hover' | 'tap' | 'focus'
- `scale`: Scale factor for the interaction (default: 1.05)
- `duration`: Animation duration (default: 0.2)
- `className`: Additional CSS classes

#### 4. CustomCursor
Custom cursor with trailing gradient effect.

```tsx
import { CustomCursor } from '@/components/animations';

<CustomCursor variant="default" size={20} />
```

**Props:**
- `variant`: 'default' | 'hover' | 'click'
- `size`: Cursor size in pixels (default: 20)
- `color`: Custom color or gradient

#### 5. PageTransition
Handles page transitions with smooth animations.

```tsx
import { PageTransition } from '@/components/animations';

<PageTransition>
  <div>Page content</div>
</PageTransition>
```

### Utility Components

#### Animation Utilities
Quick animation components for common use cases:

```tsx
import { FadeIn, SlideUp, ScaleIn, Floating, Pulse } from '@/components/animations';

// Fade in animation
<FadeIn delay={0.2}>
  <div>Content</div>
</FadeIn>

// Slide up animation
<SlideUp distance={30} duration={0.8}>
  <div>Content</div>
</SlideUp>

// Scale in animation
<ScaleIn scale={0.8}>
  <div>Content</div>
</ScaleIn>

// Continuous floating animation
<Floating amplitude={10} duration={3}>
  <div>Floating content</div>
</Floating>

// Pulse animation
<Pulse scale={1.05} duration={2}>
  <div>Pulsing content</div>
</Pulse>
```

### Hooks

#### useScroll
Provides scroll state and utilities.

```tsx
import { useScroll, useScrollDirection, useScrollTransform } from '@/components/animations';

const MyComponent = () => {
  const scrollState = useScroll({ threshold: 50 });
  const scrollDirection = useScrollDirection();
  const opacity = useScrollTransform([0, 1], [1, 0]);

  return (
    <div>
      <p>Scroll Y: {scrollState.scrollY}</p>
      <p>Direction: {scrollDirection}</p>
      <motion.div style={{ opacity }}>
        Fades out on scroll
      </motion.div>
    </div>
  );
};
```

### Provider

#### AnimationProvider
Manages global animation settings and respects user preferences.

```tsx
import { AnimationProvider } from '@/components/animations';

<AnimationProvider>
  <App />
</AnimationProvider>
```

The provider automatically:
- Detects `prefers-reduced-motion` setting
- Provides LazyMotion for performance
- Manages global animation state

## Animation Variants

The system includes predefined animation variants:

```tsx
const ANIMATION_VARIANTS = {
  fadeIn: { /* fade in animation */ },
  slideUp: { /* slide up animation */ },
  slideLeft: { /* slide left animation */ },
  slideRight: { /* slide right animation */ },
  slideDown: { /* slide down animation */ },
  scaleIn: { /* scale in animation */ },
  stagger: { /* stagger container animation */ },
};
```

## Accessibility

The animation system respects user preferences:

- **Reduced Motion**: Automatically disables animations when `prefers-reduced-motion: reduce` is set
- **Keyboard Navigation**: All interactive animations support keyboard focus
- **Screen Readers**: Animations don't interfere with screen reader functionality

## Performance

- **LazyMotion**: Only loads necessary Framer Motion features
- **GPU Acceleration**: Uses transform properties for smooth animations
- **Intersection Observer**: Efficient scroll-triggered animations
- **Spring Physics**: Natural-feeling animations with optimized performance

## Usage Examples

### Basic Page Section
```tsx
import { ScrollTriggeredAnimation, StaggerAnimation, MicroInteraction } from '@/components/animations';

const MySection = () => (
  <section>
    <ScrollTriggeredAnimation animation="fadeIn">
      <h2>Section Title</h2>
    </ScrollTriggeredAnimation>
    
    <StaggerAnimation staggerDelay={0.1} animation="slideUp">
      {items.map((item, index) => (
        <MicroInteraction key={index} type="hover">
          <div className="card">{item}</div>
        </MicroInteraction>
      ))}
    </StaggerAnimation>
  </section>
);
```

### Interactive Button
```tsx
import { MicroInteraction } from '@/components/animations';

const AnimatedButton = () => (
  <MicroInteraction type="tap" scale={0.95}>
    <button className="btn-primary">
      Click me!
    </button>
  </MicroInteraction>
);
```

### Scroll-based Parallax
```tsx
import { useScrollTransform } from '@/components/animations';
import { motion } from 'framer-motion';

const ParallaxElement = () => {
  const y = useScrollTransform([0, 1], [0, -100]);
  
  return (
    <motion.div style={{ y }}>
      Parallax content
    </motion.div>
  );
};
```

## Best Practices

1. **Use Semantic Animation Types**: Choose animation types that match the content's meaning
2. **Respect User Preferences**: Always check for reduced motion preferences
3. **Optimize Performance**: Use transform properties and avoid animating layout properties
4. **Provide Fallbacks**: Ensure content is accessible even without animations
5. **Test on Mobile**: Verify animations perform well on mobile devices
6. **Use Appropriate Delays**: Stagger animations to avoid overwhelming users

## Testing

The animation system can be tested using the `AnimationDemo` component:

```tsx
import AnimationDemo from '@/components/animations/AnimationDemo';

// Use in development to test all animation features
<AnimationDemo />
```

This component showcases all animation types and can be used for visual regression testing and performance validation.