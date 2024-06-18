// H7: Function to generate login form
function generateLoginForm() {
    return `
      <div class="login-form" onclick="stopPropagation(event)">
        <form onsubmit="return login(event)">
          <label for="username">Username:</label><br>
          <input type="text" id="username" name="username" onclick="stopPropagation(event)"><br>
          <label for="password">Password:</label><br>
          <input type="password" id="password" name="password" onclick="stopPropagation(event)"><br><br>
          <input type="submit" value="Submit" onclick="stopPropagation(event)">
        </form>
      </div>
    `;
  }
  
  // Function to handle login form submission
  function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'ch' && password === 'c') {
      highlightCells(['H7', 'D18', 'E9', 'M2','B5']);
    } else {
      alert('Incorrect username or password');
    }
    return false;
  }
  
  // Function to highlight specified cells
  function highlightCells(cells) {
    cells.forEach(id => {
      const cell = document.getElementById(id);
      cell.classList.add('transition-color');
    });
  
    // Change colors of specified cells with a slight delay to ensure transition effect
    setTimeout(() => {
      document.getElementById('H7').style.backgroundColor = '#E8FFFF';
      document.getElementById('D18').style.backgroundColor = '#E8FFEB';
      document.getElementById('E9').style.backgroundColor = '#EAE8FF';
      document.getElementById('B5').style.backgroundColor = '#F7E8FF';
      
    }, 100);
  }
  