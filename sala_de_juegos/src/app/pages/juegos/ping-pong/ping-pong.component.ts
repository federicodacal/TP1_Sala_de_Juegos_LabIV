import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ping-pong',
  templateUrl: './ping-pong.component.html',
  styleUrls: ['./ping-pong.component.css']
})
export class PingPongComponent implements OnInit {

  user:any = null;
  paddleX!: number;
  ballX!: number;
  ballY!: number;
  ballSpeedX!: number;
  ballSpeedY!: number;
  score!: number;
  gameOver!: boolean;

  constructor(private auth:AuthService, private db:DatabaseService) { }

  ngOnInit(): void {

    this.auth.userData.subscribe(async(res:any) => {
      if (res) {
        this.user = res;
      }
    });

    this.paddleX = 0;
    this.ballX = 50;
    this.ballY = 50;
    this.ballSpeedX = 2;
    this.ballSpeedY = 2;
    this.score = 0;
    this.gameOver = false;
    setTimeout(() => {
      this.update();
    }, 1000);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Move paddle left (Arrow Left)
    if (event.key === 'ArrowLeft') {
      this.paddleX -= 20;
      // Check left boundary
      if (this.paddleX < 0) {
        this.paddleX = 0;
      }
    }
    // Move paddle right (Arrow Right)
    else if (event.key === 'ArrowRight') {
      this.paddleX += 20;
      // Check right boundary
      if (this.paddleX > 420) {
        this.paddleX = 420;
      }
    }
  }

  update(): void {
    setInterval(() => {
      if (this.gameOver) {
        return;
      }
  
      // Update ball position
      this.ballX += this.ballSpeedX;
      this.ballY += this.ballSpeedY;
  
      // Check collision with walls
      if (this.ballX < 0 || this.ballX > 480) {
        this.ballSpeedX *= -1;
      }
      if (this.ballY < 0) {
        this.ballSpeedY *= -1;
      }
      
      // Check collision with paddle
      if (
        this.ballX > this.paddleX &&
        this.ballX < this.paddleX + 80 &&
        this.ballY > 260
      ) {
        this.ballSpeedY *= -1;
        this.score++;
        this.increaseBallSpeed();
      }
      
      // Check collision with ground
      if (this.ballY > 280) {
        this.gameOver = true;
        this.sendResult();
        Swal.fire(
          'GAME OVER!',
          `Perdiste. Mejor suerte la próxima.`,
          'error'
        );
      }
    }, 16);
  }

  increaseBallSpeed(): void {
    // Increase ball speed after each paddle hit
    this.ballSpeedX = Math.sign(this.ballSpeedX) * (Math.abs(this.ballSpeedX) + 0.2);
    this.ballSpeedY = Math.sign(this.ballSpeedY) * (Math.abs(this.ballSpeedY) + 0.2);
  }

  resetGame(): void {
    this.score = 0;
    this.gameOver = false;
    this.paddleX = 0;
    this.ballX = 50;
    this.ballY = 50;
    this.ballSpeedX = 2; // Reset ball speed X
    this.ballSpeedY = 2; // Reset ball speed Y
  }

  sendResult() {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const result = {
      game: 'ping-pong',
      user: this.user,
      currentDate: currentDate,
      score: this.score,
    };
    this.db.saveResults('ping-pong', result)
      .then((res:any) => {
        console.log('Resultados Enviados!');
      })
      .catch((err:any) => {
        console.log('Error al enviar Resultados!');
      });
  }
}
