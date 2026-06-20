import { TableColumn } from "../../../../shared/models/data-table.models"
import { FieldOption, FormField, ModalConfig } from "../../../../shared/models/form.models"
import { AppointmentResponse } from "../../../admin/models/admin.model"

// ── Modal Configurations ──

export const bookAppointmentModalConfig: ModalConfig = {
    title: 'Book Appointment',
    submitButtonText: 'Book Appointment',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
};

export const editProfileModalConfig: ModalConfig = {
    title: 'Edit Profile',
    submitButtonText: 'Update Profile',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'edit',
};

// ── Table Configuration ──

export const appointmentColumns: TableColumn[] = [
    { 
        key: "doctorName", 
        label: "Doctor Name" 
    },
    { 
        key: "specialization", 
        label: "Specialization" 
    },
    { 
        key: "consultancyFees", 
        label: "Consultancy Fees" 
    },
    { 
        key: "appointmentDate", 
        label: "Appointment Date" 
    },
    { 
        key: "appointmentTime", 
        label: "Appointment Time" 
    },
    {
        key: "currentStatus",
        label: "Status",
        type: 'badge',
        tagColors: {
            Active: { bg: '#dbeafe', text: '#1e40af' },
            Completed: { bg: '#d1fae5', text: '#065f46' },
            'Cancel by User': { bg: '#fee2e2', text: '#991b1b' },
            'Cancel by Doctor': { bg: '#fee2e2', text: '#991b1b' },
        }
    }
];

// ── Form Field Builders ──

/**
 * Builds appointment booking form fields
 * @param doctorFieldOptions - Available doctor options for the select field
 * @param source - Optional existing appointment data to pre-fill form
 * @returns Array of form fields for appointment booking
 */
export function buildAppointmentFields(
    doctorFieldOptions: FieldOption[],
    source?: Partial<AppointmentResponse>
): FormField[] {
    return [
        {
            key: 'appointmentDate',
            label: 'Appointment Date',
            type: 'date',
            value: source?.appointmentDate ?? '',
            required: true,
        },
        {
            key: 'appointmentTime',
            label: 'Appointment Time',
            type: 'time',
            value: source?.appointmentTime ?? '',
            required: true,
        },
        {
            key: 'doctorId',
            label: 'Doctor Name',
            type: 'select',
            value: source?.doctorName ?? '',
            required: true,
            options: doctorFieldOptions,
        },
        // {
        //     key: 'consultancyFees',
        //     label: 'Consultancy Fees',
        //     type: 'number',
        //     value: source?.consultancyFees ?? '',
        //     placeholder: '100',
        //     required: true,
        // },
    ];
}

/**
 * Builds profile update form fields
 * - Pre-fills fields with user data from UserResponse
 * - Follows the doctor page pattern for edit workflows
 * 
 * @param userData - UserResponse object containing current user profile data
 * @returns Array of form fields for profile update with pre-filled values
 */
export function buildProfileFields(userData?: any): FormField[] {
    return [
        {
            key: 'fullName',
            label: 'Full Name',
            type: 'text',
            value: userData?.fullName ?? '',
            placeholder: 'Jane Doe',
            required: true,
        },
        // {
        //     key: 'email',
        //     label: 'Email',
        //     type: 'email',
        //     value: userData?.email ?? '',
        //     placeholder: 'patient@hms.in',
        //     required: true,
        // },
        {
            key: 'gender',
            label: 'Gender',
            type: 'select',
            value: userData?.gender ?? '',
            required: true,
            options: [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Other', value: 'Other' },
            ],
        },
        {
            key: 'address',
            label: 'Address',
            type: 'text',
            value: userData?.address ?? '',
            placeholder: 'Street address',
            rows: 3,
            required: false,
        },
        {
            key: 'city',
            label: 'City',
            type: 'text',
            value: userData?.city ?? '',
            placeholder: 'Chennai',
            required: false,
        },
        {
            key: 'regDate',
            label: 'Registration Date',
            type: 'text',
            value: userData?.regDate ?? '',
            required: false,
            disabled: true,
            placeholder: 'Auto-populated',
        },
        // {
        //     key: 'updationDate',
        //     label: 'Last Updated',
        //     type: 'text',
        //     value: userData?.updationDate ?? 'Never',
        //     required: false,
        //     disabled: true,
        //     placeholder: 'Auto-populated',
        // },
    ];
}