import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {

    afAuth.authState.subscribe( (user: firebase.User) => { this.currentUser = user; });
  }

  get authenticated() {

    return this.currentUser != null;
  }

  signInWithPhone(phoneNum: string): firebase.Promise<any> {

    const applicationVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response);
        this.onSignInSubmit();
      }
    });

    //const applicationVerifier = new firebase.auth.RecaptchaVerifier(
    //  'recaptcha-container');
    return this.afAuth.auth.signInWithPhoneNumber(phoneNum, applicationVerifier);

  }

  onSignInSubmit() {

    console.log("signin submitted");
  }

  signOut(): void {

    this.afAuth.auth.signOut();
  }

  loginWithPhone() {

  }

}
