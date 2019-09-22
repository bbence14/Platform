import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

export const LoginRoutingModule = RouterModule.forChild(routes);
