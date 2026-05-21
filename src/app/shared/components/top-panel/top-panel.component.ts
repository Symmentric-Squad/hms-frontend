import { Component } from "@angular/core";
import { AppUser } from "../../models/app-user";
import { TitleCasePipe } from "../../pipe/custom-title-case.pipe";
import { FormsModule } from "@angular/forms";
import { FormField, ModalConfig, ModalSubmitEvent } from "../../models/form.models";
import { ModalFormComponent } from "../dialog-form/dialog-form.component";

export interface ProfileUser {
  name: string;
  gender: "Male" | "Female" | string;
  address: string;
  city: string;
  email: string;
  lastUpdated: Date
}

@Component({
  selector: 'app-top-panel',
  template: `
    <header class="bg-white py-3.5 px-8 flex items-center justify-between shadow-md sticky top-0 z-50">
      <div>
        <h1 class="text-[20px] font-bold text-slate-800 m-0">{{ currentUser.role | customTitleCase }} Management Panel</h1>
      </div>
      @if(currentUser) {
        <div class="flex items-center gap-2.5 cursor-pointer" (click)="showProfileModal = true">
          @if(currentUser.role === 'ADMIN') {
            <span class="bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-[20px] text-sm font-semibold px-2 inline-flex items-center">
              <!-- <span 
                class="brand-icon inline-block cursor-pointer bg-white w-3.25 h-3.25 m-0"
                style="
                  mask-image: url('admin.svg'); 
                  -webkit-mask-image: url('admin.svg');
                  mask-size: contain;
                  mask-repeat: no-repeat;
                "
              ></span>  -->
              {{ currentUser.role }}</span>
          } @else if (currentUser.role === 'DOCTOR') {
            <span class="bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-[20px] text-sm font-semibold px-2 inline-flex items-center">
              <!-- <span 
                class="brand-icon inline-block cursor-pointer bg-white w-3.25 h-3.25 m-0"
                style="
                  mask-image: url('doctor.svg'); 
                  -webkit-mask-image: url('doctor.svg');
                  mask-size: contain;
                  mask-repeat: no-repeat;
                "
              ></span>  -->
              {{ currentUser.role }}</span>
          } @else {
            <span class="bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-[20px] text-sm font-semibold px-2 inline-flex items-center">
              <!-- <span 
                class="brand-icon inline-block cursor-pointer bg-white w-3.25 h-3.25 m-0"
                style="
                  mask-image: url('patient.svg'); 
                  -webkit-mask-image: url('patient.svg');
                  mask-size: contain;
                  mask-repeat: no-repeat;
                "
              ></span>  -->
              {{ currentUser.role }}</span>
          }
          <span class="font-semibold text-slate-700 text-sm capitalize">{{ currentUser.username }}</span>
        </div>
      }
    </header>

    @if(showProfileModal){
      <app-modal-form
          [config]="editProfileModalConfig"
          [fields]="profileModalFields"
          (submitted)="onUpdateProfile($event)"
          (cancelled)="showProfileModal = false"
          (backdropClicked)="showProfileModal = false"
      >
      </app-modal-form>
    }
  `,
  
  imports: [TitleCasePipe, FormsModule, ModalFormComponent]
})
export class TopPanelComponent {
  // TODO: fetch the user details from the service
  currentUser: AppUser = {
    id: '1',
    username: 'Suresh',
    role: 'ADMIN',
    // role: 'PATIENT'
  };

  showProfileModal = false;

  user: ProfileUser = {
    name: 'Suresh',
    gender: 'Male',
    address: '100 Nehru Street',
    city: 'Chennai',
    email: 'abc@asd.com',
    lastUpdated: new Date(),
  };

  editProfileModalConfig: ModalConfig = {
      title: 'Edit Profile',
      submitButtonText: 'Edit Profile',
      cancelButtonText: 'Cancel',
      size: 'small',
      mode: 'create',
    }
    
    profileModalFields: FormField[] = [
      {
        key: 'name',
        label: 'Name',
        type: 'text',
        required:true
      },
      {
        key: 'gender',
        label: 'Gender',
        type: 'text',
        required:true
      },
      {
        key: 'address',
        label: 'Address',
        type: 'text',
        required:true
      },
      {
        key: 'city',
        label: 'City',
        type: 'text',
        required:true
      },
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        required:true,
      },
    ]

  onUpdateProfile(event: ModalSubmitEvent): void {
    if (!event.isValid) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log('Form submitted:', event.formData);
    this.showProfileModal= false;
  }

  updateProfile(): void {
    this.user.lastUpdated = new Date();
    console.log('Profile Updated', this.user);
    this.showProfileModal = false;
  }
}