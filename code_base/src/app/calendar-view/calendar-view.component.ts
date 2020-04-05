import { Component, OnInit } from '@angular/core';
import { CalenderEvent, CollisionGroup, TimeData, InputEventData } from '../calendar.models';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  startTime = 9;
  endTime = 21;
  timeObject: TimeData;
  timeArray = [];
  counter = this.startTime;
  groupArray: CollisionGroup[] = [];
  input: InputEventData[] = [{ start: 30, end: 150 }, { start: 540, end: 600 }, { start: 560, end: 620 }, { start: 610, end: 670 }];
  metrics: CalenderEvent[][] = [];
  containerWidth = 600;
  eventArr: CalenderEvent[];


  constructor() {
  }

  ngOnInit() {
    this.calculateTimelabel(this.startTime, this.endTime);
    this.eventArr = this.layOutDay(this.input);
    this.initializeMetrics();
    this.eventArr.forEach(event => {
      this.calculateMatrics(event);
    });
    this.calculateCollisionGroupWidth();
    this.eventArr.forEach(event => {
      this.calculateEventFinalMatrix(event);
    });
  }

  /**
   * @description
   * A method goes through all list of events.
   * And creates draft version of each event to be placed in the container
   * Which includes start point, end point, height, segments and position
   * @param : 'input' represents given calendar event array
   * @returns :  Calculted events array of objects with initial values 
   */
  layOutDay(input: InputEventData[]): CalenderEvent[] {
    const eventArray: CalenderEvent[] = [];
    let count = 0;
    input.forEach(element => {
      let event: CalenderEvent = new CalenderEvent();
      event.id = count;
      count += 1;
      event.start_y = element.start;
      event.end_y = element.end;
      event.height = event.end_y - event.start_y;
      event.segments = 0;
      eventArray.push(event);
    });
    return eventArray;
  }

  /**
   * @description
   * A container is devided into total height(rows) * lenght of input events array(column),
   * This methods initialize all the rows and colums to null.
   */
  private initializeMetrics(): void {
    for (let i = 0; i < 720; i++) {
      this.metrics[i] = [];
      for (let j = 0; j < this.input.length; j++) {
        this.metrics[i][j] = null;
      }
    }
  }

  /**
   * @description
   * A method calculates available position for a single event in the container
   * By checking the availability of place in the matrix.
   * It calls addToGroup function to groups all the collision events together
   * Which includes start point, end point, height, segments and position
   * @param : 'event' represents single event which has a initial value calculated at first step
   */
  private calculateMatrics(event: CalenderEvent): void {
    const head = event.start_y;
    let position = 0;
    position = this.getOccupiedRows(head);
    event.position = position;
    if (position != 0) {
      let previousElement = this.metrics[head][position - 1];
      this.addToGroup(event, previousElement);
    }
    if (position != this.input.length - 1 && this.metrics[head][position + 1]) {
      let next = this.metrics[head][position + 1];
      this.addToGroup(event, next);
    }
    for (let i = head; i < head + event.height; i++) {
      this.metrics[i][position] = event;
    }
  }

  /**
   * @description
   * A helper method to check the available row in the matrix
   * @param : 'rowId' represents start of event from y-axis.
   */
  private getOccupiedRows(rowId: number): number {
    let row = this.metrics[rowId];
    let count = 0;
    while (row[count] != null) {
      count += 1
    }
    return count;
  }

  /**
   * @description
   * A method creates a collision group array and adds each collision
   * Event to the it's own group
   * @param : 'event1, event2' are the two events collide in same rows
   */
  private addToGroup(event1: CalenderEvent, event2: CalenderEvent): void {
    let group = event2.group;
    if (!group) {
      group = new CollisionGroup()
      group.addToGroup(event2);
      event2.group = group;
      this.groupArray.push(group);
    }
    event1.group = group;
    group.addToGroup(event1);
  }

  /**
   * @description
   * A method assigns a value for the maxOccupiedRows, which is a count of events columns in that row
   * This maxOccupiedRows value determines width of the each event in perticular row
   * Because if there are collision between events then all the collision events 
   * should have same width
   */
  private calculateCollisionGroupWidth(): void {
    this.groupArray.forEach((collGroup: CollisionGroup) => {
      let max = 0;
      collGroup.group.forEach((event: CalenderEvent) => {
        let occupiedRows = this.getMaxOccupiedRows(event);
        max = Math.max(max, occupiedRows);
      });
      collGroup.maxOccupiedRows = max;
    })
  }

   /**
   * @description
   * A method gives how may colums are occupied in a perticular row of each event
   * @param : 'event' A single event which has all properties as CalenderEvent
   */
  private getMaxOccupiedRows(event: CalenderEvent): number {
    let max = 0;
    for (let i = event.start_y; i < event.end_y; i++) {
      let occupiedRows = this.getOccupiedRows(i);
      max = Math.max(max, occupiedRows);
    }
    return max;
  }

  /**
   * @description
   * A method calculates width, start and end point for the container of each event
   * If for the event maxOccupiedRows is only one, then it takes whole width of the container
   * If maxOccupiedRows in more than one, then width is devided equally.
   * @param : 'event' A single event which has all properties as CalenderEvent
   */
  private calculateEventFinalMatrix(event: CalenderEvent): void {
    let segments = 1;
    if (event.group) {
      segments = event.group.maxOccupiedRows;
    }
    event.segments = segments;
    event.width = this.containerWidth / segments;
    event.start_x = event.width * event.position;
    event.end_x = (event.position + 1) * event.width;
  }

  /**
   * @description
   * A method calculates time label for the container
   * counter is used to toggle between AM and PM change
   * @param : 'startTime' A time for the event to be initiated
   * @param : 'endTime' End of time in a day for the event to be completed
   */
  private calculateTimelabel(startTime: number, endTime: number): void {
    let counter = 0;
    for (let index = startTime; index <= endTime; index++) {
      if (index > 12) {
        this.timeObject = { unit: 'PM', value: (index % 12) };
        this.timeArray.push(this.timeObject);
      } else {
        this.timeObject = { unit: 'AM', value: index };
        this.timeArray.push(this.timeObject);
      }
      if (counter % 12 === 0) {
        counter = 0;
      } else {
        counter++;
      }
    }
  }

}
