import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarouselItem {
    url: string;
    title?: string;
}

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="relative w-full overflow-hidden group bg-black">
      
      <div 
        #carouselContainer
        (scroll)="onScroll($event)"
        class="flex w-full overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth"
        style="-webkit-overflow-scrolling: touch;"
      >
         @for(item of items; track $index){
             <div class="min-w-full w-full snap-start relative aspect-4/3 sm:aspect-video md:aspect-21/9">
                 <img 
                     [src]="item.url" 
                     [alt]="item.title || 'Carousel Image ' + ($index + 1)" 
                     class="w-full h-full object-cover block select-none pointer-events-none"
                     draggable="false"
                 />
                 
                 @if(item.title){
                     <div class="absolute inset-0 flex items-center justify-center bg-black/40 p-4 md:p-8 text-white text-center">
                         <h3 class="text-lg md:text-2xl font-bold max-w-4xl mx-auto px-2 md:px-4">
                             {{ item.title }}
                         </h3>
                     </div>
                 }
             </div>
         }
      </div>

      <!-- Navigation Arrows -->
      <button 
        (click)="scrollPrev(carouselContainer)"
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden md:block z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button 
        (click)="scrollNext(carouselContainer)"
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden md:block z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <!-- Indicator Dots -->
      <div class="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5 z-10">
        <button 
          *ngFor="let item of items; let i = index"
          (click)="scrollToIndex(carouselContainer, i)"
          class="h-2 md:h-2.5 rounded-full transition-all duration-300"
          [ngClass]="activeIndex === i ? 'bg-white w-6 md:w-7' : 'bg-white/40 hover:bg-white/70 w-2 md:w-2.5'"
          [aria-label]="'Go to slide ' + (i + 1)"
        ></button>
      </div>
    </div>
  `,
    styles: [`
    /* Total elimination of any native scrollbar layouts */
    .scrollbar-none::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
    .scrollbar-none {
      -ms-overflow-style: none !important;
      scrollbar-width: none !important;
    }
  `]
})
export class CarouselComponent {
    @Input() items: CarouselItem[] = [
        { url: 'medical.jpg', title: 'Hospital Management System' },
        { url: 'hms2.jpg', title: 'We care for your Health' },
        { url: 'hms3.jpg', title: 'Health-Care made easy' }
    ];

    activeIndex = 0;

    onScroll(event: Event): void {
        const element = event.target as HTMLElement;
        this.activeIndex = Math.round(element.scrollLeft / element.clientWidth);
    }

    scrollPrev(container: HTMLElement): void {
        container.scrollLeft -= container.clientWidth;
    }

    scrollNext(container: HTMLElement): void {
        if (this.activeIndex === this.items.length - 1) {
            container.scrollLeft = 0;
        } else {
            container.scrollLeft += container.clientWidth;
        }
    }

    scrollToIndex(container: HTMLElement, index: number): void {
        container.scrollLeft = container.clientWidth * index;
    }
}