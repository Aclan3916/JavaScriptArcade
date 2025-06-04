const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
let go = "circle";
//9 empty string aka tictactoe board
const startCells = [
    "", "" ,"",
    "", "", "",
    "", "", ""
]

infoDisplay.textContent = "Circle goes first";

function createBoard() {    
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div"); // create 9 divs
        cellElement.classList.add("square"); //add a class to each div of .square
        cellElement.id = index;
        cellElement.addEventListener("click", addGo) // add event listener
        gameboard.append(cellElement);   //append each cell element to the gameboard giving 9 cells or squares
    })

}
//create div, add cross or circle, append to where clicked, and switch between cross and circle
function addGo(e) {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go); //give it circle or cross
    e.target.append(goDisplay);
    go = go === 'circle' ? 'cross' : 'circle';
    infoDisplay.textContent = "It is now " + go + "'s go";
    e.target.removeEventListener("click", addGo) // so can only click each box once
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array => {
       const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"))

       if(circleWins) {
        infoDisplay.textContent = "Circle Wins!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true))); //CLONE SQUARE AND REPLACE //can't use removeeventListener because need to remove from all
    }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"))
        
        if(crossWins) {
         infoDisplay.textContent = "X Wins!"
         allSquares.forEach(square => square.replaceWith(square.cloneNode(true))); //removes event listeners FROM ALL SQUARES
     }
     })

   
}


createBoard();
