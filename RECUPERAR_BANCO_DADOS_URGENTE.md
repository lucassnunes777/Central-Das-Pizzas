# 🚨 RECUPERAR BANCO DE DADOS - GUIA URGENTE

## ⚠️ SITUAÇÃO: Dados Perdidos

Siga estes passos **NA ORDEM** para recuperar tudo:

---

## ✅ PASSO 1: Verificar DATABASE_URL

**IMPORTANTE:** Certifique-se de que a `DATABASE_URL` está correta no serviço web:

1. Railway Dashboard → Serviço **"web"** → **"Variáveis"**
2. Verifique se `DATABASE_URL` existe e está com a URL pública:
   ```
   postgresql://postgres:...@trolley.proxy.rlwy.net:54804/railway
   ```
3. Se não estiver, adicione/corrija agora!

---

## ✅ PASSO 2: Recriar Tabelas (Schema)

Após corrigir a `DATABASE_URL`, as tabelas serão criadas automaticamente no próximo deploy.

**OU** você pode forçar criando um endpoint temporário:

Acesse (substitua pela sua URL):
```
https://seu-projeto.up.railway.app/api/health
```

Se retornar erro de conexão, o schema ainda não foi criado.

**Solução:** Faça um redeploy do serviço web. O Railway executará `prisma db push` automaticamente.

---

## ✅ PASSO 3: Criar Usuários

**Acesse este link no navegador:**
```
https://seu-projeto.up.railway.app/api/setup/create-users
```

Substitua `seu-projeto.up.railway.app` pela URL real do seu Railway.

**Isso criará:**
- ✅ admin@centraldaspizzas.com (senha: 123456)
- ✅ gerente@centraldaspizzas.com (senha: 123456)
- ✅ caixa@centraldaspizzas.com (senha: 123456)
- ✅ cozinha@centraldaspizzas.com (senha: 123456)

**Verifique:** Você deve ver uma resposta JSON confirmando a criação.

---

## ✅ PASSO 4: Recriar Dados do Cardápio

**Opção A: Via API (Recomendado - MAIS FÁCIL)**

Acesse estes links no navegador (substitua pela sua URL):

1. **Popular cardápio básico:**
   ```
   https://seu-projeto.up.railway.app/api/setup/populate-menu
   ```
   
   Isso criará:
   - ✅ Configurações da loja
   - ✅ Categorias (Pizzas Tradicionais, Especiais, Doces, Bebidas)
   - ✅ Combos/Pizzas básicas

2. **Popular dados de pizza (sabores e tamanhos):**
   ```
   https://seu-projeto.up.railway.app/api/setup/populate-pizzas
   ```
   
   Isso criará:
   - ✅ Sabores de pizza (Tradicionais, Premium, Especiais)
   - ✅ Tamanhos de pizza (Pequena, Média, Grande, Família)
   - ✅ Combo "Pizza Personalizada"

**Opção B: Via Script Local (se a API não funcionar)**

1. **Configure DATABASE_URL localmente:**
   ```bash
   cd Central-Das-Pizzas
   ```

2. **Crie arquivo `.env.local`:**
   ```env
   DATABASE_URL="postgresql://postgres:XckYAceZBmzqXmJAGDdTSiYevwZkVgT0@trolley.proxy.rlwy.net:54804/railway"
   ```

3. **Execute scripts:**
   ```bash
   node scripts/populate-menu-data.js
   node scripts/populate-pizza-data.js
   ```

---

## ✅ PASSO 5: Verificar se Funcionou

1. **Teste login:**
   - Acesse: `https://seu-projeto.up.railway.app/auth/signin`
   - Email: `admin@centraldaspizzas.com`
   - Senha: `123456`

2. **Verifique cardápio:**
   - Acesse: `https://seu-projeto.up.railway.app/client/menu`
   - Deve mostrar categorias e produtos

3. **Verifique painel admin:**
   - Acesse: `https://seu-projeto.up.railway.app/admin/combos`
   - Deve mostrar os combos criados

---

## 🔧 SE ALGO DER ERRADO

### Erro: "Can't reach database server"

**Solução:**
1. Verifique se `DATABASE_URL` está com a URL pública (não interna)
2. Verifique se o PostgreSQL está rodando no Railway
3. Faça redeploy do serviço web

### Erro: "Table does not exist"

**Solução:**
1. Faça redeploy do serviço web (criará as tabelas)
2. OU execute localmente: `npx prisma db push`

### Erro: "Users not created"

**Solução:**
1. Verifique se acessou: `/api/setup/create-users`
2. Verifique os logs do Railway para ver erros
3. Tente novamente após alguns segundos

---

## 📋 CHECKLIST DE RECUPERAÇÃO

- [ ] `DATABASE_URL` configurada corretamente no serviço web
- [ ] Redeploy realizado (para criar tabelas)
- [ ] Usuários criados via `/api/setup/create-users`
- [ ] Cardápio populado via `populate-menu-data.js`
- [ ] Pizzas populadas via `populate-pizza-data.js`
- [ ] Login testado e funcionando
- [ ] Cardápio visível em `/client/menu`
- [ ] Painel admin acessível

---

## 🚨 BACKUP FUTURO

Para evitar perder dados novamente:

1. **Configure backups automáticos no Railway:**
   - PostgreSQL → Aba "Backups"
   - Configure backup automático diário

2. **Exporte dados periodicamente:**
   ```bash
   # Exportar schema
   npx prisma db pull
   
   # Exportar dados (via pg_dump se tiver acesso)
   ```

---

## 🎯 RESUMO RÁPIDO

1. ✅ Verificar `DATABASE_URL` no serviço web
2. ✅ Redeploy (cria tabelas)
3. ✅ Acessar `/api/setup/create-users` (cria usuários)
4. ✅ Executar `node scripts/populate-menu-data.js` (cria cardápio)
5. ✅ Executar `node scripts/populate-pizza-data.js` (cria pizzas)
6. ✅ Testar login e sistema

---

**Siga esses passos e seu sistema estará funcionando novamente!** ✅

