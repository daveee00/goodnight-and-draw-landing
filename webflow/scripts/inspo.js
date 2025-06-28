const drawings = ["draw1", "draw2", "draw3", "draw4", "draw5", "draw6"];

const spotifyLogos = [
  "spotify-1",
  "spotify-2",
  "spotify-3",
  "spotify-4",
  "spotify-5",
  "spotify-6",
];

const spotifyFrames = [
  "frame-1",
  "frame-2",
  "frame-3",
  "frame-4",
  "frame-5",
  "frame-6",
];

// Function to blur the corresponding drawing element
function blurDrawingElement(frameIndex) {
  const drawingId = drawings[frameIndex];
  const drawingElement = document.getElementById(drawingId);
  if (drawingElement) {
    drawingElement.classList.add("blur");
  }
}

// Function to unblur all drawing elements
function unblurAllDrawingElements() {
  drawings.forEach((drawingId) => {
    const drawingElement = document.getElementById(drawingId);
    if (drawingElement) {
      drawingElement.classList.remove("blur");
    }
  });
}

// Function to hide all Spotify frames
function hideAllSpotifyFrames() {
  spotifyFrames.forEach((frameId) => {
    const frame = document.getElementById(frameId);
    if (frame) {
      frame.classList.remove("show");
      // Hide the element after animation completes
      setTimeout(() => {
        if (!frame.classList.contains("show")) {
          frame.style.display = "none";
        }
      }, 300); // Match the CSS transition duration
    }
  });

  // Unblur all drawing elements when frames are hidden
  unblurAllDrawingElements();
}

// Function to show a specific Spotify frame
function showSpotifyFrame(index) {
  const frameId = spotifyFrames[index];
  const frame = document.getElementById(frameId);
  if (frame) {
    frame.style.display = "block";

    // Blur the corresponding drawing element first
    blurDrawingElement(index);

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      frame.classList.add("show");
    });
  }
}

// Function to handle Spotify logo clicks
function handleSpotifyLogoClick(event) {
  const clickedLogo = event.currentTarget;
  const logoId = clickedLogo.id;
  const logoIndex = spotifyLogos.indexOf(logoId);

  if (logoIndex !== -1) {
    const frameId = spotifyFrames[logoIndex];
    const frame = document.getElementById(frameId);

    if (frame) {
      // If frame is currently visible, hide it
      if (frame.classList.contains("show")) {
        frame.classList.remove("show");

        // Unblur the corresponding drawing element with the same timing
        const drawingId = drawings[logoIndex];
        const drawingElement = document.getElementById(drawingId);
        if (drawingElement) {
          drawingElement.classList.remove("blur");
        }

        // Hide the element after animation completes
        setTimeout(() => {
          if (!frame.classList.contains("show")) {
            frame.style.display = "none";
          }
        }, 300); // Match the CSS transition duration
      } else {
        // Hide all frames first, then show the clicked one
        hideAllSpotifyFrames();
        // Show the new frame after a brief delay to ensure others are hidden
        setTimeout(() => {
          showSpotifyFrame(logoIndex);
        }, 50);
      }
    }
  }
}

// Function to handle clicks outside iframe areas
function handleClickOutside(event) {
  // Check if click is on a Spotify logo (don't hide if clicking on logo)
  const isSpotifyLogo = spotifyLogos.some((logoId) => {
    const logo = document.getElementById(logoId);
    return logo && logo.contains(event.target);
  });

  if (isSpotifyLogo) {
    return; // Don't hide if clicking on a Spotify logo
  }

  // Check if click is inside any iframe
  const iframes = document.querySelectorAll('iframe[id^="frame-"]');
  let clickedInsideIframe = false;

  iframes.forEach((iframe) => {
    // Check if the click target is the iframe itself or inside it
    if (iframe === event.target || iframe.contains(event.target)) {
      clickedInsideIframe = true;
    }
  });

  // If clicked outside iframe areas and not on a Spotify logo, hide all frames
  if (!clickedInsideIframe) {
    hideAllSpotifyFrames();
    // All drawing elements will be unblurred by hideAllSpotifyFrames()
  }
}

// Initialize Spotify functionality
function initSpotifyFunctionality() {
  // Hide all frames on page load with a small delay for smooth loading
  setTimeout(() => {
    hideAllSpotifyFrames();
  }, 100);

  // Add click event listeners to all Spotify logos
  spotifyLogos.forEach((logoId) => {
    const logo = document.getElementById(logoId);
    if (logo) {
      logo.addEventListener("click", handleSpotifyLogoClick);
    }
  });

  // Add click event listener to document for click-outside functionality
  document.addEventListener("click", handleClickOutside);
}

initSpotifyFunctionality();

// Function to blur elements with class .blur-skt
function blurSktElements() {
  const blurElements = document.querySelectorAll(".blur-skt");
  console.log("blurSktElements called, found elements:", blurElements.length);
  blurElements.forEach((element) => {
    element.classList.add("blur");
    console.log("Added blur class to:", element);
  });
}

// Function to unblur elements with class .blur-skt
function unblurSktElements() {
  const blurElements = document.querySelectorAll(".blur-skt");
  console.log("unblurSktElements called, found elements:", blurElements.length);
  blurElements.forEach((element) => {
    console.log("Element before unblur:", element.className);
    // Force a reflow to ensure the transition is triggered
    element.offsetHeight;
    element.classList.remove("blur");
    console.log("Element after unblur:", element.className);
    console.log("Removed blur class from:", element);
  });
}

// Function to show frame-container
function showFrameContainer() {
  const frameContainer = document.getElementById("frame-container");
  if (frameContainer) {
    frameContainer.style.display = "flex";
    // Blur elements with .blur-skt class immediately
    blurSktElements();
    // Add show class for animation
    setTimeout(() => {
      frameContainer.classList.add("show");
    }, 10);
  }
}

// Function to hide frame-container
function hideFrameContainer() {
  const frameContainer = document.getElementById("frame-container");
  if (frameContainer) {
    frameContainer.classList.remove("show");
    // Unblur elements with .blur-skt class immediately (will take 0.6s to complete)
    unblurSktElements();
    // Hide container after both frame and blur transitions complete
    setTimeout(() => {
      frameContainer.style.display = "none";
    }, 600); // Match the CSS transition duration for both effects
  }
}

// Function to handle spotify-skt clicks
function handleSpotifySktClick(event) {
  console.log("spotify-skt clicked");
  const frameContainer = document.getElementById("frame-container");

  if (frameContainer) {
    // If frame-container is currently visible, hide it
    if (frameContainer.style.display === "flex") {
      hideFrameContainer();
    } else {
      // Show frame-container
      showFrameContainer();
    }
  } else {
    console.warn("frame-container not found");
  }
}

// Function to handle clicks outside frame-container
function handleClickOutsideFrameContainer(event) {
  // Check if click is on spotify-skt (don't hide if clicking on it)
  const spotifySkt = document.getElementById("spotify-skt");
  if (spotifySkt && spotifySkt.contains(event.target)) {
    return; // Don't hide if clicking on spotify-skt
  }

  // Check if click is inside frame-container
  const frameContainer = document.getElementById("frame-container");
  if (frameContainer && frameContainer.contains(event.target)) {
    return; // Don't hide if clicking inside frame-container
  }

  // If clicked outside frame-container and not on spotify-skt, hide frame-container
  hideFrameContainer();
}

// Initialize spotify-skt functionality
function initSpotifySktFunctionality() {
  console.log("Initializing spotify-skt functionality...");

  // Debug: Check if elements exist
  const spotifySkt = document.getElementById("spotify-skt");
  const frameContainer = document.getElementById("frame-container");

  console.log("spotify-skt element:", spotifySkt);
  console.log("frame-container element:", frameContainer);

  // Hide frame-container on page load
  setTimeout(() => {
    hideFrameContainer();
  }, 100);

  // Add click event listener to spotify-skt
  if (spotifySkt) {
    spotifySkt.addEventListener("click", handleSpotifySktClick);
    console.log("Added spotify-skt click listener");
  } else {
    console.warn("spotify-skt not found");
  }

  // Add click event listener to document for click-outside functionality
  document.addEventListener("click", handleClickOutsideFrameContainer);
}

// Initialize spotify-skt functionality when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSpotifySktFunctionality);
} else {
  initSpotifySktFunctionality();
}

