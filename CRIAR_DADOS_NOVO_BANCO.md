# 🚀 Criar Dados no Novo Banco (Banco Vazio)

## ⚠️ SITUAÇÃO

- ✅ Novo banco criado
- ✅ `DATABASE_URL` configurada no serviço "web"
- ❌ Banco está **vazio** (sem dados)
- ❌ Erro de autenticação (senha pode estar incorreta)

---

## ✅ SOLUÇÃO: Verificar Senha e Criar Dados

### **PASSO 1: Verificar Senha do Novo Banco**

1. Railway Dashboard → **Novo banco PostgreSQL** → Aba **"Variables"**
2. Procure por `PGPASSWORD`
3. **Copie a senha exata** (pode estar mascarada, clique no ícone de olho para ver)

### **PASSO 2: Verificar/Corrigir DATABASE_URL**

1. Railway Dashboard → Serviço **"web"** → Aba **"Variables"**
2. Clique em `DATABASE_URL` para editar
3. **Compare a senha** na URL com a senha de `PGPASSWORD`
4. Se forem diferentes, **corrija a senha** na `DATABASE_URL`
5. **Salve**

**A URL deve ser:**
```
postgresql://postgres:SENHA_CORRETA@turntable.proxy.rlwy.net:42626/railway
```

### **PASSO 3: Fazer Redeploy**

1. Railway → Serviço "web" → **Settings** → **Redeploy**
2. Aguarde 2-3 minutos

### **PASSO 4: Criar Usuários**

Após o deploy, acesse:
```
https://centraldaspizzass.up.railway.app/api/setup/create-users
```

Deve criar os usuários sem erros.

### **PASSO 5: Popular Cardápio**

Acesse:
```
https://centraldaspizzass.up.railway.app/api/setup/populate-menu
```

### **PASSO 6: Popular Pizzas**

Acesse:
```
https://centraldaspizzass.up.railway.app/api/setup/populate-pizzas
```

---

## 🔍 SE AINDA DER ERRO DE AUTENTICAÇÃO

### **Verificar se a Senha Está Correta:**

1. **No novo banco PostgreSQL:**
   - Aba **"Variables"**
   - Veja `PGPASSWORD` (senha real)

2. **No serviço "web":**
   - Aba **"Variables"**
   - Veja `DATABASE_URL`
   - A senha na URL deve ser **exatamente igual** a `PGPASSWORD`

3. **Se forem diferentes:**
   - Edite `DATABASE_URL`
   - Substitua a senha pela senha de `PGPASSWORD`
   - Salve
   - Faça redeploy

---

## 📋 CHECKLIST

- [ ] `PGPASSWORD` do novo banco verificado
- [ ] `DATABASE_URL` no serviço "web" tem senha correta
- [ ] Redeploy realizado
- [ ] Usuários criados via `/api/setup/create-users`
- [ ] Cardápio populado via `/api/setup/populate-menu`
- [ ] Pizzas populadas via `/api/setup/populate-pizzas`
- [ ] Login testado e funcionando

---

## 🎯 RESUMO

Como o banco está vazio, não precisa transferir dados. Basta:
1. ✅ Verificar se a senha está correta
2. ✅ Criar dados do zero via APIs
3. ✅ Pronto!

---

**Verifique a senha e crie os dados via APIs - é mais rápido que transferir!** ✅

