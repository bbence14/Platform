import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    templateUrl: './about.component.html'
})
export class AboutPageComponent implements OnInit {
    @HostBinding('class.content-page') isPage = true;
    @HostBinding('class.container') isContainer = true;

    ngOnInit() {}
}
