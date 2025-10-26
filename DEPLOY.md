# 🚀 Guia Rápido de Deploy

## Railway (Recomendado - Mais Fácil)

### Passo a Passo

1. **Acesse** [railway.app](https://railway.app) e faça login

2. **Crie um novo projeto**
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Conecte seu repositório

3. **Adicione PostgreSQL**
   - No projeto, clique em "New" → "Database" → "Add PostgreSQL"
   - Railway criará automaticamente a variável `DATABASE_URL`

4. **Configure variáveis de ambiente**
   - Vá em "Variables"
   - Adicione as seguintes variáveis:
   ```env
   NEXTAUTH_URL=https://seu-app.up.railway.app
   NEXTAUTH_SECRET=<gere-um-secret-com-openssl-rand-base64-32>
   ```

5. **Espere o deploy**
   - Railway fará o build automaticamente
   - O script `railway-setup.js` criará as tabelas

6. **Acesse o app**
   - Railway fornecerá uma URL (ex: https://seu-app.up.railway.app)
   - Acesse `/auth/signup` para criar sua conta
   - Para tornar-se admin, acesse `/make-admin` (adicione o email)

## Variáveis de Ambiente

### Obrigatórias
```env
DATABASE_URL=postgresql://... # Criado automaticamente pelo Railway
NEXTAUTH_URL=https://seu-app.up.railway.app
NEXTAUTH_SECRET=seu-secret-aleatorio
```

### Opcionais
```env
# Configurações da loja
RESTAURANT_NAME="Central Das Pizzas Avenida Sul"
RESTAURANT_PHONE="(11) 99999-9999"
RESTAURANT_ADDRESS="Avenida Sul, Centro"
DELIVERY_FEE="5.00"
MIN_ORDER_VALUE="25.00"

# iFood (opcional)
IFOOD_API_KEY=""
IFOOD_API_SECRET=""

# Cloudinary para imagens (recomendado)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

## Depois do Deploy

### 1. Criar conta de administrador
1. Acesse `https://seu-app.up.railway.app/auth/signup`
2. Crie sua conta
3. Acesse `https://seu-app.up.railway.app/make-admin`
4. Informe seu email para tornar-se admin

### 2. Configurar a loja
1. Faça login como admin
2. Acesse `/admin/settings`
3. Configure:
   - Nome da loja
   - Logo
   - Banner
   - Telefone
   - Endereço
   - Horários

### 3. Adicionar produtos
1. Acesse `/admin/combos`
2. Crie categorias
3. Adicione produtos

### 4. Testar o cardápio público
1. Acesse `/client/menu` (sem login)
2. Verifique se tudo está funcionando
3. Teste no celular

## Solução de Problemas

### Build falha
- Verifique os logs no Railway
- Confirme que `DATABASE_URL` está configurada

### Logo não aparece
- Faça upload novamente em `/admin/settings`
- Limpe o cache do navegador

### Erro ao criar pedidos
- Verifique se há produtos no banco
- Confirme que as categorias estão ativas

### Imagens não carregam
- Imagens base64 podem ser grandes
- Considere usar Cloudinary em produção

## Gerar NEXTAUTH_SECRET

### No Linux/Mac:
```bash
openssl rand -base64 32
```

### No Windows (PowerShell):
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

## Limites do Railway Free Tier

- **$5 crédito por mês**
- **512 MB RAM**
- **1 GB storage**
- Recomendado para testes e produção pequena

## Backup

O Railway faz backup automático do PostgreSQL, mas é recomendado:
1. Exportar dados regularmente
2. Fazer backup manual do banco

---

**Pronto! Seu sistema está no ar 🎉**
