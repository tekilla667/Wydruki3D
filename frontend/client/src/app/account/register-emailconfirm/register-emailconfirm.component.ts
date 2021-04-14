import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/Models/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register-emailconfirm',
  templateUrl: './register-emailconfirm.component.html',
  styleUrls: ['./register-emailconfirm.component.scss']
})
export class RegisterEmailconfirmComponent implements OnInit {
   email: string;
  constructor(private account: AccountService) {
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('registeremail');
  }

}
