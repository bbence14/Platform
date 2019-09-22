import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    templateUrl: './home.component.html'
})
export class HomePageComponent implements OnInit {
    @HostBinding('class.content-page') isPage = true;
    @HostBinding('class.container') isContainer = true;

    ngOnInit() {}
}
