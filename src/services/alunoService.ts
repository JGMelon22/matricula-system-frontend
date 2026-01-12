import api from './api';
import type { Aluno, AlunoRequest, PaginatedResponse } from '../types';

export const alunoService = {

  getAll: async (pageNumber: number = 1, pageSize: number = 9): Promise<PaginatedResponse<Aluno>> => {
    const response = await api.get<PaginatedResponse<Aluno>>(`/alunos?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
  },

  count: async (): Promise<number> => {
    const response = await api.get<number>('/alunos/count');
    return response.data;
  },

  getMatriculados: async (pageNumber: number = 1, pageSize: number = 9): Promise<PaginatedResponse<Aluno>> => {
    const response = await api.get<PaginatedResponse<Aluno>>(`/alunos/matriculados?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
  },

  getById: async (id: string): Promise<Aluno> => {
    const response = await api.get<Aluno>(`/alunos/${id}`);
    return response.data;
  },

  create: async (data: AlunoRequest): Promise<Aluno> => {
    const response = await api.post<Aluno>('/alunos', data);
    return response.data;
  },

  update: async (id: string, data: AlunoRequest): Promise<Aluno> => {
    const response = await api.put<Aluno>(`/alunos/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/alunos/${id}`);
  },
};
