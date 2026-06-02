import { useState, useEffect } from 'react';

/**
 * Hook to fetch portfolio data from backend API.
 * Returns the portfolio object and loading/error states.
 */
export default function usePortfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiBase}/api/portfolio`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPortfolio(data);
      } catch (err) {
        console.error('Failed to fetch portfolio:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  return { portfolio, loading, error };
}
