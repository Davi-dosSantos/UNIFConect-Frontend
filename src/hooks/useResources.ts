import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Resource } from "../types";

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await api.get("/resources");
      setResources(response.data);
    } catch (err) {
      setError("Não foi possível carregar o acervo de materiais.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return { resources, loading, error, refetchResources: fetchResources };
}
