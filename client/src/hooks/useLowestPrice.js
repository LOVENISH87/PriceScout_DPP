import { useEffect, useState } from "react";
import { fetchLowestProducts } from "../api/products.api.js";

export const useLowestPrice = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchLowestProducts();
        setItems(data);
      } catch (err) {
        setError(err.message || "Failed to load deals");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { items, loading, error };
};

