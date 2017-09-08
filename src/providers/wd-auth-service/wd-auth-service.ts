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

  constructor() {

    wilddog.initializeApp(this.config);
    console.log('Hello WdAuthServiceProvider Provider');
  }

  signupWithEmail(email: string, pwd: string): wilddog.Promise<any> {

    return wilddog.auth().createUserWithEmailAndPassword(email,pwd);
  }

  loginWithEmail(email: string, pwd: string): wilddog.Promise<any> {

    return wilddog.auth().signInWithEmailAndPassword(email, pwd);
  }

  signOut(): wilddog.Promise<any> {

    return wilddog.auth().signOut();
  }

  authStateMon() {

    wilddog.auth().onAuthStateChanged( (nextState) => {
      if (nextState) {

        console.log("user state changed");
      } else {

        console.log("no user");
      }
    });
  }

}
