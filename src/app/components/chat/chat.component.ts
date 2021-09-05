import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  loggedInUser: any;
  chatWith: any;
  message: string = '';
  messages: any[] = [];

  constructor(private chatService: ChatService, private router: Router) {
    const stateData: any = this.router?.getCurrentNavigation()?.extras?.state;
    console.log(stateData);
    if (stateData != undefined) {
      this.loggedInUser = stateData.loggedInUser;
      this.chatWith = stateData.chatWith;
    } else {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.chatService.notifyServer({ userId: this.loggedInUser.userId });

    this.chatService
      .getchatLogs({
        senderId: this.loggedInUser.userId,
        receiverId: this.chatWith.userId,
      })
      .subscribe((messages) => {
        this.messages = messages;
      });

    this.chatService.getMessages().subscribe((message: any) => {
      console.log(message);
      if (
        message.receiverId === this.loggedInUser.userId &&
        message.senderId === this.chatWith.userId
      ) {
        console.log('message received by' + this.loggedInUser.userId);
        this.messages.push(message);
      }
    });
  }

  handleSendMessage(): void {
    const message = {
      receiverId: this.chatWith.userId,
      senderId: this.loggedInUser.userId,
      messageText: this.message,
      messageDateTime: new Date(),
    };
    this.chatService.sendMessage(message);
    this.messages.push(message);
    this.message = '';
  }
}
