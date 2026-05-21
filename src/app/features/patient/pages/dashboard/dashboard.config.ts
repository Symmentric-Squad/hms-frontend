import { TableAction, TableColumn } from "../../../../shared/models/data-table.models"
import { FormField, ModalConfig } from "../../../../shared/models/form.models"

export var bookAppointmentModalConfig: ModalConfig = {
    title: 'New Appointment',
    submitButtonText: 'Book Appointment',
    cancelButtonText: 'Cancel',
    size: 'small',
    mode: 'create',
}

export var appointmentModalFields: FormField[] = [
    { key: 'patient name', label: 'Patient Name', type: 'text', required: true },
    { key: 'doctor', label: 'Doctor Name', type: 'text', required: true },
    { key: 'date', label: 'Appointment Date', type: 'date', required: true },
    { key: 'time', label: 'Appointment Time', type: 'time', required: true },
    {
        key: 'status', label: 'Status', type: 'select', required: true,
        options: [
            { label: "Scheduled", value: "Scheduled" },
            { label: "Completed", value: "Completed" },
            { label: "Cancelled", value: "Cancelled" },
        ]
    },
]

export var editProfileModalConfig: ModalConfig = {
    title: 'Edit Profile',
    submitButtonText: 'Edit Profile',
    cancelButtonText: 'Cancel',
    size: 'small',
    mode: 'create',
}

export var profileModalFields: FormField[] = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'gender', label: 'Gender', type: 'text', required: true },
    { key: 'address', label: 'Address', type: 'text', required: true },
    { key: 'city', label: 'City', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true, },
]

export var appointmentColumns: TableColumn[] = [
    // { key: "patientName", label: "Patient Name"},
    { key: "doctorName", label: "Doctor Name" },
    { key: "specialization", label: "Specialization" },
    { key: "consultancyFees", label: "Consultancy Fees" },
    { key: "appointmentDate", label: "Appointment Date" },
    { key: "appointmentTime", label: "Appointment Time" },
    // { key: "creationDate", label: "Creation Date"},
    {
        key: "currentStatus",
        label: "Current Status",
        type: 'badge',
        tagColors: {
            Active: { bg: '#dbeafe', text: '#1e40af' },
            Completed: { bg: '#d1fae5', text: '#065f46' },
            Cancelled: { bg: '#fee2e2', text: '#991b1b' },
        }
    }
];
