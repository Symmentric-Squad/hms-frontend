import { Component } from "@angular/core";

@Component({
    selector:'landing-navbar',
    // templateUrl: './landing-navbar.component.html',
    template: `
    <header class="fixed top-0 z-[1000] flex w-full items-center justify-between bg-white px-8 py-4 text-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-slate-100"> 
        <!-- Logo Section -->
        <div class="flex items-center">
            <a href="/" class="flex items-center no-underline group">
            <span class="mr-2 text-2xl font-extrabold tracking-tight text-[#0891B2]">HMS</span>
            <div class="p-1.5 bg-slate-50 rounded-xl group-hover:bg-cyan-50 transition-colors duration-300">
                <img src="services/hospital.png" alt="Healthcare Logo" class="h-8 w-8">
            </div>
            </a>
        </div>
        <!-- Navigation Section -->
        <nav class="hidden lg:block">
            <ul class="m-0 flex items-center p-0 list-none space-x-2">
            <li><a href="#" class="px-4 py-2 text-[15px] font-semibold text-slate-600 no-underline transition-all duration-200 hover:text-[#0891B2] hover:bg-slate-50 rounded-lg">Home</a></li>
            <li><a href="#services" class="px-4 py-2 text-[15px] font-semibold text-slate-600 no-underline transition-all duration-200 hover:text-[#0891B2] hover:bg-slate-50 rounded-lg">Services</a></li>
            <li><a href="#about" class="px-4 py-2 text-[15px] font-semibold text-slate-600 no-underline transition-all duration-200 hover:text-[#0891B2] hover:bg-slate-50 rounded-lg">About Us</a></li>
            <li><a href="#gallery" class="px-4 py-2 text-[15px] font-semibold text-slate-600 no-underline transition-all duration-200 hover:text-[#0891B2] hover:bg-slate-50 rounded-lg">Gallery</a></li>
            <li><a href="#contact" class="px-4 py-2 text-[15px] font-semibold text-slate-600 no-underline transition-all duration-200 hover:text-[#0891B2] hover:bg-slate-50 rounded-lg">Contact Us</a></li>
            <li><a href="#login" class="px-4 py-2 text-[15px] font-semibold text-slate-600 no-underline transition-all duration-200 hover:text-[#0891B2] hover:bg-slate-50 rounded-lg">Login</a></li>
            </ul>
        </nav>
        <!-- Button Action -->
        <div class="flex items-center">
            <button class="rounded-xl bg-gradient-to-r from-[#0891B2] to-[#0e7490] px-7 py-2.5 text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(8,145,178,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(8,145,178,0.35)] active:translate-y-0">
            Book an Appointment
            </button>
        </div>
    </header>
    `
})
export class LandingPageNavBar{
    
}