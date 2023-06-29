import { Segment, SegmentInterface } from './segment'
import { RundownEvent } from './rundown-event'

export interface RundownInterface {
  id: string
  name: string
  isActive: boolean
  segments: SegmentInterface[]
}

export class Rundown {
  id: string
  name: string
  isActive: boolean
  segments: Segment[]

  constructor(rundown: RundownInterface) {
    this.id = rundown.id
    this.name = rundown.name
    this.isActive = rundown.isActive
    this.segments = rundown.segments.map(segment => new Segment(segment))
  }


  activate(activateEvent: RundownEvent): void {
    this.isActive = true
    const segment: Segment | undefined = this.segments.find(segment => segment.id === activateEvent.segmentId)
    if (!segment) {
      // Handle unable to activate
      return
    }
    segment.putOnAir(activateEvent)
  }

  deactivate(): void {
    this.isActive = false
    this.takeAllSegmentsOffAir()
  }

  private takeAllSegmentsOffAir(): void {
    this.segments.forEach(segment => segment.takeOffAir())
    this.segments.find(segment => segment.isNext)?.removeAsNextSegment()
  }

  takeNext(takeEvent: RundownEvent): void {
    this.takeAllSegmentsOffAir()
    const segmentToComeOnAir: Segment | undefined = this.segments.find(segment => segment.id === takeEvent.segmentId)
    if (!segmentToComeOnAir) {
      // TODO: Handle no segment
      return
    }
    segmentToComeOnAir.putOnAir(takeEvent)
  }

  setNext(setNextEvent: RundownEvent): void {
    this.segments.find(segment => segment.isNext)?.removeAsNextSegment()
    this.segments.find(segment => segment.id === setNextEvent.segmentId)?.setAsNextSegment(setNextEvent)
  }
}
