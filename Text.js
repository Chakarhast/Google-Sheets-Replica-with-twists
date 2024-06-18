// Function to apply bold formatting
function boldText() {
  var highlightedCell = document.querySelector('.highlighted');
  if (highlightedCell) {
    highlightedCell.style.fontWeight = 'bold';
    toggleButtonActive('boldBtn');
  }
}

// Function to apply italic formatting
function italicText() {
  var highlightedCell = document.querySelector('.highlighted');
  if (highlightedCell) {
    highlightedCell.style.fontStyle = 'italic';
    toggleButtonActive('italicBtn');
  }
}

// Function to apply underline formatting
function underlineText() {
  var highlightedCell = document.querySelector('.highlighted');
  if (highlightedCell) {
    highlightedCell.style.textDecoration = 'underline';
    toggleButtonActive('underlineBtn');
  }
}

// Function to change font color
function changeFontColor() {
  var highlightedCell = document.querySelector('.highlighted');
  if (highlightedCell) {
    var color = document.getElementById('fontColor').value;
    highlightedCell.style.color = color;
  }
}

function swapCells() {
  //updateSlideAnimations(200, -200);
  const cellM2 = document.getElementById('M2');
  const cellM3 = document.getElementById('M4');
  
  // Get initial properties of M2
  const m2Color = window.getComputedStyle(cellM2).backgroundColor;
  const m2Text = cellM2.textContent;

  // Get initial properties of M3
  const m3Color = window.getComputedStyle(cellM3).backgroundColor;
  const m3Text = cellM3.textContent;

  // Add classes for animation
  cellM2.classList.add('slide-down');

  // Set transition properties
  cellM2.style.transition = 'transform 2s ease';

  // After the slide-down animation completes, swap the content and color, and initiate the slide-up animation
  setTimeout(() => {
    // Swap content and color
    cellM3.style.backgroundColor = m2Color;
    cellM3.textContent = m2Text;

    // Add class for slide-up animation
    cellM3.classList.add('slide-up');
    cellM3.style.transition = 'transform 2s ease';

    // Remove slide-down class from M2 and update its content and color
    cellM2.classList.remove('slide-down');
    cellM2.style.backgroundColor = m3Color;
    cellM2.textContent = m3Text;
    
    // After the slide-up animation completes, remove the slide-up class from M3
    setTimeout(() => {
      cellM3.classList.remove('slide-up');
    }, 2000);
  }, 2000); // Wait for the slide-down animation duration before swapping content
}



function updateSlideAnimations(slideDownValue, slideUpValue) {
  // Access the first stylesheet
  const stylesheet = document.styleSheets[0];

  // Function to find the rule index
  function findRuleIndex(ruleName) {
    for (let i = 0; i < stylesheet.cssRules.length; i++) {
      if (stylesheet.cssRules[i].selectorText === ruleName) {
        return i;
      }
    }
    return -1;
  }

  // Find the index of .slide-down rule
  const slideDownIndex = findRuleIndex('.slide-down');
  if (slideDownIndex !== -1) {
    stylesheet.cssRules[slideDownIndex].style.transform = `translateY(${slideDownValue}%)`;
  }

  // Find the index of .slide-up rule
  const slideUpIndex = findRuleIndex('.slide-up');
  if (slideUpIndex !== -1) {
    stylesheet.cssRules[slideUpIndex].style.transform = `translateY(${slideUpValue}%)`;
  }
}

// Example usage: Update the slide-down to 150% and slide-up to -150%



