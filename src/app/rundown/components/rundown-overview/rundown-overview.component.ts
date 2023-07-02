import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RundownService } from '../../services/rundown.service'
import { Paths } from '../../../app-routing.module'
import { Identifier } from '../../../shared/model/identifier'

@Component({
  selector: 'sofie-rundown-overview',
  templateUrl: './rundown-overview.component.html',
  styleUrls: ['./rundown-overview.component.scss']
})
export class RundownOverviewComponent implements OnInit {

  public rundownIdentifiers: Identifier[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rundownService: RundownService
  ) { }

  public ngOnInit(): void {
    this.rundownService.fetchRundownIdentifiers().subscribe((rundownIdentifiers: Identifier[]) => {
      this.rundownIdentifiers = rundownIdentifiers
    })
  }

  public navigateToRundown(rundownIdentifier: Identifier): void {
    this.router.navigate([Paths.RUNDOWNS, rundownIdentifier.id])
  }
}
