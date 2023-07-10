import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpErrorService } from './service/http-error.service'
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar'
import {RundownService} from './service/rundown.service';
import {MockRundownService} from './service/mock.rundown.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    HttpErrorService,
    { provide: RundownService, useClass: MockRundownService },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, verticalPosition: 'top' } }
  ]
})
export class SharedModule { }
