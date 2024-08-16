import { IBase } from "./base_interface";
import { IRole } from "./role";

export interface IStaff extends IBase{
    image:           string;
    fullname:        string;
    gender:          string;
    pinfl:           string;
    series_document: string;
    nationality:     string;
    phone:           number;
    email:           string;
    address:         string;
    date_of_birth:   Date;
    bio:             string;
    staff_type:      string;
    is_block:        boolean;
    department_id:   string;
    role_id:         string;

    role: IRole
} 
