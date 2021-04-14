import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup;
same = false;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\s).*$')]),
      repeatPassword: new FormControl('', Validators.required)
    });
  }
  onSubmit(): void{
    localStorage.setItem('registeremail', this.registerForm.value['email']);
    this.registerForm.removeControl('repeatPassword');
    this.accountService.register(this.registerForm.value).subscribe(() =>
    console.log('user registered'),
    error => {
      console.log('error');
    });
    this.router.navigateByUrl('/account/emailconfirm');
  }
  checkPasswords(){
    return this.registerForm.get('password').value === this.registerForm.get('repeatPassword').value ? true : false;
  }
  validateEmailNotTaken(): AsyncValidatorFn{
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map (res => {
              return res ? {checkEmailExists: true} : null;
            })
          );
        })
      );
    };
  }
}
