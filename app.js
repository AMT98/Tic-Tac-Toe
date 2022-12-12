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
let resetScore = document.getElementById('resetScoreBtn')
let gameMode;
const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;
let box =[
null, null, null,
null, null, null,
null, null, null]
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
        boxes[i].addEventListener('click',handleStartGame)
    }
}

const handleStartGame = (e) => gameMode === "singlePlayer" ? boxClickedSinglePlayer(e) : boxClickedMultiPlayer(e);

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
        checkWinner()
    }
}

function boxClickedSinglePlayer (e){
    let boxNo = e.target.id
    if(box[boxNo] === null){
        box[boxNo] = currentPlayer;
        e.target.innerText = currentPlayer
        if(currentPlayer === playerX){
            currentPlayer = playerO
            takeNextBestMove()
            playerOne.style.background = "gray"
            playerTwo.style.background = "none"
            playerTwo.style.color = "none"
        }else{
            currentPlayer = playerX
            playerOne.style.background = "gray"
            playerTwo.style.background = "none"
            playerTwo.style.color = "none"
        }
    }
    drawGame()
    checkWinner()
}

const takeNextBestMove = () =>{
    let result = getNextBestMove()
    if(winGame(box) === true){
        return;
    }else if(drawGame(box) === true){
        return;
    }
    else{
        box[result] = currentPlayer
        boxes[result].innerHTML = currentPlayer
        currentPlayer = playerX
    }
}

function getNextBestMove(){
    for(let i=0; i<box.length; i++){
        var boxCopy = box.slice()
        boxCopy[i] = playerO
        if(box[i] === null){
            if(winGame(boxCopy)){
                return i;
            }
        }
    }
    for(let i=0; i<box.length; i++){
        var boxCopy = box.slice()
        boxCopy[i] = playerX
        if(box[i] === null){
            if(winGame(boxCopy)){
                return i;
            }
        }
    }
    let boxArr = [];
    for (let i =0; i < boxes.length; i++){
        if(box[i] === null){
            boxArr += i
        }
    }
    var randomIndex = boxArr[Math.floor(boxArr.length * Math.random())];
    return randomIndex
}

function checkWinner(){
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
            setTimeout(player2Won,1)
            setInterval(hideForm2,3000)
        }else if(currentPlayer !== playerX){
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
            setTimeout(player1Won,1)
            setInterval(hideForm2,3000)
        }
        return;
    }
}

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
    if(xOrO[0] && xOrO[0] === xOrO[1] && xOrO[1] === xOrO[2]){
        if(box [0] === box[1] && box[1] === box[2]){
            boxes[0].style.color = "darkred"
            boxes[1].style.color = "darkred"
            boxes[2].style.color = "darkred"
        }
        return true;
    }
    if(xOrO[3] && xOrO[3] === xOrO[4] && xOrO[4] === xOrO[5]){
        if(box [3] === box[4] && box[4] === box[5]){
            boxes[3].style.color = "darkred"
            boxes[4].style.color = "darkred"
            boxes[5].style.color = "darkred"
        }
        return true;
    }
    if(xOrO[6] && xOrO[6] === xOrO[7] && xOrO[7] === xOrO[8]){
        if(box [6] === box[7] && box[7] === box[8]){
            boxes[6].style.color = "darkred"
            boxes[7].style.color = "darkred"
            boxes[8].style.color = "darkred"
        }
        return true;
    }
    if(xOrO[0] && xOrO[0] === xOrO[3] && xOrO[3] === xOrO[6]){
        if(box [0] === box[3] && box[3] === box[6]){
            boxes[0].style.color = "darkred"
            boxes[3].style.color = "darkred"
            boxes[6].style.color = "darkred"
        }
        return true;
    }
    if(xOrO[1] && xOrO[1] ===xOrO[4] && xOrO[4] === xOrO[7]){
        if(box [1] === box[4] && box[4] === box[7]){
            boxes[1].style.color = "darkred"
            boxes[4].style.color = "darkred"
            boxes[7].style.color = "darkred"
        }
        return true;
    }
    if(xOrO[2] && xOrO[2] === xOrO[5] && xOrO[5] === xOrO[8]){
        if(box [2] === box[5] && box[5] === box[8]){
            boxes[2].style.color = "darkred"
            boxes[5].style.color = "darkred"
            boxes[8].style.color = "darkred"
        }
        return true;
    }
    if(xOrO[0] && xOrO[0] === xOrO[4] && xOrO[4] === xOrO[8]){
        if(box [0] === box[4] && box[4] === box[8]){
            boxes[0].style.color = "darkred"
            boxes[4].style.color = "darkred"
            boxes[8].style.color = "darkred"
        }
        return true;
    }
    if(xOrO[2] && xOrO[2] === xOrO[4] && xOrO[4] === xOrO[6]){
        if(box [2] === box[4] && box[4] === box[6]){
            boxes[2].style.color = "darkred"
            boxes[4].style.color = "darkred"
            boxes[6].style.color = "darkred"
        }
        return true;
    }
    else{
        return false;
    }
}
function resetBoard(){
    box.fill(null)
    for (var i=0; i<boxes.length; i++){
        boxes[i].innerText = ""
        boxes[i].style.color = "rgba(255, 255, 255, 0.815)"
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
    if(handleStartGame && gameMode === "singlePlayer"){
        if(currentPlayer === playerO){
            box[4] = currentPlayer
            boxes[4].innerHTML = currentPlayer
            currentPlayer = playerX
        }
    }
}

resetBtn.addEventListener('click', resetBoard)

function scoreReset(){
    resetBoard()
    playerOneScore = 0
    playerTwoScore = 0
    scorePtwo.innerText = playerTwoScore
    scorePone.innerText = playerOneScore
    if(currentPlayer = playerO){
        currentPlayer = playerX
    }
}
resetScore.addEventListener('click', scoreReset)

// Redo the project in react with components
