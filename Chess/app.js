const board = [
  null,
  0,
  null,
  1,
  null,
  2,
  null,
  3,
  4,
  null,
  5,
  null,
  6,
  null,
  7,
  null,
  null,
  8,
  null,
  9,
  null,
  10,
  null,
  11,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  12,
  null,
  13,
  null,
  14,
  null,
  15,
  null,
  null,
  16,
  null,
  17,
  null,
  18,
  null,
  19,
  20,
  null,
  21,
  null,
  22,
  null,
  23,
  null,
];

const cellElements = document.querySelectorAll("[data-cell]");
let whitePieces = document.querySelectorAll("span");
let blackPieces = document.querySelectorAll("p");
const whiteTurnText = document.querySelectorAll(".white-turn-text");
const blackTurnText = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector("#divider");

//player properties

let turn = true;
let blackScore = 12;
let whiteScore = 12;
let playerPieces;
let findPiece = function (pieceId) {
  let parsed = parseInt(pieceId);
  return board.indexOf(parsed);
};

let selectedPiece = {
  pieceId: -1,
  indexOfBoardPiece: -1,
  isKing: false,
  seventhSpace: false,
  ninthSpace: false,
  fourteenthSpace: false,
  eighteenthSpace: false,
  minusSeventhSpace: false,
  minusNinthSpace: false,
  minusFourteenthSpace: false,
  minusEighteenthSpace: false,
};

function givePiecesEventListeners() {
  if (turn) {
    for (let i = 0; i < blackPieces.length; i++) {
      blackPieces[i].addEventListener("click", getPlayerPieces);
    }
  } else {
    for (let i = 0; i < whitePieces.length; i++) {
      whitePieces[i].addEventListener("click", getPlayerPieces);
    }
  }
}

function getPlayerPieces() {
  if (turn) {
    playerPieces = blackPieces;
  } else {
    playerPieces = whitePieces;
  }
  removeCellonclick();
  resetBorders();
}

function removeCellonclick() {
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].removeAttribute("onclick");
  }
}

function resetBorders() {
  for (let i = 0; i < playerPieces.length; i++) {
    playerPieces[i].style.border = "1px solid white";
  }

  resetSelectedPieceProperties();
  getSelectedPiece();
}

function resetSelectedPieceProperties() {
  selectedPiece.pieceId = -1;
  selectedPiece.pieceId = -1;
  selectedPiece.isKing = false;
  selectedPiece.seventhSpace = false;
  selectedPiece.ninthSpace = false;
  selectedPiece.fourteenthSpace = false;
  selectedPiece.eighteenthSpace = false;
  selectedPiece.minusSeventhSpace = false;
  selectedPiece.minusNinthSpace = false;
  selectedPiece.minusFourteenthSpace = false;
  selectedPiece.minusEighteenthSpace = false;
}

//gets ID and index of the board cell

function getSelectedPiece() {
  selectedPiece.pieceId = parseInt(event.target.id);
  selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
  isPieceKing();
}

function isPieceKing() {
  if (
    document.getElementById(selectedPiece.pieceId).classList.contains("king")
  ) {
    selectedPiece.isKing = true;
  } else {
    selectedPiece.isKing = false;
  }
  getAvailableSpaces();
}

function getAvailableSpaces() {
  if (
    board[selectedPiece.indexOfBoardPiece + 7] === null &&
    cellElements[selectedPiece.indexOfBoardPiece + 7].classList.contains(
      "noPiece"
    ) !== true
  ) {
    selectedPiece.seventhSpace = true;
  }
  if (
    board[selectedPiece.indexOfBoardPiece + 9] === null &&
    cellElements[selectedPiece.indexOfBoardPiece + 9].classList.contains(
      "noPiece"
    ) !== true
  ) {
    selectedPiece.ninthSpace = true;
  }
  if (
    board[selectedPiece.indexOfBoardPiece - 7] === null &&
    cellElements[selectedPiece.indexOfBoardPiece - 7].classList.contains(
      "noPiece"
    ) !== true
  ) {
    selectedPiece.minusSeventhSpace = true;
  }
  if (
    board[selectedPiece.indexOfBoardPiece - 9] === null &&
    cellElements[selectedPiece.indexOfBoardPiece - 9].classList.contains(
      "noPiece"
    ) !== true
  ) {
    selectedPiece.minusNinthSpace = true;
  }
  checkAvailableJumpSpaces();
}

function checkAvailableJumpSpaces() {
  if (turn) {
    if (
      board[selectedPiece.indexOfBoardPiece + 14] === null &&
      cellElements[selectedPiece.indexOfBoardPiece + 14].classList.contains(
        "noPiece"
      ) !== true &&
      board[selectedPiece.indexOfBoardPiece + 7] >= 12
    ) {
      selectedPiece.fourteenthSpace = true;
    }
  } else {
    if (
      board[selectedPiece.indexOfBoardPiece + 14] === null &&
      cellElements[selectedPiece.indexOfBoardPiece + 14].classList.contains(
        "noPiece"
      ) !== true &&
      board[selectedPiece.indexOfBoardPiece + 7] < 12 &&
      board[selectedPiece.indexOfBoardPiece + 7] !== null
    ) {
      selectedPiece.fourteenthSpace = true;
    }
  }
}

function checkPieceConditions() {
  if (selectedPiece.isKing) {
    givePieceBorder();
  } else {
    if (turn) {
      selectedPiece.minusSeventhSpace = false;
      selectedPiece.minusNinthSpace = false;
      selectedPiece.minusFourteenthSpace = false;
      selectedPiece.minusEighteenthSpace = false;
    } else {
      selectedPiece.seventhSpace = false;
      selectedPiece.ninthSpace = false;
      selectedPiece.fourteenthSpace = false;
      selectedPiece.eighteenthSpace = false;
    }
    givePieceBorder();
  }
}

function givePieceBorder() {
  if (
    selectedPiece.seventhSpace ||
    selectedPiece.ninthSpace ||
    selectedPiece.fourteenthSpace ||
    selectedPiece.eighteenthSpace ||
    selectedPiece.minusSeventhSpace ||
    selectedPiece.minusNinthSpace ||
    selectedPiece.minusFourteenthSpace ||
    selectedPiece.minusEighteenthSpace
  ) {
    document.getElementById(selectedPiece.pieceId).style.border =
      "3px solid green";
    givecellElementsClick();
  } else {
    return;
  }
}

function givecellElementsClick() {
  if (selectedPiece.seventhSpace) {
    cellElements[selectedPiece.indexOfBoardPiece + 7].setAttribute(
      "onclick",
      "makeMove(7)"
    );
  }
  if (selectedPiece.ninthSpace) {
    cellElements[selectedPiece.indexOfBoardPiece + 9].setAttribute(
      "onclick",
      "makeMove(9)"
    );
  }
  if (selectedPiece.fourteenthSpace) {
    cellElements[selectedPiece.indexOfBoardPiece + 14].setAttribute(
      "onclick",
      "makeMove(14)"
    );
  }
  if (selectedPiece.eighteenthSpace) {
    cellElements[selectedPiece.indexOfBoardPiece + 18].setAttribute(
      "onclick",
      "makeMove(18)"
    );
  }
  if (selectedPiece.minusSeventhSpace) {
    cellElements[selectedPiece.indexOfBoardPiece - 7].setAttribute(
      "onclick",
      "makeMove(-7)"
    );
  }
  if (selectedPiece.minusNinthSpace) {
    cellElements[selectedPiece.indexOfBoardPiece - 9].setAttribute(
      "onclick",
      "makeMove(-9)"
    );
  }
  if (selectedPiece.minusFourteenthSpace) {
    cellElements[selectedPiece.indexOfBoardPiece - 14].setAttribute(
      "onclick",
      "makeMove(-14)"
    );
  }
  if (selectedPiece.minusEighteenthSpace) {
    cellElements[selectedPiece.indexOfBoardPiece - 18].setAttribute(
      "onclick",
      "makeMove(-18)"
    );
  }
}

function makeMove(number) {
  document.getElementById(selectedPiece.pieceId).remove();
  cellElements[selectedPiece.indexOfBoardPiece].innerHTML = "";
  if (turn) {
    if (selectedPiece.isKing) {
      cellElements[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<p class="blackPiece king id = "${selectedPiece.pieceId}"></p>`;
      blackPieces = document.querySelectorAll("p");
    } else {
      cellElements[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<p class="blackPiece id = "${selectedPiece.pieceId}"></p>`;
      blackPieces = document.querySelectorAll("p");
    }
  } else {
    if (selectedPiece.isKing) {
      cellElements[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<span class="whitePiece king id = "${selectedPiece.pieceId}"></p>`;
      blackPieces = document.querySelectorAll("span");
    } else {
      cellElements[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<span class="whitePiece id = "${selectedPiece.pieceId}"></p>`;
      blackPieces = document.querySelectorAll("span");
    }
  }

  let indexOfPiece = selectedPiece.indexOfBoardPiece;
  if (number === 14 || number === -14 || number === 18 || number === -18) {
    changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
  } else {
    changeData(indexOfPiece, indexOfPiece + number);
  }
}

function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
  board[indexOfBoardPiece] = null;
  board[modifiedIndex] = parseInt(selectedPiece.pieceId);
  if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
    document.getElementById(selectedPiece.pieceId).classList.add("king");
  }
  if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
    document.getElementById(selectedPiece.pieceId).classList.add("king");
  }
  if (removePiece) {
    board[removePiece] = null;
    if (turn && selectedPiece.pieceId < 12) {
      cells[removePiece].innerHTML = "";
      whiteScore--;
    }
    if (turn === false && selectedPiece.pieceId >= 12) {
      cells[removePiece].innerHTML = "";
      blackScore--;
    }
  }
  resetSelectedPieceProperties();
  removeCellonclick();
  removeEventListeners();
}

function removeEventListeners() {
  if (turn) {
    for (let i = 0; i < blackPieces.length; i++) {
      blackPieces[i].removeEventListener("click", getPlayerPieces);
    }
  } else {
    for (let i = 0; i < whitePieces.length; i++) {
      whitePieces[i].removeEventListener("click", getPlayerPieces);
    }
  }
  checkForWin();
}

function checkForWin() {
  if (whiteScore === 0) {
    divider.style.display = "none";
    for (let i = 0; i < blackTurnText.length; i++) {
      blackTurnText[i].style.color = "black";
      whiteTurntext[i].style.display = "none";
      blackTurnText[i].textContent = "BLACK WINS!";
    }
  } else if (blackScore === 0) {
    divider.style.display = "none";
    for (let i = 0; i < whiteTurntext.length; i++) {
      whiteTurntext[i].style.color = "white";
      blackTurnText[i].style.display = "none";
      whiteTurntext[i].textContent = "WHITE WINS!";
    }
  }
  changePlayer();
}

function changePlayer() {
  if (turn) {
    turn = false;
    for (let i = 0; i < blackTurnText.length; i++) {
      blackTurnText[i].style.color = "lightGrey";
      whiteTurntext[i].style.color = "black";
    }
  } else {
    turn = true;
    for (let i = 0; i < whiteTurntext.length; i++) {
      whiteTurntext[i].style.color = "lightGrey";
      blackTurnText[i].style.color = "black";
    }
  }
  givePiecesEventListeners();
}

givePiecesEventListeners();
