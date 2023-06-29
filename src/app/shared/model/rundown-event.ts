import { RundownEventType } from './rundown-event-type'

export interface RundownEvent {
  type: RundownEventType
  rundownId: string
  segmentId: string
  partId: string
}
