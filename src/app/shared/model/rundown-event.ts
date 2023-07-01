import { RundownEventType } from './rundown-event-type'
import { AdLibPiece } from './ad-lib-piece'

export interface RundownEvent {
  type: RundownEventType
  rundownId: string
  segmentId: string
  partId: string
}

export interface AdLibPieceInsertedRundownEvent extends RundownEvent {
  type: RundownEventType.AD_LIB_PIECE_INSERTED,
  adLibPiece: AdLibPiece
}
