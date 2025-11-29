# 🔧 Solução: Credenciais Incorretas em Outros Dispositivos

## ⚠️ Problema

O login funciona no seu computador, mas em **celular e outros PCs** aparece "credenciais incorretas".

## 🔍 Causa do Problema

Isso geralmente acontece por problemas nas **variáveis de ambiente**, especialmente:

1. **`NEXTAUTH_URL`** configurado incorretamente (ex: `localhost` ou domínio errado)
2. **`NEXTAUTH_SECRET`** ausente ou diferente entre ambientes
3. **Cookies** não configurados para funcionar em outros dispositivos

---

## ✅ SOLUÇÃO PASSO A PASSO

### **PASSO 1: Verificar NEXTAUTH_URL**

A variável `NEXTAUTH_URL` **DEVE** ser a URL pública do seu sistema, não `localhost`.

#### Se estiver no Railway:
```
NEXTAUTH_URL=https://centraldaspizzass.up.railway.app
```

#### Se tiver domínio customizado:
```
NEXTAUTH_URL=https://www.centraldaspizzas.com
```

#### ❌ NUNCA use:
```
NEXTAUTH_URL=http://localhost:3000  ❌ (não funciona em outros dispositivos)
NEXTAUTH_URL=https://localhost:3000  ❌ (não funciona em outros dispositivos)
```

**Como verificar:**
1. Acesse o Railway Dashboard
2. Vá em **Variables** do serviço "web"
3. Procure por `NEXTAUTH_URL`
4. Verifique se está com a URL pública correta

---

### **PASSO 2: Verificar NEXTAUTH_SECRET**

O `NEXTAUTH_SECRET` é **OBRIGATÓRIO** e deve ser o mesmo em todos os ambientes.

**Como verificar:**
1. No Railway Dashboard, vá em **Variables**
2. Procure por `NEXTAUTH_SECRET`
3. Se não existir, você precisa criar:

**Como gerar:**
```bash
openssl rand -base64 32
```

**Como adicionar no Railway:**
1. Railway Dashboard → Serviço "web" → **Variables**
2. Clique em **"+ New Variable"**
3. **Nome:** `NEXTAUTH_SECRET`
4. **Valor:** Cole o resultado do comando acima
5. Clique em **"Add"**

---

### **PASSO 3: Verificar DATABASE_URL**

Certifique-se de que o banco de dados está acessível:

1. Railway Dashboard → Serviço **PostgreSQL** → **Variables**
2. Copie a `DATABASE_URL` completa
3. Railway Dashboard → Serviço **"web"** → **Variables**
4. Verifique se `DATABASE_URL` está configurada (deve ser a URL pública, não `postgres.railway.internal`)

---

### **PASSO 4: Fazer Redeploy**

Após corrigir as variáveis:

1. Railway Dashboard → Serviço "web" → **Settings**
2. Clique em **"Redeploy"**
3. Aguarde 2-3 minutos

---

### **PASSO 5: Testar em Outros Dispositivos**

1. **No celular:**
   - Abra o navegador
   - Acesse a URL pública (ex: `https://centraldaspizzass.up.railway.app`)
   - Tente fazer login

2. **Em outro PC:**
   - Abra o navegador
   - Acesse a URL pública
   - Tente fazer login

---

## 🔍 Verificar se Está Funcionando

### Teste 1: Verificar Variáveis
Acesse no navegador (em qualquer dispositivo):
```
https://centraldaspizzass.up.railway.app/api/health
```

Deve retornar informações sobre as variáveis configuradas.

### Teste 2: Verificar Credenciais
Acesse:
```
https://centraldaspizzass.up.railway.app/credentials
```

Deve mostrar as credenciais disponíveis.

### Teste 3: Criar Usuários (se necessário)
Se os usuários não existirem:
```
https://centraldaspizzass.up.railway.app/api/setup/create-users
```

---

## 📋 Checklist Completo

- [ ] `NEXTAUTH_URL` configurado com URL pública (não localhost)
- [ ] `NEXTAUTH_SECRET` existe e tem valor
- [ ] `DATABASE_URL` configurado corretamente
- [ ] Redeploy realizado após alterações
- [ ] Testado no celular
- [ ] Testado em outro PC
- [ ] Usuários criados no banco de dados

---

## 🚨 Problemas Comuns

### Problema 1: "Ainda dá erro em outros dispositivos"

**Solução:**
1. Limpe o cache do navegador no celular/outro PC
2. Use modo anônimo/privado para testar
3. Verifique se está acessando a URL correta (não localhost)

### Problema 2: "Funciona no PC mas não no celular"

**Solução:**
1. Verifique se `NEXTAUTH_URL` está com `https://` (não `http://`)
2. Certifique-se de que o domínio está acessível publicamente
3. Verifique se não há firewall bloqueando

### Problema 3: "Cookies não funcionam"

**Solução:**
A configuração de cookies foi atualizada no código. Certifique-se de:
1. Fazer redeploy após as alterações
2. Usar `https://` em produção
3. Não usar `localhost` em `NEXTAUTH_URL`

---

## 🎯 Resumo Rápido

1. **Railway Dashboard** → Serviço "web" → **Variables**
2. Verifique `NEXTAUTH_URL` = URL pública (ex: `https://centraldaspizzass.up.railway.app`)
3. Verifique `NEXTAUTH_SECRET` existe (se não, gere com `openssl rand -base64 32`)
4. **Settings** → **Redeploy**
5. Teste em celular e outros PCs

---

**Após seguir esses passos, o login deve funcionar em todos os dispositivos!** ✅

