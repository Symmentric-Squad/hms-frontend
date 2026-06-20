import { TableAction, TableColumn } from "../../../../shared/models/data-table.models";
import { FieldOption, FormField, ModalConfig } from "../../../../shared/models/form.models";
import { AppointmentResponse } from "../../models/admin.model";


// ────────────────────────────────────────────────────────────────────────────
// TABLE CONFIGURATION
// ────────────────────────────────────────────────────────────────────────────

export const appointmentColumns: TableColumn[] = [
    { key: "patientName", label: "Patient Name" },
    { key: "doctorName", label: "Doctor Name" },
    { key: "specialization", label: "Specialization" },
    { key: "consultancyFees", label: "Consultancy Fees" },
    { key: "appointmentDate", label: "Appt. Date" },
    { key: "appointmentTime", label: "Appt. Time" },
    {
        key: "currentStatus",
        label: "Status",
        type: 'badge',
        tagColors: {
            'Active': { bg: '#dbeafe', text: '#1e40af' },
            'Cancel by User': { bg: '#fef0e1', text: '#c06311' },
            'Cancel by Doctor': { bg: '#fee2e2', text: '#991b1b' },
            'Completed': { bg: '#d1fae5', text: '#065f46' },
        }
    }
];

export const appointmentActions: TableAction[] = [
    // { id: 'edit', label: 'Edit', icon: 'edit.svg', type: 'primary', actionColor: 'blue' },
    // { id: 'delete', label: 'Delete', icon: 'delete.svg', type: 'danger', actionColor: 'red' },
];


export const createAppointmentModalConfig: ModalConfig = {
    title: 'Book New Appointment',
    submitButtonText: 'Book Appointment',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
};


export const editAppointmentModalConfig: ModalConfig = {
    title: 'Edit Appointment',
    submitButtonText: 'Save Changes',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'edit',
};


export function buildCreateAppointmentFields(
    patientFieldOptions: FieldOption[],
    doctorFieldOptions: FieldOption[]
): FormField[] {
    return [
        {
            key: 'userId',
            label: 'Patient Name',
            type: 'select',
            value: '',
            placeholder: 'Select a patient',
            required: true,
            options: patientFieldOptions,
        },
        {
            key: 'doctorId',
            label: 'Doctor Name',
            type: 'select',
            value: '',
            placeholder: 'Select a doctor',
            required: true,
            options: doctorFieldOptions,
        },
        {
            key: 'appointmentDate',
            label: 'Appointment Date',
            type: 'date',
            value: '',
            placeholder: 'YYYY-MM-DD',
            required: true,
        },
        {
            key: 'appointmentTime',
            label: 'Appointment Time',
            type: 'time',
            value: '',
            placeholder: 'HH:MM AM/PM',
            required: true,
        },
        {
            key: 'consultancyFees',
            label: 'Consultancy Fees',
            type: 'number',
            value: '',
            placeholder: '500',
            required: true,
        },
    ];
}

export function buildEditAppointmentFields(
    patientFieldOptions: FieldOption[],
    doctorFieldOptions: FieldOption[],
    appointment: AppointmentResponse,
    patientId?: number,
    doctorId?: number
): FormField[] {
    return [
        {
            key: 'userId',
            label: 'Patient Name',
            type: 'select',
            value: patientId?.toString() ?? '',
            placeholder: 'Select a patient',
            required: true,
            options: patientFieldOptions,
        },
        {
            key: 'doctorId',
            label: 'Doctor Name',
            type: 'select',
            value: doctorId?.toString() ?? '',
            placeholder: 'Select a doctor',
            required: true,
            options: doctorFieldOptions,
        },
        {
            key: 'appointmentDate',
            label: 'Appointment Date',
            type: 'date',
            value: appointment.appointmentDate ?? '',
            placeholder: 'YYYY-MM-DD',
            required: true,
        },
        {
            key: 'appointmentTime',
            label: 'Appointment Time',
            type: 'time',
            value: appointment.appointmentTime ?? '',
            placeholder: 'HH:MM AM/PM',
            required: true,
        },
        {
            key: 'consultancyFees',
            label: 'Consultancy Fees',
            type: 'number',
            value: appointment.consultancyFees ?? '',
            placeholder: '500',
            required: true,
        },
    ];
}


export function buildAppointmentFields(
    patientFieldOptions: FieldOption[],
    doctorFieldOptions: FieldOption[],
    source?: Partial<AppointmentResponse>,
    patientId?: number,
    doctorId?: number
): FormField[] {
    if (source) {
        return buildEditAppointmentFields(
            patientFieldOptions,
            doctorFieldOptions,
            source as AppointmentResponse,
            patientId,
            doctorId
        );
    }
    return buildCreateAppointmentFields(patientFieldOptions, doctorFieldOptions);
}