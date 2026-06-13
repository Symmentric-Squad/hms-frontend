import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LandingPageNavBar } from '../../components/landing-navbar/landing-navbar.component';
import { CarouselComponent } from "../../components/landing/carousel.component";
import { ImageGallery } from '../../components/landing/image-gallery.component';
import { LoginSectionComponent } from '../../components/landing/login-section.component';
import { ContactUsForm } from '../../components/landing/contact-us-form.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  imports: [LandingPageNavBar, LoginSectionComponent, FormsModule, CommonModule, CarouselComponent, ImageGallery, ContactUsForm],
})
export class LandingComponent {
  keyServices = [
    { img: "services/cardiologist.png", text: 'Cardiology' },
    { img: "services/orthopedics.png", text: 'Orthopaedics' },
    { img: "services/neurology.png", text: 'Neurology' },
    { img: "services/pediatric.png", text: 'Pediatric' },
    { img: "services/endocrinology.png", text: 'Endocrinology' },
    { img: "services/doctor.png", text: 'ENT' },
    { img: "services/pharma.png", text: 'Pharma Pipeline' },
    { img: "services/emergency-call.png", text: 'Telemedicine' },
    { img: "services/help.png", text: 'Pharma Team' },
    { img: "services/talking.png", text: 'High-Quality Treatments' }
  ];

}