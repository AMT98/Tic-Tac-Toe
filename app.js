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
let msg3 = document.getElementById('msg3')
let scorePone = document.getElementById("playerOneScore")
let scorePtwo = document.getElementById("playerTwoScore")

const startGame = () =>{
    for (let i =0; i < boxes.length; i++){
        boxes[i].addEventListener('click',boxClicked)
    }
}

let playerOneScore = 0;
let playerTwoScore = 0;

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
            if(currentPlayer !== playerO){
                msg3.innerText = `You win!`
                msg3.style.backgroundColor = "gray"
                msg2.style.backgroundColor = "black"
                msg2.innerText= "Score"
                board.style.pointerEvents = "none"
                playerTwo.style.background = "none"
                playerOne.style.background = "none"
                playerTwoScore++
                scorePtwo.innerText = playerTwoScore
                
            }
            else if(currentPlayer !== playerX){
                msg2.innerText= `You win!`
                msg2.style.backgroundColor = "gray"
                msg3.style.backgroundColor = "black"
                msg3.innerText = `Score`
                board.style.pointerEvents = "none"
                playerOne.style.background = "none"
                playerTwo.style.background = "none"
                playerOneScore++
                scorePone.innerText = playerOneScore
                
            }
            return;
        }
    }
    
}

function winGame(){
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
    // if(box[0] !== box[1] !== box[2] !== box[3] !== box[4] !== box[5] !== box[6] !== box[7] !==box[8]){
    //     msg2.innerText =`It's a draw!`
    // }
    else{
        return false;
    }
}
winGame();


let resetBtn = document.getElementById('resetBtn')

resetBtn.addEventListener('click', resetBoard)

function resetBoard(){
box.fill(null)
for (let i=0; i<boxes.length; i++){
    boxes[i].innerText = ""
}
board.style.pointerEvents = "all"
msg2.style.backgroundColor = "black"
msg3.style.backgroundColor = "black"
if(currentPlayer == playerX){
playerTwo.style.backgroundColor = "black"
playerOne.style.backgroundColor = "gray"
}else{
    playerOne.style.backgroundColor = "black"
    playerTwo.style.backgroundColor = "gray"
}
}
