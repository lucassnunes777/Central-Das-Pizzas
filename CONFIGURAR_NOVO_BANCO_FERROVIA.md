# 🗄️ Configurar Novo Banco - Guia Completo

## 📋 Informações do Novo Banco

- **Database**: `railway` (padrão do Railway)
- **User**: `postgres`
- **Password**: `ugxyXIugblBPQunDiEpEegPNTU1FyGMx`
- **URL Pública**: `postgresql://postgres:ugxyXIugb1BPQu0nDiEpEegPNTU1FyGMx@metro.proxy.rlwy.net:22809/railway`
- **Host**: `metro.proxy.rlwy.net`
- **Port**: `22809`

⚠️ **ATENÇÃO**: A senha na URL pública pode ter diferenças. Use a URL exata de `DATABASE_PUBLIC_URL`.

---

## ✅ PASSO 1: Configurar DATABASE_URL no Serviço Web

1. **Railway Dashboard** → Clique no serviço **"web"** (aplicação)
2. Vá na aba **"Variables"**
3. Procure por `DATABASE_URL`
4. Se existir, **edite**. Se não existir, clique em **"+ New Variable"**
5. **Nome**: `DATABASE_URL`
6. **Valor**: Cole exatamente esta URL (sem espaços, sem quebras de linha):
   ```
   postgresql://postgres:ugxyXIugb1BPQu0nDiEpEegPNTU1FyGMx@metro.proxy.rlwy.net:22809/railway
   ```
7. **Salve**

⚠️ **IMPORTANTE**: 
- Use a URL de `DATABASE_PUBLIC_URL` (não a interna)
- Não adicione espaços ou quebras de linha
- Copie e cole exatamente como está

---

## ✅ PASSO 2: Fazer Redeploy

1. No serviço **"web"** → Aba **"Deployments"**
2. Clique nos **3 pontos** (⋯) do último deploy
3. Selecione **"Redeploy"**
4. Aguarde 2-3 minutos até aparecer "Deployment successful"

---

## ✅ PASSO 3: Criar Tabelas

Após o deploy, acesse:

```
https://centraldaspizzas.up.railway.app/api/setup/create-tables
```

**O que faz:**
- ✅ Cria todas as tabelas do schema Prisma
- ✅ Verifica se as tabelas foram criadas
- ✅ Retorna lista de tabelas criadas

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Tabelas criadas com sucesso!",
  "tables": ["users", "orders", "combos", ...],
  "tableCount": 15
}
```

---

## ✅ PASSO 4: Criar Usuários

Após criar as tabelas, acesse:

```
https://centraldaspizzas.up.railway.app/api/setup/create-users
```

**O que faz:**
- ✅ Cria 4 usuários padrão:
  - `admin@centraldaspizzas.com` (senha: `123456`) - Administrador
  - `gerente@centraldaspizzas.com` (senha: `123456`) - Gerente
  - `caixa@centraldaspizzas.com` (senha: `123456`) - Caixa
  - `cozinha@centraldaspizzas.com` (senha: `123456`) - Cozinha

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Processo de criação de usuários concluído",
  "created": [
    {"name": "Administrador", "email": "admin@centraldaspizzas.com", "role": "ADMIN"},
    ...
  ],
  "existing": [],
  "errors": []
}
```

---

## 🔍 PASSO 5: Verificar se Tudo Funcionou

### Teste de Conexão:
```
https://centraldaspizzas.up.railway.app/api/setup/test-connection
```

### Diagnóstico Completo:
```
https://centraldaspizzas.up.railway.app/api/setup/diagnose
```

### Debug da URL:
```
https://centraldaspizzas.up.railway.app/api/setup/debug-env
```

---

## 🚨 Solução de Problemas

### Erro: "URL must start with postgresql://"

**Causa**: A URL não está no formato correto ou tem espaços.

**Solução**:
1. Railway → Serviço web → Variables
2. Edite `DATABASE_URL`
3. Certifique-se de que começa com `postgresql://` (sem espaços antes)
4. Não deve ter quebras de linha no final
5. Faça redeploy

### Erro: "Authentication failed" ou "Password incorrect"

**Causa**: A senha na URL está incorreta.

**Solução**:
1. Railway → Serviço PostgreSQL → Variables
2. Copie o valor exato de `DATABASE_PUBLIC_URL`
3. Railway → Serviço web → Variables
4. Cole em `DATABASE_URL` (sem alterar nada)
5. Faça redeploy

### Erro: "Can't reach database server"

**Causa**: URL interna ou host incorreto.

**Solução**:
- Use a URL pública (`metro.proxy.rlwy.net`)
- NÃO use `postgres.railway.internal`

---

## 📋 Checklist Final

- [ ] `DATABASE_URL` configurada no serviço web com URL pública
- [ ] URL começa com `postgresql://`
- [ ] URL não tem espaços ou quebras de linha
- [ ] Redeploy feito e concluído
- [ ] `/api/setup/create-tables` executado com sucesso
- [ ] `/api/setup/create-users` executado com sucesso
- [ ] Usuários criados e podem fazer login

---

## 🎯 Próximos Passos (Opcional)

Após criar usuários e tabelas, você pode popular o cardápio:

1. **Popular cardápio básico:**
   ```
   /api/setup/populate-menu
   ```

2. **Popular pizzas e sabores:**
   ```
   /api/setup/populate-pizzas
   ```

3. **Popular áreas de entrega:**
   ```
   /api/setup/populate-delivery-areas
   ```

---

**Tudo pronto! O sistema está configurado para o novo banco "railway".** ✅

