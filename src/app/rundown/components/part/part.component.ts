import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Part } from '../../../shared/model/part'

@Component({
  selector: 'sofie-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {

  @Input()
  public isRundownActive: boolean

  @Input()
  public part: Part

  @Output()
  partSelectedAsNextEvent: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  setPartAsNext(): void {
    this.partSelectedAsNextEvent.emit(this.part.id)
  }
}
