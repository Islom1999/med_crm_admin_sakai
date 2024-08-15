import { IBase } from "./base_interface";

export interface IServices extends IBase{
    name:       string;
    desc:       string;
    amount:     number;
    duration:   number;
    type:       string;
    staff_id:   string;
} 