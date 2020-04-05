import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})
export class CalendarEventComponent {

  @Input ('startX') startX;
  @Input('startY') startY;
  @Input('height') height;
  @Input('width') width;

  constructor() {
   }

}
