import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [
    ChatComponent,
],  
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ChatRoutingModule
  ],
  exports: [ChatComponent],
  providers: []
})
export class ChatModule {}