# 🔧 Variáveis de Ambiente para Vercel

## 📋 Lista Completa de Variáveis

Copie e cole estas variáveis no painel do Vercel em: **Settings → Environment Variables**

---

## ✅ OBRIGATÓRIAS

### Database
```
DATABASE_URL=postgresql://usuario:senha@host:5432/central_das_pizzas?schema=public
```
**Nota:** No Vercel, use PostgreSQL. Crie um banco no Railway, Supabase ou Neon.

### NextAuth
```
NEXTAUTH_URL=https://centraldaspizzas.com
NEXTAUTH_SECRET=gerar-com-openssl-rand-base64-32
```
**Como gerar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## 🤖 IA e WhatsApp (Obrigatórias para Mila)

### OpenAI API
```
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
```

### Evolution API (Recomendado)
```
EVOLUTION_API_URL=https://api.evolution-api.com
EVOLUTION_API_KEY=sua-evolution-api-key-aqui
EVOLUTION_INSTANCE_NAME=central-das-pizzas
```

### OU WhatsApp Business API (Alternativa)
```
WHATSAPP_PHONE_NUMBER_ID=123456789
WHATSAPP_ACCESS_TOKEN=seu-access-token-aqui
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789
```

### Webhook WhatsApp
```
WHATSAPP_WEBHOOK_TOKEN=seu-token-secreto-aleatorio-aqui
```

---

## ⚙️ OPCIONAIS (mas recomendadas)

### iFood API
```
IFOOD_API_URL=https://api.ifood.com.br
IFOOD_API_KEY=sua-ifood-api-key
IFOOD_MERCHANT_ID=seu-merchant-id
```

### Cloudinary (Upload de Imagens)
```
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
```

### Impressora
```
PRINTER_IP=192.168.1.100
PRINTER_PORT=9100
```

### Configurações da Loja
```
RESTAURANT_NAME=Central das Pizzas Av Sul
RESTAURANT_ADDRESS=Av. Sul, 104 - Verdes Horizontes, Camaçari - BA, 42810-021
RESTAURANT_PHONE=(71) 99156-5893
RESTAURANT_EMAIL=contato@centraldaspizzas.com
DELIVERY_ESTIMATE=35 - 70min
OPENING_HOURS=Seg-Dom: 18h-23h
DELIVERY_FEE=5.00
MIN_ORDER_VALUE=25.00
```

---

## 📝 Como Adicionar no Vercel

### Método 1: Via Dashboard (Recomendado)

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Clique em **Add New**
5. Adicione cada variável:
   - **Name:** Nome da variável (ex: `DATABASE_URL`)
   - **Value:** Valor da variável
   - **Environment:** Selecione:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
6. Clique em **Save**
7. Repita para todas as variáveis

### Método 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Adicionar variáveis
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add OPENAI_API_KEY production
# ... repita para todas
```

---

## 🔐 Variáveis Sensíveis

**NUNCA** commite estas variáveis no Git:
- ❌ `DATABASE_URL`
- ❌ `NEXTAUTH_SECRET`
- ❌ `OPENAI_API_KEY`
- ❌ `EVOLUTION_API_KEY`
- ❌ `WHATSAPP_ACCESS_TOKEN`
- ❌ `CLOUDINARY_API_SECRET`

---

## ✅ Checklist para Deploy

- [ ] `DATABASE_URL` configurada (PostgreSQL)
- [ ] `NEXTAUTH_URL` = URL do Vercel
- [ ] `NEXTAUTH_SECRET` gerado e configurado
- [ ] `OPENAI_API_KEY` configurada
- [ ] `EVOLUTION_API_KEY` configurada (ou WhatsApp Business)
- [ ] `WHATSAPP_WEBHOOK_TOKEN` configurado
- [ ] Banco de dados criado e migrado
- [ ] Todas as variáveis adicionadas no Vercel

---

## 🚀 Após Adicionar Variáveis

1. **Redeploy** o projeto:
   ```bash
   vercel --prod
   ```
   Ou via Dashboard: **Deployments** → **Redeploy**

2. **Verificar logs:**
   ```bash
   vercel logs
   ```

3. **Testar endpoints:**
   - `https://centraldaspizzas.com/api/health`
   - `https://centraldaspizzas.com/api/whatsapp/menu`

---

## 📚 Links Úteis

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Documentação Vercel:** https://vercel.com/docs
- **Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables

---

**Última atualização:** Novembro 2024

