const X_CLASS = 'x'
const O_CLASS = 'o'
var width = 12
var height = 12
const board = document.getElementById('board')
const boardSize = Array(width * height);
initBoard()
const CellElements = document.querySelectorAll('[data-cell]')
let OTurn
var Turns=Array(boardSize)
var undoTurns=Array(boardSize)
startGame()



function redo()
{
  if(undoTurns.length>0)
  {
    swapTurns()
    setBoardHoverClass()
    Turns.push(undoTurns[undoTurns.length-1])
    CellElements.forEach(cell=>{
      if(cell.classList[1]==undoTurns[undoTurns.length-1].index)
      {
        cell.classList.add(undoTurns[undoTurns.length-1].turn);
        cell.addEventListener('click',handleClick,{once : true})
      }
  })
    undoTurns.pop();
  }
}

function announceWinner(winner) {
    console.log("a");
    document.getElementById('WinningMesage').style.display='initial';
    document.getElementById('WinnerText').innerHTML='Chúc mừng '+winner+' đã chiến thắng!';
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



