import { TableAction, TableColumn } from "../../../../shared/models/data-table.models";
import { FieldOption, FormField, ModalConfig } from "../../../../shared/models/form.models";
import { AppointmentResponse } from "../../../admin/models/admin.model";

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

export var appointmentActions: TableAction[] = [
    { id: 'cancel', label: 'Cancel', icon: 'close.svg', type: 'danger', actionColor: 'red' },
];

// export var appointmentModalConfig: ModalConfig = {
//     title: 'Add Appointment',
//     submitButtonText: 'Save Details',
//     cancelButtonText: 'Cancel',
//     size: 'medium',
//     mode: 'create',
// };

// export var appointmentModalFields: FormField[] = [
//     { key: 'patientName', label: 'Patient Name', type: 'text', required: true },
//     { key: 'doctor', label: 'Doctor Name', type: 'text', required: true },
//     { key: 'date', label: 'Appointment Date', type: 'date', required: true },
//     { key: 'time', label: 'Appointment Time', type: 'time', required: true },
//     {
//         key: 'status', label: 'Status', type: 'select', required: true,
//         options: [
//             { label: 'Scheduled', value: 'Scheduled' },
//             { label: 'Completed', value: 'Completed' },
//             { label: 'Cancelled', value: 'Cancelled' },
//         ],
//     },
// ];

export function buildAppointmentFields( doctorFieldOptions:FieldOption[],source?: Partial<AppointmentResponse>): FormField[] {
  return [
    {
      key: 'doctorId',
      label: 'Doctor Name',
      type: 'select',
      value: source?.doctorName ?? '',
      required: true,
      options: doctorFieldOptions
    },
    {
      key: 'appointmentDate',
      label: 'Appt. Date',
      type: 'date',
      value: source?.appointmentDate ?? '',
      placeholder: 'date',
      required: true,
    },
    {
      key: 'appointmentTime',
      label: 'Appt. Time',
      type: 'time',
      value: source?.appointmentDate ?? '',
      placeholder: 'time',
      required: true,
    },
    {
      key: 'consultancyFees',
      label: 'Consultancy Fees',
      type: 'number',
      value: source?.consultancyFees ?? '',
      placeholder: '100',
      required: true,
    },
  ];
}