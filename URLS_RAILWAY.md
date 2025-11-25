# 🔗 URLs do Sistema - Railway

## 🌐 URL Principal
```
https://centraldaspizzass.up.railway.app
```

## 📋 URLs Importantes

### 🔐 Autenticação
- **Login:** https://centraldaspizzass.up.railway.app/auth/signin
- **Cadastro:** https://centraldaspizzass.up.railway.app/auth/signup

### ⚙️ Configuração
- **Criar Usuários:** https://centraldaspizzass.up.railway.app/api/setup/create-users
- **Ver Credenciais:** https://centraldaspizzass.up.railway.app/credentials
- **Health Check:** https://centraldaspizzass.up.railway.app/api/health

### 📱 WhatsApp (IA Mila)
- **Webhook:** https://centraldaspizzass.up.railway.app/api/whatsapp/webhook
- **Menu:** https://centraldaspizzass.up.railway.app/api/whatsapp/menu

---

## 🔧 Variáveis de Ambiente Necessárias

No Railway Dashboard, configure:

```env
NEXTAUTH_URL=https://centraldaspizzass.up.railway.app
NEXTAUTH_SECRET=<gerar-com-openssl-rand-base64-32>
DATABASE_URL=postgresql://postgres:...@postgres.railway.internal:5432/railway
```

---

## 🚀 Primeiros Passos

1. **Criar Usuários:**
   ```
   https://centraldaspizzass.up.railway.app/api/setup/create-users
   ```

2. **Fazer Login:**
   ```
   https://centraldaspizzass.up.railway.app/auth/signin
   ```
   - Email: `admin@centraldaspizzas.com`
   - Senha: `123456`

---

**Tudo pronto para usar!** ✅

