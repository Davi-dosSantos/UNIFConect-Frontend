import { User, Offer, Resource, Event } from "../types";

const mockUser: User = {
  id: 'uuid-user-1',
  name: 'Davi dos Santos',
  email: 'davi.santos@unifei.edu.br',
  bio: 'Estudante de Ciência da Computação na UNIFEI, apaixonado por desenvolvimento web e IA. Buscando ajudar em Cálculo I e aprender sobre Estrutura de Dados.',
  role: 'student',
};

const mockOffers: Offer[] = [
  { id: 'uuid-offer-1', subject: { name: 'Cálculo I' }, description: 'Ofereço ajuda com listas de exercícios e preparação para provas.', user: { name: 'Ana Silva' }, type: 'help' },
  { id: 'uuid-offer-2', subject: { name: 'Estrutura de Dados' }, description: 'Procuro alguém para estudar em grupo para a P2.', user: { name: 'Carlos Souza' }, type: 'request' },
  { id: 'uuid-offer-3', subject: { name: 'Física II' }, description: 'Monitoria para a parte de Eletromagnetismo.', user: { name: 'Mariana Costa' }, type: 'help' },
];

const mockEvents: Event[] = [
    { id: 'uuid-event-1', title: 'Grupo de Estudos - Álgebra Linear', scheduled_for: '2025-07-10T18:00:00', organizer: { name: 'Fernanda Lima' }, description: 'Foco na matéria da P1.' },
    { id: 'uuid-event-2', title: 'Workshop de React Hooks', scheduled_for: '2025-07-15T19:30:00', organizer: { name: 'Pedro Martins' }, description: 'Aberto para todos os níveis.' },
];

const mockResources: Resource[] = [
    { id: 'uuid-resource-1', title: 'Resumo - Limites e Derivadas', subject: { name: 'Cálculo I' }, added_by: { name: 'Ana Silva' } },
    { id: 'uuid-resource-2', title: 'Implementação de Pilha em Python', subject: { name: 'Estrutura de Dados' }, added_by: { name: 'Carlos Souza' } },
];

export const api = {
    login: async (email: string, password?: string): Promise<{ token: string; user: User }> => {
        console.log("Attempting login for:", email);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ token: 'fake-jwt-token', user: mockUser });
            }, 1000);
        });
    },
    getOffers: async (): Promise<Offer[]> => {
        return new Promise(resolve => setTimeout(() => resolve(mockOffers), 800));
    },
    getEvents: async (): Promise<Event[]> => {
        return new Promise(resolve => setTimeout(() => resolve(mockEvents), 800));
    },
    getResources: async (): Promise<Resource[]> => {
        return new Promise(resolve => setTimeout(() => resolve(mockResources), 800));
    },
    getUserProfile: async (): Promise<User> => {
         return new Promise(resolve => setTimeout(() => resolve(mockUser), 500));
    }
};