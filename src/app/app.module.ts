import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Config,
  PageTransition,
  Animation } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage'
import { MyApp } from './app.component';
import { DataProvider } from '../providers/data/data';
import { Keyboard } from '@ionic-native/keyboard';

import { WdAuthServiceProvider } from '../providers/wd-auth-service/wd-auth-service';
import { ShowMsgProvider } from '../providers/show-msg/show-msg';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      pageTransition: 'fade'
      //scrollAssist: true, autoFocusAssist: true
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    Keyboard,
    WdAuthServiceProvider,
    ShowMsgProvider
  ]
})
export class AppModule {
  constructor(config: Config) {
    config.setTransition('fade', FadeTansition);
  }
}

const SHOW_BACK_BTN_CSS = 'show-back-button';
export class FadeTansition extends PageTransition {
  init() {
    super.init();
    const plt = this.plt;
    const enteringView = this.enteringView;
    const leavingView = this.leavingView;
    const opts = this.opts;

    // what direction is the transition going
    const backDirection = opts.direction === 'back';

    if (enteringView) {
      if (backDirection) {
        this.duration(200);
      } else {
        this.duration(200);
        this.enteringPage.fromTo('opacity', 0, 1, true);
      }

      if (enteringView.hasNavbar()) {
        const enteringPageEle: Element = enteringView.pageRef().nativeElement;
        const enteringNavbarEle: Element = enteringPageEle.querySelector(
          'ion-navbar'
        );

        const enteringNavBar = new Animation(plt, enteringNavbarEle);
        this.add(enteringNavBar);

        const enteringBackButton = new Animation(
          plt,
          enteringNavbarEle.querySelector('.back-button')
        );
        this.add(enteringBackButton);
        if (enteringView.enableBack()) {
          enteringBackButton.beforeAddClass(SHOW_BACK_BTN_CSS);
        } else {
          enteringBackButton.beforeRemoveClass(SHOW_BACK_BTN_CSS);
        }
      }
    }

    // setup leaving view
    if (leavingView && backDirection) {
      // leaving content
      this.duration(200);
      const leavingPage = new Animation(plt, leavingView.pageRef());
      this.add(leavingPage.fromTo('opacity', 1, 0));
    }
  }
}
