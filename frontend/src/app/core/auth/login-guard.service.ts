import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

// This is only for the /login route,
// so that logging in more than once is not possible.
@Injectable({ providedIn: 'root' })
export class LoginGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}

    canActivate(): boolean {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
