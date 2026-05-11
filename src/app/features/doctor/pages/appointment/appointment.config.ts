import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';

// ── Table config
export var patientAppointmentColumns: TableColumn[] = [
    { key: "patientName", label: "Patient Name" },
    { key: "appointmentDate", label: "Appointment Date" },
    { key: "appointmentTime", label: "Appointment Time" },
    { key: "creationDate", label: "Creation Date" },
    { key: "currentStatus", label: "Current Status", type: 'badge',
        tagColors: {
            Active: { bg: '#dbeafe', text: '#1e40af' },
            Completed: { bg: '#d1fae5', text: '#065f46' },
            Cancelled: { bg: '#fee2e2', text: '#991b1b' },
        }
    }
];

export var patientAppointmentActions: TableAction[] = [
    { id: 'edit', label: 'Edit', icon: 'edit.svg', type: 'primary', actionColor: 'blue' },
    { id: 'cancel', label: 'Cancel', icon: 'close.svg', type: 'danger', actionColor: 'red' },
];

export var patientAppointmentModalConfig: ModalConfig = {
    title: 'Add Appointment',
    submitButtonText: 'Save Details',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
};

export var patientAppointmentModalFields: FormField[] = [
    { key: 'patientName', label: 'Patient Name', type: 'text', required: true },
    { key: 'appointmentDate', label: 'Appointment Date', type: 'date', required: true },
    { key: 'appointmentTime', label: 'Appointment Time', type: 'time', required: true },
    { key: 'currentStatus', label: 'Status', type: 'select', required: true,
        options: [
            { label: 'Scheduled', value: 'Scheduled' },
            { label: 'Completed', value: 'Completed' },
            { label: 'Cancelled', value: 'Cancelled' },
        ],
    },
];

export var patientAppointmentEditModalConfig: ModalConfig = {
    ...patientAppointmentModalConfig,
    title: 'Edit Appointment',
    submitButtonText: 'Save Changes',
};