import { Component } from '@angular/core';

interface Letter {
  value: string;
  visible: boolean;
}

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {
  word: Letter[] = [];
  wordString: string = '';
  incorrectGuesses: string[] = [];
  guess: string = '';
  gameOver: boolean = false;
  hangmanState: number = 0;
  displayImg:string='';

  img:string[] = [
    '../assets/img/hangman0.gif',
    '../assets/img/hangman1.gif',
    '../assets/img/hangman2.gif',
    '../assets/img/hangman3.gif',
    '../assets/img/hangman4.gif',
    '../assets/img/hangman5.gif',
    '../assets/img/hangman6.gif',
    '../assets/img/hangman7.gif',
  ];

  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  words: string[] = ['ahorcado', 'tecnologia', 'heladera', 'futbol', 'computadora', 'automovil', 'internet', 'juego', 'televisor'];
  maxIncorrectGuesses: number = 7;

  constructor() {
    this.startGame();
  }

  startGame(): void {
    this.wordString = this.getRandomWord();
    this.word = this.wordString.split('').map((letter) => ({ value: letter, visible: false }));
    this.incorrectGuesses = [];
    this.guess = '';
    this.gameOver = false;
    this.hangmanState = 0;
  }

  getRandomWord(): string {
    const index = Math.floor(Math.random() * this.words.length);
    return this.words[index];
  }

  makeGuess(letter: string): void {
    if (this.gameOver) {
      return;
    }

    if (this.isLetterAlreadyGuessed(letter)) {
      alert('You have already guessed that letter.');
      return;
    }

    if (!this.isLetterInWord(letter)) {
      this.incorrectGuesses.push(letter);
      this.hangmanState++;
    }

    this.updateWordDisplay();

    if (this.isWin() || this.isLose()) {
      this.gameOver = true;
    }
  }

  isLetterAlreadyGuessed(letter: string): boolean {
    return this.incorrectGuesses.includes(letter) || this.word.some((l) => l.value === letter && l.visible);
  }

  isLetterInWord(letter: string): boolean {
    let found = false;
    this.word.forEach((l) => {
      if (l.value === letter) {
        l.visible = true;
        found = true;
      }
    });
    return found;
  }

  updateWordDisplay(): void {
    this.wordString = this.word.map((letter) => letter.visible ? letter.value : '_').join('');
  }

  isWin(): boolean {
    return !this.word.some((letter) => !letter.visible);
  }

  isLose(): boolean {
    return this.incorrectGuesses.length >= this.maxIncorrectGuesses;
  }

  resetGame(): void {
    this.startGame();
  }

  getAvailableLetters(): string[] {
    // Filter out letters that have already been guessed
    return this.alphabet.filter((letter) => !this.isLetterAlreadyGuessed(letter));
  }
}
