import { Component } from "@angular/core";
import { Specialisation, specialisations } from "../../../../shared/db/db";
import { RowActionEvent, TableAction, TableColumn } from "../../../../shared/models/data-table.models";
import { FormField, ModalConfig, ModalSubmitEvent } from "../../../../shared/models/form.models";

@Component({
    selector: 'app-admin-doc-spec',
    styleUrl: "../../../../../styles.css",
    standalone:false,
    template:`
    <div>
        <!-- Appointments Tab -->
        <div>
            <div class="section-header">
            <div>
                <h2>Manage Specialisations</h2>
                <p>Track all Specializations in hospital</p>
            </div>
            <button class="add-btn" (click)="openAddSpecialization()">+ New Appointment</button>
            </div>

            <div>
                <app-data-table [columns]="specializationColumns" [data]="specialisations" [actions]="specializationActions"
                [emptyStateMessage]="'No appointments found'"
                (actionTriggered)="onAppointmentTableAction($event)"></app-data-table>
            </div>
        </div>

        <!-- Appointment Modal -->
        @if(showSpecializationModal){
            <app-modal-form
                [config]="specializationModalConfig"
                [fields]="specializationModalFields"
                (submitted)="onSubmit($event)"
                (cancelled)="showSpecializationModal = false"
                (backdropClicked)="showSpecializationModal = false"
            >
            </app-modal-form>
        }
    </div>
    `
})

export class AdminSpecialisationPage{
    specialisations = specialisations

    specializationColumns: TableColumn[] = [
        { key: 'specialization',label: "Specialization"},
        { key: 'createdAt',label: "Created at"},
        { key: 'updatedAT',label: "Updated at"},
    ]

    specializationActions: TableAction[] = [
        // {
        //     id: 'view',
        //     label: 'View',
        //     icon: 'eye.svg',
        //     type: 'secondary',
        //     actionColor: 'gray'
        // },
        {
            id: 'edit',
            label: 'Edit',
            icon: 'edit.svg',
            type: 'primary',
            actionColor: 'blue'
        },
        // {
        //     id: 'delete',
        //     label: 'Delete',
        //     icon: 'trash.svg',
        //     type: 'danger',
        //     actionColor: 'red'
        // }
    ]

    specializationModalConfig: ModalConfig = {
        title: 'Edit Specialization',
        submitButtonText: 'Save Specilization',
        cancelButtonText: 'Cancel',
        size: 'small',
        mode: 'edit',
    }

    specializationModalFields: FormField[] = [
        {
        key: 'specialization name',
        label: 'Specialization Name',
        type: 'text',
        required:true
        },
    ]

    showSpecializationModal = false;
    editingSpecialization: Partial<Specialisation> = {};
    isEditMode = false;

    openAddSpecialization() { 
        console.log('Opening add specialization modal');
        this.isEditMode = false;
        this.showSpecializationModal = true;
    }
    openEditAppointment(s: Specialisation) {
        this.editingSpecialization = { ...s };
        this.isEditMode = true;
        this.showSpecializationModal = true;
    }

    deleteAppointment(id: number) {
        if (confirm('Cancel this appointment?')){
        this.specialisations = this.specialisations.filter(a => a.id !== id);
        }
    }

    onAppointmentTableAction(event: RowActionEvent): void {
        const { action, rowData } = event;
        if (action === 'edit') {
        this.openEditAppointment(rowData);
        } else if (action === 'cancel') {
        this.deleteAppointment(rowData.id);
        }
    }

    onSubmit(event: ModalSubmitEvent): void {
        if (!event.isValid) {
        alert('Please fill in all required fields.');
        return;
        }
        console.log('Form submitted:', event.formData);
        this.showSpecializationModal = false;
    }

}