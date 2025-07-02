import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Offer } from "../types";

export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/offers");
      setOffers(response.data);
    } catch (err) {
      setError("Não foi possível carregar as ofertas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []); // Roda apenas na primeira renderização

  // O hook retorna o estado e uma função para atualizar os dados se necessário
  return { offers, setOffers, loading, error, refetchOffers: fetchOffers };
}
