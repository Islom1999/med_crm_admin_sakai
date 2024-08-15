import { SallaryType } from "src/enumerations";
import { IBase } from "./base_interface";

export interface ISallary extends IBase{
    salary_type: SallaryType;    // enum
    amount:      number;
    percentage:  number;
    date:        Date;
    staff_id:    string;
}   