import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'doctor-patient-details',
    template: `<h1 class="text-2xl">Patient Details of {{patientId}}</h1>`
})

export class PatientDetails{
    patientId: string | null = null;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.patientId = this.route.snapshot.paramMap.get('id');
        
        // OR subscribe if the user might navigate from one patient to another
        // this.route.paramMap.subscribe(params => {
        //   this.patientId = params.get('id');
        // });
    }
}