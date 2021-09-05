import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'http://localhost:9090';
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  notifyServer = (credentials: any) => {
    this.socket.emit('register', credentials);
  };

  sendMessage = ({
    receiverId,
    senderId,
    messageText,
    messageDateTime,
  }: any) => {
    this.socket.emit('send-message', {
      receiverId,
      senderId,
      messageText,
      messageDateTime,
    });
  };

  getchatLogs = (data: any): Observable<any> => {
    return this.http.post(`${this.url}/api/chat/chatlogs`, data);
  };

  public getMessages = () => {
    return new Observable((observer: any) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  };
}
