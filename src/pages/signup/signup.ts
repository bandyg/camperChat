import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {WdAuthServiceProvider} from '../../providers/wd-auth-service/wd-auth-service';
import {ShowMsgProvider} from "../../providers/show-msg/show-msg";
//import { } from '';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  //@ViewChild('content') content: Scroll;

  public emailSignUpForm:FormGroup;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              formBuilder:FormBuilder,
              public wdAuthServ:WdAuthServiceProvider,
              private showMsg:ShowMsgProvider,
              public platform:Platform) {

    this.emailSignUpForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: [''],
      phoneNum: ['', Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?([-. (]*(\\d{3})[-. )]*)?((\\d{3})[-. ]*(\\d{2,4})(?:[-.x ]*(\\d+))?)\\s*$')])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  closePage() {
    console.log("sign up page should leave!");
    this.navCtrl.pop();
  }

  signupWithEmail() {

    if (this.emailSignUpForm.valid) {

      let loading = this.showMsg.loadCustom();

      loading.present().then(() => {

        let formControls:any = this.emailSignUpForm.controls;

        this.wdAuthServ.signupWithEmail(formControls.email.value,
          formControls.password.value).then((user) => {

          console.info('create user success.', user);
          if (this.wdAuthServ.currentUser.emailVerified == false) {

            this.wdAuthServ.sendEmailVerification();
            console.log("verification email sent");
            this.wdAuthServ.currentUser.updateProfile({displayName: formControls.name.value, photoURL: null});
            this.wdAuthServ.currentUser.updatePhone(formControls.phoneNum.value, (error) => {

              console.log(error);
            });
            this.showMsg.presentAlert('A verification email sends to your address:', user.email, () => {

              this.closePage();
            });
          }

        }).catch((err) => {

          this.showMsg.presentAlert('Account Create Failed', err.message);
          console.info("create user failed.", err);
        });
        console.log(formControls.email.value);
        console.log(formControls.password.value);
        loading.dismiss();
      });
    }
  }

  /*  onFocus(event) {
   //console.log("on focus"+ JSON.stringify(event));
   if(this.platform.is('android')) {

   setTimeout( () => {
   let pos = event._elementRef.nativeElement.getBoundingClientRect();
   //event._elementRef.nativeElement.animate(event._elementRef.nativeElement);
   //this.scrollTo( this.currentFocusedEle, this.content._scrollContent.nativeElement.scrollHeight, 500);
   if(pos.top < window.screen.height) {

   this.content._scrollContent.nativeElement.scrollTop = window.screen.height/2; //this.content._scrollContent.nativeElement.scrollHeight;
   console.log("scroll to middle screen to show focus ctrl");
   }

   }, 500 );
   }


   }*/

}
