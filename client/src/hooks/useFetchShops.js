import { useEffect, useState } from "react";
import { fetchShops } from "../api/shops.api.js";

export const useFetchShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchShops();
        setShops(data);
      } catch (err) {
        setError(err.message || "Failed to load shops");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { shops, loading, error };
};

