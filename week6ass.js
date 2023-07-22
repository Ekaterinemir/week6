//Deal 26 Cards to each Player from a Deck of 52 cards.
//Iterate through the turns where each Player plays a Card.
//The Player who played the higher card is awarded a point.
//Ties result in zero points for both Players.
//After all cards have been played, display the score and declare the winner.
//Write a Unit Test using Mocha and Chai for at least one of the functions you write.



// The code has 4 classes: Card, Deck, Player, Game; In Card class there are two parameters: rank and suit. It has 
//toString method, which allows to create a card object with specific rank and suit. 
 class Card {

  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  toString() {
    return `${this.rank} of ${this.suit}`;
  }
}
// class Deck has an array of cards that holds the collection of individual Card objects, representing all the cards
//in the deck. 
class Deck {
  constructor() {
    this.cards = [];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }
// The shuffle method shuffles the order of the cards in the deck. By swapping elements randomly, the method 
//ensures that the deck is thoroughly shuffled. 
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
//The draw method is used to take the top card from the deck. 
  draw() {
    return this.cards.pop();
  }
}
//THe class Player is managing a player's attributes and actions during the game. The constructor takes the player's 
//name as a parameter and initializes the player's attributes. Each player has a name, a hand (an array of cards);
// and a score. 
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.score = 0;
  }
// The drawCard method takes a Deck as a parameter and allows player to draw a card from the deck. It adds the drawn
// card to the player's hand by pushing it into the array. 
  drawCard(deck) {
    this.hand.push(deck.draw());
  }
// THe playCard method allows the player to play card from their hand. It removes the top card from the player's hand
//(by using shift()) and returns the card.
  playCard() {
    return this.hand.shift();
  }
//THe incrementScore method takes points as a parameter and increases the player's score by that amount.  
  incrementScore(points) {
    this.score += points;
  }
}
//THe class Game is responsible for managing the flow and rules of the card game. The constructor takes as a 
// parameters two players and a deck. It sets up the initial state of the game.
class Game {
  constructor() {
    this.player1 = new Player('Player 1');
    this.player2 = new Player('Player 2');
    this.deck = new Deck();
  }
// The dealCards method shuffles the deck and deals cards to both players.
  dealCards() {
    this.deck.shuffle();
    for (let i = 0; i < 26; i++) {
      this.player1.drawCard(this.deck);
      this.player2.drawCard(this.deck);
    }
  }
//The playRound method allows each player to play a card from their hand. It compares the ranks of the played cards
//to determine the winner and awards points. 
  playRound() {
    const card1 = this.player1.playCard();
    const card2 = this.player2.playCard();

    console.log(`${this.player1.name} plays ${card1.toString()}`);
    console.log(`${this.player2.name} plays ${card2.toString()}`);

    if (card1.rank > card2.rank) {
      this.player1.incrementScore(1);
      console.log(`${this.player1.name} wins this round!`);
    } else if (card1.rank < card2.rank) {
      this.player2.incrementScore(1);
      console.log(`${this.player2.name} wins this round!`);
    } else {
      console.log('It\'s a tie!');
    }
  }
//The playGame method starts the game. It loops through 26 rounds, simulating each round using the playRound method.
//After all rounds are played, the displayScore method shows the final scores, and declareWinner method declares 
// the winner of the game. 
  playGame() {
    this.dealCards();
    for (let i = 0; i < 26; i++) {
      this.playRound();
    }
    this.displayScore();
    this.declareWinner();
  }

  displayScore() {
    console.log(`\n${this.player1.name} score: ${this.player1.score}`);
    console.log(`${this.player2.name} score: ${this.player2.score}`);
  }

  declareWinner() {
    if (this.player1.score > this.player2.score) {
      console.log(`${this.player1.name} wins the game!`);
    } else if (this.player1.score < this.player2.score) {
      console.log(`${this.player2.name} wins the game!`);
    } else {
      console.log('The game ends in a tie!');
    }
  }
}

const game = new Game();
game.playGame();
