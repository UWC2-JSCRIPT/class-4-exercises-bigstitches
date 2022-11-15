const blackjackDeck = getDeck();

// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
class CardPlayer {
    constructor(dealer=false, name) {
        this.dealer = false;
        this.name = '';
        this.hand = [];
    }
    drawCard () {
       //create a randome location of available cards
       let random = Math.floor(Math.random() * blackjackDeck.length);
       // remove one element at that random location
       // and add that to a CardPlayer's hand
       this.hand.push(blackjackDeck.splice(random, 1));
    }
}


// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer;
dealer.name = 'dealer Bob';
dealer.dealer = true;

const player = new CardPlayer;
player.name = 'player Nita';
player.dealer = false;


// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */

const calcPoints = (hand) => {
   // hand is an array of one or more cards 
   // every card has a value (val), (suit) and (displayVal)
   let sum = 0;
   let aceCheck = false;
   let aceCount = 0;
    
   for (let index = 0; index < hand.length; index++) {
      if ((hand[index].val === 11)) {
         aceCheck = true;
         aceCount++;
      } 
      sum += hand[index][0].val;
   }

   if (sum > 21 && aceCheck) {
      while (sum > 21 && aceCount > 0 ) {
        sum = sum - 10;
        aceCount--;
      }
   }

   
   return sum;
}

// /**
//  * Determines whether the dealer should draw another card.
//  * 
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
const dealerShouldDraw = (dealerHand) => {
   // CREATE FUNCTION HERE
   if (calcPoints(dealerHand)<=16){
       return true;
   }
   else if (calcPoints(dealerHand)>16) {
       return false;
   }
   else {
       return null;
   }
}

// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = (playerScore, dealerScore) => {
   // CREATE FUNCTION HERE
   if (playerScore === 21) {
       console.log('player won with 21!');
       return;
   }
   else if ((playerScore > dealerScore) && (playerScore < 21)){
       console.log('player won!');
       return;
   }
   else if (playerScore > 21) {
      console.log('player busted; dealer won.');
      return;
   }
   else if ((playerScore < dealerScore) && (dealerScore > 21)){
       console.log('dealer busted; player won!');
      return;
   }
      else if ((playerScore < dealerScore) && (dealerScore <= 21)){
       console.log('dealer won.');
       return;
   }

}

// /**
//  * Creates user prompt to ask if they'd like to draw a card
//  * @param {number} count 
//  * @param {string} dealerCard 
//  */
const getMessage = (count, dealerCard) => {
   return `Dealer showing ${dealerCard[0].displayVal}, your count is ${count}.  Draw card?`
}


// /**
//  * Logs the player's hand to the console
//  * @param {CardPlayer} player 
//  */
function myFunction(item, index, arr) {
   //console.log(`this ${arr[index][0].val} of ${arr[index][0].suit}`);
   let anumber = arr[index][0].val;
   return Number(anumber);
}

const showHand = (player) => {
   //const displayHand = player.hand.map((card) => player.hand[card].displayVal);
   const displayHand =[];
   displayHand.push(player.hand.forEach(myFunction));
   // console.log(Number(displayHand[0]));
   //console.log(`${player.name}'s hand is ${displayHand.join("")} (${calcPoints(player.hand)})`);
 }

// /**
//  * Runs Blackjack Game
//  */
 const startGame = function() {
  
   player.drawCard();
   dealer.drawCard();
   player.drawCard();
   dealer.drawCard();

   //console.log(player.hand);
   //console.log(dealer.hand);
  
   // function calcPoints will return a number, so removed 'total'
   // let playerScore = calcPoints(player.hand).total;
  
   let playerScore = calcPoints(player.hand);
   //console.log(`Player's starting Score: ${calcPoints(player.hand)}`);
   showHand(player);
   while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
     player.drawCard();
     playerScore = calcPoints(player.hand);
     showHand(player);
   }
   if (playerScore > 21) {
     return 'You went over 21 - you lose!';
   }
   console.log(`Player stands at ${playerScore}`);

   let dealerScore = calcPoints(dealer.hand);
   while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
     dealer.drawCard();
     dealerScore = calcPoints(dealer.hand);
     showHand(dealer);
   }
   if (dealerScore > 21) {
     return 'Dealer went over 21 - you win!';
   }
   console.log(`Dealer stands at ${dealerScore}`);

   return determineWinner(playerScore, dealerScore);
 }
 console.log(startGame());