import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { appointmentColumns, appointmentActions, reportActions, reportColumns } from "./patient-details.config"
import { formatDate } from "@angular/common";
import { DoctorService } from "../../service/doctor.service";
import { AppointmentResponse, MedicalHistoryResponse, PatientResponse } from "../../models/doctor.model";

@Component({
    selector: 'doctor-patient-details',
    standalone: false,
    template: `
    <h1 class="text-2xl">Details of {{patientDetails()?.patientName}}</h1>

    <div class="w-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm p-4">
        <!-- Header -->
        <div class="px-8 py-5 border-b border-gray-200 bg-white">
            <div class="flex justify-between items-end">
            <div>
                <h2 class="text-2xl font-light text-gray-800 uppercase tracking-tight">Patient Record</h2>
                <p class="text-sm text-gray-500">Doctor ID: {{patientDetails()?.doctorId}}</p>
            </div>
            <div class="text-right text-xs text-gray-400">
                <p>Created: {{patientDetails()?.creationDate}}</p>
                <p>Last Updated: {{patientDetails()?.updationDate}}</p>
            </div>
            </div>
        </div>

        <!-- Content Body -->
        <div class="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <!-- Primary Info -->
            <div class="md:col-span-1 space-y-4">
            <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase">Full Name</label>
                <p class="text-lg font-medium text-gray-900">{{patientDetails()?.patientName}}</p>
            </div>
            <div class="flex gap-10">
                <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase">Age</label>
                <p class="text-gray-700">{{patientDetails()?.patientAge}} Years</p>
                </div>
                <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase">Gender</label>
                <p class="text-gray-700 capitalize">{{patientDetails()?.patientGender}}</p>
                </div>
            </div>
            </div>

            <!-- Contact Info -->
            <div class="md:col-span-1 space-y-4 border-l border-gray-200 pl-8">
            <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase">Contact Number</label>
                <p class="text-gray-700">{{patientDetails()?.patientContactNo}}</p>
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase">Email Address</label>
                <p class="text-gray-700">{{patientDetails()?.patientEmail}}</p>
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase">Residential Address</label>
                <p class="text-gray-700 leading-relaxed">{{patientDetails()?.patientAddress}}</p>
            </div>
            </div>

            <!-- Medical History -->
            <div class="md:col-span-1 bg-white p-5 rounded border border-gray-200">
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Medical History</label>
            <p class="text-gray-600 text-sm leading-relaxed italic">
                {{patientDetails()?.patientMedicalHistory || 'No medical history recorded.'}}
            </p>
            </div>

        </div>
    </div>

    <div class="flex w-full gap-4 pt-4">
        <div class="flex-1">
            <app-data-table 
            [columns]="appointmentColumns" 
            [data]="patientAppointmentHistory()" 
            [actions]="appointmentActions"
            [emptyStateMessage]="'No appointments found'">
            </app-data-table>
        </div>

        <div class="flex-1">
            <app-data-table 
            [columns]="reportColumns" 
            [data]="patientMedicalHistory()" 
            [actions]="reportActions"
            [emptyStateMessage]="'No Medical History found'">
            </app-data-table>
        </div>
    </div>
    `
})

export class PatientDetails {
    patientId: number = 0;

    private readonly doctorService = inject(DoctorService);

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

        this.doctorService.getPatientById(this.patientId).subscribe({
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

        this.doctorService.getMedicalHistory(this.patientId).subscribe({
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

        this.doctorService.getAppointmentHistory(this.patientId.toString()).subscribe({
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