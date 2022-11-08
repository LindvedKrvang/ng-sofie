import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceOverviewComponent } from './device/components/device-overview/device-overview.component'
import { HomeOverviewComponent } from './home/components/home-overview/home-overview.component'

export enum Paths {
  HOME = '',
  DEVICES = 'devices'
}

const routes: Routes = [
  {
    path: Paths.HOME, component: HomeOverviewComponent
  },
  {
    path: Paths.DEVICES, component: DeviceOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
