import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable'
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

  userState:any; //observable
  userStateObserver:any;
  private _currentUser:wilddog.User = null;

  constructor() {
    //init wd
    console.log("auth serv construct");
    wilddog.initializeApp(this.config);


    this.userState = Observable.create(Observer=> {

      this.userStateObserver = Observer;
      this.authStateMon();
    });

  }

  // sign up & login
  signupWithEmail(email:string, pwd:string):wilddog.Promise<any> {

    return wilddog.auth().createUserWithEmailAndPassword(email, pwd);
  }

  loginWithEmail(email:string, pwd:string):wilddog.Promise<any> {

    return wilddog.auth().signInWithEmailAndPassword(email, pwd);
  }

  signupWithPhone(phone:string, pwd:string):wilddog.Promise<any> {

    return wilddog.auth().createUserWithPhoneAndPassword(phone, pwd);
  }

  loginWithPhone(phone:string, pwd:string):wilddog.Promise<any> {

    return wilddog.auth().signInWithPhoneAndPassword(phone, pwd);
  }

  //<--

  signOut():wilddog.Promise<any> {

    return wilddog.auth().signOut();
  }

  authStateMon() {

    wilddog.auth().onAuthStateChanged((user) => {
      if (user) {

        console.log("user state changed" + JSON.stringify(user));
        this._currentUser = user;

        if (this.userStateObserver) {

          if (user.emailVerified == true) {

            this.userStateObserver.next(true);
          } else {

            this.userStateObserver.next(false);
          }
        }

      } else {

        console.log("no user");
        this.userStateObserver.next(false);
      }
    });
  }

  get currentUser():wilddog.User {
    //wilddog.auth().currentUser;
    return this._currentUser;
  }

  sendEmailVerification() {

    this._currentUser.sendEmailVerification();
  }

  userStateUpdates():Observable<any> {

    return this.userState;
  }

  reauthenticate(crendential:wilddog.auth.Credential) {

    return wilddog.auth().currentUser.reauthenticate(crendential);
  }

  signInWithCredential(crendential:wilddog.auth.Credential) {

    return wilddog.auth().signInWithCredential(crendential);
  }

}
