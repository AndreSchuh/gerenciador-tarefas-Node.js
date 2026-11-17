# Gerenciador de Tarefas: API Node.js com Autenticação JWT

API REST de tarefas com cadastro e login de usuários. Cada usuário só acessa as próprias tarefas, protegidas por token **JWT**.

## Funcionalidades
- Cadastro e login com senha criptografada (**bcrypt**)
- Autenticação por **JWT** com middleware de proteção de rotas
- CRUD de tarefas vinculadas ao usuário logado
- Persistência em **MongoDB** com Mongoose
- Front-end simples em HTML/CSS/JS

## Rotas
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/auth/register` | não | Cadastra usuário |
| POST | `/api/auth/login` | não | Retorna token JWT |
| GET | `/api/task` | sim | Lista tarefas do usuário |
| POST | `/api/task` | sim | Cria tarefa |
| PUT | `/api/task/:id` | sim | Atualiza status |
| DELETE | `/api/task/:id` | sim | Remove tarefa |

Envie o token no header `Authorization: Bearer <token>`.

## Tecnologias
Node.js · Express · MongoDB · Mongoose · JWT · bcrypt

## Como rodar
Requisitos: Node.js e MongoDB rodando localmente.
```bash
npm install
node src/server.js     # http://localhost:3000
```
