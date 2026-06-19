# 📚 LibManager

Sistema de gestão de biblioteca — projeto final do curso.
**Professor Gustavo Dias | FIEC 2026**

Aplicação completa de gerenciamento de acervo, leitores e empréstimos, com
autenticação de bibliotecário, banco relacional MySQL e interface React.

---

## 🧱 Stack

| Camada    | Tecnologias                                          |
| --------- | ---------------------------------------------------- |
| Banco     | MySQL (modelagem relacional, Foreign Keys, INNER JOIN) |
| Backend   | Node.js, Express, JWT, bcryptjs, Zod (arquitetura MVC) |
| Frontend  | React + Vite, Tailwind CSS, Axios, React Router      |

---

## 📁 Estrutura de pastas

```
libmanager/
├── database/
│   └── schema.sql          # criação do banco, tabelas e relacionamentos
├── backend/
│   └── src/
│       ├── config/         # conexão com o MySQL
│       ├── routes/         # rotas (camada de roteamento)
│       ├── controllers/    # regras de negócio
│       ├── models/         # acesso ao banco (SQL)
│       ├── middlewares/    # proteção JWT + validação Zod
│       ├── schemas/        # schemas de validação Zod
│       └── seed.js         # cria usuário admin + dados de exemplo
└── frontend/
    └── src/
        ├── api/            # instância Axios + interceptors
        ├── context/        # AuthContext (estado de login)
        ├── components/     # Sidebar, ProtectedRoute
        └── pages/          # Login, Dashboard, NovoLivro, etc.
```

---

## ✅ Requisitos atendidos (checklist)

**Banco de Dados**
- Modelagem relacional com Primary Keys → `database/schema.sql`
- Relacionamentos 1:N com Foreign Keys (categoria → livros; leitor/livro → empréstimos)
- Persistência real no MySQL

**Backend (Node + Express)**
- Arquitetura MVC (routes / controllers / models separados)
- CRUD: listagem (GET) e cadastro (POST)
- Segurança com bcrypt (senha nunca salva em texto puro)
- Autenticação JWT (token gerado no login)
- Middleware de proteção bloqueando rotas sensíveis
- Validação com Zod

**Frontend (React + Tailwind)**
- Design responsivo (desktop e mobile)
- Consumo real da API via Axios (sem dados mockados)
- Gerenciamento de estado com Hooks (useState / useEffect)
- Persistência de login (token JWT no localStorage)
- Tratamento de erros (401 / 404 / 500)

**Deploy / Infra**
- `.env` para segredos (fora do Git)
- README com instruções (este arquivo)

---

## 🚀 Como rodar localmente

### 1. Banco de dados
Tenha o MySQL instalado e rode o script:
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env      # edite com suas credenciais do MySQL e o JWT_SECRET
npm run seed              # cria o usuário admin + dados de exemplo
npm run dev               # sobe a API em http://localhost:3001
```

**Login padrão criado pelo seed:**
- E-mail: `bibliotecario@biblioteca.com`
- Senha: `123456`

### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env      # confira a VITE_API_URL
npm run dev               # interface em http://localhost:5173
```

---

## ☁️ Deploy (sugestão)

- **Backend** → Render ou Railway (configurar as variáveis de ambiente do `.env`).
- **Frontend** → Vercel ou Netlify (definir `VITE_API_URL` apontando para a URL pública da API).
- **Banco** → instância MySQL gerenciada (ex.: Railway, Aiven, PlanetScale).

---

## 🔌 Endpoints da API

| Método | Rota                          | Protegida | Descrição                       |
| ------ | ----------------------------- | --------- | ------------------------------- |
| POST   | `/api/auth/register`          | ❌        | Cadastra bibliotecário          |
| POST   | `/api/auth/login`             | ❌        | Login → retorna token JWT       |
| GET    | `/api/livros`                 | ✅        | Lista o acervo                  |
| POST   | `/api/livros`                 | ✅        | Cadastra livro                  |
| GET    | `/api/leitores`               | ✅        | Lista leitores                  |
| POST   | `/api/leitores`               | ✅        | Cadastra leitor                 |
| GET    | `/api/emprestimos`            | ✅        | Lista empréstimos (INNER JOIN)  |
| POST   | `/api/emprestimos`            | ✅        | Registra empréstimo             |
| PATCH  | `/api/emprestimos/:id/devolver`| ✅        | Devolve um livro                |
| GET    | `/api/categorias`             | ✅        | Lista categorias                |