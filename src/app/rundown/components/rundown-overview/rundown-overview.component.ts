import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { RundownService } from '../../services/rundown.service'
import { Rundown } from '../../../shared/model/rundown'
import { Paths } from '../../../app-routing.module'

@Component({
  selector: 'sofie-rundown-overview',
  templateUrl: './rundown-overview.component.html',
  styleUrls: ['./rundown-overview.component.scss']
})
export class RundownOverviewComponent implements OnInit {

  public rundowns: Rundown[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rundownService: RundownService
  ) { }

  ngOnInit(): void {
    this.rundownService.fetchRundowns().subscribe(rundowns => {
      this.rundowns = rundowns
    })
  }

  navigateToRundown(rundown: Rundown): void {
    this.router.navigate([Paths.RUNDOWNS, rundown.id])
  }
}
