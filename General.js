
 // These are functions that apply to every cell in my sheet.
 
 // Function to expand a cell
 function expandCell(event, cell) {
    if (event.target.closest('.login-form')) { // H7 cells me if you want to revert it back, 
     return;                                   // click on top of username as other places it doesnt detect click to H7
    }
    cell.classList.toggle('expanded');
  }
  
  // Function to stop event propagation
  function stopPropagation(event) {
    event.stopPropagation();
  }


 // Function to highlight a cell
 function highlightCell(cell) {
    var allCells = document.querySelectorAll('td');
    allCells.forEach(function (cell) {
      cell.classList.remove('highlighted');
    });
    cell.classList.add('highlighted');


    // Extract row and column numbers
  var row = cell.parentNode.rowIndex;
  
  var column = cell.cellIndex;
  //alert(row + "" + column);

  var columnLetter = String.fromCharCode(64 + column);

  // Update the content of the left rectangle
  var leftRectangle = document.querySelector('.left-rectangle'); // Corrected ID
  leftRectangle.innerHTML = "<p>" + columnLetter + "" + row + "</p>";

  // Update the content of the right rectangle with the text of the clicked cell
  var rightRectangle = document.querySelector('.right-rectangle');
  rightRectangle.innerHTML = "<p>| " + cell.innerText + "</p>";
  }

// function when mouse hovers 1
// function _3DCell(cell) {
//   var allCells = document.querySelectorAll('td');
//   allCells.forEach(function (cell) {
//     //cell.classList.remove('highlighted');
//     cell.style.backgroundColor = ''; // Remove previous background color
//     cell.style.boxShadow = 'none'; // Remove previous box-shadow
//     const M2 = document.querySelector('td#M2');
//     M2.style.backgroundColor = '#efd6ff';
//     if (cell == M2) {
//       //M2.style.boxShadow = '0px 2px 3px rgba(0, 0, 0, 0.2)';

//     }
  
//   });

//   // Highlight the hovered cell (if applicable)
//   if (cell) {
//     // cell.classList.add('highlighted');
//     cell.style.backgroundColor = '#F7FDF1'; // Light green
//     cell.style.boxShadow = '0px 2px 3px rgba(0, 0, 0, 0.2)'; // 3D hover effect
//   }
// }
    


//   }
// }
  // function highlightCell(cell) {
  //   var allCells = document.querySelectorAll('td');
  //   allCells.forEach(function (cell) {
  //     cell.classList.remove('highlighted');
  //     cell.style.backgroundColor = ''; 
  //   });
  
  //   // Highlight the clicked cell
  //   cell.classList.add('highlighted');
  
  //   // Get the row and column index of the clicked cell
  //   var rowIndex = cell.parentElement.rowIndex;
  //   var colIndex = cell.cellIndex;
  
  //   // Get references to adjacent cells (up, down, left, right)
  //   var upCell = document.querySelector(`tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`);
  //   var downCell = document.querySelector(`tr:nth-child(${rowIndex - 1}) td:nth-child(${colIndex + 1})`);
  //   var leftCell = document.querySelector(`tr:nth-child(${rowIndex }) td:nth-child(${colIndex})`);
  //   var rightCell = document.querySelector(`tr:nth-child(${rowIndex }) td:nth-child(${colIndex + 2})`);
  
  //   // Check if adjacent cells exist within the table bounds
  //   if (upCell && upCell.tagName === 'TD') {
  //     upCell.style.backgroundColor = '#c8e1cc';
  //   }
  //   if (downCell && downCell.tagName === 'TD') {
  //     downCell.style.backgroundColor = '#c8e1cc';
  //   }
  //   if (leftCell && leftCell.tagName === 'TD') {
  //     leftCell.style.backgroundColor = '#c8e1cc';
  //   }
  //   if (rightCell && rightCell.tagName === 'TD') {
  //     rightCell.style.backgroundColor = '#c8e1cc';
  //   }
  // }

 // Function to edit a cell
// Function to edit a cell
function editCell(cell) {
  cell.setAttribute('contentEditable', 'true');
  cell.focus();

  // Update the content of the right rectangle with the initial text of the clicked cell
  var rightRectangle = document.querySelector('.right-rectangle');
  rightRectangle.innerHTML = "<p>|" + cell.innerText + "</p>";

  // Add event listener for the input event to update the right rectangle as you type
  cell.addEventListener('input', function() {
    rightRectangle.innerHTML = "<p>| " + cell.innerText + "</p>";
  });

  cell.addEventListener('blur', function() {
    cell.removeAttribute('contentEditable');
  });

  cell.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      cell.removeAttribute('contentEditable');
      event.preventDefault();
    }
  });
}




  // function _3DCell(cell) {
  //   var allCells = document.querySelectorAll('td');
  //   allCells.forEach(function (cell) {
  //     cell.classList.remove('highlighted'); // Remove any existing highlight
  //   });
  
  //   // Highlight the hovered cell (if applicable)
  //   if (cell) {
  //     cell.style.backgroundColor = '#C9FE94'; // Light green
  //     cell.classList.add('fade-out'); // Add a CSS class for animation
  //   }
  // }
  
  // Define the CSS animation
  
  
  function toggleBackgroundColors() {
    const upperRectangle = document.querySelector('.upper-rectangle');
    const bottomBox = document.querySelector('.bottom-box');   
    const lowerrect = document.querySelector('.lower-rectangle');    
  
    if (upperRectangle.style.backgroundColor === 'rgb(252, 251, 251)') {
      lowerrect.style.backgroundColor = '#f0e4f4';
      upperRectangle.style.backgroundColor = '#f0e4f4';
      bottomBox.style.backgroundColor = '#f9f4fb';
    } else if (upperRectangle.style.backgroundColor === 'rgb(240, 228, 244)') {
      lowerrect.style.backgroundColor = '#e4f4e9';
      upperRectangle.style.backgroundColor = '#e4f4e9';
      bottomBox.style.backgroundColor = '#fbfffd';
    }else {
      upperRectangle.style.backgroundColor = '#fcfbfb';
      bottomBox.style.backgroundColor = 'rgb(231, 236, 247)';
      lowerrect.style.backgroundColor = '#fcfbfb';
    }
  }
  

  function enableDarkMode() {
    // Function to convert a color to its dark mode equivalent
    function adjustColor(color) {
        // Simple algorithm to darken the color
        let r, g, b;
        if (color.startsWith('#')) {
            // Convert hex to RGB
            let bigint = parseInt(color.slice(1), 16);
            r = (bigint >> 16) & 255;
            g = (bigint >> 8) & 255;
            b = bigint & 255;
        } else if (color.startsWith('rgb')) {
            // Extract RGB values from 'rgb(r, g, b)' format
            [r, g, b] = color.match(/\d+/g).map(Number);
        }

        // Darken color by reducing each component
        r = Math.max(0, r - 50);
        g = Math.max(0, g - 50);
        b = Math.max(0, b - 50);

        return `rgb(${r}, ${g}, ${b})`;
    }

    // Traverse all elements
    document.querySelectorAll('*').forEach(element => {
        let computedStyle = window.getComputedStyle(element);

        // Adjust background color
        let bgColor = computedStyle.backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            element.style.backgroundColor = adjustColor(bgColor);
        }

        // Adjust text color
        let textColor = computedStyle.color;
        if (textColor) {
            element.style.color = adjustColor(textColor);
        }

        // Adjust border color
        let borderColor = computedStyle.borderColor;
        if (borderColor) {
            element.style.borderColor = adjustColor(borderColor);
        }
    });
}

// Trigger the dark mode function


  




  

