# ⚡ Setup Rápido Railway - Central Das Pizzas

## 🚨 Erro: DATABASE_URL não encontrado

### ✅ Solução em 3 Passos

#### 1️⃣ Criar Banco PostgreSQL

No Railway:
1. Clique em **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Aguarde criação (alguns segundos)

#### 2️⃣ Copiar e Adicionar DATABASE_URL

1. **Copiar:**
   - Clique no banco criado
   - Aba **"Variables"**
   - Copie `DATABASE_URL`

2. **Adicionar no serviço web:**
   - Volte para serviço **"web"**
   - **"Variables"** → **"New Variable"**
   - Name: `DATABASE_URL`
   - Value: Cole o valor copiado
   - **"Add"**

#### 3️⃣ Fazer Redeploy

1. **"Deployments"**
2. Clique nos **3 pontos** (⋯)
3. **"Redeploy"**

## ✅ Pronto!

O Railway vai:
- ✅ Gerar Prisma Client
- ✅ Criar tabelas automaticamente (`npm run railway:start` faz `db:push`)
- ✅ Iniciar o servidor

## 📋 Após Deploy

### Criar Usuários Iniciais

Acesse:
```
https://www.centraldaspizzas.com/api/setup/create-users
```

Ou:
```
https://seu-projeto.up.railway.app/api/setup/create-users
```

## 🔧 Variáveis Adicionais (Opcional)

Se precisar, adicione também:

```
NEXTAUTH_URL=https://www.centraldaspizzas.com
NEXTAUTH_SECRET=[gerar com: openssl rand -base64 32]
OPENAI_API_KEY=[sua-chave-openai]
```

---

**Depois de adicionar DATABASE_URL, faça redeploy!** 🚀

