# Central Das Pizzas - Sistema PDV

Sistema completo de gestão para pizzaria com interface web responsiva, controle de caixa, integração com iFood e sistema de impressão.

## 🚀 Funcionalidades

### 👥 Sistema de Usuários
- **Cliente**: Visualizar cardápio, fazer pedidos, acompanhar status
- **Caixa**: Processar pedidos, controle de caixa, fechamento
- **Gerente**: Gestão de combos, relatórios, pedidos
- **Administrador**: Acesso completo ao sistema
- **Cozinha**: Visualizar pedidos, atualizar status

### 🍕 Gestão de Produtos
- Cadastro completo de combos com fotos e descrições
- Categorização de produtos
- Controle de disponibilidade
- Upload de imagens

### 🛒 Sistema de Pedidos
- Carrinho de compras intuitivo
- Checkout com múltiplas formas de pagamento
- Opções de retirada e entrega
- Cadastro de endereços
- Acompanhamento de status em tempo real

### 💰 Controle de Caixa
- Abertura e fechamento de caixa
- Relatórios de vendas por método de pagamento
- Histórico de movimentações
- Controle de vendas do dia

### 🚚 Integração iFood
- Sincronização automática de pedidos
- Atualização de status
- Gestão centralizada

### 🖨️ Sistema de Impressão
- Impressão automática para cozinha
- Cupom fiscal
- Download de arquivos
- Configuração de impressora

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Banco de Dados**: PostgreSQL
- **Autenticação**: NextAuth.js
- **UI Components**: Radix UI, Lucide React
- **Notificações**: React Hot Toast

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL 12+
- npm ou yarn

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd central-das-pizzas-pdv
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/central_das_pizzas?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# iFood API (opcional)
IFOOD_API_URL=""
IFOOD_API_KEY=""
IFOOD_MERCHANT_ID=""

# Cloudinary para upload de imagens (opcional)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Configurações de impressão (opcional)
PRINTER_IP=""
PRINTER_PORT="9100"
```

4. **Configure o banco de dados**
```bash
npx prisma generate
npx prisma db push
```

5. **Execute o projeto**
```bash
npm run dev
```

O sistema estará disponível em `http://localhost:3000`

## 👤 Primeiro Acesso

1. Acesse `http://localhost:3000`
2. Clique em "Cadastrar" para criar uma conta
3. Após o cadastro, faça login
4. Para criar usuários administrativos, edite diretamente no banco de dados:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'seu@email.com';
```

## 📱 Uso do Sistema

### Para Clientes
1. Faça login ou cadastre-se
2. Navegue pelo cardápio
3. Adicione itens ao carrinho
4. Finalize o pedido escolhendo forma de pagamento e entrega
5. Acompanhe o status do pedido

### Para Funcionários
1. Faça login com suas credenciais
2. Acesse o dashboard específico do seu cargo
3. Gerencie pedidos, combos ou caixa conforme sua função

### Para Administradores
1. Acesse todas as funcionalidades
2. Gerencie combos em `/admin/combos`
3. Configure integrações em `/admin/settings`
4. Visualize relatórios e estatísticas

## 🔧 Configurações Avançadas

### Integração com iFood
1. Configure as variáveis `IFOOD_API_*` no `.env.local`
2. Acesse `/admin/ifood` para gerenciar pedidos
3. Use o botão "Sincronizar" para buscar novos pedidos

### Sistema de Impressão
1. Configure `PRINTER_IP` e `PRINTER_PORT` no `.env.local`
2. Use o componente `PrintOrder` em suas páginas
3. Teste a impressão antes de usar em produção

### Upload de Imagens
1. Configure as variáveis `CLOUDINARY_*` no `.env.local`
2. As imagens serão automaticamente otimizadas e hospedadas

## 📊 Estrutura do Banco de Dados

O sistema utiliza as seguintes tabelas principais:
- `users` - Usuários do sistema
- `categories` - Categorias de produtos
- `combos` - Produtos/combos
- `orders` - Pedidos
- `order_items` - Itens dos pedidos
- `addresses` - Endereços dos clientes
- `cash_logs` - Movimentações do caixa

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Configure o banco de dados PostgreSQL
4. Execute o deploy

### Outras Plataformas
O sistema é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do console
2. Consulte a documentação do Prisma
3. Verifique as configurações do banco de dados

## 📄 Licença

Este projeto é proprietário da Central Das Pizzas.

---

**Desenvolvido com ❤️ para Central Das Pizzas**



