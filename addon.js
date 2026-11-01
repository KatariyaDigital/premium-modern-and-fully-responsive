/**
 * KATARIYA DIGITAL — Addon: Fix SecurityError on history.pushState
 * Handles the case where pushState fails in iframe/preview environments (origin: null)
 */

(function() {
  'use strict';

  // Wait for DOM and original script to initialize
  function initSafeSmoothScroll() {
    // Remove existing click handlers by cloning and replacing anchor links
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(anchor => {
      // Clone to remove existing event listeners
      const newAnchor = anchor.cloneNode(true);
      anchor.parentNode.replaceChild(newAnchor, anchor);
      
      newAnchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        e.preventDefault();
        
        const nav = document.getElementById('nav');
        const navHeight = nav ? nav.offsetHeight : 88;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Safely update URL hash without throwing SecurityError
        try {
          history.pushState(null, '', targetId);
        } catch (err) {
          // In iframe/preview environments (origin: null), pushState throws SecurityError
          // Fallback: update hash via location.hash (may cause jump, but won't crash)
          try {
            location.hash = targetId;
          } catch (e) {
            // Silently ignore if even hash assignment fails
          }
        }
      });
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSafeSmoothScroll);
  } else {
    initSafeSmoothScroll();
  }
})();
