# Anytime 🇧🇷

**Anytime Blog** é uma extensão do site Anytime, dedicado à preservação, estudo e apreciação da música em sua forma mais pura. Aqui você encontrará um sistema de **cadastro e autenticação de usuários**, criação de **posts** e **comentários**, com gerenciamento de sessão, paginação e design minimalista. Essas novas funcionalidades permitem os usuários cadastrados conversarem entre si sobre o extenso mundo da produção musical e seus afins.

> Desenvolvido para a nota da Atividade N1 da disciplina de Programação Web II do P6 de Informática - IFCE Campus Fortaleza

## Tecnologias Utilizadas

### **Frontend**
- React.js + Vite
- React Router DOM
- Bootstrap 5
- Axios
- Hooks (useState, useEffect, useNavigate, useParams, useContext)

### **Backend**
- Node.js + Express
- SQLite (com `sqlite` e `sqlite3`)
- bcrypt.js (hash de senha)
- CORS
- Arquitetura modular com rotas separadas

## Banco de Dados

**Banco:** `blog.db` (SQLite)

**Tabelas criadas automaticamente:**

```sql
CREATE TABLE IF NOT EXISTS User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
);

CREATE TABLE IF NOT EXISTS Post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT,
  texto TEXT,
  userId INTEGER,
  FOREIGN KEY(userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Comment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  texto TEXT,
  postId INTEGER,
  userId INTEGER,
  FOREIGN KEY(postId) REFERENCES Post(id),
  FOREIGN KEY(userId) REFERENCES User(id)
);
```

## Funcionalidades Principais
### Autenticação (Login / Cadastro)

Cadastro (POST /auth/register) e login (POST /auth/login).

Senhas armazenadas com bcrypt.

Sessão persistida no navegador com localStorage.
<br>
<br>

### Posts

Criação de post protegida por autenticação (X-User-ID).

Paginação de 3 posts por página.

Visualização individual de cada post com autor e comentários.
<br>
<br>

### Comentários

Usuários logados podem comentar posts.

A caixa de comentário aparece apenas ao clicar no botão "Comment" e pode ser fechada.
<br>
<br>

### Navegação

Sistema de rotas SPA (Single Page Application) com react-router-dom.

Header fixo, transparente e responsivo.

Opções de Login, Register, Create Post e Logout.
<br>
<br>

### Validação e Feedback

Campos obrigatórios em formulários.

Mensagens de erro e sucesso amigáveis.

Tratamento de erros HTTP com Axios.
<br>
<br>

## Hooks Utilizados

| Hook          | Local de Uso                        | Finalidade                                      |
| ------------- | ----------------------------------- | ----------------------------------------------- |
| `useState`    | Todos os componentes                | Controle de inputs, autenticação e carregamento |
| `useEffect`   | AuthContext, AllPosts, SinglePost   | Efeitos colaterais e carregamento inicial       |
| `useNavigate` | Login, Register, CreatePost, Header | Redirecionamento entre rotas                    |
| `useParams`   | SinglePost                          | Captura de parâmetros de rota (`id`)            |
| `useContext`  | AuthContext, Header                 | Acesso ao contexto global de autenticação       |

## Comunicação com API

O frontend se comunica com o backend por meio de Axios, configurado em /services/api.js:
```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export default api;
```

| Método | Rota                    | Descrição                          |
| ------ | ----------------------- | ---------------------------------- |
| `POST` | `/auth/register`        | Cadastra novo usuário              |
| `POST` | `/auth/login`           | Realiza login                      |
| `GET`  | `/posts?page=1&limit=3` | Lista posts paginados              |
| `GET`  | `/posts/:id`            | Retorna post completo              |
| `POST` | `/posts`                | Cria novo post (autenticado)       |
| `GET`  | `/comments/:postId`     | Lista comentários de um post       |
| `POST` | `/comments`             | Cria novo comentário (autenticado) |

## Como Executar o Projeto
### 1. Clonar o repositório
git clone https://github.com/seuusuario/anytime-blog.git
cd anytime-blog

### 2. Configurar o backend
cd backend
npm install
npm run dev

* O servidor será iniciado em: http://localhost:3001

### 3. Configurar o frontend
cd ../frontend
npm install
npm run dev

## Teste de Fluxo Completo

Acesse /register → Crie um usuário.

Faça login em /login.

Crie um novo post em /create.

Veja a lista em /.

Entre em um post e adicione um comentário.

Deslogue pelo botão Logout no header.
