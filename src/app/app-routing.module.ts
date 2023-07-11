import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {RundownComponent} from './rundown/components/rundown/rundown.component'
import {RundownPlaylistsComponent} from './rundown-playlist/components/rundown-playlists/rundown-playlists.component';

export enum Paths {
  HOME = '',
  RUNDOWNS = 'rundowns'
}

const routes: Routes = [
  {
    path: Paths.HOME,
    component: RundownPlaylistsComponent
  },
  {
    path: Paths.RUNDOWNS,
    component: RundownPlaylistsComponent
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
