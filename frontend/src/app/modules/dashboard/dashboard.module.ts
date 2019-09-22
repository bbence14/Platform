import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CardComponent } from './components/card/card.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AboutPageComponent } from './pages/about/about.component';
import { FeaturesPageComponent } from './pages/features/features.component';
import { HomePageComponent } from './pages/home/home.component';
import { StocksService } from './services/stocks.service';

@NgModule({
    declarations: [
        DashboardComponent,
        HomePageComponent,
        FeaturesPageComponent,
        AboutPageComponent,
        StocksComponent,
        CardComponent
    ],
    providers: [StocksService],
    imports: [CommonModule, DashboardRoutingModule, ChartsModule]
})
export class DashboardModule {}
