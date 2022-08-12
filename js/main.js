/*----- constants -----*/

let d09, h09, s09, c09;
d09 = h09 = s09 = c09 = 9;

let d08, h08, s08, c08;
d08 = h08 = s08 = c08 = 8;

let d07, h07, s07, c07;
d07 = h07 = s07 = c07 = 7;

let d06, h06, s06, c06;
d06 = h06 = s06 = c06 = 6;

let d05, h05, s05, c05;
d05 = h05 = s05 = c05 = 5;

let d04, h04, s04, c04;
d04 = h04 = s04 = c04 = 4;

let d03, h03, s03, c03;
d03 = h03 = s03 = c03 = 3;

let d02, h02, s02, c02;
d02 = h02 = s02 = c02 = 2;

let dA, hA, sA, cA;
dA = hA = sA = cA = 11;

let dK, dQ, dJ, d10, hK, hQ, hJ, h10, sK, sQ, sJ, s10, cK, cQ, cJ, c10;
dK =
  dQ =
  dJ =
  d10 =
  hK =
  hQ =
  hJ =
  h10 =
  sK =
  sQ =
  sJ =
  s10 =
  cK =
  cQ =
  cJ =
  c10 =
    10;

let deck = [
  "dA",
  "dK",
  "dQ",
  "dJ",
  "d10",
  "d09",
  "d08",
  "d07",
  "d06",
  "d05",
  "d04",
  "d03",
  "d02",
  "hA",
  "hK",
  "hQ",
  "hJ",
  "h10",
  "h09",
  "h08",
  "h07",
  "h06",
  "h05",
  "h04",
  "h03",
  "h02",
  "sA",
  "sK",
  "sQ",
  "sJ",
  "s10",
  "s09",
  "s08",
  "s07",
  "s06",
  "s05",
  "s04",
  "s03",
  "s02",
  "cA",
  "cK",
  "cQ",
  "cJ",
  "c10",
  "c09",
  "c08",
  "c07",
  "c06",
  "c05",
  "c04",
  "c03",
  "c02",
];

/*----- app's state (variables) -----*/
let playerCards = [];
let playerTotal = 0;
let dealerCards = [];
let dealerTotal = 0;
let message;
let dealtCard;
let removedCards = [];
let newCard;
let hiddenCard;

/*----- cached element references -----*/
const playerCardsEl = document.querySelector(".player-cards");
const playerTotalEl = document.getElementById("player-total");
const dealerCardsEl = document.querySelector(".dealer-cards");
const dealerTotalEl = document.getElementById("dealer-total");
const hitButton = document.getElementById("hit");
const standButton = document.getElementById("stand");
const newGameButton = document.getElementById("new-game");
message = document.getElementById("message");

/*----- event listeners -----*/
hitButton.addEventListener("click", function () {
  deal("player");
  calcTotal("player");
  renderCards("player");
  if (playerTotal === 21) {
    standButton.disabled = true;
    hitButton.disabled = true;
    showDealerCard();
    if (dealerTotal != 21) {
      dealDealer();
    } else message.textContent = "PUSH";
  } else if (playerTotal >= 21) {
    showDealerCard();
  }
});

standButton.addEventListener("click", function () {
  standButton.disabled = true;
  hitButton.disabled = true;
  if (playerTotal <= 21) {
    showDealerCard();
  }
  if (dealerTotal >= 17) {
    compareTotals();
  } else {
    dealDealer();
  }
});

newGameButton.addEventListener("click", function () {
  init();
});

/*----- functions -----*/
function init() {
  message.textContent = "";
  playerTotal = 0;
  dealerTotal = 0;
  playerCards = [];
  dealerCards = [];
  dA = hA = sA = cA = 11;
  hitButton.disabled = false;
  standButton.disabled = false;
  initDeal();
}
init();

function initDeal() {
  removeAllCards(playerCardsEl);
  removeAllCards(dealerCardsEl);
  deck = deck.concat(removedCards);
  removedCards = [];
  deal("player");
  renderCards("player");
  deal("player");
  calcTotal("player");
  renderCards("player");
  deal("dealer");
  calcTotal("dealer");
  renderCards("dealer");
  deal("dealer");
  hideDealerCard();
  if (playerTotal === 21) {
    showDealerCard();
    compareTotals();
    hitButton.disabled = true;
    standButton.disabled = true;
  }
}

function removeAllCards(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function renderCards(playerOrDealer) {
  if (playerOrDealer === "player") {
    playerTotalEl.textContent = playerTotal;
    newCard = document.createElement("div");
    newCard.classList.add(String(dealtCard), "card", "large");
    playerCardsEl.append(newCard);
  } else if (playerOrDealer === "dealer") {
    dealerTotalEl.textContent = dealerTotal;
    newCard = document.createElement("div");
    newCard.classList.add(String(dealtCard), "card", "large");
    dealerCardsEl.append(newCard);
  }
}

function hideDealerCard() {
  newCard = document.createElement("div");
  newCard.classList.add("card", "large", "back");
  dealerCardsEl.append(newCard);
  hiddenCard = String(dealtCard);
}

function showDealerCard() {
  calcTotal("dealer");
  dealerTotalEl.textContent = dealerTotal;
  let hiddenCardEl = document.querySelector(".back");
  hiddenCardEl.classList.replace("back", hiddenCard);
}

function dealDealer() {
  deal("dealer");
  calcTotal("dealer");
  renderCards("dealer");
  if (dealerTotal === 21) {
    compareTotals();
  } else if (dealerTotal > 21) {
    message.textContent = "YOU WIN!";
  } else if (dealerTotal < 17) {
    dealDealer();
  } else if (dealerTotal >= 17) {
    compareTotals();
  }
}

function deal(playerOrDealer) {
  randomIndex = Math.floor(Math.random() * deck.length);
  dealtCard = deck[randomIndex];
  deck.splice(randomIndex, 1);
  removedCards.push(dealtCard);
  if (playerOrDealer === "player") {
    playerCards.push(dealtCard);
  } else if (playerOrDealer === "dealer") {
    dealerCards.push(dealtCard);
  }
}

function calcTotal(playerOrDealer) {
  if (playerOrDealer === "player") {
    playerTotal = 0;
    playerCards.forEach(function (card) {
      checkPlayerTotal = playerTotal + eval(card);
      if (checkPlayerTotal <= 21) {
        playerTotal = checkPlayerTotal;
      } else if (checkPlayerTotal > 21) {
        dA = hA = sA = cA = 1;
        playerTotal = 0;
        playerCards.forEach(function (card) {
          playerTotal = playerTotal + eval(card);
        });
      }
      if (playerTotal > 21) {
        message.textContent = "DEALER WINS!";
        hitButton.disabled = true;
        standButton.disabled = true;
      }
    });
  } else if (playerOrDealer === "dealer") {
    dealerTotal = 0;
    dealerCards.forEach(function (card) {
      checkDealerTotal = dealerTotal + eval(card);
      if (checkDealerTotal <= 21) {
        dealerTotal = checkDealerTotal;
      } else if (checkDealerTotal > 21) {
        dA = hA = sA = cA = 1;
        dealerTotal = 0;
        dealerCards.forEach(function (card) {
          dealerTotal = dealerTotal + eval(card);
        });
      }
    });
  }
}

function compareTotals() {
  if (playerTotal > dealerTotal) {
    message.textContent = "YOU WIN!";
  } else if (dealerTotal > playerTotal) {
    message.textContent = "DEALER WINS!";
  } else if (playerTotal === dealerTotal) {
    message.textContent = "PUSH";
  }
}
