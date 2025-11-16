import api from './api';
import type { Aluno, AlunoRequest, PaginatedResponse } from '../types';

export const alunoService = {
    
  getAll: async (): Promise<Aluno[]> => {
    const response = await api.get<PaginatedResponse<Aluno>>('/alunos');
    return response.data.data; 
  },

  getMatriculados: async (): Promise<Aluno[]> => {
    const response = await api.get<PaginatedResponse<Aluno>>('/alunos/matriculados');
    return response.data.data; 
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
