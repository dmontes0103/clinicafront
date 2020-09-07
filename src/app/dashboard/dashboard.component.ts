import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { PatientService} from '../services/patient.service';
import { IAppointment } from '../models/appointment';
import { IPatient } from '../models/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { IAppointmentArea } from '../models/appointmentarea';
import { AreasService } from '../services/areas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pAppointments : IAppointment[] = [];
  _areasAvail: IAppointmentArea[] = [];
  public patient = {} as IPatient ;
  appointmentId:number;
  isAuthenthicated:boolean;
  transMessage: string;
  isAdmin:boolean;

  constructor(private areasS: AreasService,private router: Router,private route: ActivatedRoute, private appointmentService: AppointmentService, private patientS: PatientService, private loginService: LoginService) {        
  }

  ngOnInit(){    
    this.route.queryParams.subscribe((params) => {
      this.patient.id = +this.route.snapshot.paramMap.get('id');             
      this.getPatientApps(this.route.snapshot.paramMap.get('id'));            
    });     
  }

  async ngAfterViewInit(){
    await this.getPatientDetails(this.route.snapshot.paramMap.get('id'));
    //console.log("PATIENT:",this.patient.admin);
    this.patient.admin == true ? this.isAdmin = true : this.isAdmin = false;
    this.isAuthenthicated = this.loginService.isAuthenticated();    
    this.loadAreas();
  }

  loadAreas(){
    this.areasS.getAreas().subscribe(data => {
      this._areasAvail = data;
      console.log(data);
    })
  }

  async getPatientDetails(id){
    // this.patientS.getPatientDetails(id).subscribe( (data: IPatient ) => 
    // { 
    //   this.patient = data;      
    //   console.log("Service:",this.patient);
    //   return this.patient;
    // },
    // error =>{
    //   console.log(error);
    // }
    // );
    this.patient = await this.patientS.getPatientDetails(id);
  }

  getPatientApps(id){
    this.appointmentService.getPatientAppointments(id).subscribe( ( data: IAppointment[] )  =>{
      console.log(data)
      this.pAppointments = data;
    },
    error =>{
      console.log(error);
    })
  }

  onCancelApp(appointment){
    console.log(appointment.id);
    this.appointmentService.cancelAppointment(appointment.id).subscribe(
      response =>{
        this.transMessage = "Appointment Deleted";
        this.getPatientApps(+this.route.snapshot.paramMap.get('id'));

      },
      error =>{
        this.transMessage = "Can't cancel an appointment before 24hrs";        
      }
    )    
  }

  createNew(){
    console.log(this.patient.id);
    this.router.navigate(['new',this.patient.id]);   
  }

  logOut(){
    this.loginService.logOut();
    
  }
}
