document.addEventListener('DOMContentLoaded', () => {
    generateTableHeaders();
    generateTableBody();
  });

  const blob = document.getElementById("swirly");

  window.onpointermove = event => { 
    const { clientX, clientY } = event;
    
    blob.animate({
      left: `${clientX}px`,
      top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });
  }

  document.querySelector('.upper-rectangle').addEventListener('mouseover', function() {
    document.getElementById('swirly').style.background = 'radial-gradient(circle at center, #f0fff7 0%, #e8fee6 30%, #d9fcdf 60%, #bcf8c0 80%, #a7fcc3 100%)';
  });
  
  document.querySelector('.upper-rectangle').addEventListener('mouseout', function() {
    document.getElementById('swirly').style.background = 'radial-gradient(circle at center, #f0f8ff 0%, #e6f6fe 30%, #d9f4fc 60%, #bce8f8 80%, #a7dffc 100%)';
  });
  
  document.querySelector('.logo .gsheetlogo').addEventListener('mouseover', function() {
    document.getElementById('swirly').style.background = 'red';
  });
  
  document.querySelector('.logo .gsheetlogo').addEventListener('mouseout', function() {
    document.getElementById('swirly').style.background = 'radial-gradient(circle at center, #f0f8ff 0%, #e6f6fe 30%, #d9f4fc 60%, #bce8f8 80%, #a7dffc 100%)';
  });
  

  const chakra = document.querySelector('.chakra-image');

  // Ensure consistent size
  chakra.style.width = '50px';
  chakra.style.height = 'auto';
  
  let currentImageIndex = 0;
  let walkingInterval;
  const walkingRange = 600;
  let currentTransformX = -10; // Initial position 10px from the right end
  let direction = -1; // Start moving left initially
  let hasHeadphones = Math.random() < 0.5; // 50:50 chance for headphones
  
  // Define the image paths for different frame sets
  const frameSets = {
    left: [
      'Graphics/ChakraMove/FS1/Contact1.svg',
      'Graphics/ChakraMove/FS1/Down.svg',
      'Graphics/ChakraMove/FS1/Passing.svg',
      'Graphics/ChakraMove/FS1/Up.svg',
      'Graphics/ChakraMove/FS1/Contact2.svg',
      'Graphics/ChakraMove/FS1/Down2.svg',
      'Graphics/ChakraMove/FS1/Passing2.svg',
      'Graphics/ChakraMove/FS1/Up2.svg'
    ],
    right: [
      'Graphics/ChakraMove/FS2/Contact1.svg',
      'Graphics/ChakraMove/FS2/Down.svg',
      'Graphics/ChakraMove/FS2/Passing.svg',
      'Graphics/ChakraMove/FS2/Up.svg',
      'Graphics/ChakraMove/FS2/Contact2.svg',
      'Graphics/ChakraMove/FS2/Down2.svg',
      'Graphics/ChakraMove/FS2/Passing2.svg',
      'Graphics/ChakraMove/FS2/Up2.svg'
    ],
    leftHeadphones: [
      'Graphics/ChakraMove/FS3/Contact1.svg',
      'Graphics/ChakraMove/FS3/Down.svg',
      'Graphics/ChakraMove/FS3/Passing.svg',
      'Graphics/ChakraMove/FS3/Up.svg',
      'Graphics/ChakraMove/FS3/Contact2.svg',
      'Graphics/ChakraMove/FS3/Down2.svg',
      'Graphics/ChakraMove/FS3/Passing2.svg',
      'Graphics/ChakraMove/FS3/Up2.svg'
    ],
    rightHeadphones: [
      'Graphics/ChakraMove/FS4/Contact1.svg',
      'Graphics/ChakraMove/FS4/Down.svg',
      'Graphics/ChakraMove/FS4/Passing.svg',
      'Graphics/ChakraMove/FS4/Up.svg',
      'Graphics/ChakraMove/FS4/Contact2.svg',
      'Graphics/ChakraMove/FS4/Down2.svg',
      'Graphics/ChakraMove/FS4/Passing2.svg',
      'Graphics/ChakraMove/FS4/Up2.svg'
    ]
  };
  
  function getCurrentFrameSet() {
    if (direction === -1) {
      return hasHeadphones ? frameSets.leftHeadphones : frameSets.left;
    } else {
      return hasHeadphones ? frameSets.rightHeadphones : frameSets.right;
    }
  }
  
  function walkChakra() {
    // Clear any existing interval to prevent multiple intervals running at the same time
    clearInterval(walkingInterval);
  
    walkingInterval = setInterval(() => {
      // Update position
      currentTransformX += direction * 2; // Move by 2px
  
      // Change direction if at the walking range edges
      if (currentTransformX <= -walkingRange || currentTransformX >= -10) {
        direction *= -1;
      }
  
      // Update Chakra's position
      chakra.style.transform = `translateX(${currentTransformX}px)`;
  
      // Update Chakra's walking animation frame
      const currentFrameSet = getCurrentFrameSet();
      chakra.src = currentFrameSet[currentImageIndex];
      currentImageIndex = (currentImageIndex + 1) % currentFrameSet.length;
      // Check if character has headphones and adjust width if necessary
      if (hasHeadphones) {
        chakra.style.width = '120px'; // Double the width if character has headphones
      } else {
        chakra.style.width = '50px'; // Default width if character doesn't have headphones
      }
    }, 100); // Change image every 100ms for smooth walking animation
  }
  
  let stopInterval;
let stopFor2Seconds;

function stop() {
  clearInterval(walkingInterval); // Stop the walking animation

  const standImage = hasHeadphones ? "stand_headphone_" : "stand_nothing_";
  const directionSuffix = direction === 1 ? "right" : "left";
  chakra.src = `Graphics/${standImage}${directionSuffix}.svg`; // Replace with the appropriate standing image
  // Maintain the current position
  chakra.style.transform = `translateX(${currentTransformX}px)`;

  // Define an array of intervals
  const intervals = [5000, 6000, 7000, 8000, 9000];
  const randomInterval = intervals[Math.floor(Math.random() * intervals.length)];

  // Start the stop interval to toggle between left and right standing images
  stopInterval = setInterval(() => {
    const currentDirection = direction === 1 ? "right" : "left";
    const nextDirection = currentDirection === "left" ? "right" : "left";
    chakra.src = `Graphics/${standImage}${nextDirection}.svg`;
    direction = direction === 1 ? -1 : 1; // Change the direction
  }, randomInterval); // Toggle at a random interval

  // Randomly stop the animation for 2 seconds
  stopFor2Seconds = setTimeout(() => {
    clearInterval(stopInterval); // Stop toggling between left and right standing images
    clearInterval(stopFor2Seconds); // Stop the 2-second stop
    walkChakra(); // Resume walking animation
  }, 2000);
}
  // Call the function to start the animation
  // walkChakra();
  









  // const leftRectangle = document.querySelector('.left-rectangle');
  // const rightRectangle = document.querySelector('.right-rectangle');
  // const typingArea = document.createElement('textarea');
  // typingArea.className = 'typing-area';
  // rightRectangle.appendChild(typingArea);
  // let typingStart, typingEnd, typingSpeed;
  
  // function calculateTypingSpeed() {
  //     typingEnd = new Date();
  //     const timeDiff = typingEnd - typingStart;
  //     const seconds = timeDiff / 1000;
  //     const numWords = typingArea.value.trim().split(/\s+/).length;
  //     typingSpeed = Math.round((numWords / seconds) * 60); // Words per minute
  //     return typingSpeed;
  // }
  
  // typingArea.addEventListener('input', function () {
  //     if (!typingStart) typingStart = new Date();
  //     const speed = calculateTypingSpeed();
  //     leftRectangle.innerHTML = `<p>Typing Speed: ${speed} WPM</p>`;
  // });
  
  // typingArea.addEventListener('blur', function () {
  //     const speed = calculateTypingSpeed();
  //     leftRectangle.innerHTML = `<p>Typing Speed: ${speed} WPM</p>`;
  // });
  

  function Typetestactivate() {
    const rightRectangle = document.querySelector('.right-rectangle');
    const leftRectangle = document.querySelector('.left-rectangle');
  
    // Generate a random sentence
    const sentence = generateRandomSentence(20);
  
    // Display the sentence in the right rectangle
    rightRectangle.innerHTML = sentence;
  
    // Make the original sentence grey
    rightRectangle.style.color = '#808080';
  
    // Make the right rectangle editable
    rightRectangle.contentEditable = true;
  
    let typedWords = ''; // To store typed words
    let correctWords = 0; // To count correctly typed words
    let totalWords = sentence.split(' ').length; // Total words in the sentence
  
    // Add event listener for input to track typed words
    rightRectangle.addEventListener('input', function() {
      typedWords = rightRectangle.textContent.trim(); // Get the typed words
      let typedWordsArray = typedWords.split(' ');
      let sentenceArray = sentence.split(' ');
  
      let html = ''; // HTML to display in the left rectangle
  
      // Compare typed words with original sentence
      for (let i = 0; i < sentenceArray.length; i++) {
        if (typedWordsArray[i] === sentenceArray[i]) {
          correctWords++; // Increment correctly typed words count
          html += `<span style="color: green;">${typedWordsArray[i]}</span>` + ' ';
        } else {
          html += `<span>${typedWordsArray[i]}</span>` + ' ';
        }
      }
  
      // Display the typed words in the left rectangle
      leftRectangle.innerHTML = html;
  
      // Check if the person has typed the entire sentence
      if (typedWords === sentence) {
        // Calculate typing speed and accuracy
        const timeTaken = 1; // For simplicity, assuming it took 1 second
        const typingSpeed = totalWords / timeTaken; // Words per second
        const accuracy = (correctWords / totalWords) * 100; // Percentage of correctly typed words
  
        // Display typing speed and accuracy in the left rectangle
        leftRectangle.innerHTML += `<br>Typing Speed: ${typingSpeed.toFixed(2)} words/sec<br>Accuracy: ${accuracy.toFixed(2)}%`;
  
        // Disable further typing
        rightRectangle.contentEditable = false;
      }
    });
  }
  
  // Function to generate a random sentence with a given number of words
  function generateRandomSentence(numWords) {
    const words = [
      'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog',
      'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
      'magna', 'aliqua', 'Ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
      'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo'
    ];
  
    let sentence = '';
    for (let i = 0; i < numWords; i++) {
      let word = words[Math.floor(Math.random() * words.length)];
      sentence += word + ' ';
    }
    return sentence.trim();
  }
  