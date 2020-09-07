import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { IAppointment } from '../models/appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatient } from '../models/patient';
import { AppointmentService } from '../services/appointment.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-newappointment',
  templateUrl: './newappointment.component.html',
  styleUrls: ['./newappointment.component.css']
})
export class NewappointmentComponent implements OnInit {

  URL = "https://localhost:44336/api/appointments";
  appointmntForm: FormGroup;
  appointment = {} as IAppointment;
  patient = {} as IPatient;
  operationsMessage:string;
  defDate: string;
  completeDate: Date;

  constructor(private router: Router, private formBuilder: FormBuilder,private route: ActivatedRoute, private appointmentService: AppointmentService, private httpClient: HttpClient) {}

  ngOnInit(): void {    
    this.route.queryParams.subscribe((params) => {
      this.patient.id = +this.route.snapshot.paramMap.get('id');
      console.log("Patient id is:", this.patient.id);
    });     

    this.appointmntForm = this.formBuilder.group(
      {
        Date: ['', Validators.required],
        A_Area: [1, Validators.required],
      }
    )
  }

  onFormSubmit(){
    this.appointment.p_id = +this.patient.id;
    this.appointment.area_id =  +this.appointmntForm.controls['A_Area'].value;        
    this.appointment.a_date =  this.appointmntForm.controls['Date'].value;
    //console.log(this.appointment);
    this.appointmentService.createAppointment(this.appointment).subscribe( 
      data => {  
      console.log(data); 
      this.router.navigate(['dashboard/',this.appointment.p_id]);
      },
      error =>{ 
        console.log("Error in NewAppS:", error);
        this.operationsMessage = "You cannot request an Appointment on the same day"
    }
    )
  }

  returnToDashBoard(){
    this.router.navigate(['dashboard/',this.patient.id]);
  }

}
