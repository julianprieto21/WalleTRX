import { formatBalance } from "@lib/utils";

export function CryptoTableSkeleton() {
  return (
    <table className="w-1/2">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>24h Change</th>
          <th>Market Cap</th>
          <th>Volume</th>
          <th>Rank</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="skeleton w-20 h-6"></td>
          <td className="skeleton w-20 h-6"></td>
          <td className="skeleton w-10 h-6"></td>
          <td className="skeleton w-20 h-6"></td>
          <td className="skeleton w-30 h-6"></td>
          <td className="skeleton w-10 h-6"></td>
        </tr>
        <tr>
          <td className="skeleton w-20 h-6"></td>
          <td className="skeleton w-20 h-6"></td>
          <td className="skeleton w-10 h-6"></td>
          <td className="skeleton w-20 h-6"></td>
          <td className="skeleton w-30 h-6"></td>
          <td className="skeleton w-10 h-6"></td>
        </tr>
      </tbody>
    </table>
  );
}

export async function CryptoTable() {
  const res = await fetch("https://api.coinlore.net/api/tickers/");
  const { data, info } = await res.json();
  return (
    <table className="w-full text-sm text-left text-palette-100">
      <thead className="sticky top-0 z-10 text-sm text-palette-500 font-light uppercase bg-palette-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            24h Change
          </th>
          <th scope="col" className="px-6 py-3">
            Market Cap
          </th>
          <th scope="col" className="px-6 py-3">
            Volume
          </th>
          <th scope="col" className="px-6 py-3">
            Rank
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => {
          const color =
            item.percent_change_24h > 0 ? "text-green-400" : "text-red-400";
          return (
            <tr
              key={item.id}
              className="bg-palette-300 border-b border-palette-300"
            >
              <th className="px-6 py-4 text-palette-100/50 flex gap-2">
                <img
                  title="Cryptocurrency"
                  src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/${item.symbol.toLowerCase()}.png`}
                  className="w-5 h-5"
                />
                {item.name}
              </th>
              <td className="px-6 py-4 text-palette-100/50">
                {formatBalance(item.price_usd, "auto", "USD")}
              </td>
              <td className={`px-6 py-4 ${color}`}>
                {item.percent_change_24h} %
              </td>
              <td className="px-6 py-4 text-palette-100/50">
                {formatBalance(item.market_cap_usd, "auto", "USD", "compact")}
              </td>
              <td className="px-6 py-4 text-palette-100/50">
                {formatBalance(item.volume24a, "auto", "USD", "compact")}
              </td>
              <td className="px-6 py-4 text-palette-100/50">{item.rank}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
