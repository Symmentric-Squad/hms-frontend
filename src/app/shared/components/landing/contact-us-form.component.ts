import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ContactQueryRequest } from "../../../core/models/public.model";
import { PublicService } from "../../../core/services/public.service";

@Component({
    selector: 'app-contact-us-form',
    imports: [FormsModule, CommonModule],
    template: `
    <section id="contact" class="mx-auto bg-white px-5 py-20 text-center md:pb-15">
        <h2 class="m-0 text-3xl font-bold text-blue-600">Contact Us</h2>
        <h6 class="mt-2 mb-10 text-md text-gray-400">We’re here to help you</h6>
        
        <div class="mx-auto w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8 md:p-10">
            <form #contactFormRef="ngForm" (ngSubmit)="submitContactForm(contactFormRef)" class="flex flex-col gap-5" novalidate>
                
                <div class="flex flex-col gap-1.5">
                    <label for="name" class="text-md text-left font-semibold tracking-wider text-gray-700">Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        [(ngModel)]="contactForm.fullName" 
                        name="fullName" 
                        #fullNameRef="ngModel"
                        placeholder="Enter your name"
                        class="w-full rounded-lg border bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2"
                        [ngClass]="{'border-red-500 focus:border-red-500 focus:ring-red-500/20': fullNameRef.invalid && fullNameRef.touched, 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20': !fullNameRef.invalid || !fullNameRef.touched}"
                        required />
                    <p *ngIf="fullNameRef.invalid && fullNameRef.touched" class="text-left text-xs font-medium text-red-500 mt-1">
                        Name is required.
                    </p>
                </div>

                <div class="flex flex-col gap-1.5">
                    <label for="phone" class="text-md font-semibold text-left tracking-wider text-gray-700">Phone</label>
                    <input 
                        id="phone" 
                        type="text" 
                        inputmode="numeric"
                        pattern="^[0-9]{10}$"
                        [(ngModel)]="contactForm.contactNo" 
                        name="contactNo" 
                        #contactNoRef="ngModel"
                        placeholder="Enter your phone number" 
                        class="w-full rounded-lg border bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2"
                        [ngClass]="{'border-red-500 focus:border-red-500 focus:ring-red-500/20': contactNoRef.invalid && contactNoRef.touched, 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20': !contactNoRef.invalid || !contactNoRef.touched}"
                        required />
                    <div *ngIf="contactNoRef.invalid && contactNoRef.touched" class="text-left text-xs font-medium text-red-500 mt-1">
                        <p *ngIf="contactNoRef.errors?.['required']">Phone number is required.</p>
                        <p *ngIf="contactNoRef.errors?.['pattern']">Please enter a valid phone number (10 digits).</p>
                    </div>
                </div>

                <div class="flex flex-col gap-1.5">
                    <label for="email" class="text-md font-semibold text-left tracking-wider text-gray-700">Email</label>
                    <input 
                        id="email" 
                        type="email" 
                        [(ngModel)]="contactForm.email" 
                        name="email" 
                        #emailRef="ngModel"
                        placeholder="Enter your email"
                        class="w-full rounded-lg border bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2"
                        [ngClass]="{'border-red-500 focus:border-red-500 focus:ring-red-500/20': emailRef.invalid && emailRef.touched, 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20': !emailRef.invalid || !emailRef.touched}"
                        required email />
                    <div *ngIf="emailRef.invalid && emailRef.touched" class="text-left text-xs font-medium text-red-500 mt-1">
                        <p *ngIf="emailRef.errors?.['required']">Email is required.</p>
                        <p *ngIf="emailRef.errors?.['email']">Please enter a valid email address.</p>
                    </div>
                </div>

                <div class="flex flex-col gap-1.5">
                    <label for="message" class="text-md font-semibold text-left tracking-wider text-gray-700">Message</label>
                    <textarea 
                        id="message" 
                        [(ngModel)]="contactForm.message" 
                        name="message" 
                        #messageRef="ngModel"
                        placeholder="Enter your message..." 
                        rows="4" 
                        class="w-full resize-none rounded-lg border bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2"
                        [ngClass]="{'border-red-500 focus:border-red-500 focus:ring-red-500/20': messageRef.invalid && messageRef.touched, 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20': !messageRef.invalid || !messageRef.touched}"
                        required></textarea>
                    <p *ngIf="messageRef.invalid && messageRef.touched" class="text-left text-xs font-medium text-red-500 mt-1">
                        Message cannot be left empty.
                    </p>
                </div>

                <button 
                    type="submit" 
                    [disabled]="contactFormRef.invalid || isSubmitting"
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
        contactNo: '' as unknown as number, // Initialized as empty string for better input handling, falls back to structural model type
        email: '',
        message: '',
    };

    isSubmitting = false;

    constructor(private publicService: PublicService) { }

    // 3. Receives the directive instance to easily reset validation state on success
    submitContactForm(formRef: any): void {
        if (formRef.invalid) {
            return;
        }

        this.isSubmitting = true;
        this.publicService.submitContactQuery(this.contactForm).subscribe({
            next: () => {
                this.isSubmitting = false;
                alert('Message sent successfully!');
                formRef.resetForm(); // Clears values AND validation state tracking (like .touched or .dirty)
                this.contactForm = { fullName: '', contactNo: 0, email: '', message: '' };
            },
            error: (e) => {
                this.isSubmitting = false;
                alert('Failed to send message: ' + (e.error?.message || 'Unknown error'));
            },
        });
    }
}