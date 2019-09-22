import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [CoreComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule,
        CoreRoutingModule,
        ChartsModule
    ],
    providers: [],
    bootstrap: [CoreComponent]
})
export class CoreModule {}
