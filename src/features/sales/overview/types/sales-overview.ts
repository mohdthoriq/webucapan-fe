export enum Direction {
    Up = 'up',
    Down = 'down',
    Neutral = 'neutral'
}

export interface Trend {
    percentage: number
    direction: Direction
    comparison_text: string
}

export interface ChartData {
    label: string
    value: number
    value2: number
}

export interface TotalSales {
    value: number
    count: number
    trend: Trend
    chart_data: ChartData[]
}

export interface PaymentReceived {
    value: number
    count: number
    trend: Trend
    chart_data: ChartData[]
}

export interface WaitingPayments {
    value: number
    count: number
    trend: Trend
}