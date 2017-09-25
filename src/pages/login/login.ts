import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, MenuController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//import { AngularFireAuth } from 'angularfire2/auth';
import {WdAuthServiceProvider} from '../../providers/wd-auth-service/wd-auth-service';

import {DataProvider} from '../../providers/data/data';
import {ShowMsgProvider} from '../../providers/show-msg/show-msg';

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
  //@ViewChild('content') content: Scroll;

  loginForm:FormGroup;
  currentFocusedEle:any = null;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public formBuilder:FormBuilder,
              public wdAuthServ:WdAuthServiceProvider,
              public platform:Platform,
              public menu:MenuController,
              public data:DataProvider,
              private showMsg:ShowMsgProvider) {


    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    console.log(JSON.stringify(this.wdAuthServ.currentUser));
    this.menu.enable(false);
    this.wdAuthServ.userStateUpdates().subscribe((state) => {
      console.log("user state updated");
      if (state == true) {

        this.loginSuccessNav2();
      }

    });
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');
  }

  signUp() {
    //this.content._scrollContent.nativeElement.scrollTop = this.content._scrollContent.nativeElement.scrollHeight;
    //this.content.nativeElement.scrollTop
    let formControls:any = this.loginForm.controls;
    formControls.email.reset();
    formControls.password.reset();
    this.navCtrl.push("SignupPage");
  }

  loginWithEmail() {

    if (this.loginForm.valid) {

      let loading = this.showMsg.loadCustom();

      loading.present().then(() => {
        let formControls:any = this.loginForm.controls;

        this.wdAuthServ.loginWithEmail(formControls.email.value,
          formControls.password.value).then((user) => {

          if (user.emailVerified == false) {
            loading.dismiss();
            this.showMsg.presentResendAlert("Notice", "Please verify your account by email",
              () => {
                console.log("Resend verification email");
                this.wdAuthServ.sendEmailVerification();
              });
          } else {
            //account login and access
            //let userCredential = wilddog.auth.WilddogAuthProvider.emailCredential(formControls.email.value, formControls.password.value);
            //this.data.setLoginFlag(userCredential);
          }
          console.info("login success, currentUser->", wilddog.auth().currentUser);

        }).catch((err) => {
          loading.dismiss();
          console.info('login failed ->', err);
          this.showMsg.presentAlert('Login Failed', err.message);
        });
        console.log(formControls.email.value);
        console.log(formControls.password.value);

      });

    } else {

      this.showMsg.presentAlert("Information", "Please fill in your valid infromation");

    }

  }

  signOut() {

    this.wdAuthServ.signOut().then(() => {

      console.log("signout succeeded.");
    });
  }

  loginSuccessNav2() {

    this.navCtrl.setRoot('HomePage');
  }


  /* onFocus(event) {
   //console.log("on focus"+ JSON.stringify(event));
   if(this.platform.is('android')) {

   setTimeout(() => {

   let pos = event._elementRef.nativeElement.getBoundingClientRect();
   //event._elementRef.nativeElement.animate(event._elementRef.nativeElement);
   //this.scrollTo( this.currentFocusedEle, this.content._scrollContent.nativeElement.scrollHeight, 500);
   if (pos.top < window.screen.height) {

   this.content._scrollContent.nativeElement.scrollTop = window.screen.height / 2; //this.content._scrollContent.nativeElement.scrollHeight;
   console.log("scroll to middle screen to show focus ctrl");
   }

   }, 500);
   }

   }
   */
  /*scrollTo(element, to, duration) {

   if (duration <= 0) return;
   let difference = to - element.scrollTop;
   let perTick = difference / duration * 10;

   setTimeout( () => {
   element.scrollTop = element.scrollTop + perTick;
   if (element.scrollTop === to) return;
   this.scrollTo(element, to, duration - 10);
   }, 10);
   }*/


}
