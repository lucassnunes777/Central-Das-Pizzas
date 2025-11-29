# 🔐 Corrigir Senha na DATABASE_URL

## ✅ SENHA CORRETA DO NOVO BANCO

```
UJqXvFOCZDGJHVKWdeaOGghwimBOoYIs
```

**Importante:** Todas as letras são **O** (letra O), não zeros!

---

## 🔧 CORRIGIR NO RAILWAY

### **PASSO 1: Editar DATABASE_URL**

1. Railway Dashboard → Serviço **"web"** → Aba **"Variables"**
2. Clique em `DATABASE_URL` para editar
3. **Substitua a senha** pela senha correta
4. A URL completa deve ser:
   ```
   postgresql://postgres:UJqXvFOCZDGJHVKWdeaOGghwimBOoYIs@turntable.proxy.rlwy.net:42626/railway
   ```
5. **Salve**

### **PASSO 2: Fazer Redeploy**

1. Railway → Serviço "web" → **Settings** → **Redeploy**
2. Aguarde 2-3 minutos

### **PASSO 3: Testar**

Após o deploy, acesse:
```
https://centraldaspizzass.up.railway.app/api/setup/create-users
```

Deve funcionar sem erros de autenticação!

---

## 📋 URL COMPLETA CORRETA

```
postgresql://postgres:UJqXvFOCZDGJHVKWdeaOGghwimBOoYIs@turntable.proxy.rlwy.net:42626/railway
```

**Copie e cole esta URL completa na DATABASE_URL do serviço "web"!**

---

## ✅ APÓS CORRIGIR

1. **Criar usuários:**
   ```
   https://centraldaspizzass.up.railway.app/api/setup/create-users
   ```

2. **Popular cardápio:**
   ```
   https://centraldaspizzass.up.railway.app/api/setup/populate-menu
   ```

3. **Popular pizzas:**
   ```
   https://centraldaspizzass.up.railway.app/api/setup/populate-pizzas
   ```

---

**Use a senha correta e tudo vai funcionar!** ✅

