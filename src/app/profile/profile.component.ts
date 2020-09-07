import { Component, OnInit } from '@angular/core';
import { IPatient } from '../models/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  patient = { } as IPatient;

  constructor(private patientService:PatientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit(){
    this.route.queryParams.subscribe((params) => {
      this.patient.id = +this.route.snapshot.paramMap.get('id');
      this.loadPatientInfo(this.patient.id);
    })
  }

  async loadPatientInfo(id: number){         
    this.patient = await this.patientService.getPatientDetails(id)
  }

  return(){
    this.router.navigate(['dashboard', this.patient.id]);
  }

}
