import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, Scroll, Platform} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { AngularFireAuth } from 'angularfire2/auth';
import { WdAuthServiceProvider } from '../../providers/wd-auth-service/wd-auth-service';
import { LoadingController, AlertController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';




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
  @ViewChild('content') content: Scroll;

  loginForm: FormGroup;
  currentFocusedEle: any = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public wdAuthServ: WdAuthServiceProvider,
              public alertCtrl: AlertController,
              public loadingCtrl:LoadingController,
              public keyboard:Keyboard,
              public platform:Platform) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

/*    this.keyboard.onKeyboardShow().subscribe( (value) => {

      console.log( "focus scroll" );
      if(this.currentFocusedEle != null) {

        const pos = this.currentFocusedEle.nativeElement.getBoundingClientRect();
        this.content._scrollContent.nativeElement.scrollTop = pos.top + pos.height * 5;
        console.log( "focus scroll" );
      }

    });*/
  }

  ionViewDidLoad() {

    this.wdAuthServ.authStateMon();
    console.log('ionViewDidLoad LoginPage');
    document.addEventListener('focus', function(e) { console.log("called");window.scrollTo(0, 0)});
    window.onresize = (e) =>
    {
      //ngZone.run will help to run change detection

        console.log("Width: " + window.innerWidth);
        console.log("Height: " + window.innerHeight);

    };
  }

  signUp() {
    //this.content._scrollContent.nativeElement.scrollTop = this.content._scrollContent.nativeElement.scrollHeight;
    //this.content.nativeElement.scrollTop
    this.navCtrl.push("SignupPage");
  }

  loginWithEmail() {

    if (this.loginForm.valid) {

      let loading = this.loadCustom();

      loading.present().then(() => {
        let formControls:any = this.loginForm.controls;

        this.wdAuthServ.loginWithEmail(formControls.email.value,
          formControls.password.value).then((user) => {

          if(user.emailVerified == false) {
            loading.dismiss();
            this.presentResendAlert("Notice", "Please verify your account by email",
              () => {
                console.log("Resend verification email");
                this.wdAuthServ.sendEmailVerification();
              });
          } else {
            //account login and access
          }
          console.info("login success, currentUser->", wilddog.auth().currentUser);
        }).catch((err) => {
          loading.dismiss();
          console.info('login failed ->', err);
          this.presentAlert('Login Failed', err.message);
        });
        console.log(formControls.email.value);
        console.log(formControls.password.value);

      });

    } else {

      this.presentAlert("Information", "Please fill in your valid infromation");

    }


  }

  signOut() {

    this.wdAuthServ.signOut().then( () => {

      console.log("signout succeeded.");
    });
  }

  presentAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentResendAlert(title: string, subTitle: string, handler: () => void) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [      {
        text: 'Resend',
        role: 'cancel',
        handler: handler//() => {
          //console.log('Cancel clicked');
        //}
      },
        {
          text: 'Dismiss',

        }]
    });
    alert.present();
  }

  loadDefault() {

    let loading = this.loadingCtrl.create({
      content:"loading...",//loading框显示的内容
      dismissOnPageChange:true, // 是否在切换页面之后关闭loading框
      showBackdrop:false //是否显示遮罩层
    });

    return loading;// 弹出load框

    /*setTimeout(()=>{
      loading.dismiss();
    },3000);
    */// 上面这段代码先是在按下按钮1000毫秒之后挑战页面，再在3000毫秒之后关闭loading框
    // 但是因为设置了切换页面之后关闭loading框，因此在切换页面后则关闭loading框
  }

  loadCustom(){

    let loading = this.loadingCtrl.create({
      spinner:"dots",// apinner既是loading框上的图标
      // content:`<div class="custom-spinner-container">
      // <div class="custom-spinner-box"></div>
      // </div>`,
      duration:5000 // loading框持续的时间，默认在触发DidDismiss之后关闭，除非设置了该属性
    });

    return loading;
  }

  loadText(){
    let loading = this.loadingCtrl.create({
      spinner:"hide",
      content:"loading",
      duration:3000
    });
    loading.present();

  }


  onFocus(event) {
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

  scrollTo(element, to, duration) {

    if (duration <= 0) return;
    let difference = to - element.scrollTop;
    let perTick = difference / duration * 10;

    setTimeout( () => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      this.scrollTo(element, to, duration - 10);
    }, 10);
  }


}
