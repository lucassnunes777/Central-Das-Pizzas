# 🔧 Solução: Erro 401 ao Fazer Login

## ⚠️ Problema
Erro 401 (Unauthorized) ao tentar fazer login.

## ✅ Solução Passo a Passo

### 1️⃣ **Criar Usuários no Banco de Dados**

**IMPORTANTE:** Os usuários precisam ser criados primeiro!

Acesse no navegador:
```
https://centraldaspizzass.up.railway.app/api/setup/create-users
```

Ou se o domínio customizado estiver configurado:
```
https://www.centraldaspizzas.com/api/setup/create-users
```

Você deve ver uma resposta JSON com os usuários criados.

### 2️⃣ **Verificar Variáveis de Ambiente no Railway**

Certifique-se de que estas variáveis estão configuradas:

1. Acesse o Railway Dashboard
2. Vá em **Variables** do serviço "web"
3. Verifique se existe:
   - `NEXTAUTH_SECRET` (obrigatório!)
   - `NEXTAUTH_URL` = `https://centraldaspizzass.up.railway.app` (ou `https://www.centraldaspizzas.com` se domínio customizado)
   - `DATABASE_URL` = `postgresql://postgres:...@postgres.railway.internal:5432/railway`

### 3️⃣ **Gerar NEXTAUTH_SECRET (se não tiver)**

Execute no terminal:
```bash
openssl rand -base64 32
```

Copie o resultado e adicione como `NEXTAUTH_SECRET` no Railway.

### 4️⃣ **Fazer Redeploy**

Após adicionar as variáveis:
1. Vá em **Settings** do serviço
2. Clique em **Redeploy**

### 5️⃣ **Tentar Login Novamente**

Use as credenciais:
- **Email:** `admin@centraldaspizzas.com`
- **Senha:** `123456`

---

## 🔍 Verificar Logs

Se ainda não funcionar, verifique os logs do Railway:
1. Vá em **Deployments**
2. Clique no último deploy
3. Veja os logs para identificar o erro

Os logs agora mostram:
- ✅ Se o usuário foi encontrado
- ✅ Se a senha está correta
- ❌ Qualquer erro específico

---

## 📋 Checklist

- [ ] Usuários criados via `/api/setup/create-users`
- [ ] `NEXTAUTH_SECRET` configurado no Railway
- [ ] `NEXTAUTH_URL` configurado no Railway
- [ ] `DATABASE_URL` configurado no Railway
- [ ] Redeploy realizado
- [ ] Tentativa de login com credenciais corretas

---

**Após seguir todos os passos, o login deve funcionar!** ✅

