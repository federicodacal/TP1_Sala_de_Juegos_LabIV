import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('containerMsg') private scroll?:ElementRef;

  newMessage!:string;
  messages:any[]= [];
  user:any = {};
  suscripcion!:Subscription; 

  constructor(private auth:AuthService, private chat:ChatService) { }

  ngOnInit(): void {
    this.auth.userData.subscribe((res:any) => {
      this.user = res;
      console.info('user chat', this.user);
    });
  }

  ngAfterViewInit() {
    this.getMessages();
  }
/*  
  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }
*/
  async sendMessage() {
    console.log(this.newMessage);
    this.messages?.push()
    this.chat.addChatMessage(this.newMessage, this.user.name).then(() => {
      setTimeout(() => {
        this.scrollToBottom;
      }, 100);
    });
    this.newMessage='';
  }

  async getMessages() {
    const messages$:Observable<any[]> = this.chat.getChatMessages();
    
    this.suscripcion = messages$.subscribe(async (res) => {
      this.messages = res.sort((m1, m2) => {
        return m1.sendAt.seconds - m2.sendAt.seconds;
      });

      if(this.newMessage) {
        await this.sendMessage();
        this.scrollToBottom();
        this.newMessage = '';
      }
      
      this.scrollToBottom();
    });  
  }

  scrollToBottom() {

   try {
     setTimeout(() => {
       let container = this.scroll?.nativeElement.querySelector('#scrollMe');
       if(container != undefined) {
         container.scrollTop = container.scrollHeight;
       }
     }, 50);
   }
   catch (err) {
    console.log('err', err);
   }

  }
  
}
