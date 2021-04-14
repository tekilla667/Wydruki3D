import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/shared/Models/address';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  currentySelected: number;
  changePassword: FormGroup;
  changeEmail: FormGroup;
  changeAddress: FormGroup;
  deleteAccountPassword: FormGroup;
  newEmailToDisplay: string;
  currentAddress: Address;
  constructor(private accountService: AccountService, private toasterService: ToastrService,
              private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.currentySelected = 0;
    this.createForm();
    this.getCurrentAddress();
  }
  setCurrentlySelected(id: number){
    this.currentySelected = id;
  }
  createForm(){
    this.changePassword = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.pattern('(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\s).*$')]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern('(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\s).*$')]),
  });
    this.changeEmail = new FormGroup({
    newEmail: new FormControl('', [Validators.required, Validators.email])});
    this.changeAddress = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        postCode: new FormControl('', Validators.required)
      });
    this.deleteAccountPassword = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.pattern('(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\s).*$')])
      });
}
  requestPasswordChange(){
    this.accountService.changePassword(this.changePassword.value).subscribe(res => this.toasterService.success('Pomyślnie zmieniono hasło', 'Zmiana hasła'),
     err => this.toasterService.error('Niepoprawne hasło', 'Błąd'));
  }
  requestEmailChange(){
    this.newEmailToDisplay = this.changeEmail.value['newEmail'];
    this.accountService.changeEmail(this.changeEmail.value).subscribe();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  private getCurrentAddress(){
    this.accountService.getUserAddress().subscribe(res => {this.currentAddress = res;
                                                           console.log(this.currentAddress); });
  }
  changeAddressRequest(){
    this.accountService.changeUserAddress(this.changeAddress.value).
    subscribe(res => this.toasterService.success('Pomyślnie zmieniono adres', 'Zmiana adresu'),
     err => this.toasterService.error('Niepoprawny adres', 'Błąd'));
    this.getCurrentAddress();
  }
  deleteUserAccountRequest(){
    console.log(this.deleteAccountPassword.value);
    this.accountService.deleteUser(this.deleteAccountPassword.value).subscribe(
      res => {this.accountService.removeUserFromMemory();
              this.toasterService.success('Pomyślnie usunięto konto', 'Konto');
              localStorage.removeItem('Authorization');
              this.router.navigateByUrl('');
    },
      err => this.toasterService.error('Niepoprawne hasło', 'Błąd'));
  }
}
