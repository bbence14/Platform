import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth/auth-guard.service';
import { LoginGuardService } from './auth/login-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        loadChildren: () =>
            import('src/app/modules/dashboard/dashboard.module').then(
                m => m.DashboardModule
            )
    },
    {
        path: 'login',
        canActivate: [LoginGuardService],
        loadChildren: () =>
            import('src/app/modules/login/login.module').then(
                m => m.LoginModule
            )
    }

    // TODO add catch-all 404 page
];

export const CoreRoutingModule = RouterModule.forRoot(routes);
