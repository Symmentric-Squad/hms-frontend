import { TableAction, TableColumn } from "../../../../shared/models/data-table.models"
import { FormField, ModalConfig } from "../../../../shared/models/form.models"


// ── Table config
export var specializationColumns: TableColumn[] = [
    { key: 'specialization', label: "Specialization" },
    { key: 'creationDate', label: "Created at" },
    { key: 'updationDate', label: "Updated at" },
]

export var specializationActions: TableAction[] = [
    {
        id: 'edit',
        label: 'Edit',
        icon: 'edit.svg',
        type: 'primary',
        actionColor: 'blue'
    },
]

export var specializationModalConfig: ModalConfig = {
    title: 'Edit Specialization',
    submitButtonText: 'Save Specilization',
    cancelButtonText: 'Cancel',
    size: 'small',
    mode: 'edit',
}

export var specializationModalFields: FormField[] = [
    {
        key: 'specialization',
        label: 'Specialization Name',
        type: 'text',
        required: true
    },
]