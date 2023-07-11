import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RundownPlaylistsComponent} from './components/rundown-playlists/rundown-playlists.component';
import {RundownPlaylistService} from './services/rundown-playlist.service';
import {MockRundownPlaylistService} from './mocks/mock.rundown-playlist.service';


@NgModule({
  declarations: [
    RundownPlaylistsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    { provide: RundownPlaylistService, useClass: MockRundownPlaylistService }
  ]
})
export class RundownPlaylistModule { }
