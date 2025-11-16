import api from './api';
import type { Curso, CursoRequest } from '../types';

export const cursoService = {
    getAll: async (): Promise<Curso[]> => {
        const response = await api.get<Curso[]>('/cursos');
        return response.data;
    },

    getById: async (id: string): Promise<Curso> => {
        const response = await api.get<Curso>(`/cursos/${id}`);
        return response.data;
    },

    create: async (data: CursoRequest): Promise<Curso> => {
        const response = await api.post<Curso>('/cursos', data);
        return response.data;
    },

    update: async (id: string, data: CursoRequest): Promise<Curso> => {
        const response = await api.put<Curso>(`/cursos/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/cursos/${id}`);
    },
};
