// Blackjack Pseudocode

// 1) Define required constants

// 1.1) Define the 52 cards in a deck
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

// 1.2) Define the values for each card
// 	1.2.1) cards 2-9: value of the card
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

// 	1.2.2) cards 10,J,Q,K: value = 10
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

// 	1.2.2) card A: value = 1 or 11
// 2) Define required variables used to track the state of the game

// 	2.1) Player’s cards
let playerCards = [];
// 	2.2) Player’s total value
let playerTotal = 0;
// 	2.3) Dealer’s cards
let dealerCards = [];
// 	2.4) Dealer’s total value
let dealerTotal = 0;
// 	2.5) Message
let message;
let dealCard;
let removedCards = [];
let addCard;
let hiddenCard;

// 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.

// 	3.1) Player’s cards
let playerCardsEl = document.querySelector(".player-cards");
// 	3.2) Player’s total value
let playerTotalEl = document.getElementById("player-total");
// 	3.3) Dealer’s cards
let dealerCardsEl = document.querySelector(".dealer-cards");
// 	3.4) Dealer’s total value
let dealerTotalEl = document.getElementById("dealer-total");
// 	3.3) Hit button
let hitButton = document.getElementById("hit");
// 	3.4) Stand button
let standButton = document.getElementById("stand");
// 	3.5) New Game button
let newGameButton = document.getElementById("new-game");
// 	3.6) Message
message = document.getElementById("message");

// 4) Upon loading the app should:
// console.log(allCards)
// 	4.1) Initialize the state variables
function init() {
  message.textContent = "";
  playerTotal = 0;
  dealerTotal = 0;
  playerCards = [];
  dealerCards = [];
  dA = hA = sA = cA = 11;
  hitButton.disabled = false;
  standButton.disabled = false;
  initialDeal();
}
init();

function initialDeal() {
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
// 		4.1.1) Deal the player and dealer 2 cards

// 		4.1.2) Winner message is blank

// 	4.2) Render those values to the page
function renderCards(playerOrDealer) {
  if (playerOrDealer === "player") {
    playerTotalEl.textContent = playerTotal;
    addCard = document.createElement("div");
    addCard.classList.add(String(dealCard));
    addCard.classList.add("card");
    addCard.classList.add("large");
    playerCardsEl.appendChild(addCard);
  } else if (playerOrDealer === "dealer") {
    dealerTotalEl.textContent = dealerTotal;
    addCard = document.createElement("div");
    addCard.classList.add(String(dealCard));
    addCard.classList.add("card");
    addCard.classList.add("large");
    dealerCardsEl.appendChild(addCard);
  }
}
// 		4.2.1) Player has both cards face up

// 		4.2.2) Dealer has one card face up and one face down
function hideDealerCard() {
  addCard = document.createElement("div");
  addCard.classList.add("card");
  addCard.classList.add("large");
  addCard.classList.add("back");
  dealerCardsEl.appendChild(addCard);
  hiddenCard = String(dealCard);
}

function showDealerCard() {
  calcTotal("dealer");
  dealerTotalEl.textContent = dealerTotal;
  let hiddenCardEl = document.querySelector(".back");
  hiddenCardEl.classList.remove("back");
  hiddenCardEl.classList.add(hiddenCard);
}
// 	4.3) Wait for the user to click hit or stand

// 5) Handle a player clicking hit
hitButton.addEventListener("click", function () {
  deal("player");
  calcTotal("player");
  renderCards("player");
  if (playerTotal === 21) {
    standButton.disabled = true;
    hitButton.disabled = true;
    message.textContent = "YOU WIN!";
    showDealerCard();
  } else if (playerTotal >= 21) {
    showDealerCard();
  }
});
// 	5.1) Deal the player another card

// 	5.2) If player’s total value is 21 or more, display dealer wins message

// 6) Handle a player clicking stand – switch to dealer’s turn and handle dealer’s cards
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

// 	6.1) If total value is less than 17, dealer receives another card

//  	6.2) If total value is 17 or more, dealer stands (stop dealing)

// 	6.3) If the dealer has an ace and counting it as 11 would bring the total to 17 or more (but not over 21), count the ace as 11 and dealer			stands, otherwise count the ace as 1

// 7) Handle a player clicking the new game button
newGameButton.addEventListener("click", function () {
  init();
});
// 	7.1) Initialize the state variables

// 8) Dealing cards

// 	8.1) Random card generator
function deal(playerOrDealer) {
  randomIndex = Math.floor(Math.random() * deck.length);
  dealCard = deck[randomIndex];
  deck.splice(randomIndex, 1);
  removedCards.push(dealCard);
  if (playerOrDealer === "player") {
    playerCards.push(dealCard);
  } else if (playerOrDealer === "dealer") {
    dealerCards.push(dealCard);
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

// 9) Decide winner
function compareTotals() {
  if (playerTotal > dealerTotal) {
    message.textContent = "YOU WIN!";
  } else if (dealerTotal > playerTotal) {
    message.textContent = "DEALER WINS!";
  } else if (playerTotal === dealerTotal) {
    message.textContent = "PUSH";
  }
}

// 	9.1) Compare player’s total value to dealer’s total value

// 		9.1.1) if player’s total value > dealer’s total value – player wins

// 		9.1.2) if dealer’s total value > player’s total value – dealer wins

// 		9.1.3) if player’s total value = dealer’s total value - tie

// 	9.2) Message for player wins or dealer wins or tie

/*----- constants -----*/
/*----- app's state (variables) -----*/
/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/
