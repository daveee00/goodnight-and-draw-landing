// Function to adjust iframe widths for mobile devices
function adjustIframeWidths() {
  // Check if screen width is 1000px or less
  if (window.matchMedia("(max-width: 1000px)").matches) {
    // Get all iframes within .draw-grid elements
    const iframes = document.querySelectorAll('.draw-grid iframe');
    
    // Set width to 90% for each iframe
    iframes.forEach(iframe => {
      iframe.setAttribute('width', '90%');
    });
  } else {
    // Reset to original width for larger screens
    const iframes = document.querySelectorAll('.draw-grid iframe');
    
    iframes.forEach(iframe => {
      iframe.setAttribute('width', '30%');
    });
  }
}

// Function to ensure iframe resizing doesn't interfere with other events
function initIframeResizing() {
  // Run on page load with a slight delay to ensure DOM is ready
  setTimeout(() => {
    adjustIframeWidths();
  }, 100);
  
  // Run on window resize with debouncing to prevent excessive calls
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustIframeWidths, 150);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIframeResizing);
} else {
  initIframeResizing();
} 
