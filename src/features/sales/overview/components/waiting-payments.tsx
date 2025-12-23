import { CardStatistic } from "./card-statistic";
import { useWaitingPaymentsQuery } from "../hooks/use-waiting-payments-query";

export function WaitingPayments() {
    const { data: waitingPayments } = useWaitingPaymentsQuery()
    return (
        <CardStatistic
            title='Menunggu Pembayaran'
            value={waitingPayments?.value}
            count={waitingPayments?.count}
            trend={waitingPayments?.trend}
        />
    )
}