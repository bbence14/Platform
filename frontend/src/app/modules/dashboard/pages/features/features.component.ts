import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    templateUrl: './features.component.html'
})
export class FeaturesPageComponent implements OnInit {
    @HostBinding('class.content-page') isPage = true;
    @HostBinding('class.container') isContainer = true;

    ngOnInit() {}
}