/**
 * 30 minutes service time (30min * 60minPerSec * 1000msPerSec)
 */
export const SERVICE_INTERVAL = 1800000 // 30 minutes
export const MINUTES_PER_HOUR = 60
export const SECONDS_PER_MINUTE = 60
export const SECONDS_PER_HOUR = 3600

export function formatDate(): string {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${month+1}/${day}/${year}`
}

export function msToMin(ms: number): number {
    return ms / (SECONDS_PER_MINUTE * 1000)
}

export function msToSec(ms: number): number {
    return ms / 1000
}

export function getHMS(ms: number) {
    const totalSec = msToSec(ms)
    const hours = Math.floor(totalSec / SECONDS_PER_HOUR)
    const minutes = Math.floor((totalSec - (hours * SECONDS_PER_HOUR)) / SECONDS_PER_MINUTE)
    const seconds = Math.floor(totalSec - (minutes * SECONDS_PER_MINUTE) - (hours * SECONDS_PER_HOUR))

    return { hours, minutes, seconds }
}
