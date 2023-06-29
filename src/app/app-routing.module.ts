import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RundownOverviewComponent } from './rundown/components/rundown-overview/rundown-overview.component'
import { RundownComponent } from './rundown/components/rundown/rundown.component'

export enum Paths {
  HOME = '',
  RUNDOWNS = 'rundowns'
}

const routes: Routes = [
  {
    path: Paths.HOME, component: RundownOverviewComponent
  },
  {
    path: Paths.RUNDOWNS, component: RundownOverviewComponent
  },
  {
    path: `${Paths.RUNDOWNS}/:rundownId`, component: RundownComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
