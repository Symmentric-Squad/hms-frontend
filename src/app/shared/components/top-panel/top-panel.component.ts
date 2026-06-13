import { Component, OnInit, OnDestroy, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppUser } from "../../models/app-user";
import { TitleCasePipe } from "../../pipe/custom-title-case.pipe";
import { ModalFormComponent } from "../dialog-form/dialog-form.component";
import { FormField, ModalConfig, ModalSubmitEvent } from "../../models/form.models";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "../../../core/services/auth.service";
import { DoctorService } from "../../../features/doctor/service/doctor.service";
import { AdminService } from "../../../features/admin/service/admin.service";
import { ChangePasswordRequest, UpdateDoctorRequest, UpdateUserRequest } from "../../../features/admin/models/admin.model";
import { PublicService } from "../../../core/services/public.service";
import { PatientService } from "../../../features/patient/service/patient.service";

@Component({
  selector: 'app-top-panel',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, FormsModule, ModalFormComponent],
  templateUrl: './top-panel.component.html',
  // styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent implements OnInit, OnDestroy {
  currentUser: AppUser = {
    id: '1',
    username: 'Loading...',
    role: 'USER',
  };

  showDropdown = false;
  showProfileModal = false;
  showPasswordModal = false;
  isLoadingProfileData = false;

  private destroy$ = new Subject<void>();

  editProfileModalConfig: ModalConfig = {
    title: 'Edit Profile',
    submitButtonText: 'Update Profile',
    cancelButtonText: 'Cancel',
    size: 'small',
    mode: 'edit',
  };

  changePasswordModalConfig: ModalConfig = {
    title: 'Change Password',
    submitButtonText: 'Change Password',
    cancelButtonText: 'Cancel',
    size: 'small',
    mode: 'edit',
  };

  doctorProfileFields: FormField[] = [
    { key: 'doctorName', label: 'Doctor Name', type: 'text', required: true, placeholder: 'Enter doctor name' },
    { key: 'doctorEmail', label: 'Email', type: 'email', required: true, placeholder: 'Enter email', disabled: true },
    { key: 'address', label: 'Address', type: 'text', required: true, placeholder: 'Enter address' },
    { key: 'contactNo', label: 'Contact Number', type: 'text', required: true, placeholder: 'Enter contact number' },
    { key: 'doctorFees', label: 'Consultation Fees', type: 'number', required: true, placeholder: 'Enter consultation fees' },
    { key: 'specializationId', label: 'Specialization', type: 'select', required: true, placeholder: 'Select specialization', options: [] }
  ];

  userProfileFields: FormField[] = [
    { key: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name' },
    { key: 'address', label: 'Address', type: 'text', required: true, placeholder: 'Enter your address' },
    { key: 'city', label: 'City', type: 'text', required: true, placeholder: 'Enter your city' },
    {
      key: 'gender', label: 'Gender', type: 'select', required: true, placeholder: 'Select gender',
      options: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' }
      ]
    }
  ];

  // ✅ Signal declaration — replaces the plain array
  profileModalFields = signal<FormField[]>([]);

  changePasswordFields: FormField[] = [
    { key: 'newPassword', label: 'New Password', type: 'text', required: true, placeholder: 'Enter new password' },
    { key: 'confirmPassword', label: 'Confirm Password', type: 'text', required: true, placeholder: 'Confirm new password' },
    { key: 'currentPassword', label: 'Current Password', type: 'text', required: true, placeholder: 'Enter current password' },
  ];

  constructor(
    private authService: AuthService,
    private doctorService: DoctorService,
    private adminService: AdminService,
    private publicService: PublicService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCurrentUser(): void {
    const userId = this.authService.getUserId();
    const role = this.authService.getRole();
    const email = this.authService.getEmail();

    this.currentUser = {
      id: userId.toString(),
      username: email?.split('@')[0] || 'User',
      role: (role as any) || 'USER',
    };
  }

  toggleDropdown(): void { this.showDropdown = !this.showDropdown; }
  closeDropdown(): void { this.showDropdown = false; }

  onProfileClick(): void {
    this.closeDropdown();
    this.isLoadingProfileData = true;

    this.profileModalFields.set([]);
    this.loadProfileData();
    this.showProfileModal = true;
  }

  onPasswordClick(): void {
    this.closeDropdown();
    this.showPasswordModal = true;
  }

  private loadProfileData(): void {
    const userId = this.authService.getUserId();
    const role = this.authService.getRole();

    if (role === 'DOCTOR') {
      this.doctorService
        .getAllSpecializations()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (specs: any) => {
            const specField = this.doctorProfileFields.find(f => f.key === 'specializationId');
            if (specField) {
              specField.options = specs.map((s: any) => ({
                label: s.specialization,
                value: s.id
              }));
            }

            this.doctorService
              .getDoctorById(userId)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                (doctor) => {
                  this.profileModalFields.set(
                    this.doctorProfileFields.map(field => ({
                      ...field,
                      value: doctor[field.key as keyof typeof doctor] || field.value
                    }))
                  );
                  console.log(this.profileModalFields());
                  this.isLoadingProfileData = false;
                },
                (error) => {
                  console.error('Error loading doctor profile:', error);
                  this.isLoadingProfileData = false;
                }
              );
          },
          (error) => {
            console.error('Error loading specializations:', error);
            this.isLoadingProfileData = false;
          }
        );
    } else if (role === 'USER' || role === 'PATIENT') {
      this.publicService
        .getUserById(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (patient: any) => {
            this.profileModalFields.set(
              this.userProfileFields.map(field => ({
                ...field,
                value: patient[field.key as keyof typeof patient] || field.value
              }))
            );
            console.log("User data Fetched:",patient)
            this.isLoadingProfileData = false;
          },
          (error) => {
            console.error('Error loading patient profile:', error);
            this.isLoadingProfileData = false;
          }
        );
    }
  }

  onUpdateProfile(event: ModalSubmitEvent): void {
    if (!event.isValid) { console.warn('Form is invalid'); return; }

    const userId = this.authService.getUserId();
    const role = this.authService.getRole();
    const formData = event.formData;

    if (role === 'DOCTOR') {
      const request: UpdateDoctorRequest = {
        specializationId: formData["specializationId"],
        doctorName: formData["doctorName"],
        address: formData["address"],
        doctorFees: formData["doctorFees"],
        doctorEmail: formData["doctorEmail"],
        contactNo: formData["contactNo"],
      };

      this.doctorService
        .updateDoctorProfile(userId, request)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => { this.showProfileModal = false; alert('Profile updated successfully!'); },
          (error) => { console.error('Error updating doctor profile:', error); alert('Failed to update profile. Please try again.'); }
        );
    } else if (role === 'USER' || role === 'PATIENT') {
      console.log("ProfileModalFields :",this.profileModalFields())
      const request: UpdateUserRequest = {
        fullName: formData["fullName"],
        address: formData["address"],
        city: formData["city"],
        gender: formData["gender"],
        email: localStorage.getItem("email") || "", 
        password: ""
      };

      this.publicService
        .updateUser(userId, request as any)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => { 
            console.log("Service called:", request);
            console.log("response:",res)
            alert('Profile updated successfully!');
          },
          (error) => { console.error('Error updating patient profile:', error); alert('Failed to update profile. Please try again.'); }
        );
      }
      this.onCloseProfileModal();
    
  }

  onChangePassword(event: ModalSubmitEvent): void {
    if (!event.isValid) { console.warn('Form is invalid'); return; }

    const formData = event.formData;

    if (formData["newPassword"] !== formData["confirmPassword"]) {
      alert('New password and confirm password do not match!');
      return;
    }

    const userId = this.authService.getUserId();
    const role = this.authService.getRole();

    const request: ChangePasswordRequest = {
      currentPassword: formData["currentPassword"],
      newPassword: formData["newPassword"],
      confirmPassword: formData["confirmPassword"],
    };

    if (role === 'DOCTOR') {
      this.doctorService.changePassword(userId, request).pipe(takeUntil(this.destroy$))
        .subscribe(
          () => { this.showPasswordModal = false; alert('Password changed successfully!'); },
          (error) => { console.error('Error changing password:', error); alert('Failed to change password. Please check your current password.'); }
        );
    } else if (role === 'ADMIN') {
      this.adminService.changePassword(userId, request).pipe(takeUntil(this.destroy$))
        .subscribe(
          () => { this.showPasswordModal = false; alert('Password changed successfully!'); },
          (error) => { console.error('Error changing password:', error); alert('Failed to change password. Please check your current password.'); }
        );
    } else if (role === 'USER' || role === 'PATIENT') {
      this.patientService.changeuserPassword(userId, request).pipe(takeUntil(this.destroy$))
        .subscribe(
          () => { this.showPasswordModal = false; alert('Password changed successfully!'); },
          (error) => { console.error('Error changing password:', error); alert('Failed to change password. Please check your current password.'); }
        );
    }
    this.onClosePasswordModal();
  }

  onCloseProfileModal(): void { this.showProfileModal = false; }
  onClosePasswordModal(): void { this.showPasswordModal = false; }
}