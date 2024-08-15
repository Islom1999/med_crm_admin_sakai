import { IBase } from "./base_interface";

export interface IPatient extends IBase{
    firstname:      string;
    lastname:       string;
    phone:          number;
    date_of_birth:  Date;
    gender:         string;
    bios:           string;
    address:        string;
    passport_seria: string;
    blood_group:    string;
}