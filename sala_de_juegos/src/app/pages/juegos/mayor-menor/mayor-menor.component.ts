import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

interface Card {
  value: number;
  suit: string;
}

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {
  cards: Card[] = []; // Array to hold all the cards
  currentCard: Card | null | undefined = null; // Current card being displayed
  nextCard: Card | null | undefined = null; // Next card to be guessed
  nextCardVisible = false; // Flag to indicate whether the next card should be visible
  score = 0; // Player's score
  lives = 3; // Player's remaining lives
  gameOver = false; // Flag to indicate if the game is over
  lastGuess!:boolean;

  ngOnInit(): void {
    this.initializeGame();
    this.currentCard = this.cards.pop(); 
  }

  initializeGame(): void {
    // Initialize the deck of cards
    this.cards = [];
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // 11 = Jack, 12 = Queen, 13 = King, 14 = Ace

    for (const suit of suits) {
      for (const value of values) {
        const card: Card = {
          value,
          suit
        };
        this.cards.push(card);
      }
    }

    this.shuffleCards();
    this.currentCard = this.cards.pop(); // Set the first card as the current card
    this.drawNextCard();
  }

  shuffleCards(): void {
    // Fisher-Yates shuffle algorithm
    let currentIndex = this.cards.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }

  drawNextCard(): void {
    if (this.cards.length > 0) {
      if (this.currentCard) {
        this.cards.unshift(this.currentCard); // Return the current card back to the deck
      }

      this.currentCard = this.nextCard;
      this.nextCard = this.cards.pop();
      this.nextCardVisible = false;
    } else {
      this.endGame();
    }
  }

  makeGuess(isHigher: boolean): void {
    if (this.gameOver || !this.nextCard) {
      this.lastGuess = false;
      return;
    }

    if ((isHigher && this.nextCard.value > (this.currentCard ? this.currentCard.value : 0)) ||
      (!isHigher && this.nextCard.value < (this.currentCard ? this.currentCard.value : 0))) {
      this.score++;
      this.lastGuess = true;
    } else {
      this.lives--;
      this.lastGuess = false;
      if (this.lives === 0) {
        this.lastGuess = false;
        this.endGame();
        Swal.fire(
          'GAME OVER!',
          `Te quedaste sin intentos!`,
          'error'
        );
      }
    }

    this.nextCardVisible = true;
    this.drawNextCard();
  }

  resetGame(): void {
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.initializeGame();
  }

  endGame(): void {
    this.gameOver = true;
  }
}