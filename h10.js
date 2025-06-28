let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;    //player x and player O  change karva 

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {                            //player O mate
            box.innerText = "O";
            box.style.backgroundColor = "green";
            turnO = false;
            
        } else {
            box.innerText = "X"; 
            box.style.backgroundColor = "red";              //player X mate
            turnO = true;
        }
        box.disabled = true;         //pachu box ma click no thai
    
        checkWinner();
    });
});

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `💥congratulation, winner is ${winner}💥`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};


const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !="" && pos2Val !="" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false; 
        }
    });

    if (isDraw) {
        msg.innerText = "DRAW...😎";
        msgContainer.classList.remove("hide");
        disabledBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

