import { Component } from '@angular/core';
import { AppointmentStatusData } from 'src/enumerations';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.scss'
})
export class AppointmentDetailComponent {
  appointmentStatusData = AppointmentStatusData

}
