# 🔐 Credenciais de Login - Central Das Pizzas

## 📋 Credenciais Padrão

### 👑 Administrador (Acesso Completo)
```
Email: admin@centraldaspizzas.com
Senha: 123456
```
**Função:** Acesso completo ao sistema, gestão de usuários, configurações e relatórios

### 👤 Gerente
```
Email: gerente@centraldaspizzas.com
Senha: 123456
```
**Função:** Gestão de combos, pedidos, relatórios e controle operacional

### 💰 Caixa
```
Email: caixa@centraldaspizzas.com
Senha: 123456
```
**Função:** Processamento de pedidos, controle de caixa e fechamento

### 👨‍🍳 Cozinha
```
Email: cozinha@centraldaspizzas.com
Senha: 123456
```
**Função:** Visualização de pedidos e atualização de status

---

## 🚀 Como Criar os Usuários

### Opção 1: Via API (Mais Fácil)

Acesse no navegador:
```
https://centraldaspizzass.up.railway.app/api/setup/create-users
```

Ou se o domínio customizado estiver configurado:
```
https://www.centraldaspizzas.com/api/setup/create-users
```

Isso criará automaticamente todos os usuários acima.

### Opção 2: Via Script Local

1. Configure `DATABASE_URL` no seu `.env` local (URL do Railway)
2. Execute:
```bash
node create-users-railway.js
```

---

## 🔗 Links de Acesso

### Login (Railway)
```
https://centraldaspizzass.up.railway.app/auth/signin
```

### Criar Usuários
```
https://centraldaspizzass.up.railway.app/api/setup/create-users
```

### Ver Todas as Credenciais
```
https://centraldaspizzass.up.railway.app/credentials
```

### Login (Domínio Customizado - se configurado)
```
https://www.centraldaspizzas.com/auth/signin
```

---

## ⚠️ Importante

1. **Criar usuários primeiro:**
   - Acesse `/api/setup/create-users` para criar os usuários

2. **Alterar senhas:**
   - Após primeiro login, altere todas as senhas
   - Use senhas fortes e únicas

3. **Segurança:**
   - Essas são senhas padrão
   - Não use em produção sem alterar

---

**Após criar os usuários, use as credenciais acima para fazer login!** ✅

