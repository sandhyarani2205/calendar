import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { CalendarEventComponent } from './calendar-view/calendar-event/calendar-event.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarViewComponent,
    CalendarEventComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
