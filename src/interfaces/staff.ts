import { IBase } from "./base_interface";
import { IRole } from "./role";

export interface IStaff extends IBase{
    image:          string;
    fullname:      string;
    email:          string;
    phone:          number;
    date_of_birth:  Date;
    gender:         string;
    bio:            string;
    address:        string;
    passport_seria: string;
    staff_type:     string;
    is_block:       boolean;
    department_id:  string;
    role_id:        string;

    role: IRole
} 
