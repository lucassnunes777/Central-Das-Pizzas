# 🚨 URGENTE: Corrigir DATABASE_URL

## ⚠️ Problema Atual
```
Can't reach database server at `postgres.railway.internal:5432`
```

O `DATABASE_URL` está usando uma URL interna que não funciona!

---

## ✅ SOLUÇÃO RÁPIDA (5 minutos)

### **PASSO 1: Encontrar a URL Correta do PostgreSQL**

1. Acesse o **Railway Dashboard**
2. Clique no serviço **PostgreSQL** (o banco de dados, não o "web")
3. Vá na aba **"Variables"** ou **"Connect"**
4. Procure por uma destas variáveis:
   - `DATABASE_URL`
   - `POSTGRES_URL`
   - `POSTGRES_PRIVATE_URL`
   - `POSTGRES_PUBLIC_URL`

5. **Copie a URL completa** (deve ser algo como):
   ```
   postgresql://postgres:senha@containers-us-west-123.railway.app:5432/railway
   ```

   **OU se tiver múltiplas opções, use a URL PÚBLICA (não a interna)**

---

### **PASSO 2: Adicionar no Serviço Web**

1. No Railway Dashboard, clique no serviço **"web"** (não no PostgreSQL)
2. Vá na aba **"Variables"**
3. Procure por `DATABASE_URL`
4. Se existir, **DELETE e recrie** (pode estar com valor errado)
5. Clique em **"+ New Variable"**
6. **Nome:** `DATABASE_URL`
7. **Valor:** Cole a URL que você copiou do PostgreSQL
8. Clique em **"Add"**

---

### **PASSO 3: Verificar Formato**

A URL deve ter este formato:
```
postgresql://usuario:senha@host-publico:porta/database
```

**✅ CORRETO:**
```
postgresql://postgres:abc123@containers-us-west-123.railway.app:5432/railway
```

**❌ INCORRETO (não funciona):**
```
postgresql://postgres:senha@postgres.railway.internal:5432/railway
```

**❌ INCORRETO (não funciona):**
```
postgresql://postgres:senha@localhost:5432/railway
```

---

### **PASSO 4: Redeploy**

1. Vá em **"Settings"** do serviço "web"
2. Clique em **"Redeploy"**
3. Aguarde 2-3 minutos

---

### **PASSO 5: Testar**

Acesse novamente:
```
https://centraldaspizzass.up.railway.app/api/setup/create-users
```

Agora deve funcionar! ✅

---

## 🔍 Se Não Encontrar a URL no PostgreSQL

### Opção A: Verificar na Aba "Connect"

1. No serviço PostgreSQL, vá em **"Connect"**
2. Procure por **"Connection String"** ou **"Postgres Connection URL"**
3. Copie essa URL

### Opção B: Criar Nova URL

Se não encontrar, você pode construir manualmente:

1. No serviço PostgreSQL, vá em **"Variables"**
2. Anote:
   - `PGHOST` (host público)
   - `PGPORT` (geralmente 5432)
   - `PGDATABASE` (nome do banco)
   - `PGUSER` (geralmente "postgres")
   - `PGPASSWORD` (senha)

3. Monte a URL:
   ```
   postgresql://PGUSER:PGPASSWORD@PGHOST:PGPORT/PGDATABASE
   ```

---

## 📋 Checklist Rápido

- [ ] Acessei o serviço PostgreSQL no Railway
- [ ] Encontrei a URL pública (não a interna)
- [ ] Copiei a URL completa
- [ ] Deletei o `DATABASE_URL` antigo do serviço "web" (se existia)
- [ ] Adicionei o `DATABASE_URL` correto no serviço "web"
- [ ] A URL NÃO contém `postgres.railway.internal`
- [ ] Fiz redeploy
- [ ] Testei `/api/setup/create-users` novamente

---

## 🎯 Resumo em 3 Passos

1. **PostgreSQL** → Variables → Copiar URL pública
2. **Web** → Variables → Adicionar `DATABASE_URL` com a URL copiada
3. **Settings** → Redeploy

---

**Após corrigir, os usuários serão criados com sucesso!** ✅

