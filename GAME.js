const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const popup = document.getElementById("resultPopup");
const resultMessage = document.getElementById("resultMessage");
const playAgainButton = document.getElementById("playAgain");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("taken");

            if (checkWinner(currentPlayer)) {
                showPopup(`🎉 Player ${currentPlayer} Wins!`);
                gameActive = false;
            } else if (board.includes("")) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusText.textContent = `Player ${currentPlayer}'s turn`;
            } else {
                showPopup("🤝 It's a Draw!");
                gameActive = false;
            }
        }
    });
});

resetButton.addEventListener("click", resetGame);
playAgainButton.addEventListener("click", resetGame);

function checkWinner(player) {
    return winningCombos.some(combo => 
        combo.every(index => board[index] === player)
    );
}

function showPopup(message) {
    resultMessage.textContent = message;
    popup.classList.add("show");
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    popup.classList.remove("show");
}
