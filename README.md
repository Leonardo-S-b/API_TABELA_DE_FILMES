# 🎬 API Tabela de Filmes

<div align="center">

<img src="https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif" width="300"/>

### 🚀 Uma API simples e eficiente para gerenciamento de filmes

</div>

---

## 📌 Sobre o projeto

A **API Tabela de Filmes** é uma aplicação desenvolvida com o objetivo de fornecer uma base de dados de filmes que pode ser utilizada em projetos web.

Ela permite armazenar e organizar informações sobre filmes, funcionando como uma API backend que pode ser consumida por diferentes aplicações frontend.

> 💡 Ideal para projetos de estudo, testes de consumo de API ou aplicações reais.

---

## ⚙️ Funcionalidades

✨ Cadastro de filmes
📄 Listagem de todos os filmes
🔍 Busca de filmes
✏️ Atualização de dados
❌ Remoção de filmes

---

## 🛠️ Tecnologias utilizadas

<div align="center">

![typescript](https://img.shields.io/badge/typescript-ES6+-yellow?style=for-the-badge\&logo=typescript)
![express](https://img.shields.io/badge/express-runtime-green?style=for-the-badge\&logo=express)
![Node.js](https://img.shields.io/badge/Node.js-runtime-green?style=for-the-badge\&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?style=for-the-badge\&logo=prisma)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge\&logo=mysql)
![API](https://img.shields.io/badge/API-REST-blue?style=for-the-badge)

</div>

---

## 📁 Estrutura do projeto

```
📦 API_TABELA_DE_FILMES
 ┣ 📂 apis
 ┃ ┗ 📂 src
 ┃   ┣ 📂 src
 ┃   ┃ ┣ 📂 db
 ┃   ┃ ┃ ┗ 📜 prisma.ts
 ┃   ┃ ┣ 📂 prisma
 ┃   ┃ ┃ ┗ 📜 schema.prisma
 ┃   ┃ ┣ 📂 Routes
 ┃   ┃ ┃ ┗ 📜 Filmes.ts
 ┃   ┃ ┗ 📜 server.ts
 ┃   ┣ 📜 prisma.config.ts
 ┃   ┣ 📜 tsconfig.json
 ┃   ┗ 📜 package.json
 ┗ 📜 README.md
```

---

## 🚀 Como executar o projeto

### ✅ Pré-requisitos

- Node.js instalado
- MySQL rodando localmente

### 1) Clonar e instalar dependências

```bash
# Clone o repositório
git clone https://github.com/Leonardo-S-b/API_TABELA_DE_FILMES.git

# Acesse a pasta do repositório
cd API_TABELA_DE_FILMES

# IMPORTANTE: o backend fica em apis/src
cd apis/src

# Instale as dependências
npm install
```

### 2) Configurar banco de dados (.env)

Crie/edite o arquivo `.env` dentro de `apis/src` com sua conexão:

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/NOME_DO_BANCO"
```

Exemplo:

```env
DATABASE_URL="mysql://root:0607@localhost:3306/api_db"
```

### 3) Rodar migrations do Prisma

Ainda dentro de `apis/src`:

```bash
npm run prisma:migrate
```

### 4) Subir a API

```bash
npm run dev
```

A API sobe em:

- `http://localhost:3000`

---

## 🔌 Exemplos de uso da API

### 📥 Buscar filmes

```http
GET /filmes
```

### 📥 Buscar filme por ID

```http
GET /filmes/:id
```

### ➕ Adicionar filme

```http
POST /filmes
```

Body (JSON):

```json
{
	"title": "Matrix",
	"director": "Wachowski",
	"releaseYear": 1999,
	"genre": "Sci-Fi",
	"rating": 8.7,
	"synopsis": "Um hacker descobre a verdade."
}
```

### ✏️ Atualizar filme

```http
PUT /filmes/:id
```

Body (JSON) — pode enviar só o que quiser atualizar:

```json
{
	"title": "Matrix (editado)",
	"rating": 9.1
}
```

### ❌ Deletar filme

```http
DELETE /filmes/:id
```

---

## 🧪 Testando pelo PowerShell (Windows)

Se estiver no Windows, uma forma bem estável de testar (sem problemas de aspas do `curl`) é usar `Invoke-RestMethod`.

### Criar filme

```powershell
$payload = [pscustomobject]@{
	title='Matrix'
	director='Wachowski'
	releaseYear=1999
	genre='Sci-Fi'
	rating=8.7
	synopsis='Um hacker descobre a verdade.'
}

$json = $payload | ConvertTo-Json -Compress
Invoke-RestMethod -Method Post -Uri http://localhost:3000/filmes -ContentType 'application/json' -Body $json
```

### Listar filmes

```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/filmes
```

---

## 🎯 Objetivo do projeto

Este projeto foi criado com foco em:

* Praticar desenvolvimento backend com Node.js + TypeScript
* Entender a estrutura de uma API REST
* Aplicar ORM com Prisma e integração com MySQL
* Servir como base para futuros projetos web
* Construção de portfólio

---

## 📈 Próximos passos

🚧 Melhorar validações
🔐 Implementar autenticação
🌐 Deploy da API

---

## 🤝 Contribuição

Sinta-se livre para contribuir com melhorias!

```bash
# Fork
# Crie uma branch
git checkout -b minha-feature

# Commit
git commit -m "feat: minha melhoria"

# Push
git push origin minha-feature
```

---

## 👨‍💻 Autor

**Leonardo Souza Bezerra**

💼 Em constante evolução como desenvolvedor
🚀 Focado em backend e projetos reais

---

<div align="center">

⭐ Se esse projeto te ajudou, deixe uma estrela!

</div>
