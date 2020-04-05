import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CalenderEvent, CollisionGroup } from '../models';
let CalendarViewComponent = class CalendarViewComponent {
    constructor() {
        this.startTime = 9;
        this.endTime = 21;
        this.timeArray = [];
        this.counter = this.startTime;
        this.groupArray = [];
        this.input = [{ start: 30, end: 150 }, { start: 540, end: 600 }, { start: 560, end: 620 }, { start: 610, end: 670 }];
        this.metrics = [];
        this.containerWidth = 600;
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
            this.calculateEvent(event);
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
    layOutDay(input) {
        const eventArray = [];
        let count = 0;
        input.forEach(element => {
            let event = new CalenderEvent();
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
     * A container is devided into parts according to count of events in input list
     * This methods initialize all the rows and colums to null.
     */
    initializeMetrics() {
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
    calculateMatrics(event) {
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
    getOccupiedRows(rowId) {
        let row = this.metrics[rowId];
        let count = 0;
        while (row[count] != null) {
            count += 1;
        }
        return count;
    }
    /**
     * @description
     * A method creates a collision group array and adds each collision
     * Event to the it's own group
     * @param : 'event1, event2' are the two events collide in same rows
     */
    addToGroup(event1, event2) {
        let group = event2.group;
        if (!group) {
            group = new CollisionGroup();
            group.addToGroup(event2);
            event2.group = group;
            this.groupArray.push(group);
        }
        event1.group = group;
        group.addToGroup(event1);
    }
    /**
     * @description
     * A method to check the available row in the matrix
     */
    calculateCollisionGroupWidth() {
        this.groupArray.forEach((collGroup) => {
            let max = 0;
            collGroup.group.forEach((event) => {
                let occupiedRows = this.getMaxOccupiedRows(event);
                max = Math.max(max, occupiedRows);
            });
            collGroup.maxOccupiedRows = max;
        });
    }
    getMaxOccupiedRows(event) {
        let max = 0;
        for (let i = event.start_y; i < event.end_y; i++) {
            let occupiedRows = this.getOccupiedRows(i);
            max = Math.max(max, occupiedRows);
        }
        return max;
    }
    calculateEvent(event) {
        let segments = 1;
        if (event.group) {
            segments = event.group.maxOccupiedRows;
        }
        event.segments = segments;
        event.width = this.containerWidth / segments;
        event.start_x = event.width * event.position;
        event.end_x = (event.position + 1) * event.width;
    }
    calculateTimelabel(startTime, endTime) {
        let counter = 0;
        for (let index = startTime; index <= endTime; index++) {
            if (index > 12) {
                this.timeObject = { unit: 'PM', value: (index % 12) };
                this.timeArray.push(this.timeObject);
            }
            else {
                this.timeObject = { unit: 'AM', value: index };
                this.timeArray.push(this.timeObject);
            }
            if (counter % 12 === 0) {
                counter = 0;
            }
            else {
                counter++;
            }
        }
    }
};
CalendarViewComponent = tslib_1.__decorate([
    Component({
        selector: 'app-calendar-view',
        templateUrl: './calendar-view.component.html',
        styleUrls: ['./calendar-view.component.scss']
    })
], CalendarViewComponent);
export { CalendarViewComponent };
//# sourceMappingURL=calendar-view.component.js.map