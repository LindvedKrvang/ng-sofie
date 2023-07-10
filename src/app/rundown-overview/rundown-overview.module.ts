import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RundownOverviewComponent} from './components/rundown-overview/rundown-overview.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    RundownOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RundownOverviewModule { }
