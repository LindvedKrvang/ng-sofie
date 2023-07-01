import { Piece } from './piece'
import { AdLibPiece } from './ad-lib-piece'

export interface PartInterface {
  id: string
  segmentId: string
  isOnAir: boolean
  isNext: boolean
  pieces: Piece[]
}

export class Part {
  id: string
  segmentId: string
  isOnAir: boolean
  isNext: boolean
  pieces: Piece[]
  adLibPieces: AdLibPiece[]

  constructor(part: PartInterface) {
    this.id = part.id
    this.segmentId = part.segmentId
    this.isOnAir = part.isOnAir
    this.isNext = part.isNext
    this.pieces = part.pieces
    this.adLibPieces = []
  }

  putOnAir(): void {
    this.isOnAir = true
  }

  takeOffAir(): void {
    this.isOnAir = false
  }

  removeAsNextPart(): void {
    this.isNext = false
  }

  setAsNextPart(): void {
    this.isNext = true
  }

  insetAdLibPiece(adLibPiece: AdLibPiece): void {
    this.adLibPieces.push(adLibPiece)
  }
}
