# 🔧 CORRIGIR: Erro de Conexão com Banco de Dados

## ⚠️ Problema
```
Can't reach database server at `postgres.railway.internal:5432`
```

Isso significa que o `DATABASE_URL` está incorreto ou o PostgreSQL não está acessível.

---

## ✅ SOLUÇÃO

### **PASSO 1: Verificar URL do PostgreSQL no Railway**

1. Acesse o **Railway Dashboard**
2. Clique no serviço **PostgreSQL** (não no "web")
3. Vá na aba **"Variables"**
4. Procure por `DATABASE_URL` ou `POSTGRES_URL`
5. **Copie a URL completa**

A URL deve ser algo como:
```
postgresql://postgres:senha@containers-us-west-xxx.railway.app:5432/railway
```

**NÃO use:** `postgres.railway.internal` (essa só funciona internamente)

---

### **PASSO 2: Adicionar DATABASE_URL no Serviço Web**

1. No Railway Dashboard, clique no serviço **"web"** (não no PostgreSQL)
2. Vá na aba **"Variables"**
3. Procure por `DATABASE_URL`
4. Se não existir, clique em **"+ New Variable"**
5. **Nome:** `DATABASE_URL`
6. **Valor:** Cole a URL que você copiou do serviço PostgreSQL
7. Clique em **"Add"**

---

### **PASSO 3: Verificar Formato da URL**

A URL deve ter este formato:
```
postgresql://usuario:senha@host:porta/database
```

**Exemplo correto:**
```
postgresql://postgres:senha123@containers-us-west-123.railway.app:5432/railway
```

**Exemplo INCORRETO (não funciona):**
```
postgresql://postgres:senha@postgres.railway.internal:5432/railway
```

---

### **PASSO 4: Fazer Redeploy**

1. Vá em **"Settings"** do serviço "web"
2. Clique em **"Redeploy"**
3. Aguarde 2-3 minutos

---

### **PASSO 5: Testar Conexão**

Após o redeploy, acesse novamente:
```
https://centraldaspizzass.up.railway.app/api/setup/create-users
```

Agora deve funcionar e criar os usuários!

---

## 🔍 Verificar se o PostgreSQL está Rodando

1. No Railway Dashboard, clique no serviço **PostgreSQL**
2. Verifique se está **"Active"** ou **"Running"**
3. Se estiver parado, clique em **"Start"**

---

## 📋 Checklist

- [ ] Encontrei a URL do PostgreSQL no serviço PostgreSQL
- [ ] Copiei a URL completa (não a interna)
- [ ] Adicionei `DATABASE_URL` no serviço "web"
- [ ] A URL não contém `postgres.railway.internal`
- [ ] Fiz redeploy do serviço "web"
- [ ] Testei `/api/setup/create-users` novamente

---

## 🎯 Resumo Rápido

1. **Railway Dashboard** → Serviço **PostgreSQL** → **Variables** → Copiar `DATABASE_URL`
2. **Railway Dashboard** → Serviço **"web"** → **Variables** → Adicionar `DATABASE_URL`
3. **Settings** → **Redeploy**
4. Testar: `https://centraldaspizzass.up.railway.app/api/setup/create-users`

---

**Após corrigir o DATABASE_URL, os usuários serão criados com sucesso!** ✅

