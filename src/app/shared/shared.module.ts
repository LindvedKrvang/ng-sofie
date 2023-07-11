import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar'
import {MockRundownEventService} from './mocks/mock.rundown-event.service';
import {RundownEventServiceInterface} from './interfaces/rundown-event-service-interface';
import {HttpErrorService} from './services/http-error.service';
import {RundownEventService} from './services/rundown-event.service';

const rundownEventService: RundownEventServiceInterface = new MockRundownEventService()

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    HttpErrorService,
    { provide: RundownEventService, useValue: rundownEventService },
    { provide: MockRundownEventService, useValue: rundownEventService },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, verticalPosition: 'top' } }
  ]
})
export class SharedModule { }
