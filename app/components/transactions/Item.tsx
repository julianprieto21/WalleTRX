import { Transaction } from "@/app/lib/types";
import Card from "@/app/components/Card";
import { formatBalance } from "@/app/lib/utils";

interface Props {
  transaction: Transaction;
}

export default function Item({ transaction }: Props) {
  return (
    <Card title={transaction.description} style="w-3/4 h-36">
      <>
        <strong>{formatBalance(transaction.amount / 100)}</strong>
      </>
    </Card>
  );
}
