var dice1 = new Dice();
var dice2 = new Dice();
var dice3 = new Dice();
var diceDom = document.getElementsByClassName("dice");
var oldDom;
var coin = 10000;
var betStore = [0, 0, 0, 0, 0, 0];
var result = [];
var boardDom = document.getElementById("board-game");
var oldBoardDom;
var isRolling = false;
var isGameOver = false;

initBoardGame();
gameOverDom();

diceDom[0].appendChild(dice1.pickImage());
diceDom[1].appendChild(dice2.pickImage());
diceDom[2].appendChild(dice3.pickImage());

document.getElementsByClassName("coin")[0].innerHTML = coin;
function roll() {
  if (!isRolling) {
    isRolling = true;
    let loop = setInterval(changeFace, 100);
    setTimeout(() => {
      clearInterval(loop);
      isRolling = false;
      result.push(dice1.getPoint(), dice2.getPoint(), dice3.getPoint());
      resultHandler();
    }, 1000);
    function changeFace() {
      dice1.setPoint(dice1.pickRandom());
      dice2.setPoint(dice2.pickRandom());
      dice3.setPoint(dice3.pickRandom());

      oldDom = document.getElementsByClassName("item-img");

      diceDom[0].replaceChild(dice1.pickImage(), oldDom[0]);
      diceDom[1].replaceChild(dice2.pickImage(), oldDom[1]);
      diceDom[2].replaceChild(dice3.pickImage(), oldDom[2]);
    }
  }
}

function bet(item) {
  if (coin > 0) {
    console.log(item);
    betStore[item2Int(item)]++;
    console.log(betStore);
    coin -= 1000;
    updateBoardGame(item2Int(item));
    document.getElementsByClassName("coin")[0].innerHTML = coin;
  }
}
function resultHandler() {
  console.log(result);
  awardCoin();
  newBoardGame();
}
function awardCoin() {
  let principleFlag = false;
  for (let i = 0; i < 3; i++) {
    if (betStore[result[i]] != 0) {
      if (!principleFlag) {
        coin += betStore[result[i]] * 1000;
        principleFlag = true;
        console.log("cộng tiền vốn");
      }
      coin += betStore[result[i]] * 1000;
      console.log("cộng tiền lời");
    }
  }
  if (coin > 0)
    document.getElementsByClassName("coin")[0].innerHTML = coin;
  else {
    isGameOver = true;
  }
  if (isGameOver) {
    document.getElementsByClassName("game-over")[0].style.display =
      "inline-block";
    document.getElementsByClassName("roll-btn")[0].style.pointerEvents =
      "none";
  }
}

function pickBoardImgItem(value) {
  let imgLink = `images/${int2Item(value)}.jpg`;
  var x = document.createElement("IMG");
  x.className = "board-item-img";
  x.setAttribute("src", imgLink);
  x.setAttribute("alt", `${int2Item(value)}`);
  x.setAttribute("onclick", `bet(this.alt)`);
  return x;
}
function initBoardGame() {
  for (let i = 0; i < 6; i++) {
    let boardItemDom = document.createElement("div");
    boardItemDom.className = "item";
    let betCoinDom = document.createElement("p");
    betCoinDom.className = "bet-coin";
    betCoinDom.innerHTML = betStore[i];
    boardItemDom.appendChild(pickBoardImgItem(i + 1));
    boardItemDom.append(betCoinDom);
    boardDom.append(boardItemDom);
  }
}
function updateBoardGame(value) {
  let dom = document.getElementsByClassName("bet-coin")[value];
  dom.innerHTML = `${betStore[value]}`;
}
function newBoardGame() {
  for (let i = 0; i < 6; i++) {
    document.getElementsByClassName("bet-coin")[i].innerHTML = 0;
  }

  result = [];
  betStore = [0, 0, 0, 0, 0, 0, 0];
}
function gameOverDom() {
  let gameOverDom = document.createElement("div");
  gameOverDom.className = "game-over";
  gameOverDom.innerHTML = "Game Over";
  let restartBtn = document.createElement("button");
  restartBtn.setAttribute("onclick", `resetGame()`);
  restartBtn.innerHTML = "Restart";
  gameOverDom.append(restartBtn);
  document.getElementById("container").append(gameOverDom);
}

function resetGame() {
  document.getElementsByClassName("game-over")[0].style.display = "none";
  document.getElementsByClassName('roll-btn')[0].style.pointerEvents = 'auto';
  isGameOver = false;
  coin = 10000;
  document.getElementsByClassName("coin")[0].innerHTML = coin;
}
function int2Item(value) {
  let item = "";
  switch (value) {
    case 1:
      item = "huou";
      break;
    case 2:
      item = "bau";
      break;
    case 3:
      item = "tom";
      break;
    case 4:
      item = "ga";
      break;
    case 5:
      item = "cua";
      break;
    case 6:
      item = "ca";
      break;
  }
  return item;
}
function item2Int(item) {
  switch (item) {
    case "huou":
      return 0;
    case "bau":
      return 1;
    case "tom":
      return 2;
    case "ga":
      return 3;
    case "cua":
      return 4;
    case "ca":
      return 5;
    default:
      break;
  }
  return item;
}