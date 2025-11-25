# 🔧 RESOLVER ERRO 401 - PASSO A PASSO

## ⚠️ Problema
Erro `401 (Unauthorized)` ao tentar fazer login em:
```
https://centraldaspizzass.up.railway.app/auth/signin
```

---

## ✅ SOLUÇÃO COMPLETA

### **PASSO 1: Criar Usuários no Banco de Dados**

**IMPORTANTE:** Isso deve ser feito PRIMEIRO!

1. Abra uma nova aba no navegador
2. Acesse:
   ```
   https://centraldaspizzass.up.railway.app/api/setup/create-users
   ```
3. Você deve ver uma resposta JSON como:
   ```json
   {
     "success": true,
     "created": [...],
     "existing": [...],
     "credentials": {...}
   }
   ```
4. Se aparecer erro, verifique os logs do Railway

---

### **PASSO 2: Verificar Variáveis de Ambiente no Railway**

1. Acesse o **Railway Dashboard**
2. Clique no serviço **"web"**
3. Vá na aba **"Variables"**
4. Verifique se existem estas 3 variáveis:

#### ✅ Variável 1: `NEXTAUTH_URL`
- **Nome:** `NEXTAUTH_URL`
- **Valor:** `https://centraldaspizzass.up.railway.app`
- **Status:** ⚠️ OBRIGATÓRIO

#### ✅ Variável 2: `NEXTAUTH_SECRET`
- **Nome:** `NEXTAUTH_SECRET`
- **Valor:** (gerar com comando abaixo)
- **Status:** ⚠️ OBRIGATÓRIO

**Como gerar:**
```bash
openssl rand -base64 32
```
Copie o resultado e cole como valor da variável.

#### ✅ Variável 3: `DATABASE_URL`
- **Nome:** `DATABASE_URL`
- **Valor:** `postgresql://postgres:...@postgres.railway.internal:5432/railway`
- **Status:** ⚠️ OBRIGATÓRIO

---

### **PASSO 3: Adicionar Variáveis Faltantes**

Se alguma variável não existir:

1. Clique em **"+ New Variable"**
2. Digite o **Nome** (ex: `NEXTAUTH_SECRET`)
3. Digite o **Valor**
4. Clique em **"Add"**
5. Repita para todas as variáveis faltantes

---

### **PASSO 4: Fazer Redeploy**

Após adicionar/verificar as variáveis:

1. Vá em **"Settings"** do serviço
2. Role até **"Redeploy"**
3. Clique em **"Redeploy"**
4. Aguarde o deploy terminar (pode levar 2-3 minutos)

---

### **PASSO 5: Verificar Logs (Opcional)**

Para ver o que está acontecendo:

1. Vá em **"Deployments"**
2. Clique no último deploy
3. Veja os logs

Você deve ver mensagens como:
- `✅ Login bem-sucedido: admin@centraldaspizzas.com`
- `❌ Usuário não encontrado: ...`
- `❌ Senha inválida para: ...`

---

### **PASSO 6: Tentar Login Novamente**

1. Acesse:
   ```
   https://centraldaspizzass.up.railway.app/auth/signin
   ```
2. Use as credenciais:
   - **Email:** `admin@centraldaspizzas.com`
   - **Senha:** `123456`
3. Clique em **"Entrar"**

---

## 📋 CHECKLIST COMPLETO

Marque cada item conforme for completando:

- [ ] **Passo 1:** Acessei `/api/setup/create-users` e vi resposta de sucesso
- [ ] **Passo 2:** Verifiquei que `NEXTAUTH_URL` existe e está correto
- [ ] **Passo 2:** Verifiquei que `NEXTAUTH_SECRET` existe (gerado com openssl)
- [ ] **Passo 2:** Verifiquei que `DATABASE_URL` existe e está correto
- [ ] **Passo 4:** Fiz redeploy após verificar/adicionar variáveis
- [ ] **Passo 6:** Tentei fazer login e funcionou

---

## 🔍 DIAGNÓSTICO RÁPIDO

Execute este script localmente para diagnosticar:

```bash
node scripts/diagnostico-login.js
```

Isso vai verificar:
- ✅ Se a API está online
- ✅ Se os usuários foram criados
- ✅ Se o login está funcionando

---

## ❓ PROBLEMAS COMUNS

### Problema: "Usuários não foram criados"
**Solução:** Acesse `/api/setup/create-users` novamente

### Problema: "NEXTAUTH_SECRET não configurado"
**Solução:** Gere com `openssl rand -base64 32` e adicione no Railway

### Problema: "DATABASE_URL não configurado"
**Solução:** Adicione a URL do PostgreSQL do Railway

### Problema: "Ainda dá erro 401"
**Solução:** 
1. Verifique os logs do Railway
2. Confirme que todas as variáveis estão corretas
3. Faça redeploy novamente
4. Aguarde 2-3 minutos após o deploy

---

## 🎯 RESUMO RÁPIDO

1. **Criar usuários:** `https://centraldaspizzass.up.railway.app/api/setup/create-users`
2. **Configurar variáveis:** Railway Dashboard → Variables
3. **Redeploy:** Settings → Redeploy
4. **Login:** `https://centraldaspizzass.up.railway.app/auth/signin`

---

**Siga esses passos na ordem e o erro 401 será resolvido!** ✅

