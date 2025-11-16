# Sistema de Gerenciamento de Matrículas

Sistema web desenvolvido em React com TypeScript para gerenciamento de cursos, alunos e matrículas em instituições de ensino.

## 📋 Sobre o Projeto

Este é um sistema completo de gerenciamento de matrículas que permite:
- Cadastro e gerenciamento de cursos
- Cadastro e gerenciamento de alunos (apenas maiores de 18 anos)
- Realização e controle de matrículas
- Visualização de estatísticas e relatórios

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server de alta performance
- **React Router DOM** - Roteamento para aplicações React
- **Axios** - Cliente HTTP para requisições à API
- **Bootstrap 5** - Framework CSS para design responsivo
- **Reactstrap** - Componentes React baseados em Bootstrap
- **React Icons** - Biblioteca de ícones
- **date-fns** - Biblioteca para manipulação de datas

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd matricula-system-frontend
```

2. Instale as dependências:
```bash
npm install
```

## 🛠️ Configuração

Antes de executar a aplicação, certifique-se de que a API backend está configurada e rodando. A URL base da API está configurada em `src/services/api.ts`:

```typescript
const API_BASE_URL = 'https://localhost:7034/api';
```

Se necessário, ajuste esta URL para apontar para o seu servidor de API.

## ▶️ Executando a Aplicação

### Modo de Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

### Build para Produção
```bash
npm run build

```
Visualiza a versão de produção localmente.

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AlunoModal.tsx  # Modal para cadastro/edição de alunos
│   ├── CursoModal.tsx  # Modal para cadastro/edição de cursos
│   └── Layout.tsx      # Layout principal com navegação
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial com estatísticas
│   ├── Alunos.tsx      # Gerenciamento de alunos
│   ├── Cursos.tsx      # Gerenciamento de cursos
│   └── Matriculas.tsx  # Gerenciamento de matrículas
├── services/           # Serviços de comunicação com API
│   ├── api.ts          # Configuração do Axios
│   ├── alunoService.ts # Serviços relacionados a alunos
│   ├── cursoService.ts # Serviços relacionados a cursos
│   └── matriculaService.ts # Serviços relacionados a matrículas
└── types/              # Definições de tipos TypeScript
    └── index.ts        # Interfaces e tipos da aplicação
```

## 🎯 Funcionalidades

### Cursos
- Listagem de cursos cadastrados
- Cadastro de novos cursos
- Edição de cursos existentes
- Exclusão de cursos

### Alunos
- Listagem de alunos cadastrados
- Cadastro de novos alunos (validação de idade mínima: 18 anos)
- Edição de dados dos alunos
- Exclusão de alunos
- Visualização de alunos matriculados

### Matrículas
- Listagem de todas as matrículas
- Realização de novas matrículas
- Ativação/desativação de matrículas
- Visualização de matrículas por aluno ou curso

### Dashboard
- Estatísticas gerais do sistema
- Contadores de cursos, alunos e matrículas
- Navegação rápida para os módulos principais

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter ESLint

## 📝 Requisitos

- Node.js (versão 22 ou superior recomendada)
- npm ou yarn
- API backend rodando e acessível