function generateTableHeaders() {
  const headerRow = document.querySelector('#gridTable thead tr');
  for (let i = 0; i < 16; i++) {
      const th = document.createElement('th');
      th.textContent = String.fromCharCode(65 + i);
      headerRow.appendChild(th);
  }
}

function generateTableBody() {
  const tbody = document.querySelector('#gridTable tbody');
  for (let j = 1; j <= 50; j++) {
      const row = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = j;
      row.appendChild(th);
      
      for (let k = 0; k < 16; k++) {
          const td = document.createElement('td');
          switch (`${j}-${k}`) {
              case '18-3':
                  td.id = "D18";
                  td.onclick = () => expandBounce(td);
                  td.innerHTML = '<div class="game-container"></div>';
                  break;
              case '7-7':
                  td.id = "H7";
                  td.onclick = (event) => expandCell(event, td);
                  td.innerHTML = generateLoginForm();
                  break;
              case '5-1':
                  td.id = "B5";
                  td.onclick = (event) => expandSnakeautomate(event, td);
                  td.innerHTML = '<div class="game-container"></div>';
                  break;
              case '9-4':
                  td.id = "E9";
                  td.onclick = () => highlightCell(td);
                  td.ondblclick = () => editCell(td);
                  break;
              case '3-1':
                  td.id = "B3";
                  td.onclick = (event) => expandSnake3(event, td);
                  td.innerHTML = '<div class="game-container"></div>';
                  break;
              case '3-0':
                  td.id = "A3";
                  td.onclick = (event) => expandSnake1(event, td);
                  td.innerHTML = '<div class="game-container"></div>';
                  break;
              case '3-2':
                   td.id = "C3";
                   td.onclick = (event) => expandSnake2(event, td);
                   td.innerHTML = '<div class="game-container"></div>';
                   break;
              case '3-3':
                   td.id = "D3";
                   td.onclick = (event) => expandSnake(event, td);
                   td.innerHTML = '<div class="game-container"></div>';
                   break;
              case '3-4':
                   td.id = "E3";
                   td.onclick = (event) => expandSnake4(event, td); 
                   td.innerHTML = '<div class="game-container"></div>';
                   break;
              case '4-4':
                   td.id = "E4";
              case '4-3':
                   td.id = "D4";
              case '4-2':
                   td.id = "C4";
              case '4-1':
                   td.id = "B4";
              case '2-12':
                  td.id = "M2";
                  td.style.backgroundColor = '#efd6ff';
                  td.onclick = () => highlightCell(td);
                  td.ondblclick = () => editCell(td);
                  break;
              case '3-12':
                 td.id = "M3";
                 td.style.backgroundColor = '#ecdaff';
                 td.onclick = () => highlightCell(td);
                 td.ondblclick = () => editCell(td);
                  break;
              case '4-12':
                td.id = "M4";
                 td.style.backgroundColor = '#e9deff';
                 td.onclick = () => highlightCell(td);
                 td.ondblclick = () => editCell(td);
                  break;
              case '5-12':
                td.id = "M5";
                 td.style.backgroundColor = '#e6e2ff';
                 td.onclick = () => highlightCell(td);
                 td.ondblclick = () => editCell(td);
                  break;
              case '6-12':
                td.id = "M6";
                 td.style.backgroundColor = '#e3e6ff';
                 td.onclick = () => highlightCell(td);
                 td.ondblclick = () => editCell(td);
                  break;
              case '7-12':
                td.id = "M7";
                 td.style.backgroundColor = '#e0e6ff';
                 td.onclick = () => highlightCell(td);
                 td.ondblclick = () => editCell(td);
                  break;
              default:
                  td.onclick = () => highlightCell(td);
                  td.ondblclick = () => editCell(td);
                  td.onmouseover = () => _3DCell(td);
                  break;
          }
          row.appendChild(td);
      }
      tbody.appendChild(row);
  }
}



