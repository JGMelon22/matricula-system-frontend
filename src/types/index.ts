export interface Curso {
  id: string;
  nome: string;
  descricao: string;
  createdAt: string;
}

export interface CursoRequest {
  nome: string;
  descricao: string;
}

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  dataNascimento: string;
  createdAt: string;
}

export interface AlunoRequest {
  nome: string;
  email: string;
  dataNascimento: string;
}

export interface Matricula {
  id: string;
  alunoId: string;
  alunoNome: string;
  cursoId: string;
  cursoNome: string;
  dataMatricula: string;
  ativa: boolean;
}

export interface MatriculaRequest {
  alunoId: string;
  cursoId: string;
}

export interface ApiError {
  message: string;
}