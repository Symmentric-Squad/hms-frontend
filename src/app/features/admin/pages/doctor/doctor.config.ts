import { TableAction, TableColumn } from "../../../../shared/models/data-table.models";
import { FieldOption, FormField, ModalConfig } from "../../../../shared/models/form.models";
import { DoctorResponse } from "../../models/admin.model";


// Table Configuration
export var doctorColumns: TableColumn[] = [
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

export var doctorActions: TableAction[] = [
    { id: 'edit', label: 'Edit', icon: 'edit.svg', type: 'primary', actionColor: 'blue' },  
];

// export var doctorModalConfig: ModalConfig = {
//     title: 'Add Doctor',
//     submitButtonText: 'Save Doctor',
//     cancelButtonText: 'Cancel',
//     size: 'medium',
//     mode: 'create',
// }

// export var doctorModalFields: FormField[] = [
//     { key: "specializationId", label: "specializationId", type: 'text', required: true },
//     { key: "doctorName", label: "doctorName", type: 'email', required: true },
//     { key: "address", label: "address", type: 'text', required: true },
//     { key: "doctorFees", label: "doctorFees", type: 'text', required: true },
//     { key: "doctorEmail", label: "doctorEmail", type: 'text', required: true },
//     { key: "contactNo", label: "contactNo", type: 'text', required: true }
// ]

export function buildDoctorFields(specializationFieldOptions:FieldOption[],source?: Partial<DoctorResponse>): FormField[] {
  return [
    {
      key: 'name',
      label: 'Doctor Name',
      type: 'text',
      value: source?.doctorName ?? '',
      placeholder: 'Jane Doe',
      required: true,
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      value: source?.doctorEmail ?? '',
      placeholder: 'doctor@hms.in',
      required: true,
    },
    {
      key: 'specialization',
      label: 'Specialization',
      type: 'select',
      value: source?.specializationName ?? '',
      placeholder: 'Select specialization',
      required: true,
      options: specializationFieldOptions
    },
    {
      key: 'phone number',
      label: 'Phone Number',
      type: 'number',
      value: source?.contactNo ?? '',
      placeholder: '98XXXXXXXX',
      required: true,
    },
    {
      key: 'address',
      label: 'Address',
      type: 'textarea',
      value: source?.address ?? '',
      placeholder: 'Address of the Doctor',
      rows: 3,
    },
  ];
}