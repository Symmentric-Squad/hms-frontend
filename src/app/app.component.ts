import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageNavBar } from "./shared/components/landing-navbar/landing-navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class App {
  protected readonly title = signal('hms-frontend');
}
