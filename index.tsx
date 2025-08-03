
import { useEffect, useState } from 'react';
import { fetchMarkets } from '../utils/api';
import CoinTable from '../components/CoinTable';

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchMarkets()
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Error loading data. Try again later.</div>;
  if (coins.length === 0) return <div className="text-center mt-20">No data available.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Cryptocurrencies</h1>
      <CoinTable coins={coins} />
    </div>
  );
}

