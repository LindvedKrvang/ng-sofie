import { Injectable } from '@angular/core';

const WEBSOCKET_URL: string = 'ws://localhost:3006/?token=abc123'

@Injectable()
export class RundownEventService {

  listenForRundownEvents(rundownId: string, onEvent: (event: any) => void): WebSocket {
    const webSocket = new WebSocket(WEBSOCKET_URL)
    webSocket.onopen = (event) => {
      console.log(`Connected to Socket!`)
      console.log(event)
      webSocket.send('startListening-angularFrontend')
    }

    webSocket.onerror = (event) => {
      console.log(`Error happened`)
      console.log(event)
    }

    webSocket.onmessage = (event) => {
      console.log(`Message received`)
      console.log(event)
      onEvent(JSON.parse(event.data))
    }

    webSocket.onclose= (event) => {
      // TODO: Setup 'framework' to reconnect if connection is lost
      console.log(`Socket closed`)
      console.log(event)
    }

    return webSocket
  }
}
