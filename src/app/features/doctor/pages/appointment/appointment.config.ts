import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { FieldOption, FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { AppointmentResponse } from '../../models/doctor.model';

// ── Table config
export var patientAppointmentColumns: TableColumn[] = [
    { key: "patientName", label: "Patient Name" },
    { key: "appointmentDate", label: "Appt. Date" },
    { key: "appointmentTime", label: "Appt. Time" },
    { key: "creationDate", label: "Creation Date" },
    {
        key: "currentStatus", label: "Status", type: 'badge',
        tagColors: {
            Active: { bg: '#dbeafe', text: '#1e40af' },
            'Cancel by Doctor': { bg: '#fee2e2', text: '#991b1b' },
            'Cancel by User': { bg: '#fee2e2', text: '#991b1b' },
        }
    }
];

export var patientAppointmentActions: TableAction[] = [
    // { id: 'edit', label: 'Edit', icon: 'edit.svg', type: 'primary', actionColor: 'blue' },
    { id: 'cancel', label: 'Cancel', icon: 'close.svg', type: 'danger', actionColor: 'red' },
];

// export var patientAppointmentModalConfig: ModalConfig = {
//     title: 'Add Appointment',
//     submitButtonText: 'Save Details',
//     cancelButtonText: 'Cancel',
//     size: 'medium',
//     mode: 'create',
// };

// export var patientAppointmentModalFields: FormField[] = [
//     { key: 'patientName', label: 'Patient Name', type: 'text', required: true },
//     { key: 'appointmentDate', label: 'Appointment Date', type: 'date', required: true },
//     { key: 'appointmentTime', label: 'Appointment Time', type: 'time', required: true },
//     {
//         key: 'currentStatus', label: 'Status', type: 'select', required: true,
//         options: [
//             { label: 'Scheduled', value: 'Scheduled' },
//             { label: 'Completed', value: 'Completed' },
//             { label: 'Cancelled', value: 'Cancelled' },
//         ],
//     },
// ];

// export var patientAppointmentEditModalConfig: ModalConfig = {
//     ...patientAppointmentModalConfig,
//     title: 'Edit Appointment',
//     submitButtonText: 'Save Changes',
// };


export function buildAppointmentFields(patientFieldOptions:FieldOption[], source?: Partial<AppointmentResponse>): FormField[] {
    console.log(patientFieldOptions);
  return [
    {
      key: 'userId',
      label: 'Patient Name',
      type: 'select',
      value: source?.patientName ?? '',
      required: true,
      options: patientFieldOptions
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