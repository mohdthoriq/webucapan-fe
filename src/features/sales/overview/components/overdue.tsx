import { CardStatistic } from "./card-statistic";
import { useOverdueQuery } from "../hooks/use-overdue-query";
import { CardAction } from "./card-action";
import { useState } from "react";
import type { Period } from "../types/sales-overview";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

export function Overdue() {
    const [period, setPeriod] = useState<Period>('month')
    const [dateRange, setDateRange] = useState<DateRange | undefined>()

    const queryParams =
        period === 'custom' && dateRange?.from && dateRange?.to
            ? {
                date_from: format(dateRange.from, 'yyyy-MM-dd'),
                date_to: format(dateRange.to, 'yyyy-MM-dd'),
                period: 'day' as const,
            }
            : {
                date_from: '',
                date_to: '',
                period: period === 'custom' ? 'month' : period,
            }


    const handlePeriodChange = (newPeriod: Period) => {
        setPeriod(newPeriod)
        if (newPeriod !== 'custom') {
            setDateRange(undefined)
        }
    }

    const { data: overdue } = useOverdueQuery(queryParams)
    return (
        <CardStatistic
            title='Jatuh Tempo'
            value={overdue?.value}
            count={overdue?.count}
            trend={overdue?.trend}
            cardAction={<CardAction
                period={period}
                dateRange={dateRange}
                setPeriod={setPeriod}
                setDateRange={setDateRange}
                onChange={handlePeriodChange}
            />}
        />
    )
}