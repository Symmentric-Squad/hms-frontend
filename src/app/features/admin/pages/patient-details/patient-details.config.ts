import { TableAction, TableColumn } from "../../../../shared/models/data-table.models";


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

export var appointmentActions: TableAction[] = [];

export var reportColumns: TableColumn[] = [
    // { key: "patientName", label: "Patient Name" },
    { key: "bloodPressure", label: "Blood Pressure" },
    { key: "bloodSugar", label: "Blood Sugar" },
    { key: "weight", label: "Weight" },
    { key: "temperature", label: "Temperature" },
    { key: "medicalPrescription", label: "Medical Prescription" },
    // { key: "creationDate", label: "Report Date" },
];

export var reportActions: TableAction[] = [
    // { id: 'view',   label: 'View',   icon: 'eye.svg',   type: 'secondary', actionColor: 'gray' },
    // { id: 'edit',   label: 'Edit',   icon: 'edit.svg',  type: 'primary',   actionColor: 'blue' },
    // { id: 'delete', label: 'Delete', icon: 'trash.svg', type: 'danger',    actionColor: 'red'  },
];