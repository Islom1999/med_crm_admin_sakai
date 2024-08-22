import { IBase } from "./base_interface";
import { IPriceList } from "./price_list";

export interface IServices extends IBase{
    name:       string;
    desc:       string;
    price:      number;
    duration:   number;
    type:       string;
    staff_id:   string;

    price_list: IPriceList[]
} 