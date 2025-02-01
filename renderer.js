const { ipcRenderer } = require('electron');
// Reference to the opacity slider
const opacitySlider = document.getElementById('opacity-slider');

// Reference to the grid overlay element


// Update the opacity of the grid overlay based on the slider's value
opacitySlider.addEventListener('input', (event) => {
  const opacityValue = event.target.value;

  // Apply the opacity to the grid overlay
  gridOverlay.style.opacity = opacityValue;

  // Optionally, log the value for debugging
  console.log("Grid Opacity:", opacityValue);
});

// Reference to the lock button
const lockButton = document.getElementById("lock-button");

// Reference to the unlock message
const unlockMessage = document.getElementById("unlock-message");

// Reference to the grid overlay element
const gridOverlay = document.querySelector(".grid-overlay");

// Reference to the grid colour picker
const colorPicker = document.getElementById("grid-color-picker");

// Initially, make sure the lock button is visible
lockButton.style.display = "block";
unlockMessage.style.display = "none"; // Hide unlock message initially

// Lock button click event
lockButton.addEventListener("click", () => {
  console.log("Lock button clicked");

  ipcRenderer.send("toggle-click", true);
  
  // Hide lock button and show unlock message
  lockButton.style.display = "none";
  unlockMessage.style.display = "block";
});

// Listen for toggle-lock-button event
ipcRenderer.on('toggle-lock-button', (event, showButton) => {
  if (showButton) {
    lockButton.style.display = "block";
    unlockMessage.style.display = "none";
  } else {
    lockButton.style.display = "none";
    unlockMessage.style.display = "block";
  }
});

// Listen for unlock-window event
ipcRenderer.on('unlock-window', () => {
  lockButton.style.display = "block";
  unlockMessage.style.display = "none";
});

colorPicker.addEventListener("input", (event) => {
    const selectedColor = event.target.value;
    console.log("Colour picked: ", selectedColor); 
  
    gridOverlay.style.backgroundImage = `linear-gradient(to right, ${selectedColor} 1px, transparent 1px),
                                         linear-gradient(to bottom, ${selectedColor} 1px, transparent 1px)`;
  });
  // Reference to the horizontal and vertical grid sliders
const horizontalSlider = document.getElementById('horizontal-slider');
const verticalSlider = document.getElementById('vertical-slider');

// Reference to the grid count display
const horizontalCount = document.getElementById('horizontal-count');
const verticalCount = document.getElementById('vertical-count');

// Function to update the grid lines based on slider values
function updateGridCount(slider, type) {
  const value = slider.value;

  // Update the display count
  if (type === 'horizontal') {
    horizontalCount.textContent = value;
  } else if (type === 'vertical') {
    verticalCount.textContent = value;
  }

  // Update the grid overlay background
  updateGridOverlay();
}

// Function to update the grid overlay with the correct number of lines
function updateGridOverlay() {
  const horizontalLines = horizontalSlider.value;
  const verticalLines = verticalSlider.value;

  // Dynamically set the background image to show the right amount of grid lines
  gridOverlay.style.backgroundImage = `linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                                       linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`;

  gridOverlay.style.backgroundSize = `${100 / verticalLines}% ${100 / horizontalLines}%`;
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  // Set initial grid count
  updateGridOverlay();
});
