# Sistema de Gerenciamento de Matrículas

Sistema web desenvolvido em React com TypeScript para gerenciamento de cursos, alunos e matrículas em instituições de ensino.

## 📋 Sobre o Projeto

Este é um sistema completo de gerenciamento de matrículas que permite:
- Cadastro e gerenciamento de cursos com paginação
- Cadastro e gerenciamento de alunos (apenas maiores de 18 anos) com paginação
- Realização e controle de matrículas com navegação intuitiva
- Visualização de estatísticas e relatórios em tempo real
- Interface responsiva e moderna com Bootstrap 5

## 🖼️ Demonstração Visual

<img width="600" alt="Screenshot 2025-11-16 at 15-51-34 student-registration-system-frontend" src="https://github.com/user-attachments/assets/e65362dd-0dc5-40f4-82be-69294394e7aa" />
<img width="600" alt="Screenshot 2025-11-16 at 15-51-43 student-registration-system-frontend" src="https://github.com/user-attachments/assets/1188f447-e038-4658-851b-466e1cc53705" />
<img width="600" alt="Screenshot 2025-11-16 at 15-51-50 student-registration-system-frontend" src="https://github.com/user-attachments/assets/26415b45-2be9-4d26-be30-9fc7bb20fa6e" />
<img width="600" alt="Screenshot 2025-11-16 at 15-52-05 student-registration-system-frontend" src="https://github.com/user-attachments/assets/f516789a-ddce-441f-86fe-f12641f698f9" />
<img width="600" alt="Screenshot 2025-11-16 at 15-52-10 student-registration-system-frontend" src="https://github.com/user-attachments/assets/3f6f8319-a4c3-4ee3-85cd-96360c4791a5" />
<img width="600" alt="Screenshot 2025-11-16 at 15-52-17 student-registration-system-frontend" src="https://github.com/user-attachments/assets/eeea2af7-c47e-4190-95bb-7611727972e6" />

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server de alta performance
- **React Router DOM** - Roteamento para aplicações React
- **Axios** - Cliente HTTP para requisições à API
- **Bootstrap 5** - Framework CSS para design responsivo
- **Reactstrap** - Componentes React baseados em Bootstrap
- **React Icons** - Biblioteca de ícones (Font Awesome)
- **date-fns** - Biblioteca para manipulação e formatação de datas

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
const API_BASE_URL = 'https://localhost:7034/api'; // Se usar o projeto local
const API_BASE_URL = 'https://localhost:32799/api'; // Se usar imagem docker da API
```

Se necessário, ajuste esta URL para apontar para o seu servidor de API.

## ▶️ Executando a Aplicação

### Usando Docker Compose (Recomendado)

A forma mais simples de executar a aplicação é usando Docker Compose:

```bash
docker-compose up --build
```

Ou para executar em background:

```bash
docker-compose up -d --build
```

A aplicação estará disponível em `http://localhost:5173`.

Para parar a aplicação:

```bash
docker-compose down
```

**Nota:** Na primeira execução, o Docker irá construir a imagem da aplicação. Nas execuções subsequentes, você pode usar apenas `docker-compose up` (sem `--build`).

### Modo de Desenvolvimento

Para desenvolvimento local sem Docker:

```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

### Build para Produção

Para gerar a build de produção localmente:

```bash
npm run build
```

Para visualizar a versão de produção localmente, você pode usar um servidor estático como `serve`:

```bash
npm install -g serve
serve -s dist -l 5173
```

## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes reutilizáveis
│   ├── AlunoModal.tsx      # Modal para cadastro/edição de alunos
│   ├── CursoModal.tsx      # Modal para cadastro/edição de cursos
│   ├── ErrorModal.tsx      # Modal para exibição de erros
│   ├── ConfirmModal.tsx    # Modal de confirmação de ações
│   ├── PaginationComponent.tsx # Componente de paginação reutilizável
│   └── Layout.tsx          # Layout principal com navegação
├── pages/                  # Páginas da aplicação
│   ├── Home.tsx           # Página inicial com estatísticas
│   ├── Alunos.tsx         # Gerenciamento de alunos com paginação
│   ├── Cursos.tsx         # Gerenciamento de cursos com paginação
│   └── Matriculas.tsx     # Gerenciamento de matrículas
├── services/              # Serviços de comunicação com API
│   ├── api.ts            # Configuração do Axios
│   ├── alunoService.ts   # Serviços relacionados a alunos
│   ├── cursoService.ts   # Serviços relacionados a cursos
│   └── matriculaService.ts # Serviços relacionados a matrículas
└── types/                # Definições de tipos TypeScript
    └── index.ts          # Interfaces e tipos da aplicação
```

## 🎯 Funcionalidades

### Dashboard
- Estatísticas gerais do sistema em tempo real
- Contadores de cursos ativos, total de alunos e matrículas realizadas
- Cards interativos com navegação rápida para os módulos principais
- Design responsivo e intuitivo

### Cursos
- Listagem paginada de cursos cadastrados (9 cursos por página)
- Cadastro de novos cursos com nome e descrição
- Edição de cursos existentes
- Exclusão de cursos com confirmação
- Visualização em cards com informações resumidas
- Sistema de paginação com navegação intuitiva

### Alunos
- Listagem paginada de alunos cadastrados (10 alunos por página)
- Cadastro de novos alunos com validação de idade mínima (18 anos)
- Edição de dados dos alunos (nome, email, data de nascimento)
- Exclusão de alunos com confirmação
- Filtro para visualizar apenas alunos matriculados
- Formatação de datas no padrão brasileiro (dd/MM/yyyy)
- Visualização em tabela responsiva com ações rápidas

### Matrículas
- Interface dividida em duas colunas para melhor usabilidade
- Listagem paginada de cursos disponíveis (10 cursos por página)
- Visualização de alunos matriculados por curso
- Realização de novas matrículas com seleção de aluno disponível
- Remoção de matrículas com confirmação
- Contador de alunos matriculados por curso
- Filtro automático de alunos já matriculados

### Validações e Segurança
- Validação de idade mínima para cadastro de alunos (18 anos)
- Validação de campos obrigatórios em todos os formulários
- Confirmação antes de exclusões e remoções
- Tratamento de erros com mensagens amigáveis
- Feedback visual para todas as ações do usuário

### Sistema de Paginação
- Paginação consistente em todas as listagens
- Navegação por páginas numeradas
- Botões de navegação rápida (primeira, anterior, próxima, última)
- Indicador de página atual e total de registros
- Navegação otimizada que mantém o contexto ao alternar páginas

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run lint` - Executa o linter ESLint
- `npm run preview` - Visualiza a build de produção localmente

## 📝 Requisitos

### Para execução com Docker Compose:
- Docker e Docker Compose instalados
- API backend rodando e acessível

### Para execução local (desenvolvimento):
- Node.js (versão 22 ou superior recomendada)
- API backend rodando e acessível