import api from './api';
import type { Aluno, MatriculaRequest, Matricula } from '../types';

export const matriculaService = {

    getAlunosByCurso: async (cursoId: string): Promise<Aluno[]> => {
        const response = await api.get<Aluno[]>(`/matriculas/curso/${cursoId}/alunos`);
        return response.data;
    },

    create: async (data: MatriculaRequest): Promise<Matricula> => {
        const response = await api.post<Matricula>('/matriculas', data);
        return response.data;
    },

    remove: async (data: MatriculaRequest): Promise<void> => {
        await api.delete('/matriculas', { data });
    },
};