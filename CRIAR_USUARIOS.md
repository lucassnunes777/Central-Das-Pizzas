# 🔐 Criar Usuários no Banco de Produção

## ⚠️ Problema: Credenciais Inválidas

Se você está recebendo "Credenciais inválidas", significa que os usuários ainda não foram criados no banco de dados de produção.

## ✅ Solução Rápida

### Opção 1: Via API (Mais Fácil)

Acesse este link no navegador ou faça uma requisição:

```
https://centraldaspizzas.com/api/setup/create-users
```

Ou via curl:
```bash
curl https://centraldaspizzas.com/api/setup/create-users
```

Isso criará todos os usuários padrão:
- ✅ admin@centraldaspizzas.com (senha: 123456)
- ✅ gerente@centraldaspizzas.com (senha: 123456)
- ✅ caixa@centraldaspizzas.com (senha: 123456)
- ✅ cozinha@centraldaspizzas.com (senha: 123456)

### Opção 2: Via Script Local

1. Configure a `DATABASE_URL` do Vercel no seu `.env` local
2. Execute:
```bash
node create-users-railway.js
```

### Opção 3: Via Cadastro Manual

1. Acesse: https://centraldaspizzas.com/auth/signup
2. Crie uma conta
3. Depois, torne-a admin via banco de dados

## 🔒 Segurança

**IMPORTANTE:** Após criar os usuários, recomendo:

1. **Proteger o endpoint de setup:**
   - Adicione `SETUP_TOKEN` no Vercel
   - O endpoint verificará o token antes de criar usuários

2. **Alterar senhas padrão:**
   - Após primeiro login, altere todas as senhas
   - Use senhas fortes e únicas

3. **Remover endpoint após uso:**
   - Ou adicionar autenticação forte
   - Não deixe público em produção

## 📋 Credenciais Padrão

Após executar o setup, use:

| Função | Email | Senha |
|--------|-------|-------|
| Administrador | admin@centraldaspizzas.com | 123456 |
| Gerente | gerente@centraldaspizzas.com | 123456 |
| Caixa | caixa@centraldaspizzas.com | 123456 |
| Cozinha | cozinha@centraldaspizzas.com | 123456 |

## 🚀 Próximos Passos

1. ✅ Criar usuários (via API acima)
2. ✅ Fazer login com admin@centraldaspizzas.com
3. ✅ Alterar senhas no painel de administração
4. ✅ Configurar sistema conforme necessário

---

**Execute agora:** https://centraldaspizzas.com/api/setup/create-users

