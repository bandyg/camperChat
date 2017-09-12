import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WdAuthServiceProvider } from '../../providers/wd-auth-service/wd-auth-service';
import { LoadingController, AlertController } from 'ionic-angular';
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

  public emailSignUpForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public wdAuthServ: WdAuthServiceProvider,
              public alertCtrl: AlertController,
              public loadingCtrl:LoadingController) {

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

      let loading = this.loadCustom();

      loading.present().then(() => {

        let formControls:any = this.emailSignUpForm.controls;

        this.wdAuthServ.signupWithEmail(formControls.email.value,
          formControls.password.value).then( (user) => {

          console.info('create user success.', user);
          if(this.wdAuthServ.currentUser.emailVerified == false) {

            this.wdAuthServ.sendEmailVerification();
            console.log("verification email sent");
            this.presentAlert('A verification email sends to your address:', user.email);
          }

        }).catch( (err) => {

          this.presentAlert('Account Create Failed', err.message);
          console.info("create user failed.", err);
        });
        console.log(formControls.email.value);
        console.log(formControls.password.value);
        loading.dismiss();
      });
    }
  }

  loadCustom() {

    let loading = this.loadingCtrl.create({
      spinner:"dots",// apinner既是loading框上的图标
      // content:`<div class="custom-spinner-container">
      // <div class="custom-spinner-box"></div>
      // </div>`,
      duration:5000 // loading框持续的时间，默认在触发DidDismiss之后关闭，除非设置了该属性
    });

    return loading;
  }

  presentAlert(title: string, subTitle: string) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
