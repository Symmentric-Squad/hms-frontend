import { TableAction, TableColumn } from "../../../../shared/models/data-table.models";
import { FormField, ModalConfig } from "../../../../shared/models/form.models";

export var patientColumns: TableColumn[] = [
    { key: "doctorId", label: "Doctor Id" },
    { key: "patientName", label: "Patient Name" },
    // { key: "patientContactNo", label: "Patient Contact No" },
    // { key: "patientEmail", label: "Patient Email" },
    { key: "patientGender", label: "Patient Gender" },
    // { key: "patientAddress", label: "Patient Address" },
    { key: "patientAge", label: "Patient Age" },
    { key: "patientMedicalHistory", label: "Patient Medical History" },
    // { key: "creationDate", label: "Creation Date" },
    // { key: "updationDate", label: "Updation Date" }
    // {
    //   key: 'status',
    //   label: 'Status',
    //   type: 'badge',
    //   tagColors: {
    //     'Admitted': { bg: '#d1fae5', text: '#065f46' },
    //     'Discharged': { bg: '#fef3c7', text: '#92400e' },
    //   },
    // },
];

export var patientActions: TableAction[] = [
    { id: 'view', label: 'View', icon: 'eye.svg', type: 'secondary', actionColor: 'green' },
    // { id: 'edit', label: 'Edit', icon: 'edit.svg', type: 'primary', actionColor: 'blue'},
    // { id: 'delete', label: 'Delete', icon: 'trash.svg', type: 'danger', actionColor: 'red'}
];

export var patientModalConfig: ModalConfig = {
    title: 'Add Patient',
    submitButtonText: 'Save Patient',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
}

export var patientModalFields: FormField[] = [
    { key: "fullName", label: "fullName", type: 'text', required: true },
    { key: "email", label: "email", type: 'email', required: true },
    { key: "password", label: "password", type: 'text', required: true },
    { key: "gender", label: "gender", type: 'text', required: true },
    { key: "address", label: "address", type: 'text', required: true },
    { key: "city", label: "city", type: 'text', required: true }
]