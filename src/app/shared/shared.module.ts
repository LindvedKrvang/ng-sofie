import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpErrorService } from './service/http-error.service'
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar'
import {RundownService} from './service/rundown.service';
import {MockRundownService} from './service/mocks/mock.rundown.service';
import {RundownEventService} from './service/rundown-event.service';
import {MockRundownEventService} from './service/mocks/mock.rundown-event.service';
import {RundownEventServiceInterface} from './interfaces/rundown-event-service-interface';

const rundownEventService: RundownEventServiceInterface = new MockRundownEventService()

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    HttpErrorService,
    { provide: RundownService, useClass: MockRundownService },
    { provide: RundownEventService, useValue: rundownEventService },
    { provide: MockRundownEventService, useValue: rundownEventService },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, verticalPosition: 'top' } }
  ]
})
export class SharedModule { }
