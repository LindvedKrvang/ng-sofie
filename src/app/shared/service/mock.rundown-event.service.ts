import {Injectable} from '@angular/core';
import {RundownEventServiceInterface} from './rundown-event-service-interface';

@Injectable()
export class MockRundownEventService implements RundownEventServiceInterface {

  private callback: (event: any) => void

  listenForRundownEvents(rundownId: string, onEvent: (event: any) => void): WebSocket {
    this.callback = onEvent
    return {} as WebSocket
  }

  public doMockEvent(eventData: any): void {
    this.callback(eventData)
  }
}
