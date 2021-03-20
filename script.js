const X_CLASS = 'x'
const O_CLASS = 'o'
var width = 9
var height = 9
const board = document.getElementById('board')
const boardSize = Array(width * height);
initBoard()
const CellElements = document.querySelectorAll('[data-cell]')
let OTurn
var Turns=Array(boardSize)

startGame()
checksave()

function checksave()
{ 
  getCookie()
  Turns.forEach(turn=>{
    for(var i=0;i<CellElements.length;i++)
    {
      if(turn.turn!==undefined)
      {
        if(turn.index.trim()===CellElements[i].classList[1])
        {
          
          CellElements[i].classList.add(turn.turn)
        }
      }
    }
  })
  if(Turns[Turns.length-1].turn=='x')
  {
    OTurn=true
  }
  setBoardHoverClass()
}
function undo()
{
    swapTurns()
    setBoardHoverClass()
    var undocell=Turns.pop();
    CellElements.forEach(cell=>{
        if(cell.classList[1]==undocell.index)
        {
          cell.classList.remove('x','o');
          cell.addEventListener('click',handleClick,{once : true})
        }
    })
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie() {
  var ca = document.cookie.split(';');// Array username = abc , username = xyz
  for(var i = 0; i <ca.length; i++) {
    var savecell = ca[i].split("=")
    Turns.push({index:savecell[0],turn:savecell[1]})
  }
}
function save()
{
    Turns.forEach(turn=>{
        if(turn.index!==undefined)
        {
          setCookie(turn.index,turn.turn,1);
        }
    })
}
function initBoard()
{
    var html = '<div class="cell" data-cell></div>';
    for(var i=0;i<boardSize.length;i++)
    {
        board.insertAdjacentHTML('afterbegin',html);
    }
  
}
function startGame(){
    OTurn = false
    index=0;
    CellElements.forEach(cell=>{
        cell.classList.add(index)
        cell.addEventListener('click',handleClick,{once : true})
        index++;
    })
    setBoardHoverClass()
}

function handleClick(e){
    const cell = e.target
    const currentClass = OTurn ? O_CLASS : X_CLASS
    placeMark(cell,currentClass)
    swapTurns()
    setBoardHoverClass()
}
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
    checkWinner();
    Turns.push({index:cell.classList[1],turn:cell.classList[2]})
}
function swapTurns(){
    OTurn = !OTurn
}
function checkWinner() {
    var filled = true;
    for (var i = 0; i < CellElements.length; i++) {
      if (CellElements[i].classList[2] == undefined) filled = false;
      if (CellElements[i].classList[2] !== undefined) {
        if (
          (CellElements[i].classList[2] == CellElements[i + 1].classList[2] &&
            CellElements[i + 1].classList[2] == CellElements[i + 2].classList[2] &&
            CellElements[i + 2].classList[2] == CellElements[i + 3].classList[2] &&
            CellElements[i + 3].classList[2] == CellElements[i + 4].classList[2]) ||
          (CellElements[i].classList[2] == CellElements[i + width].classList[2] &&
            CellElements[i + width].classList[2] == CellElements[i + 2 * width].classList[2] &&
            CellElements[i + 2 * width].classList[2] == CellElements[i + 3 * width].classList[2] &&
            CellElements[i + 3 * width].classList[2] == CellElements[i + 4 * width].classList[2]) ||
          (CellElements[i].classList[2] == CellElements[i + 1 + width].classList[2] &&
            CellElements[i + 1 + width].classList[2] == CellElements[i + 2 + 2 * width].classList[2] &&
            CellElements[i + 2 + 2 * width].classList[2] == CellElements[i + 3 + 3 * width].classList[2] &&
            CellElements[i + 3 + 3 * width].classList[2] == CellElements[i + 4 + 4 * width].classList[2]) ||
          (CellElements[i].classList[2] == CellElements[i - 1 + width].classList[2] &&
            CellElements[i - 1 + width].classList[2] == CellElements[i - 2 + 2 * width].classList[2] &&
            CellElements[i - 2 + 2 * width].classList[2] == CellElements[i - 3 + 3 * width].classList[2] &&
            CellElements[i - 3 + 3 * width].classList[2] == CellElements[i - 4 + 4 * width].classList[2])
        ) {
          gameOver = true;
          announceWinner(CellElements[i].classList[2]);
        }
      }
    }
    if (filled) {
      announceWinner(2);
    }
  }
  function restart()
  {
    CellElements.forEach(cell=>{
        cell.classList.remove('x','o');
    })
    index=0;
    CellElements.forEach(cell=>{
        cell.classList.add(index)
        cell.addEventListener('click',handleClick,{once : true})
        index++;
    })
    document.getElementById('WinningMesage').style.display='none';
  }
function announceWinner(winner) {
    console.log("a");
    document.getElementById('WinningMesage').style.display='initial';
    document.getElementById('WinnerText').innerHTML='Chúc mừng '+winner+' đã chiến thăng!';
    if (winner == "x") {
      window.alert("X wins");
    }
    if (winner == "o") {
      window.alert("O wins");
    }
    if (winner == 2) {
      window.alert("Board filled");
    }
  }
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(OTurn){
      board.classList.add(O_CLASS)
    }else{
      board.classList.add(X_CLASS)
    }
}


