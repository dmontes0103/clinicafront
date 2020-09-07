import { IPatient } from './patient';
import { IAppointmentArea } from './appointmentarea';

export interface IAppointment {
    $id: string;
    appointment_area: IAppointmentArea;
    patient: IPatient;
    id: number;
    p_id: number;
    a_date: Date;
    area_id: number;
}