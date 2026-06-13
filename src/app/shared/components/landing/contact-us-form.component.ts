import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ContactQueryRequest } from "../../../core/models/public.model";
import { PublicService } from "../../../core/services/public.service";

@Component({
    selector: 'app-contact-us-form',
    imports: [FormsModule, CommonModule],
    template: `
    <section id="contact" class="mx-auto  bg-white px-5 py-20 text-center md:pb-15">
        <h2 class="m-0 text-3xl font-bold text-blue-600">Contact Us</h2>
        <h6 class="mt-2 mb-10 text-md text-gray-400">We’re here to help you</h6>
        
        <div class="mx-auto w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8 md:p-10">
            <form (ngSubmit)="submitContactForm()" class="flex flex-col gap-5">
                
                <!-- Name Field -->
                <div class="flex flex-col gap-1.5">
                    <label for="name" class="text-md text-left font-semibold tracking-wider text-gray-700">Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        [(ngModel)]="contactForm.fullName" 
                        name="fullName" 
                        placeholder="Enter your name"
                        class="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                        required />
                </div>

                <!-- Phone Field -->
                <div class="flex flex-col gap-1.5">
                    <label for="phone" class="text-md font-semibold text-left tracking-wider text-gray-700">Phone</label>
                    <input 
                        id="phone" 
                        type="tel" 
                        [(ngModel)]="contactForm.contactNo" 
                        name="contactNo" 
                        placeholder="Enter your phone number" 
                        class="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                        required />
                </div>

                <!-- Email Field -->
                <div class="flex flex-col gap-1.5">
                    <label for="email" class="text-md font-semibold text-left tracking-wider text-gray-700">Email</label>
                    <input 
                        id="email" 
                        type="email" 
                        [(ngModel)]="contactForm.email" 
                        name="email" 
                        placeholder="Enter your email"
                        class="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                        required />
                </div>

                <!-- Message Field -->
                <div class="flex flex-col gap-1.5">
                    <label for="message" class="text-md font-semibold text-left tracking-wider text-gray-700">Message</label>
                    <textarea 
                        id="message" 
                        [(ngModel)]="contactForm.message" 
                        name="message" 
                        placeholder="Enter your message..." 
                        rows="4" 
                        class="w-full resize-none rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                        required></textarea>
                </div>

                <!-- Submit Button -->
                <button 
                    type="submit" 
                    [disabled]="isSubmitting"
                    class="mt-2 w-full rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-blue-500/10 hover:bg-blue-700 hover:shadow-blue-500/20 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 sm:w-auto sm:self-center sm:px-10 shadow-[0_4px_12px_rgba(8,145,178,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(8,145,178,0.35)] active:translate-y-0">
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
            </form>
        </div>
    </section>
    `,
})

export class ContactUsForm {
    contactForm: ContactQueryRequest = {
        fullName: '',
        contactNo: 0,
        email: '',
        message: '',
    };

    isSubmitting = false;

    constructor(private publicService: PublicService) { }

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