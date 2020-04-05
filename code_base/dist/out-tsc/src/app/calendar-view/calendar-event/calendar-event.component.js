import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let CalendarEventComponent = class CalendarEventComponent {
    constructor() {
    }
};
tslib_1.__decorate([
    Input('startX')
], CalendarEventComponent.prototype, "startX", void 0);
tslib_1.__decorate([
    Input('startY')
], CalendarEventComponent.prototype, "startY", void 0);
tslib_1.__decorate([
    Input('height')
], CalendarEventComponent.prototype, "height", void 0);
tslib_1.__decorate([
    Input('width')
], CalendarEventComponent.prototype, "width", void 0);
CalendarEventComponent = tslib_1.__decorate([
    Component({
        selector: 'app-calendar-event',
        templateUrl: './calendar-event.component.html',
        styleUrls: ['./calendar-event.component.scss']
    })
], CalendarEventComponent);
export { CalendarEventComponent };
//# sourceMappingURL=calendar-event.component.js.map