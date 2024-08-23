import { AppointmentStatus } from "src/enumerations";
import { IBase } from "./base_interface";
import { IPatient } from "./patient";
import { IServices } from "./services";

export interface IAppointment extends IBase{
    date:       Date;
    status:     AppointmentStatus;     //enum
    discount:   number;
    room_id:    string;
    patient_id: string;
    staff_id:   string;

    patient: IPatient

    services: {
        service: IServices[]
    }
}   
