import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errMsg: string = '';
  signUpForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    userId: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get getControl() {
    return this.signUpForm.controls;
  }

  handleSignUp = () => {
    this.loginService
      .signUpUser(this.signUpForm.value)
      .subscribe((response) => {
        if (response.message === 'user with this user id already exists.') {
          this.errMsg = response.message;
        } else if (response.message === 'User added successfully') {
          this.router.navigateByUrl('/');
        }
      });
  };
}
