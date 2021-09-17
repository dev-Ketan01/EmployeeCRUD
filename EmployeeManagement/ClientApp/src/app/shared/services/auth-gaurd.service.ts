import { Injectable, TemplateRef } from '@angular/core';
import { RouterStateSnapshot, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { LoginComponent } from '../../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }
    //let template: TemplateRef<LoginComponent>;
    //this.modalRef = this.modalService.show(LoginComponent);

    //this.modalRef = this.modalService.show(LoginComponent, {
    //  backdrop: true,
    //  ignoreBackdropClick: true,
    //});
    this.router.navigate(['/login']);
    //  this.modalRef.content.closed.subscribe(this.resumeContext.bind(this))
    // not logged in so redirect to login page with the return url
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
