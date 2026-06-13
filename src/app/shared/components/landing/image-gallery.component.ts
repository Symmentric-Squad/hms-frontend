import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface GalleryImage {
    img: string;
    alt: string;
    category: string;
}

@Component({
    selector: 'app-image-gallery',
    template: `
    <section id="gallery" class="bg-white px-10 py-10 text-center">
        <h2 class="text-3xl font-bold text-blue-600 m-0">Gallery</h2>
        <h6 class="text-md mt-2 text-gray-400 text-center mb-10">Explore our departments visually</h6>

        <div class="mb-5 flex flex-wrap justify-center gap-2">
        @for(button of filterButtons; track $index){
            <button (click)="setFilter(button)" [ngClass]="activeFilter === button ? 'bg-[#7caee8]' : 'bg-[#ea4343]'"
                class="text-white border-none py-2 px-5 rounded-sm cursor-pointer font-bold transition-colors duration-200 hover:bg-[#7caee8]">
                {{ button }}
            </button>
        }
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        @for(galleryImage of filteredImages; track $index){
            <div class="w-full h-50 overflow-hidden rounded-init rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                <img [src]="galleryImage.img" [alt]="galleryImage.alt" class="w-full h-full object-cover block" />
            </div>
        }
        </div>
    </section>
    `,
    imports: [FormsModule, CommonModule],
})
export class ImageGallery {

    activeFilter: string = 'ALL';

    filterButtons = ["ALL", "Cardiology", "Neurology", "Orthopedics", "Endocrinology", "ENT"];

    galleryImages: GalleryImage[] = [
        { img: "gallery/cardiology 1.jpg", alt: "Cardiology", category: "Cardiology" },
        { img: "gallery/neurology1.jpg", alt: "Neurology", category: "Neurology" },
        { img: "gallery/endocrynology1.jpg", alt: "Endocrinology", category: "Endocrinology" },
        { img: "gallery/ent1.jpg", alt: "ENT", category: "ENT" },
        { img: "gallery/orthopedic1.jpg", alt: "Orthopedics", category: "Orthopedics" },
        { img: "gallery/cardiology 2.jpg", alt: "Cardiology", category: "Cardiology" },
        { img: "gallery/neurology2.jpg", alt: "Neurology", category: "Neurology" },
        { img: "gallery/endocrynology2.jpg", alt: "Endocrinology", category: "Endocrinology" },
        { img: "gallery/orthopedic2.jpg", alt: "Orthopedics", category: "Orthopedics" },
        { img: "gallery/cardiology 3.jpg", alt: "Cardiology", category: "Cardiology" },
        { img: "gallery/neurology3.jpg", alt: "Neurology", category: "Neurology" },
        { img: "gallery/endocrynology3.jpg", alt: "Endocrinology", category: "Endocrinology" },
        { img: "gallery/ent3.jpg", alt: "ENT", category: "ENT" },
        { img: "gallery/orthopedic3.jpg", alt: "Orthopedics", category: "Orthopedics" },
        { img: "gallery/cardiology 4.jpg", alt: "Cardiology", category: "Cardiology" },
        { img: "gallery/neurology4.jpg", alt: "Neurology", category: "Neurology" },
        { img: "gallery/endocrynology4.jpg", alt: "Endocrinology", category: "Endocrinology" },
        { img: "gallery/ent4.jpg", alt: "ENT", category: "ENT" },
        { img: "gallery/orthopedic4.jpg", alt: "Orthopedics", category: "Orthopedics" },
    ];

    setFilter(filter: string): void {
        this.activeFilter = filter;
    }

    // Get only the filtered images to display in the view
    get filteredImages(): GalleryImage[] {
        if (this.activeFilter === 'ALL') {
            return this.galleryImages;
        }
        return this.galleryImages.filter(
            image => image.category.toLowerCase() === this.activeFilter.toLowerCase()
        );
    }
}