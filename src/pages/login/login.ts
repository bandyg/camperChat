import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { WdAuthServiceProvider } from '../../providers/wd-auth-service/wd-auth-service'

declare let wilddog;
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public wdAuthServ: WdAuthServiceProvider) {

    this.loginForm = formBuilder.group({
      email: [''],//Validators.pattern('([A-Z]{1})([0-9A-Z]{1,6})') Validators.pattern('[^a-z \-\+\.]\ *([0-9])*[0-9]')
      password: [''],
    });
  }

  ionViewDidLoad() {

    this.wdAuthServ.authStateMon();
    console.log('ionViewDidLoad LoginPage');
  }

  signupWithEmail() {

    if (this.loginForm.valid) {

      let formControls: any = this.loginForm.controls;

      this.wdAuthServ.signupWithEmail(formControls.email.value,
        formControls.password.value).then((user) => {

        console.info('create user success.',  user);

      }).catch(function (err) {

        console.info("create user failed.", err);
      });
      console.log(formControls.email.value);
      console.log(formControls.password.value);
    }
  }

  signUp() {


  }

  loginWithEmail() {

    if (this.loginForm.valid) {

      let formControls: any = this.loginForm.controls;

      this.wdAuthServ.loginWithEmail(formControls.email.value,
        formControls.password.value).then((user) => {

        console.info("login success, currentUser->",  wilddog.auth().currentUser);
      }).catch( (err) =>{

        console.info('login failed ->',err);
      });
      console.log(formControls.email.value);
      console.log(formControls.password.value);
    }
  }

  signOut() {

    this.wdAuthServ.signOut().then( () => {

      console.log("signout succeeded.");
    });
  }

}
