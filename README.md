# 🎬 Cubos Movies

Uma aplicação full-stack moderna para gerenciamento de filmes, desenvolvida com React, TypeScript, Node.js e PostgreSQL. O projeto permite aos usuários visualizar, adicionar, editar e gerenciar uma coleção de filmes com interface responsiva e autenticação completa.

## 📋 Índice

- [🎬 Cubos Movies](#-cubos-movies)
  - [📋 Índice](#-índice)
  - [📝 Sobre o Projeto](#-sobre-o-projeto)
  - [✨ Principais Funcionalidades](#-principais-funcionalidades)
  - [🏗️ Arquitetura do Projeto](#️-arquitetura-do-projeto)
  - [🛠️ Tecnologias e Frameworks](#️-tecnologias-e-frameworks)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Banco de Dados](#banco-de-dados)
    - [DevOps e Ferramentas](#devops-e-ferramentas)
  - [📦 Estrutura do Projeto](#-estrutura-do-projeto)
  - [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
    - [Pré-requisitos](#pré-requisitos)
    - [Configuração do Backend](#configuração-do-backend)
    - [Configuração do Frontend](#configuração-do-frontend)
  - [🔧 Scripts Disponíveis](#-scripts-disponíveis)
  - [🎨 Design System](#-design-system)
  - [📧 Sistema de Email e Notificações](#-sistema-de-email-e-notificações)
  - [🔒 Autenticação e Segurança](#-autenticação-e-segurança)
  - [📱 Responsividade](#-responsividade)
  - [🌐 Deploy](#-deploy)
  - [🤝 Contribuição](#-contribuição)

## 📝 Sobre o Projeto

O **Cubos Movies** é uma aplicação completa de gerenciamento de filmes que combina uma interface moderna e intuitiva com uma API robusta. O projeto foi desenvolvido seguindo as melhores práticas de desenvolvimento, incluindo arquitetura limpa, tipagem forte, responsividade e segurança.

## ✨ Principais Funcionalidades

- **Autenticação completa**: Login e registro de usuários com JWT
- **Gerenciamento de filmes**: CRUD completo (Create, Read, Update, Delete)
- **Sistema de busca e filtros**: Busca por título, filtros por gênero, data, rating, etc.
- **Upload de imagens**: Upload de posters e backdrops para Google Cloud Storage
- **Sistema de email**: Envio de emails transacionais usando Resend
- **Agendamento de emails**: Sistema inteligente para agendar lembretes de lançamento de filmes
- **Interface responsiva**: Suporte completo para desktop, tablet e mobile
- **Tema claro/escuro**: Alternância entre temas com persistência
- **Paginação**: Navegação eficiente através de grandes listas de filmes
- **Validação de dados**: Validação tanto no frontend quanto no backend

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura **Full-Stack** moderna com separação clara entre frontend e backend:

- **Frontend**: SPA (Single Page Application) com React
- **Backend**: API RESTful com Node.js e Express
- **Banco de dados**: PostgreSQL com Prisma ORM
- **Autenticação**: JWT (JSON Web Tokens)
- **Upload de arquivos**: Google Cloud Storage
- **Sistema de email**: Resend API para emails transacionais
- **Agendamento**: Node-cron para tarefas programadas
- **Containerização**: Docker para desenvolvimento

## 🛠️ Tecnologias e Frameworks

### Frontend

- React 19.1.1
- TypeScript 5.9.3
- Vite 7.1.7
- TailwindCSS 4.1.14
- React Router DOM 7.9.4
- Axios 1.12.2

### Backend

- Node.js com Express 5.1.0

- Prisma 6.17.1
  - **Por que usar**: ORM (Object-Relational Mapping) de próxima geração
  - **Benefícios**:
    - Schema declarativo
    - Query builder intuitivo
    - Excelente DX (Developer Experience) com Prisma Studio
    - Fácil implementação
    - Suporte a múltiplos bancos de dados

- JSON Web Tokens (JWT)
- Multer 2.0.2
- BCrypt.js 3.0.2

- **Resend**
  - **Por que usar**: Plataforma moderna para envio de emails transacionais
  - **Benefícios**:
    - API simples e confiável
    - Templates HTML personalizáveis
    - Boa entregabilidade
    - Métricas detalhadas
    - Fácil integração

- **Node-cron**
  - **Por que usar**: Biblioteca para agendamento de tarefas
  - **Benefícios**:
    - Sintaxe cron familiar
    - Controle de timezone
    - Fácil cancelamento de tarefas
    - Execução em background

### Banco de Dados

- PostgreSQL 18

### DevOps e Ferramentas

- Docker & Docker Compose
- ESLint 9.36.0
- Prettier 3.6.2
- Google Cloud Storage

## 📦 Estrutura do Projeto

```
cubos-movies/
├── src/                          # Frontend React
│   ├── components/              # Componentes React
│   │   ├── features/           # Componentes de funcionalidades
│   │   └── ui/                # Componentes de interface básicos
│   ├── hooks/                  # Custom hooks
│   ├── services/              # Serviços de API
│   ├── types/                 # Definições TypeScript
│   ├── pages/                 # Páginas do projeto
│   ├── utils/                 # Funções utilitárias
│   └── context/               # Context providers
├── server/                     # Backend Node.js
│   ├── src/
│   │   ├── controllers/       # Controladores das rotas
│   │   ├── middlewares/       # Middlewares personalizados
│   │   ├── models/           # Modelos de dados
│   │   ├── routes/           # Definições das rotas
│   │   ├── services/         # Serviços de negócio
│   │   └── utils/            # Utilitários do backend
│   └── prisma/               # Schema e migrações do banco
└── docs/                      # Documentação do projeto
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 22+
- Docker e Docker Compose
- Git

### Configuração do Backend

1. **Clone o repositório**

```bash
git clone https://github.com/GabrielArmond/cubos-movies.git
cd cubos-movies
```

2. **Configure o banco de dados**

```bash
cd server
docker-compose up -d  # Inicia PostgreSQL
```

3. **Configure as variáveis de ambiente**

```bash
# server/.env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cubosmovies?schema=public"
JWT_SECRET="seu-jwt-secret-super-seguro"
GOOGLE_CLOUD_PROJECT_ID="seu-project-id"
GOOGLE_CLOUD_KEY_FILE="caminho-para-service-account.json"
GOOGLE_CLOUD_BUCKET_NAME="seu-bucket-name"
RESEND_API_KEY="sua-chave-da-resend"
FROM_EMAIL="noreply@seudominio.com"
```

4. **Instale dependências e execute migrações**

```bash
npm install
npx prisma migrate dev
npm run dev  # Servidor rodando em http://localhost:3000
```

### Configuração do Frontend

1. **Instale dependências**

```bash
cd ../  # Volta para raiz
npm install
```

2. **Execute o frontend**

```bash
npm run dev  # Frontend rodando em http://localhost:8080
```

3. **Configure as variáveis de ambiente**

```bash
# .env
PORT=3000
NODE_ENV=development

VITE_API_URL=http://localhost:3000/api
```

## 🔧 Scripts Disponíveis

### Frontend

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linting

### Backend

- `npm run dev` - Inicia servidor com hot reload
- `npm run build` - Compila TypeScript
- `npm start` - Inicia servidor de produção
- `npx prisma studio` - Interface visual do banco de dados
- `npx prisma migrate dev` - Executa migrações

## 🎨 Design System

O projeto utiliza um design system customizado construído sobre TailwindCSS:

- **Paleta de cores**: Sistema de cores personalizado com suporte a tema claro/escuro
- **Tipografia**: Fonte Roboto, Inter e Montserrat
- **Componentes**: Biblioteca de componentes reutilizáveis (Button, Input, Card, etc.)
- **Responsividade**: Breakpoints customizados para diferentes dispositivos
- **Animações**: Animações suaves com CSS transitions e keyframes

## 📧 Sistema de Email

O projeto inclui um sistema de emails:

### **Envio de Emails com Resend**

- **Lembretes de filmes**: Notificações sobre lançamentos de filmes em estreia criados pelos próprios usuários.

### **Agendamento Inteligente**

- **Cron Jobs**: Sistema de agendamento usando node-cron
- **Timezone Support**: Suporte a diferentes fusos horários (configurado para America/Sao_Paulo)
- **Lembretes de lançamento**: Agendamento automático de emails no dia de lançamento dos filmes
- **Gerenciamento de tarefas**:
  - Cancelamento automático após envio
  - Controle de jobs ativos
  - Logs detalhados para monitoramento

### **Funcionalidades do Sistema**

- **Prevenção de spam**: Agendamento apenas para datas futuras
- **Monitoramento**: Logs detalhados para debugging e monitoramento

### **Configuração Necessária**

```bash
# Variáveis de ambiente para email
RESEND_API_KEY="sua-chave-da-resend"
FROM_EMAIL="noreply@seudominio.com"
```

## 🔒 Autenticação e Segurança

- **JWT**: Tokens seguros para autenticação stateless
- **Bcrypt**: Hash de senhas com salt automático
- **Rotas protegidas**: Middleware de autenticação no backend
- **Validação**: Validação de dados tanto no frontend quanto backend
- **CORS**: Configuração adequada para requisições cross-origin
- **Sanitização**: Limpeza de dados de entrada

## 📱 Responsividade

O projeto é totalmente responsivo com suporte a:

- **Mobile First**: Design prioritário para dispositivos móveis
- **Grid System**: Layout flexível com CSS Grid e Flexbox
- **Breakpoints**: Pontos de quebra customizados
- **Componentes Adaptativos**: Componentes que se adaptam ao tamanho da tela
- **Touch Friendly**: Interface otimizada para touch

**Desenvolvido por [Gabriel Guerra](https://github.com/GabrielArmond)**
