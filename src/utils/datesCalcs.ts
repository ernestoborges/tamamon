export function getDaysFromDate(date: string) {

    const from = new Date(date)
    const now = new Date()
    const difference = now.getTime() - from.getTime()

    return Math.floor(difference / (1000 * 60 * 60 * 24));
}