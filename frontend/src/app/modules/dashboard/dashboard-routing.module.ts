import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomePageComponent } from './pages/home/home.component';
import { FeaturesPageComponent } from './pages/features/features.component';
import { AboutPageComponent } from './pages/about/about.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomePageComponent
            },
            {
                path: 'features',
                component: FeaturesPageComponent
            },
            {
                path: 'about',
                component: AboutPageComponent
            }
        ]
    }
];

export const DashboardRoutingModule = RouterModule.forChild(routes);
