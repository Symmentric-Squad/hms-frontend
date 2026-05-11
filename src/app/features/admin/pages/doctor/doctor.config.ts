import { TableAction, TableColumn } from "../../../../shared/models/data-table.models";


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
    // { id: 'view', label: 'View', icon: 'eye.svg', type: 'secondary', actionColor: 'gray' },
    { id: 'edit', label: 'Edit', icon: 'edit.svg', type: 'primary', actionColor: 'blue' },
    { id: 'delete', label: 'Delete', icon: 'trash.svg', type: 'danger', actionColor: 'red' }
];
