import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
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
              public authServ: AuthServiceProvider) {

    this.loginForm = formBuilder.group({
      email: [''],//Validators.pattern('([A-Z]{1})([0-9A-Z]{1,6})') Validators.pattern('[^a-z \-\+\.]\ *([0-9])*[0-9]')
      password: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {

    if (this.loginForm.valid) {

      let formControls: any = this.loginForm.controls;

      /*this.authServ.auth.signInWithEmailAndPassword(formControls.email.value,
        formControls.password.value).then((response) => {
        console.log('Login success' + JSON.stringify(response));

      });*/
      console.log(formControls.email.value);
      console.log(formControls.password.value);
    }
  }

  signin() {

    if (this.loginForm.valid) {

      let formControls: any = this.loginForm.controls;

      this.authServ.signInWithPhone(formControls.email.value)

        .then( (confirmationResult) => {

          const verificationCode = "+8613632690809";
          console.log("prompt msg. Go to confirm.");
          console.log(confirmationResult);

          confirmationResult.confirm(verificationCode).then( (result) => {

            console.log(result);
          }).catch( (error) => {

            console.log(error);
          });

        })
        .catch(function(error) {
          // Handle Errors here.
        });

      console.log(formControls.email.value);
      console.log(formControls.password.value);
    }
  }
}
