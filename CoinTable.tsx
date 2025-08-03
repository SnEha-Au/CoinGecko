

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  market_cap_rank: number;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

export default function CoinTable({
  coins,
  showStar = true,
  onChartClick,
}: {
  coins: Coin[];
  showStar?: boolean;
  onChartClick?: (id: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(saved);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredCoins(
        coins.filter((coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [search, coins]);

  const toggleWatchlist = (id: string) => {
    let updated = [...watchlist];
    if (watchlist.includes(id)) {
      updated = updated.filter((c) => c !== id);
    } else {
      updated.push(id);
    }
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse border-b">
      <td colSpan={6}>
        <div className="h-4 bg-gray-200 rounded w-full my-2"></div>
      </td>
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      <input
        className="mb-4 p-2 border rounded w-full md:w-1/2"
        placeholder="Search coins..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="min-w-full text-sm text-left text-gray-700 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-2 px-2">#</th>
            <th className="py-2 px-2">Coin</th>
            <th className="py-2 px-2">Price</th>
            <th className="py-2 px-2">24h %</th>
            <th className="py-2 px-2">Market Cap</th>
            {showStar && <th className="py-2 px-2">Watch</th>}
          </tr>
        </thead>
        <tbody>
          {coins.length === 0
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
            : filteredCoins.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No matching coins found.
                </td>
              </tr>
            ) : (
              filteredCoins.map((coin) => (
                <tr key={coin.id} className="bg-white border-b hover:bg-gray-100">
                  <td className="py-2 px-2">{coin.market_cap_rank}</td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <img src={coin.image} className="w-10 h-10" alt={coin.name} />
                      <div className="flex flex-col">
                        <Link href={`/coin/${coin.id}`} className="text-blue-600 hover:underline">
                          {coin.name} ({coin.symbol})
                        </Link>
                        {onChartClick && (
                          <BsGraphUp
                            className="text-blue-500 cursor-pointer mt-1"
                            title="Show Chart"
                            onClick={() => onChartClick(coin.id)}
                          />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-2">${coin.current_price.toLocaleString()}</td>
                  <td className={`py-2 px-2 ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="py-2 px-2">${coin.market_cap.toLocaleString()}</td>
                  {showStar && (
                    <td onClick={() => toggleWatchlist(coin.id)} className="cursor-pointer py-2 px-2">
                      {watchlist.includes(coin.id) ? (
                        <AiFillStar className="text-yellow-500" />
                      ) : (
                        <AiOutlineStar className="text-gray-400" />
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  );
}

