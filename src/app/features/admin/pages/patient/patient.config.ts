import { TableAction, TableColumn } from "../../../../shared/models/data-table.models";

export var patientColumns: TableColumn[] = [
    { key: "doctorId", label: "Doctor Id" },
    { key: "patientName", label: "Patient Name" },
    { key: "patientContactNo", label: "Patient Contact No" },
    { key: "patientEmail", label: "Patient Email" },
    { key: "patientGender", label: "Patient Gender" },
    { key: "patientAddress", label: "Patient Address" },
    { key: "patientAge", label: "Patient Age" },
    { key: "patientMedicalHistory", label: "Patient Medical History" },
];

export var patientActions: TableAction[] = [
    { id: 'view', label: 'View', icon: 'eye.svg', type: 'secondary', actionColor: 'green' },
];