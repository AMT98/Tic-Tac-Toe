let form = document.getElementById("form")
let board = document.getElementById("board")
let info = document.getElementById("info")

window.addEventListener('load', function(){
    form.style.display = "block"
    board.style.opacity = "0.1"
    info.style.opacity = "0.2"
});
let onePlayerBtn = document.getElementById("onePlayerBtn")
let twoPlayerBtn = document.getElementById("twoPlayerBtn")
let playerOneName = document.getElementById("playerOneName")
let playerTwoName = document.getElementById("playerTwoName")

const onlyTwo = twoPlayerBtn.addEventListener('click', function(){
    playerOneName.style.display = "inline-block"
    playerTwoName.style.display = "inline-block"
    playerOneName.focus()
});

const onlyOne = onePlayerBtn.addEventListener('click', function(){
    playerOneName.style.display = "inline-block"
    playerTwoName.style.display = "none"
    playerOneName.focus()
});

let playerOne = document.getElementById("playerOne")
let playerTwo = document.getElementById("playerTwo")
let msg1 = document.getElementById("msg1")
let submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener('click', function(){
    let nameOne = playerOneName.value
    let nameTwo = playerTwoName.value
    
    if(nameOne === ""){
            msg1.innerText = "Enter player name"
        }
    else{
            if(nameOne){
                playerOne.innerText = nameOne
            }
            if(nameTwo){
                playerTwo.innerText = nameTwo
            }
            form.style.display = "none"
            board.style.opacity = "1"
            info.style.opacity = "1"
            board.style.pointerEvents = "all"
            info.style.pointerEvents = "all"
        }  
        playerOne.style.background = "gray"
        startGame()
})

playerOneName.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        submitBtn.click()
    }
});
playerTwoName.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        submitBtn.click()
    }
});
let playerX = "X";
let playerO = "O";
let currentPlayer = playerX;
let box = Array(9).fill(null)
let boxes = document.querySelectorAll(".box")
let msg2 = document.getElementById('msg2')

const startGame = () =>{
    for (let i =0; i < boxes.length; i++){
        boxes[i].addEventListener('click',boxClicked)
    }
}
function boxClicked(e){
    let boxNo = e.target.id
    if(box[boxNo] === null){
        box[boxNo] = currentPlayer;    
        e.target.innerText = currentPlayer
        if(currentPlayer == playerX){
            currentPlayer = playerO
            playerTwo.style.background = "gray"
            playerOne.style.background = "none"
            playerOne.style.color = "none"
        }else{
            currentPlayer = playerX
            playerOne.style.background = "gray"
            playerTwo.style.background = "none"
            playerTwo.style.color = "none"
        }
        if(winGame() !== false){
            msg2.innerText= `You win!`
            return;
        }
    }
    
}

function winGame(){
    console.log(box)
    if(box[0] && box[0] == box[1] && box[1] == box[2]){
        return;
    }
    if(box[3] && box[3] == box[4] && box[4] == box[5]){
        return;
    }
    if(box[6] && box[6] == box[7] && box[7] == box[8]){
        return;
    }
    if(box[0] && box[0] == box[3] && box[3] == box[6]){
        return;
    }
    if(box[1] && box[1] == box[4] && box[4] == box[7]){
        return;
    }
    if(box[2] && box[2] == box[5] && box[5] == box[8]){
        return;
    }
    if(box[0] && box[0] == box[4] && box[4] == box[8]){
        return;
    }
    if(box[2] && box[2] == box[4] && box[4] == box[6]){
        return;
    }
    else{
        return false;
    }
}
winGame();

// if(!box[0],!box[1],!box[2],!box[3],!box[4],!box[5],!box[6],!box[7],!box[8]){
//     msg2.innerText =`It's a draw!`
// }

// let resetBtn = document.getElementById('resetBtn')

// resetBtn.addEventListener('click', resetBoard)

// function resetBoard(){
// for (let i=0; i<boxes.length; i++){
//     boxes[i].innerText = ""
// }
// }
