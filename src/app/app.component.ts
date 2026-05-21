import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // No need for AppRoutingModule here
  template: `
    <router-outlet></router-outlet>
  `,
})
export class App {
  protected readonly title = signal('hms-frontend');
}