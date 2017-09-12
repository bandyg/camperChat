import { Injectable } from '@angular/core';
import * as wilddog from 'wilddog';
//appid: wd0010979045sviqlf
//


/*
  Generated class for the WdAuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WdAuthServiceProvider {

  config = {
    authDomain: "wd0010979045sviqlf.wilddog.com"
  };

  private _currentUser: wilddog.User = null;

  constructor() {
    //init wd
    wilddog.initializeApp(this.config);
  }

  // sign up & login
  signupWithEmail(email: string, pwd: string): wilddog.Promise<any> {

    return wilddog.auth().createUserWithEmailAndPassword(email,pwd);
  }

  loginWithEmail(email: string, pwd: string): wilddog.Promise<any> {

    return wilddog.auth().signInWithEmailAndPassword(email, pwd);
  }

  signupWithPhone(phone: string, pwd: string): wilddog.Promise<any> {

    return wilddog.auth().createUserWithPhoneAndPassword(phone, pwd);
  }

  loginWithPhone(phone: string, pwd: string): wilddog.Promise<any> {

    return wilddog.auth().signInWithPhoneAndPassword(phone, pwd);
  }
  //<--

  signOut(): wilddog.Promise<any> {

    return wilddog.auth().signOut();
  }

  authStateMon() {

    wilddog.auth().onAuthStateChanged( (user) => {
      if (user) {

        console.log("user state changed" + JSON.stringify(user));
        this._currentUser = user;
      } else {

        console.log("no user");
      }
    });
  }

  get currentUser( ): wilddog.User {
    //wilddog.auth().currentUser;
    return this._currentUser;
  }

  sendEmailVerification() {

    this._currentUser.sendEmailVerification();
  }

}
