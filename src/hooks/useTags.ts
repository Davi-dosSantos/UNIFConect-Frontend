import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Tag } from "../types";

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tags");
      setTags(response.data);
    } catch (err) {
      setError("Não foi possível carregar as tags.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []); // O array vazio [] garante que a busca seja feita apenas uma vez

  // O hook retorna o estado para que o componente possa usá-lo
  return { tags, loading, error, refetchTags: fetchTags };
}
