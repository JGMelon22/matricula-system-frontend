import api from './api';
import type { Curso, CursoRequest, PaginatedResponse } from '../types';

export const cursoService = {
    getAll: async (pageNumber: number = 1, pageSize: number = 9): Promise<PaginatedResponse<Curso>> => {
        const response = await api.get<PaginatedResponse<Curso>>(`/cursos?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    },

    count: async (): Promise<number> => {
        const response = await api.get<number>('/cursos/count');
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
