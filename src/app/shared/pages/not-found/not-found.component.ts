import { Component } from "@angular/core";
import { LandingPageNavBar } from "../../components/landing-navbar.component";

@Component({
    selector: 'not-found',
    template: `
        <landing-navbar></landing-navbar>
        <h1>404 - Not Found</h1>
    `,
    imports: [LandingPageNavBar]
})

export class NotFoundComponent {}