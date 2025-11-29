# ✅ Verificação de Variáveis de Ambiente - PASSO A PASSO

## 🔍 O QUE VERIFICAR

Baseado na sua tela do Railway, você está vendo as variáveis do **PostgreSQL**. Agora precisamos verificar o **serviço web** (aplicação).

---

## 📋 CHECKLIST DE VERIFICAÇÃO

### **1️⃣ Verificar DATABASE_URL no Serviço Web**

Você viu no PostgreSQL:
- `URL_PÚBLICA_DO_BANCO_DE_DADOS`: `postgresql://postgres:...@trolley.proxy.rlwy.net:54804/railway`

**Agora faça:**

1. No Railway, clique no serviço **"web"** (não no PostgreSQL)
2. Vá na aba **"Variáveis"**
3. Procure por `DATABASE_URL`
4. **Deve conter:** A URL pública que você viu acima:
   ```
   postgresql://postgres:XckYAceZBmzqXmJAGDdTSiYevwZkVgT0@trolley.proxy.rlwy.net:54804/railway
   ```

**❌ Se não existir ou estiver diferente:**
- Clique em **"+ Nova variável"**
- **Nome:** `DATABASE_URL`
- **Valor:** Cole a `URL_PÚBLICA_DO_BANCO_DE_DADOS` do PostgreSQL
- Clique em **"Adicionar"**

---

### **2️⃣ Verificar NEXTAUTH_URL**

No serviço **"web"**, verifique:

1. Procure por `NEXTAUTH_URL`
2. **Deve ser:** A URL pública do seu sistema
   - Se estiver no Railway: `https://seu-projeto.up.railway.app`
   - Se tiver domínio: `https://www.centraldaspizzas.com`

**❌ NUNCA deve ser:**
- `http://localhost:3000` ❌
- `https://localhost:3000` ❌

**✅ Se não existir:**
- Clique em **"+ Nova variável"**
- **Nome:** `NEXTAUTH_URL`
- **Valor:** `https://seu-projeto.up.railway.app` (substitua pela URL real)
- Clique em **"Adicionar"**

---

### **3️⃣ Verificar NEXTAUTH_SECRET**

No serviço **"web"**, verifique:

1. Procure por `NEXTAUTH_SECRET`
2. **Deve existir** e ter um valor (geralmente uma string longa)

**❌ Se não existir:**

**Gerar o secret:**
```bash
openssl rand -base64 32
```

**Adicionar no Railway:**
- Clique em **"+ Nova variável"**
- **Nome:** `NEXTAUTH_SECRET`
- **Valor:** Cole o resultado do comando acima
- Clique em **"Adicionar"**

---

## 🎯 RESUMO DO QUE VERIFICAR NO SERVIÇO WEB

No serviço **"web"** (não no PostgreSQL), você deve ter:

| Variável | Status | Valor Esperado |
|----------|--------|----------------|
| `DATABASE_URL` | ✅ | `postgresql://postgres:...@trolley.proxy.rlwy.net:54804/railway` |
| `NEXTAUTH_URL` | ✅ | `https://seu-projeto.up.railway.app` |
| `NEXTAUTH_SECRET` | ✅ | String gerada com `openssl rand -base64 32` |

---

## 🚨 PROBLEMA COMUM

**Se você só configurou no PostgreSQL mas não no serviço web:**
- O serviço web não consegue acessar o banco de dados
- O NextAuth não consegue autenticar usuários
- Resultado: "Credenciais incorretas" em outros dispositivos

**Solução:** Configure as variáveis no serviço **"web"** também!

---

## ✅ APÓS VERIFICAR/CORRIGIR

1. **Fazer Redeploy:**
   - No serviço "web", vá em **"Configurações"**
   - Clique em **"Redeploy"**
   - Aguarde 2-3 minutos

2. **Testar:**
   - Acesse: `https://seu-projeto.up.railway.app/api/health`
   - Deve mostrar: `✅ Variáveis de ambiente configuradas corretamente`

3. **Testar Login:**
   - Tente fazer login no celular
   - Tente fazer login em outro PC
   - Deve funcionar agora!

---

## 📝 NOTA IMPORTANTE

**Você está vendo as variáveis do PostgreSQL**, mas o problema está no **serviço web**. 

As variáveis precisam estar configuradas em **AMBOS** os serviços:
- ✅ PostgreSQL: Já está configurado (você está vendo)
- ⚠️ Serviço Web: Precisa verificar agora!

---

**Siga esses passos e o problema será resolvido!** ✅
