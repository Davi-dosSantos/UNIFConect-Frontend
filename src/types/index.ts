// Define o formato para uma Tag (matéria/tópico)
export interface Tag {
  id: string;
  name: string;
  description: string | null;
}

// Define o formato para o autor de uma oferta ou recurso
export interface Offerer {
  id: string;
  name: string;
}

// Define o formato para um usuário logado
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Opcional, pois nunca recebemos a senha do backend
}

// Define o formato para o perfil de um usuário
export interface Profile {
  id: string;
  userId: string;
  bio: string | null;
  course: string | null;
  institution: string | null;
  avatarUrl: string | null;
}

// Define o formato para uma Oferta de ajuda
export interface Offer {
  id: string;
  title: string;
  description: string;
  slots: number;
  createdAt: string; // As datas vêm como string da API JSON
  offerer: Offerer;
  tags: Tag[];
  _count: {
    subscriptions: number;
  };
}

// Define o formato para um arquivo que foi enviado
export interface File {
  id: string;
  originalName: string;
  path: string; // O caminho público para acessar/baixar o arquivo
}

// Define o formato para um Recurso (material de estudo) do acervo
export interface Resource {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  uploader: {
    id: string;
    name: string;
  };
  file: File;
  tags: Tag[];
}
