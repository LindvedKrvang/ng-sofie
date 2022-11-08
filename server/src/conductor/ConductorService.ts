import { Conductor } from '@tv2media/timeline-state-resolver'

export class ConductorService {

    private conductor: Conductor

    constructor() {
        this.initializeConductor()
    }

    private initializeConductor(): void {
        this.conductor = new Conductor()

        this.conductor.on('error', args => {
            console.log(`Conductor: Error was emitted - ${args}`)
        })

        this.conductor.on('info', args => {
            console.log(`Conductor: Info was emitted - ${args}`)
        })

        this.conductor.on('warning', args => {
            console.log(`Conductor: Warning was emitted - ${args}`)
        })

        this.conductor.on('debug', args => {
            console.log(`Conductor: Debug was emitted - ${args}`)
        })

        this.conductor.on('setTimelineTriggerTime', args => {
            console.log(`Conductor: SetTimelineTriggerTime was emitted - ${args}`)
        })

        this.conductor.on('timelineCallback', args => {
            console.log(`Conductor: TimelineCallback was emitted - ${args}`)
        })

        this.conductor.on('resolveDone', args => {
            console.log(`Conductor: ResolveDone was emitted - ${args}`)
        })

        this.conductor.on('timeTrace', args => {
            console.log(`Conductor: TimeTrace was emitted - ${args}`)
        })

        this.conductor.on('statReport', args => {
            console.log(`Conductor: StatReport was emitted - ${args}`)
        })
    }
}
