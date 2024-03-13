import { formatBalance } from "../../lib/utils";

export default function BalanceWidget({ balance }: { balance: number }) {
  const formattedBalance = formatBalance(balance / 100);
  return (
    <>
      <button
        title="Balance Widget"
        type="button"
        className="text-5xl sm:text-5xl w-[100%] text-neutral-700"
      >
        {formattedBalance}
      </button>
    </>
  );
}
