import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "../../service/admin.service";
import { AppointmentResponse, MedicalHistoryResponse, PatientResponse } from "../../models/admin.model";

import { appointmentColumns, appointmentActions, reportActions, reportColumns } from "./patient-details.config"
import { formatDate } from "@angular/common";

@Component({
    selector: 'doctor-patient-details',
    standalone: false,
    templateUrl: 'patient-details.component.html'
})

export class PatientDetails {
    // TODO: implement the user edit and delete features using user endpoint (not patient)
    // show as user doesnt exist anymore if deleted

    patientId: number = 0;

    private readonly adminService = inject(AdminService);

    patientDetails = signal<PatientResponse | null>(null)
    patientMedicalHistory = signal<MedicalHistoryResponse[]>([]);
    patientAppointmentHistory = signal<AppointmentResponse[]>([]);

    loading = signal(false);
    error = signal<string | null>(null);

    constructor(private route: ActivatedRoute) { }

    appointmentColumns = appointmentColumns;
    appointmentActions = appointmentActions;
    reportColumns = reportColumns;
    reportActions = reportActions;

    ngOnInit(): void {
        this.patientId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadPatientDetails()
        this.loadMedicalHistory()
        this.loadAppointmentHistory()
    }

    loadPatientDetails() {
        this.loading.set(true);
        this.error.set(null);

        this.adminService.getPatientById(this.patientId).subscribe({
            next: (data) => {
                const formattedData = {
                    ...data,
                    creationDate: formatDate(data.creationDate, 'dd-MM-yyyy - HH:mm', 'en-US'),
                    // creationDate: new Date(data.creationDate).toLocaleDateString(),

                    updationDate: data.updationDate
                        ? formatDate(data.updationDate, 'dd-MM-yyyy - HH:mm', 'en-US')
                        : 'N/A'
                    // updationDate: new Date(data.updationDate).toLocaleDateString(),
                };
                this.patientDetails.set(formattedData);
                console.log(formattedData)
                this.loading.set(false);
            },
            error: () => {
                this.error.set('Failed to Load PatientDetails');
                this.loading.set(false);
            },
        });
    }

    loadMedicalHistory() {
        this.loading.set(true);
        this.error.set(null);

        this.adminService.getMedicalHistory(this.patientId).subscribe({
            next: (data) => {
                this.patientMedicalHistory.set(data);
                console.log(data)
                this.loading.set(false);
            },
            error: () => {
                this.error.set('Failed to Load Medical History');
                this.loading.set(false);
            },
        });
    }

    loadAppointmentHistory() {
        this.loading.set(true);
        this.error.set(null);

        console.log(this.patientId)

        this.adminService.getAppointmentHistory(this.patientId.toString()).subscribe({
            next: (data) => {
                this.patientAppointmentHistory.set(data);
                console.log(data)
                this.loading.set(false);
            },
            error: (msg) => {
                this.error.set('Failed to Load Appointment History');
                console.log(msg)
                this.loading.set(false);
            },
        });
    }
}