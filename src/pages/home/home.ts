import {Component, ViewChild} from '@angular/core';
import {IonicPage, MenuController, Platform} from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import {WdAuthServiceProvider} from '../../providers/wd-auth-service/wd-auth-service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('chat') chat:any;

  chatMessage:string = '';
  messages:any = [];
  placeholder:string = 'enter message...';

  constructor(public dataService:DataProvider,
              public menu:MenuController,
              public wdAuthServ:WdAuthServiceProvider,
              private platform:Platform) {

    this.dataService.getDocumentsRX().subscribe((data) => {

      let start = this.messages.length == 0 ? true : false;
      this.messages = data;

      if (start != true) {
        this.scrollToBottom();
      }

      console.log("message data updated!");
    });

    this.menu.enable(true);
  }

  ionViewDidLoad() {

    setTimeout(()=> {
      this.scrollToBottom();
    }, 1000);
    console.log('view loaded');

    //the pic has not set
  }

  sendMessage():void {

    if (this.chatMessage.length <= 0) {

      this.placeholder = "Please enter message...";

    } else {

      let message = {
        '_id': new Date().toJSON(),
        'userid': this.wdAuthServ.currentUser.uid,
        'username': this.wdAuthServ.currentUser.displayName,
        'picture': this.dataService.picture,
        'message': this.chatMessage
      };

      //this.messages.push(message);
      this.dataService.addDocument(message);
      this.chatMessage = '';
      this.placeholder = "enter message...";
    }


    //this.scrollToBottom();
    //this.chat.scrollToBottom();
  }

  scrollToBottom() {

    let dimension = this.chat.getContentDimensions();
    if (dimension.contentHeight > 0 && dimension.scrollHeight >= this.chat.contentHeight) {
      //console.log(JSON.stringify(dimension));
      this.chat.scrollTo(0, dimension.scrollHeight, 1000);
    }

  }

}
