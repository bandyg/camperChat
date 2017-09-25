import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
//import {DataProvider} from '../providers/data/data';
import {WdAuthServiceProvider} from '../providers/wd-auth-service/wd-auth-service';
import {ShowMsgProvider} from '../providers/show-msg/show-msg';
import {Keyboard} from '@ionic-native/keyboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "";
  @ViewChild(Nav) nav:Nav;

  constructor(platform:Platform,
              statusBar:StatusBar,
              splashScreen:SplashScreen,
//              private data:DataProvider,
              private wdAuthServ:WdAuthServiceProvider,
              public menu:MenuController,
              keyboard:Keyboard,
              showMsg:ShowMsgProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //keyboard.disableScroll(false);
      keyboard.disableScroll(true);
      showMsg.loadText();
      this.monUserState();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page):void {

    this.menu.close();
    this.nav.setRoot(page);
  }

  logout() {

    this.menu.close();
    this.menu.enable(false);
    //this.data.setLoginFlag(null);

    this.wdAuthServ.signOut();

    this.nav.setRoot('LoginPage');
  }

/*  signInUserWithCredential() {

    this.data.getLoginFlag().then((credential) => {

      this.wdAuthServ.signInWithCredential(credential).then((user) => {

        console.info("sign in with credential:", user);
        this.openPage('HomePage');
      }).catch((err) => {
        console.info("sign in with credential failed.", err);
        this.openPage('LoginPage');
      });
    });

  }*/

  monUserState() {

    this.wdAuthServ.userStateUpdates().subscribe((isAvailableUser) => {

      if (isAvailableUser) {
        console.info("mon user state", isAvailableUser);

        this.openPage('HomePage');
      } else {
        console.info("mon user state", isAvailableUser);

        this.openPage('LoginPage');
      }
    });
  }
}

