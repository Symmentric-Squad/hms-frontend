import { Component } from "@angular/core";
import { LandingPageNavBar } from "../../components/landing-navbar/landing-navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
    imports: [LandingPageNavBar],
})
export class LandingComponent {
    ngOnInit() {
        const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
        const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter || '')) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}