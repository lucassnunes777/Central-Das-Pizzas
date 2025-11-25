# 🔍 Verificar Variáveis Agora - Solução Rápida

## ⚠️ O endpoint de teste ainda não está disponível (404)

Mas podemos verificar as variáveis de outra forma!

---

## ✅ SOLUÇÃO: Usar o Endpoint de Criar Usuários

O endpoint `/api/setup/create-users` agora também mostra as variáveis de ambiente!

### **PASSO 1: Acessar o Endpoint**

Abra no navegador:
```
https://centraldaspizzass.up.railway.app/api/setup/create-users
```

### **PASSO 2: Verificar a Resposta**

Agora a resposta inclui uma seção `environmentCheck`:

```json
{
  "success": true,
  "created": [...],
  "environmentCheck": {
    "hasNextAuthSecret": true/false,
    "hasNextAuthUrl": true/false,
    "hasDatabaseUrl": true/false,
    "nextAuthUrl": "https://centraldaspizzass.up.railway.app" ou "Não configurado",
    "databaseUrlPreview": "✅ URL pública" ou "❌ URL INTERNA (errado!)"
  },
  "loginInstructions": {
    "required": [
      "NEXTAUTH_SECRET: ✅ Configurado ou ❌ FALTANDO",
      "NEXTAUTH_URL: ✅ ... ou ❌ FALTANDO",
      "DATABASE_URL: ✅ URL pública ou ❌ FALTANDO"
    ]
  }
}
```

---

## 🔧 O Que Fazer Baseado no Resultado

### Se `NEXTAUTH_SECRET: ❌ FALTANDO`

1. Gere o secret:
   ```bash
   openssl rand -base64 32
   ```
2. Railway → Serviço "web" → Variables
3. Adicione: `NEXTAUTH_SECRET` = (valor gerado)
4. Redeploy

### Se `NEXTAUTH_URL: ❌ FALTANDO`

1. Railway → Serviço "web" → Variables
2. Adicione: `NEXTAUTH_URL` = `https://centraldaspizzass.up.railway.app`
3. Redeploy

### Se `DATABASE_URL: ❌ URL INTERNA (errado!)`

1. Railway → Serviço PostgreSQL → Variables
2. Copie `DATABASE_PUBLIC_URL`
3. Railway → Serviço "web" → Variables
4. Atualize `DATABASE_URL` com a URL pública
5. Redeploy

---

## 📋 Checklist Rápido

1. [ ] Acessei `/api/setup/create-users`
2. [ ] Vi a seção `environmentCheck`
3. [ ] Verifiquei quais variáveis estão faltando
4. [ ] Adicionei as variáveis faltantes no Railway
5. [ ] Fiz redeploy
6. [ ] Tentei login novamente

---

**Acesse o endpoint e me mostre o resultado do `environmentCheck`!** 🔍

