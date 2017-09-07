import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage'
import { MyApp } from './app.component';
import { DataProvider } from '../providers/data/data';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBjq522CSpYHTzqlrgVv--3jllnY_-ou5g",
  authDomain: "camperchat-fde7a.firebaseapp.com",
  databaseURL: "https://camperchat-fde7a.firebaseio.com",
  projectId: "camperchat-fde7a",
  storageBucket: "camperchat-fde7a.appspot.com",
  messagingSenderId: "78943256397"
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
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
    AuthServiceProvider
  ]
})
export class AppModule {}
