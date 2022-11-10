const form = document.getElementById("form")

const board = document.getElementById("board")

const info = document.getElementById("info")

const onePlayerBtn = document.getElementById("onePlayerBtn")

const twoPlayerBtn = document.getElementById("twoPlayerBtn")

const playerOneName = document.getElementById("playerOneName")

const playerTwoName = document.getElementById("playerTwoName")

const playerOne = document.getElementById("playerOne")

const playerTwo = document.getElementById("playerTwo")

const msg1 = document.getElementById("msg1")

const submitBtn = document.getElementById("submitBtn")

const boxes = document.querySelectorAll(".box")

const msg2 = document.getElementById('msg2')

const msg3 = document.getElementById('msg3')

const scorePone = document.getElementById("playerOneScore")

const scorePtwo = document.getElementById("playerTwoScore")

const img1 = document.getElementById('img1')

const img2 = document.getElementById('img2')

const winMessage = document.getElementById('playerWon')

const form2 = document.getElementById("form2")

let resetBtn = document.getElementById('resetBtn')

let gameMode;

let playerX = "X";

let playerO = "O";

let currentPlayer = playerX;

let box =
[
null, null, null,
null, null, null,
null, null, null
]

let playerOneScore = 0;
let playerTwoScore = 0;

const formLoad = () => {

    form.style.display = "block"
    board.style.opacity = "0.1"
    info.style.opacity = "0.2"

}

window.addEventListener('load', formLoad);


onePlayerBtn.addEventListener('click', function(){

    playerOneName.style.display = "inline-block"
    playerTwoName.style.display = "none"
    playerOneName.focus()
    gameMode = "singlePlayer"

});

twoPlayerBtn.addEventListener('click', function(){

    playerOneName.style.display = "inline-block"
    playerTwoName.style.display = "inline-block"
    playerOneName.focus()
    gameMode = "multiPlayer"

});

const singlePlayer = () =>{

    let nameOne = playerOneName.value
    let nameTwo = playerTwoName.value

    if(nameOne === ""){

        msg1.innerText = "Enter player name"
    }
    else{
        
        if(nameOne){
            playerOne.innerText = nameOne
        } 
        if(nameTwo.length === 0){
            
            playerTwo.innerText = "Computer"
        }

        form.style.display = "none"
        board.style.opacity = "1"
        info.style.opacity = "1"
        board.style.pointerEvents = "all"
        info.style.pointerEvents = "all"
        playerOne.style.background = "gray"
        startGame()
    }
}  


const multiPlayer = () =>{ 

    let nameOne = playerOneName.value
    let nameTwo = playerTwoName.value

    if(nameOne === "" || nameTwo === ""){
        msg1.innerText = "Enter player name"

    }else{
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
    playerOne.style.background = "gray"
    startGame()
}  

}

const handleSubmit = () => gameMode === "singlePlayer" ? singlePlayer() : multiPlayer();

submitBtn.addEventListener('click',handleSubmit)



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

function draw(){

    form2.style.display = "block"

    winMessage.innerText = `It's a draw!!`

}


function player1Won(){

    form2.style.display = "block"

    winMessage.innerText = `${playerOne.innerText} wins!!!`

}


function player2Won(){

    form2.style.display = "block"

    winMessage.innerText = `${playerTwo.innerText} wins!!!`

}


function hideForm2(){

    form2.style.display = "none"
}


const startGame = () =>{

    for (let i =0; i < boxes.length; i++){

        boxes[i].addEventListener('click',boxClickedSinglePlayer)

    }
}



function boxClickedMultiPlayer(e){

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

        drawGame()
        checkWinningCombos()
    }
    
}


function boxClickedSinglePlayer (e){
    let boxNo = e.target.id

    if(box[boxNo] === null){
        box[boxNo] = currentPlayer;    
        e.target.innerText = currentPlayer
        
        if(currentPlayer == playerX){
            currentPlayer = playerO
            playerOne.style.background = "gray"
            playerTwo.style.background = "none"
            playerTwo.style.color = "none"
            takeNextBestMove()
            
        }
        else{
            currentPlayer = playerX
            playerOne.style.background = "gray"
            playerTwo.style.background = "none"
            playerTwo.style.color = "none"
        }
    }
    drawGame()
    checkWinningCombos()

}

const takeNextBestMove = () =>{

    let result = getNextBestMove()

        box[result] = currentPlayer
        boxes[result].innerHTML = currentPlayer
        currentPlayer = playerX
        
    console.log(result);
}
function getNextBestMove(){
    for(let i=0; i<box.length; i++){
        var boxCopy = box.slice()
        boxCopy[i] = currentPlayer
        console.log(i);
        if(winGame(boxCopy)){
            return i;
        }
    }
    console.log(box);
    let boxArr = [];
    for (let i =0; i < boxes.length; i++){
        if(box[i] === null){
            boxArr += i
        }
    }
    let randomIndex = boxArr[Math.floor(boxArr.length * Math.random())];
    console.log(randomIndex);
    return randomIndex
}

function checkWinningCombos(){

    if(winGame(box) !== false){
            
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
            resetBtn.style.backgroundColor = "white"
            resetBtn.style.color = "black"
            setTimeout(player2Won,500)
            setInterval(hideForm2,3000)
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
            resetBtn.style.backgroundColor = "white"
            resetBtn.style.color = "black"
            setTimeout(player1Won,500)
            setInterval(hideForm2,3000)
            
        }
        
        return;
    }
}


//winning boxes = 
// [0,1,2]row
// [3,4,5]row
// [6,7,8]row
// [0,3,6]column
// [1,4,7]column
// [2,5,8]column
// [0,4,8]diagonally 
// [2,4,6]anti-diagonally 
function drawGame(){
    if(box[0] && box[1] && box[2] && box[3] && box[4] && box[5] && box[6] && box[7] && box[8]){

        msg2.innerText =`It's a draw!`
        msg3.innerText =`It's a draw!`
        board.style.pointerEvents = "none"
        resetBtn.style.backgroundColor = "white"
        resetBtn.style.color = "black"
        setInterval(hideForm2,3000)
        setTimeout(draw,500)

    }
}



function winGame(xOrO){
    if(xOrO[0] && xOrO[0] == xOrO[1] && xOrO[1] == xOrO[2]){
        return;
    }
    if(xOrO[3] && xOrO[3] == xOrO[4] && xOrO[4] == xOrO[5]){
        return;
    }
    if(xOrO[6] && xOrO[6] == xOrO[7] && xOrO[7] == xOrO[8]){
        return;
    }
    if(xOrO[0] && xOrO[0] == xOrO[3] && xOrO[3] == xOrO[6]){
        return;
    }
    if(xOrO[1] && xOrO[1] == xOrO[4] && xOrO[4] == xOrO[7]){
        return;
    }
    if(xOrO[2] && xOrO[2] == xOrO[5] && xOrO[5] == xOrO[8]){
        return;
    }
    if(xOrO[0] && xOrO[0] == xOrO[4] && xOrO[4] == xOrO[8]){
        return;
    }
    if(xOrO[2] && xOrO[2] == xOrO[4] && xOrO[4] == xOrO[6]){
        return;
    }
    else{
        return false;
    }
}




function resetBoard(){
    
    box.fill(null)
    
    for (let i=0; i<boxes.length; i++){
        boxes[i].innerText = ""
    }
    
    board.style.pointerEvents = "all"   
    msg2.style.backgroundColor = "black"
    msg3.style.backgroundColor = "black"
    msg2.innerText =`Score`
    msg3.innerText =`Score`
    resetBtn.style.backgroundColor = "black"
    resetBtn.style.color = "white"
    
    if(currentPlayer == playerX){
        playerTwo.style.backgroundColor = "black"
        playerOne.style.backgroundColor = "gray"
        
    }else{
        playerOne.style.backgroundColor = "black"
        playerTwo.style.backgroundColor = "gray"
    }
}

resetBtn.addEventListener('click', resetBoard)

