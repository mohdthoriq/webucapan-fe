import { useTotalPaymentsQuery } from "../hooks/use-total-payments-query"
import { CardStatistic } from "./card-statistic";

export function PaymentsReceived() {
    const { data: paymentsReceived } = useTotalPaymentsQuery()
    return (
        <CardStatistic
            title='Pembayaran Diterima'
            value={paymentsReceived?.value}
            count={paymentsReceived?.count}
            trend={paymentsReceived?.trend}
        />
    )
}