import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'landing-navbar',
  standalone: true,   // ✅ important for standalone components
  imports: [CommonModule, RouterModule],  // ✅ RouterModule added
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.css']  // ✅ plural
})
export class LandingPageNavBar {}
