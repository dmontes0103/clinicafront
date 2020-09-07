import { Component, OnInit } from '@angular/core';
import { IPatient } from '../models/patient';
import { RegistryService } from '../services/registry.service';
import { NgForm, FormGroup, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  patient = {} as IPatient;

  patientForm: FormGroup;

  constructor(private registryServ:RegistryService, private formBuilder: FormBuilder) {
    this.patientForm = this.formBuilder.group(
      {      
        password: ['', Validators.required],
      }
    )
   }

   get registryForm(){
     return this.patientForm.controls;
   }

  ngOnInit(): void {    
    
  }

  onFormSubmit(){
    //this.patient = new Patient();
    this.patient.admin = false;
    this.patient.id =  this.patientForm.controls['id'].value;    
    this.patient.name =  this.patientForm.controls['name'].value;    
    this.patient.lastname =  this.patientForm.controls['lastname'].value;
    this.patient.password =  this.patientForm.controls['password'].value;
    this.patient.phone =  this.patientForm.controls['phone'].value;
    this.patient.sex =  this.patientForm.controls['sex'].value;
    
    this.registryServ.registerPatient(this.patient).subscribe(
      response =>{
        console.log("Response:"+response.body);
        console.log("Code:"+ response.status);
      }
    )
    this.patientForm.reset();
    //console.log(this.patient);
  }

}