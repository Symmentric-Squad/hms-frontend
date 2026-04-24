import { Component } from "@angular/core";
import { LandingPageNavBar } from "../../components/landing-navbar.component";

@Component({
    selector: 'app-landing',
    template: `
    <div class="landing-container">
      <landing-navbar></landing-navbar>
      <h1>Landing Page</h1>
    </div>
  `,
    imports: [LandingPageNavBar],
})
export class LandingComponent {
    
}