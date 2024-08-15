import { AppointmentStatus } from "src/enumerations";
import { IBase } from "./base_interface";

export interface IAppointment extends IBase{
    date:       Date;
    status:     AppointmentStatus;     //enum
    discount:   number;
    room_id:    string;
    patient_id: string;
    staff_id:   string;
}   
