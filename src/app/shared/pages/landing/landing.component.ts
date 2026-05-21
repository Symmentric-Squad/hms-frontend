import { Component } from '@angular/core';
import { LandingPageNavBar } from '../../components/landing-navbar/landing-navbar.component';
import { LoginSectionComponent } from '../../components/login-section/login-section.component';
import { PublicService } from '../../../core/services/public.service';
import { ContactQueryRequest } from '../../../core/models/public.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  imports: [LandingPageNavBar, LoginSectionComponent, FormsModule, CommonModule],
})
export class LandingComponent {
  contactForm: ContactQueryRequest = {
    fullName: '',
    contactNo: 0,
    email: '',
    message: '',
  };
 
  isSubmitting = false;
 
  constructor(private publicService: PublicService) {}
 
  ngOnInit() {
    const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
    const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');
 
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
 
        const filter = button.getAttribute('data-filter');
 
        galleryItems.forEach((item) => {
          if (filter === 'all' || item.classList.contains(filter || '')) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
 
  submitContactForm(): void {
    if (
      !this.contactForm.fullName ||
      !this.contactForm.email ||
      !this.contactForm.message ||
      !this.contactForm.contactNo
    ) {
      alert('Please fill in all fields.');
      return;
    }
    this.isSubmitting = true;
    this.publicService.submitContactQuery(this.contactForm).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Message sent successfully!');
        this.contactForm = { fullName: '', contactNo: 0, email: '', message: '' };
      },
      error: (e) => {
        this.isSubmitting = false;
        alert('Failed to send message: ' + (e.error?.message || 'Unknown error'));
      },
    });
  }
}