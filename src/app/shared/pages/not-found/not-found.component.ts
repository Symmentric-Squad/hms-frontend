import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LandingPageNavBar } from "../../components/landing-navbar/landing-navbar.component";

@Component({
    selector: 'not-found',
    standalone: true,
    imports: [LandingPageNavBar, RouterLink],
    template: `
        <landing-navbar></landing-navbar>
        
        <main class="admin-content flex flex-col items-center justify-center min-h-[80vh] text-center">

            <div class="user-badge px-6 py-2 mb-6 inline-block shadow-md text-2xl font-bold">
                Error Code: 404
            </div>

            <h1 class="text-5xl md:text-7xl font-bold mb-4" style="color: #1e293b;">
                Lost in Space?
            </h1>
            
            <p class="text-lg mb-10 max-w-md mx-auto" style="color: #374151;">
                The page you are looking for doesn't exist or has been moved to a restricted sector.
            </p>

            <div class="flex flex-col sm:flex-row items-center gap-4">
                <a routerLink="/" 
                   class="user-badge px-8 py-3 no-underline hover:opacity-90 transition-opacity shadow-lg">
                    Back to Dashboard
                </a>

                <a routerLink="/" fragment="contact" 
                   class="user-name no-underline hover:text-blue-600 transition-colors flex items-center gap-2">
                    Report Issue →
                </a>
            </div>

            <!-- Subtle Grid Background Decor -->
            <div class="absolute inset-0 -z-10 opacity-5 pointer-events-none" 
                 style="background-image: radial-gradient(#0d6efd 1px, transparent 1px); background-size: 30px 30px;">
            </div>
        </main>
    `,
    styles: [`
        /* Integrating your specific CSS variables */
        .user-badge { 
            background: linear-gradient(90deg, #0d6efd, #0a58ca); 
            color: white; 
            border-radius: 20px;
        }
        .user-name { 
            font-weight: 600; 
            color: #374151; 
            font-size: 14px; 
            text-transform: capitalize; 
        }
        .admin-content { 
            padding: 28px 32px; 
        }
    `]
})
export class NotFoundComponent {}