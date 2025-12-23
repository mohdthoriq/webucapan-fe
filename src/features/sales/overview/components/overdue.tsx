import { CardStatistic } from "./card-statistic";
import { useOverdueQuery } from "../hooks/use-overdue-query";

export function Overdue() {
    const { data: overdue } = useOverdueQuery()
    return (
        <CardStatistic
            title='Jatuh Tempo'
            value={overdue?.value}
            count={overdue?.count}
            trend={overdue?.trend}
        />
    )
}