import { async, TestBed } from '@angular/core/testing';
import { CalendarEventComponent } from './calendar-event.component';
describe('CalendarEventComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarEventComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=calendar-event.component.spec.js.map