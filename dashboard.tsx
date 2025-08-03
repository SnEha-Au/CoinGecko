import { useEffect, useState } from 'react';
import { fetchMarkets } from '../utils/api';
import CoinTable from '../components/CoinTable';

export default function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const data = await fetchMarkets(1, 50);
        setCoins(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch market data');
      } finally {
        setLoading(false);
      }
    };

    loadCoins();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📈 Crypto Dashboard</h1>
      {loading ? (
        <p className="text-center">Loading coins...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <CoinTable coins={coins} showStar />
      )}
    </div>
  );
}
