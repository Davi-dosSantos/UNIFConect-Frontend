import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Profile } from "../types";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

export function useUserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    const { id: userId } = jwtDecode(token) as { id: string };

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${userId}/profile`);
        setProfile(response.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          console.log(
            "Nenhum perfil encontrado para o usuário, o que é normal."
          );
          setProfile(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
}
