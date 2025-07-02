import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Offer } from "../types";

export function useMySubscriptions() {
  const [mySubscriptions, setMySubscriptions] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);

      const response = await api.get("/users/me/subscriptions");
      setMySubscriptions(response.data);
    } catch (err) {
      setError("Não foi possível carregar suas inscrições.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchSubscriptions();
    } else {
      setLoading(false);
    }
  }, []);

  return {
    mySubscriptions,
    setMySubscriptions,
    loading,
    error,
    refetchSubscriptions: fetchSubscriptions,
  };
}
