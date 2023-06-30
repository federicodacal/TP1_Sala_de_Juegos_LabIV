import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {

  user:any = null;
  listOfCountries:any = [];
  listOfQuestions:any = [];
  victory:boolean = false;
  activeGame:boolean = false;
  gameOver:boolean = false;
  gameOverText:string = '¡PERDISTE!';
  score:number = 0;
  attempts:number = 10;
  currentQuestion:any = null;
  loadedQuestions:boolean = false;
  currentIndex:number = 0;
  correctAnswer:boolean = false;
  wrongAnswer:boolean = false;

  constructor(private auth:AuthService, private router:Router, private countries:CountriesService) {
    this.countries.getCountries();
  }

  ngOnInit(): void {
    this.auth.userData.subscribe(async (user:any) => {
      if (user) {
        this.user = user;
        const paises = await this.countries.getCountries();
        this.listOfCountries = paises.map((country:any) => {
          return {
            name: country.translations.spa.official,
            flag: country.flags.png,
          };
        });
        this.startGame();
      } 
      else {
        this.router.navigate(['/login']);
      }
    });
  } 

  startGame() {
    this.generateQuestions();
    this.currentQuestion = this.listOfQuestions[this.currentIndex];
    this.activeGame = true;
  } 

  generateQuestions() {
    this.listOfCountries.sort(() => Math.random() - 0.5);
    this.listOfQuestions = this.listOfCountries
      .slice(0, 10)
      .map((country: any) => {
        const option2 = this.listOfCountries[this.generateRandomNumber()].name;
        const option3 = this.listOfCountries[this.generateRandomNumber()].name;
        const option4 = this.listOfCountries[this.generateRandomNumber()].name;
        const options = [country.name, option2, option3, option4].sort(
          () => Math.random() - 0.5
        );
        return {
          answer: country.name,
          options: options,
          flag: country.flag,
        };
      });
    this.loadedQuestions = true;
  } 

  generateRandomNumber() {
    return Math.floor(Math.random() * 249);
  } 

  play(option: string, event: Event) {
    if (this.activeGame) {
      const btn = <HTMLButtonElement>event.target;
      btn.disabled = true;
      if (option === this.currentQuestion.answer) {
        this.score++;
        this.correctAnswer = true;
        setTimeout(() => {
          this.correctAnswer = false;
        }, 300);
      } 
      else {
        this.wrongAnswer = true;
        setTimeout(() => {
          this.wrongAnswer = false;
        }, 300);

      }

      if (this.currentIndex < 9) {
        this.currentIndex++;
        setTimeout(() => {
          this.currentQuestion = this.listOfQuestions[this.currentIndex];
        }, 500);
      }

      if (this.attempts > 0) {
        this.attempts--;
        if (this.attempts === 0) {
          this.activeGame = false;
          this.gameOver = true;
          if (this.score >= 4) {
            this.victory = true;
            this.gameOverText = '¡GANASTE!';
          } 
          else {
          }
          this.createResult();
        }
      }
    }
  } 

  resetGame() {
    this.generateQuestions();
    this.currentIndex = 0;
    this.score = 0;
    this.attempts = 10;
    this.activeGame = true;
    this.victory = false;
    this.gameOver = false;
    this.gameOverText = '¡PERDISTE!';
    this.currentQuestion = this.listOfQuestions[this.currentIndex];
    //this.notifyService.showInfo('Juego Reiniciado', 'Preguntados');
  } 

  createResult() {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const result = {
      game: 'preguntados',
      user: this.user,
      currentDate: currentDate,
      victory: this.victory,
    };
    //this.authService
    //  .sendUserResult('preguntadosResultados', result)
    //  .then((res: any) => {
     //   console.log('Resultados Enviados!');
    //  })
    //  .catch((err: any) => {
    //    console.log('Error al enviar Resultados!');
    //  });
  }
}
