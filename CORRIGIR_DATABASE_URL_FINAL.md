# 🚨 CORRIGIR DATABASE_URL - URGENTE!

## ✅ Status Atual (do seu teste)

- ✅ `NEXTAUTH_SECRET`: Configurado
- ✅ `NEXTAUTH_URL`: Configurado corretamente
- ❌ `DATABASE_URL`: **URL INTERNA (errado!)**

---

## 🔧 SOLUÇÃO: Corrigir DATABASE_URL

### **PASSO 1: Copiar a URL Pública**

Você já encontrou a URL pública antes:
```
postgresql://postgres:XckYAceZBmzqXmJAGDdTSiYevwZkVgTO@trolley.proxy.rlwy.net:54804/railway
```

**Essa é a URL correta!** ✅

---

### **PASSO 2: Atualizar no Serviço "web"**

1. **Railway Dashboard** → Clique no serviço **"web"** (não no PostgreSQL)
2. Vá na aba **"Variables"**
3. Procure por `DATABASE_URL`
4. **Clique no ícone de editar** (ou delete e recrie)
5. **Substitua o valor** por:
   ```
   postgresql://postgres:XckYAceZBmzqXmJAGDdTSiYevwZkVgTO@trolley.proxy.rlwy.net:54804/railway
   ```
6. **Salve** (ou clique em "Add" se recriou)

---

### **PASSO 3: Verificar**

A URL deve ter:
- ✅ Host: `trolley.proxy.rlwy.net` (público)
- ✅ Porta: `54804`
- ❌ **NÃO pode ter:** `postgres.railway.internal`

---

### **PASSO 4: Redeploy Obrigatório**

1. Vá em **Settings** do serviço "web"
2. Clique em **Redeploy**
3. Aguarde 2-3 minutos

---

### **PASSO 5: Testar Novamente**

Após o redeploy, acesse:
```
https://centraldaspizzass.up.railway.app/api/setup/create-users
```

Agora deve mostrar:
- ✅ `DATABASE_URL: ✅ URL pública`
- ✅ Usuários criados sem erros

---

## 📋 Checklist

- [ ] Acessei Railway → Serviço "web" → Variables
- [ ] Encontrei `DATABASE_URL`
- [ ] Substituí pela URL pública: `postgresql://postgres:XckYAceZBmzqXmJAGDdTSiYevwZkVgTO@trolley.proxy.rlwy.net:54804/railway`
- [ ] Verifiquei que não tem `postgres.railway.internal`
- [ ] Fiz redeploy
- [ ] Testei `/api/setup/create-users` novamente
- [ ] Agora mostra `✅ URL pública`

---

## 🎯 Resumo

**O problema:** `DATABASE_URL` está usando URL interna que não funciona.

**A solução:** Substituir pela URL pública que você já encontrou.

**A URL correta:**
```
postgresql://postgres:XckYAceZBmzqXmJAGDdTSiYevwZkVgTO@trolley.proxy.rlwy.net:54804/railway
```

---

**Substitua o DATABASE_URL e faça redeploy! Depois o login vai funcionar!** ✅

