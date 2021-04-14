import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router, private toastrService: ToastrService){  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if (state.url.includes('administrator'))
        {
          if (auth)
          {
            if (auth.isAdmin)
            {
              return true;
            }
          }
          else{
            this.toastrService.info('Panel administratora tylko dla autoryzowanych użytkowników');
            console.log('pętla');
            this.router.navigate(['admin']);
            return;
          }
        }
        if (state.url === '/admin'){
          return true;
        }
        if (auth){
          return true;
        }
        else{
          this.toastrService.info('Zaloguj się aby kontynuować');
          this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
        }
      })
    );
  }
}
