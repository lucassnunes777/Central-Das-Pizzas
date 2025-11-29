# 🔐 Verificar Senha do PostgreSQL

## ⚠️ Problema: Autenticação Falhou

Se todas as URLs estão iguais mas ainda dá erro de autenticação, a senha pode estar incorreta ou desatualizada.

---

## ✅ SOLUÇÃO: Verificar Senha no PostgreSQL

### **Opção 1: Verificar PGPASSWORD no PostgreSQL**

1. Railway Dashboard → Serviço **PostgreSQL** → **Variables**
2. Procure por `PGPASSWORD`
3. Essa é a senha real do banco
4. Compare com a senha na sua `DATABASE_URL`

**Se forem diferentes:**
- Use a senha de `PGPASSWORD` na `DATABASE_URL`

---

### **Opção 2: Resetar Senha do PostgreSQL**

Se a senha estiver incorreta:

1. Railway Dashboard → Serviço **PostgreSQL**
2. Vá em **Settings**
3. Procure por opção de **"Reset Password"** ou **"Regenerate"**
4. Isso criará uma nova senha
5. Copie a nova `DATABASE_URL` que será gerada
6. Atualize no serviço "web"

---

### **Opção 3: Usar DATABASE_URL do PostgreSQL Diretamente**

1. Railway Dashboard → Serviço **PostgreSQL** → **Variables**
2. Copie o valor de `DATABASE_URL` (não `DATABASE_PUBLIC_URL`)
3. Cole no serviço "web" como `DATABASE_URL`

**Importante:** Use a `DATABASE_URL` do PostgreSQL, não crie manualmente.

---

## 🔍 Verificar se a URL está Correta

A URL deve ter este formato:
```
postgresql://postgres:SENHA@trolley.proxy.rlwy.net:54804/railway
```

**Verifique:**
- ✅ Usuário: `postgres`
- ✅ Senha: Deve ser a mesma de `PGPASSWORD`
- ✅ Host: `trolley.proxy.rlwy.net`
- ✅ Porta: `54804`
- ✅ Database: `railway` (não `ferrovia`)

---

## 🚨 Se Nada Funcionar

1. **Deletar e recriar o PostgreSQL:**
   - Railway → Serviço PostgreSQL → Settings → Delete
   - Crie um novo PostgreSQL
   - Copie a nova `DATABASE_URL`
   - Configure no serviço "web"

2. **Verificar se o PostgreSQL está rodando:**
   - Railway → Serviço PostgreSQL
   - Deve estar "Active" ou "Running"

---

## 📋 Checklist

- [ ] Verifiquei `PGPASSWORD` no PostgreSQL
- [ ] Comparei com a senha na `DATABASE_URL`
- [ ] Usei a `DATABASE_URL` diretamente do PostgreSQL
- [ ] Fiz redeploy após alterar
- [ ] Testei `/api/setup/create-users` novamente

---

**Se todas as URLs estão iguais mas ainda dá erro, a senha pode estar incorreta. Verifique `PGPASSWORD` no PostgreSQL!**

