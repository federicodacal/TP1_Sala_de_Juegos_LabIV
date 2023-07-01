import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';

interface Letter {
  value: string;
  visible: boolean;
}

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  user:any = null;
  word: Letter[] = [];
  wordString: string = '';
  incorrectGuesses: string[] = [];
  guess: string = '';
  gameOver: boolean = false;
  hangmanState: number = 0;
  displayImg:string='';
  maxIncorrectGuesses: number = 7;
  victory:boolean = false;

  img:string[] = [
    '../assets/img/ahorcado/hangman0.gif',
    '../assets/img/ahorcado/hangman1.gif',
    '../assets/img/ahorcado/hangman2.gif',
    '../assets/img/ahorcado/hangman3.gif',
    '../assets/img/ahorcado/hangman4.gif',
    '../assets/img/ahorcado/hangman5.gif',
    '../assets/img/ahorcado/hangman6.gif',
    '../assets/img/ahorcado/hangman7.gif',
  ];

  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  words: string[] = ['ahorcado', 'tecnologia', 'heladera', 'futbol', 'computadora', 'automovil', 'internet', 'juego', 'televisor'];

  constructor(private auth:AuthService, private db:DatabaseService) {
    this.startGame();
  }
  ngOnInit(): void {
    this.auth.userData.subscribe(async(res:any) => {
      if(res) {
        this.user = res;
      }
    });
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
      return;
    }

    if (!this.isLetterInWord(letter)) {
      this.incorrectGuesses.push(letter);
      this.hangmanState++;
    }

    this.updateWordDisplay();

    if (this.isWin()) { 
      this.victory = true;
      this.gameOver = true;
      Swal.fire(
        'Felicitaciones!',
        `Ganaste!`,
        'success'
      );
      this.sendResult();
    }
    else if (this.isLose()) {
      this.gameOver = true;
      Swal.fire(
        'GAME OVER!',
        `Perdiste. Mejor suerte la próxima.`,
        'error'
      );
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

  sendResult() {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const result = {
      game: 'ahorcado',
      user: this.user,
      currentDate: currentDate,
      score: this.maxIncorrectGuesses - this.incorrectGuesses.length,
      victory: this.victory
    };
    this.db.saveResults('ahorcado', result)
      .then((res:any) => {
        console.log('Resultados Enviados!');
      })
      .catch((err:any) => {
        console.log('Error al enviar Resultados!');
      });
  }
}
