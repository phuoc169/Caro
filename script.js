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
    undoTurns.push(undocell)
    console.log(undocell)
    CellElements.forEach(cell=>{
        if(cell.classList[1]==undocell.index)
        {
          cell.classList.remove('x','o');
          cell.addEventListener('click',handleClick,{once : true})
        }
    })
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    console.log(cookies)
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
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
    deleteAllCookies()
      Turns.forEach(turn=>{
          if(turn.index!==undefined)
          {
            setCookie(turn.index,turn.turn,1);
          }
      })
      alert("Đã lưu")
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
      if(index<width)
      {
        cell.style.display="none"
        cell.addEventListener('click',handleClick,{once : true})
      }else if(index>=width&&index<boardSize.length-width*2)
      {
        cell.classList.add(index)
        cell.addEventListener('click',handleClick,{once : true})
      }else{
        cell.style.display="none"
        cell.addEventListener('click',handleClick,{once : true})
      }
        index++
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
  function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(OTurn){
      board.classList.add(O_CLASS)
    }else{
      board.classList.add(X_CLASS)
    }
}