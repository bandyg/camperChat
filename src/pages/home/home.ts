import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('chat') chat: any;

  chatMessage: string = '';
  messages: any = [];

  constructor(public dataService: DataProvider){

    this.dataService.getDocuments().then((data) => {

      this.messages = data;
      this.chat.scrollToBottom();

    });

  }

  sendMessage(): void {

    let message = {
      '_id': new Date().toJSON(),
      'fbid': this.dataService.fbid,
      'username': this.dataService.username,
      'picture': this.dataService.picture,
      'message': this.chatMessage
    };

    this.dataService.addDocument(message);
    this.chatMessage = '';

  }

}
