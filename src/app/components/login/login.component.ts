import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  errorMsg: string = '';
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleLogin() {
    this.loginService.loginUser(this.loginForm.value).subscribe((user) => {
      const { message, userData } = user;
      if (message) {
        this.errorMsg = message;
      } else {
        this.router.navigateByUrl('/users', {
          state: { userData: userData[0] },
        });
      }
    });
  }
}
