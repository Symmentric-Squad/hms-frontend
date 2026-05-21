import { TableAction, TableColumn } from "../../../../shared/models/data-table.models";
import { FieldOption, FormField, ModalConfig } from "../../../../shared/models/form.models";
import { DoctorResponse } from "../../models/admin.model";


// ────────────────────────────────────────────────────────────────────────────
// TABLE CONFIGURATION
// ────────────────────────────────────────────────────────────────────────────

export const doctorColumns: TableColumn[] = [
    { key: 'doctorName', label: 'Name' },
    { key: 'specializationName', label: 'Speciality' },
    { key: 'contactNo', label: 'Phone' },
    { key: 'doctorEmail', label: 'E Mail' },
    { key: 'address', label: 'Address' },
    // { key: 'status', label: 'Status', type: 'badge',
    //   tagColors: {
    //     'Active':    { bg: '#d1fae5', text: '#065f46' },
    //     'Inactive':  { bg: '#fef3c7', text: '#92400e' },
    //   },
    // },
];

export const doctorActions: TableAction[] = [
    { id: 'edit', label: 'Edit', icon: 'edit.svg', type: 'primary', actionColor: 'blue' },
    // { id: 'view', label: 'View', icon: 'view.svg', type: 'secondary', actionColor: 'gray' },
    // { id: 'delete', label: 'Delete', icon: 'delete.svg', type: 'danger', actionColor: 'red' },
];


// ────────────────────────────────────────────────────────────────────────────
// MODAL CONFIGURATIONS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Config for CREATE mode - Adding a new doctor
 */
export const createDoctorModalConfig: ModalConfig = {
    title: 'Add New Doctor',
    submitButtonText: 'Add Doctor',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
};

/**
 * Config for EDIT mode - Updating an existing doctor
 */
export const editDoctorModalConfig: ModalConfig = {
    title: 'Edit Doctor',
    submitButtonText: 'Save Changes',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'edit',
};


// ────────────────────────────────────────────────────────────────────────────
// FORM FIELD BUILDERS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build form fields for CREATE mode
 * - All fields are empty
 * - Password field is REQUIRED for new doctors
 * - Maps to CreateDoctorRequest interface
 */
export function buildCreateDoctorFields(
    specializationFieldOptions: FieldOption[]
): FormField[] {
    return [
        {
            key: 'doctorName',
            label: 'Doctor Name',
            type: 'text',
            value: '',
            placeholder: 'Jane Doe',
            required: true,
        },
        {
            key: 'doctorEmail',
            label: 'Email',
            type: 'email',
            value: '',
            placeholder: 'doctor@hms.in',
            required: true,
        },
        {
            key: 'password',
            label: 'Password',
            type: 'text',
            value: '',
            placeholder: 'Enter a secure password',
            required: true,
        },
        {
            key: 'specializationId',
            label: 'Specialization',
            type: 'select',
            value: '',
            placeholder: 'Select specialization',
            required: true,
            options: specializationFieldOptions,
        },
        {
            key: 'contactNo',
            label: 'Phone Number',
            type: 'number',
            value: '',
            placeholder: '98XXXXXXXX',
            required: true,
        },
        {
            key: 'doctorFees',
            label: 'Doctor Fees',
            type: 'number',
            value: '',
            placeholder: 'Rs. xxx',
            required: true,
        },
        {
            key: 'address',
            label: 'Address',
            type: 'textarea',
            value: '',
            placeholder: 'Address of the Doctor',
            rows: 3,
            required: true,
        },
    ];
}

/**
 * Build form fields for EDIT mode
 * - Fields are populated with existing doctor data
 * - Password field is EXCLUDED (use separate password change flow)
 * - Maps to UpdateDoctorRequest interface
 * - Specialization value matches the option's value property (string name)
 */
export function buildEditDoctorFields(
    specializationFieldOptions: FieldOption[],
    doctor: DoctorResponse,
    specializationId?: string 
): FormField[] {
    return [
        {
            key: 'doctorName',
            label: 'Doctor Name',
            type: 'text',
            value: doctor.doctorName ?? '',
            placeholder: 'Jane Doe',
            required: true,
        },
        {
            key: 'doctorEmail',
            label: 'Email',
            type: 'email',
            value: doctor.doctorEmail ?? '',
            placeholder: 'doctor@hms.in',
            required: true,
        },
        {
            key: 'specializationId',
            label: 'Specialization',
            type: 'select',
            value: specializationId ?? '',  // value property sends specialization name string
            placeholder: 'Select specialization',
            required: true,
            options: specializationFieldOptions,
        },
        {
            key: 'contactNo',
            label: 'Phone Number',
            type: 'number',
            value: doctor.contactNo ?? '',
            placeholder: '98XXXXXXXX',
            required: true,
        },
        {
            key: 'doctorFees',
            label: 'Doctor Fees',
            type: 'number',
            value: doctor.doctorFees ?? '',
            placeholder: '500',
            required: true,
        },
        {
            key: 'address',
            label: 'Address',
            type: 'textarea',
            value: doctor.address ?? '',
            placeholder: 'Address of the Doctor',
            rows: 3,
            required: true,
        },
    ];
}

/**
 * Unified builder - maintains backward compatibility
 * Automatically detects if source data is provided to determine create vs edit mode
 * 
 * @param specializationFieldOptions - Available specialization options
 * @param source - Optional doctor data; if provided, builds edit fields; otherwise builds create fields
 * @returns FormField[] configured for either create or edit mode
 */
export function buildDoctorFields(
    specializationFieldOptions: FieldOption[],
    source?: Partial<DoctorResponse>
): FormField[] {
    if (source) {
        return buildEditDoctorFields(specializationFieldOptions, source as DoctorResponse);
    }
    return buildCreateDoctorFields(specializationFieldOptions);
}