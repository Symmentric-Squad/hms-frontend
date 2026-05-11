import { TableAction, TableColumn } from "../../../../shared/models/data-table.models";
import { FormField, ModalConfig } from "../../../../shared/models/form.models";


// ── Table config ──────────────────────────────────────────────────────────
export var appointmentColumns: TableColumn[] = [
    // { key: "appointmentId", label: "Id" },
    { key: "patientName", label: "Patient Name" },
    { key: "doctorName", label: "Doctor Name" },
    // { key: "specialization", label: "Specialization"},
    // { key: "consultancyFees", label: "Consultancy Fees"},
    { key: "appointmentDate", label: "Appt. Date" },
    { key: "appointmentTime", label: "Appt. Time" },
    // { key: "creationDate", label: "Creation Date"},
    {
        key: "currentStatus",
        label: "Status",
        type: 'badge',
        tagColors: {
            Active: { bg: '#dbeafe', text: '#1e40af' },
            Completed: { bg: '#d1fae5', text: '#065f46' },
            Cancelled: { bg: '#fee2e2', text: '#991b1b' },
        }
    }
];

export var appointmentActions: TableAction[] = [
    // { id: 'view',   label: 'View',   icon: 'eye.svg',   type: 'secondary', actionColor: 'gray' },
    { id: 'edit', label: 'Edit', icon: 'edit.svg', type: 'primary', actionColor: 'blue' },
    { id: 'cencel', label: 'Cancel', icon: 'close.svg', type: 'danger', actionColor: 'red' },
];

export var appointmentModalConfig: ModalConfig = {
    title: 'Add Appointment',
    submitButtonText: 'Save Details',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
};

export var appointmentModalFields: FormField[] = [
    { key: 'patientName', label: 'Patient Name', type: 'text', required: true },
    { key: 'doctor', label: 'Doctor Name', type: 'text', required: true },
    { key: 'date', label: 'Appointment Date', type: 'date', required: true },
    { key: 'time', label: 'Appointment Time', type: 'time', required: true },
    {
        key: 'status', label: 'Status', type: 'select', required: true,
        options: [
            { label: 'Scheduled', value: 'Scheduled' },
            { label: 'Completed', value: 'Completed' },
            { label: 'Cancelled', value: 'Cancelled' },
        ],
    },
];