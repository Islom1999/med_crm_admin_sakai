import { IBase } from "./base_interface";

export interface IRoom extends IBase{
    type_id:     number;
    room_name:   string;
    is_occupied: boolean;
    parent_id:   string;
}   