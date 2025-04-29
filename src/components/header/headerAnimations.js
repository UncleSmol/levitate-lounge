import { gsap } from 'gsap';

// Store animation timelines for each element to handle rapid hovering
const animationTimelines = {
  labels: [],
  icons: [],
  navItems: []
};

// Reset any existing animation and create a new timeline
const resetAndCreateTimeline = (timelineArray, index) => {
  // Kill any existing timeline
  if (timelineArray[index]) {
    timelineArray[index].kill();
  }
  
  // Create a new timeline
  timelineArray[index] = gsap.timeline({ paused: true });
  return timelineArray[index];
};

// Animation for mobile label reveal on hover
export const animateMobileLabel = (element, isEntering, index = 0) => {
  if (!element) return;
  
  const tl = resetAndCreateTimeline(animationTimelines.labels, index);
  
  if (isEntering) {
    // Clear any inline styles from interrupted animations
    gsap.set(element, { clearProps: "all" });
    
    // Re-apply initial state
    gsap.set(element, { 
      opacity: 0, 
      y: -10, 
      visibility: 'hidden' 
    });
    
    // Set up the animation
    tl.to(element, {
      opacity: 1,
      visibility: 'visible',
      y: 0,
      duration: 0.25,
      ease: 'power2.out'
    });
  } else {
    tl.to(element, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(element, { visibility: 'hidden' });
      }
    });
  }
  
  // Play the timeline immediately
  tl.play();
  
  return tl;
};

// Animation for icon hover
export const animateIcon = (element, isEntering, index = 0) => {
  if (!element) return;
  
  const tl = resetAndCreateTimeline(animationTimelines.icons, index);
  
  if (isEntering) {
    // Clear any inline styles from interrupted animations
    gsap.set(element, { clearProps: "all" });
    
    tl.to(element, {
      scale: 1.1,
      color: 'var(--accent-green)',
      duration: 0.25,
      ease: 'back.out(1.5)'
    });
  } else {
    tl.to(element, {
      scale: 1,
      color: 'var(--white)',
      duration: 0.2,
      ease: 'power1.out'
    });
  }
  
  tl.play();
  
  return tl;
};

// Animate the navigation item slide
export const animateNavItem = (element, isEntering, index = 0) => {
  if (!element) return;
  
  const tl = resetAndCreateTimeline(animationTimelines.navItems, index);
  
  if (isEntering) {
    // Clear any inline styles from interrupted animations
    gsap.set(element, { clearProps: "x, color" });
    
    tl.to(element, {
      x: 'var(--spacing-xs)',
      color: 'var(--accent-green)',
      duration: 0.25,
      ease: 'power2.out'
    });
  } else {
    tl.to(element, {
      x: 0,
      color: 'var(--white)',
      duration: 0.2,
      ease: 'power1.in'
    });
  }
  
  tl.play();
  
  return tl;
};

// Utility to handle touch interactions for mobile
export const handleTouchInteraction = (element, labelElement, iconElement, index, isStart) => {
  // For touch start, behave like hover enter
  if (isStart) {
    animateNavItem(element, true, index);
    animateIcon(iconElement, true, index);
    animateMobileLabel(labelElement, true, index);
    
    // Set a timeout to auto-hide the label after a period
    return setTimeout(() => {
      if (animationTimelines.labels[index]) {
        animateMobileLabel(labelElement, false, index);
        animateIcon(iconElement, false, index);
        animateNavItem(element, false, index);
      }
    }, 2000); // Auto-hide after 2 seconds
  } else {
    // For touch end, we don't immediately hide but let the timeout handle it
    // or manually hide if user touches something else
    return null;
  }
};
