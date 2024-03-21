import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  login: Boolean = true;
  signupForm: FormGroup;
  loginForm: FormGroup;

  getOtploader: Boolean = false;
  verifyOtpLoader: Boolean = false;
  mobileForm: FormGroup;
  otpForm: FormGroup;
  showOtpForm: Boolean = false;
  wrongOtp: Boolean = false;

  registeredsuccess: Boolean = false;
  alreadyregistered: Boolean = false;
  loginErrorMsg = '';

  resendTimeout = 30;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'mobile': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      'password2': new FormControl('', Validators.required)
    });
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
    this.mobileForm = new FormGroup({
      'mobile': new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    });
    this.otpForm = new FormGroup({
      'otp': new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }
  sendOtp() {
    this.getOtploader = true;
    this.api.post('/sendotp', {mobile: this.mobileForm.value.mobile}).subscribe(val => {
      console.log(val);
      this.getOtploader = false;
      this.showOtpForm = true;
      this.resendTimer();
      this.wrongOtp = false;
    });
    this.verifyOtpLoader = false;
  }
  verifyOtp() {
    this.verifyOtpLoader = true;
    this.api.post('/verifyotp', {mobile: this.mobileForm.value.mobile, otp: this.otpForm.value.otp}).subscribe(val => {
      if (val['type'] === 'success' && val['auth']) {
        localStorage.setItem('auth', val['auth']);
        window.location.reload();
      } else {
        this.wrongOtp = true;
        this.verifyOtpLoader = false;
      }
    });
  }
  resendOtp() {
    this.api.post('/resendotp', {mobile: this.mobileForm.value.mobile})
    .subscribe(val => {
      console.log(val);
      this.wrongOtp = false;
    });
    this.resendTimer();
  }
  resendTimer() {
    this.resendTimeout = 30;
    const iv = setInterval(() => {
      if (this.resendTimeout > 0 ) {
        this.resendTimeout = this.resendTimeout - 1;
      } else {
        clearInterval(iv);
      }
    }, 1000);
  }
  trimPhone(event) {
    this.mobileForm.patchValue({'mobile': this.mobileForm.value.mobile.toString().substring(0, 10)});
  }


  loginUser() {
    console.log(this.loginForm.valid);
    this.api.post('/login', { email: this.loginForm.value.email, password: this.loginForm.value.password })
      .subscribe(val => {
        if (val['status'] === 200) {
          this.loginErrorMsg = 'hurray';
        } else if (val['status'] === 201) {
          this.loginErrorMsg = 'Email not verified';
        } else if (val['status'] === 400) {
          this.loginErrorMsg = 'Internal Server Error';
        } else if (val['status'] === 402) {
          this.loginErrorMsg = 'UserName / Password is incorrect';
        } else if (val['status'] === 401) {
          this.loginErrorMsg = 'Email not registered';
        }
      });
  }
  signupUser() {
    this.alreadyregistered = false;
    this.registeredsuccess = false;
    const form = this.signupForm.value;
    if (this.signupForm.valid && form.password === form.password2) {
      this.api.post('/registeruser', { name: form.name, email: form.email, mobile: form.mobile, password: form.password })
      .subscribe(val => {
        if (val['status'] === 200) {
          this.registeredsuccess = true;
          this.signupForm.reset();
        } else if (val['status'] === 400) {
          this.alreadyregistered = true;
        }
      });

    } else {
      this.signupForm.controls.name.markAsTouched();
      this.signupForm.controls.email.markAsTouched();
      this.signupForm.controls.mobile.markAsTouched();
      this.signupForm.controls.password.markAsTouched();
      this.signupForm.controls.password2.markAsTouched();
    }
  }
  reset() {
    this.signupForm.reset();
    this.loginForm.reset();
    this.login = true;
    console.log('reset');

  }




}
