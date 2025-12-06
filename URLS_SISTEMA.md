# 📋 URLs do Sistema - Central Das Pizzas PDV

## 🔐 Autenticação (Novo Sistema)

### Login e Logout
- **POST** `/api/login` - Fazer login
  - Body: `{ email: string, password: string }`
  - Retorna: `{ success: true, user: { id, email, name, role } }`

- **POST** `/api/logout` - Fazer logout
  - Retorna: `{ success: true }`

### Verificação de Usuário
- **GET** `/api/me` - Obter dados do usuário autenticado
  - Retorna: `{ authenticated: true, user: { id, email, name, role, isActive } }`

- **GET** `/api/check-user` - Verificar se usuário está autenticado
  - Retorna: `{ authenticated: true/false, user: {...} }`

- **GET** `/api/user/me` - Obter dados completos do usuário (inclui telefone)
  - Retorna: `{ id, name, email, phone, role, isActive }`

---

## 👥 Usuários

- **GET** `/api/users` - Listar todos os usuários (ADMIN)
- **POST** `/api/users` - Criar novo usuário (ADMIN)
- **PUT** `/api/users/[id]` - Atualizar usuário (ADMIN)
- **DELETE** `/api/users/[id]` - Deletar usuário (ADMIN)

---

## 🛒 Pedidos (Orders)

- **GET** `/api/orders` - Listar pedidos
  - Admin/Manager: todos os pedidos
  - Outros: apenas pedidos do usuário

- **POST** `/api/orders` - Criar novo pedido
  - Body: `{ items, deliveryType, paymentMethod, addressId, notes, total, customer, address, customPizzas }`

- **GET** `/api/orders/history` - Histórico de pedidos (ADMIN, MANAGER, CASHIER)

- **PUT** `/api/orders/[id]` - Atualizar pedido (ADMIN, MANAGER, CASHIER)
  - Body: `{ status, deliveryPerson, notes, ... }`

- **POST** `/api/orders/[id]/[action]` - Ações no pedido (ADMIN, MANAGER, CASHIER)
  - Actions: `accept`, `reject`, `print`

---

## 💰 Caixa (Cash)

- **GET** `/api/cash/summary` - Resumo do caixa (ADMIN, MANAGER, CASHIER)
- **POST** `/api/cash/open` - Abrir caixa (ADMIN, MANAGER, CASHIER)
- **POST** `/api/cash/close` - Fechar caixa (ADMIN, MANAGER, CASHIER)
- **POST** `/api/cash/auto-close` - Fechamento automático (ADMIN, MANAGER, CASHIER)
- **GET** `/api/cash/schedule-close` - Obter configuração de fechamento (ADMIN, MANAGER)
- **POST** `/api/cash/schedule-close` - Configurar fechamento automático (ADMIN, MANAGER)
- **POST** `/api/cash/sale` - Registrar venda no caixa

---

## 🍕 Produtos

### Combos
- **GET** `/api/combos` - Listar combos
- **POST** `/api/combos` - Criar combo (ADMIN, MANAGER)
- **GET** `/api/combos/[id]` - Obter combo específico
- **PUT** `/api/combos/[id]` - Atualizar combo (ADMIN, MANAGER)
- **DELETE** `/api/combos/[id]` - Deletar combo (ADMIN, MANAGER)

### Customização de Combos
- **GET** `/api/combos/[id]/customization` - Listar itens de customização
- **POST** `/api/combos/[id]/customization` - Criar item de customização (ADMIN, MANAGER)
- **PUT** `/api/combos/[id]/customization/[itemId]` - Atualizar item (ADMIN, MANAGER)
- **DELETE** `/api/combos/[id]/customization/[itemId]` - Deletar item (ADMIN, MANAGER)
- **POST** `/api/combos/[id]/customization/[itemId]/options` - Criar opção (ADMIN, MANAGER)
- **PUT** `/api/combos/[id]/customization/[itemId]/options/[optionId]` - Atualizar opção (ADMIN, MANAGER)
- **DELETE** `/api/combos/[id]/customization/[itemId]/options/[optionId]` - Deletar opção (ADMIN, MANAGER)

### Categorias
- **GET** `/api/categories` - Listar categorias
- **POST** `/api/categories` - Criar categoria (ADMIN, MANAGER)
- **PUT** `/api/categories/[id]` - Atualizar categoria (ADMIN, MANAGER)
- **DELETE** `/api/categories/[id]` - Deletar categoria (ADMIN, MANAGER)

### Sabores de Pizza
- **GET** `/api/flavors` - Listar sabores (público - apenas tradicionais)
- **POST** `/api/flavors` - Criar sabor (ADMIN, MANAGER)
- **PUT** `/api/flavors/[id]` - Atualizar sabor (ADMIN, MANAGER)
- **DELETE** `/api/flavors/[id]` - Deletar sabor (ADMIN, MANAGER)

- **GET** `/api/pizza-flavors` - Listar todos os sabores de pizza

### Tamanhos de Pizza
- **GET** `/api/pizza-sizes` - Listar tamanhos (público)
- **POST** `/api/pizza-sizes` - Criar tamanho (ADMIN, MANAGER)

### Extras
- **GET** `/api/extras` - Listar extras (público)
- **POST** `/api/extras` - Criar extra (ADMIN, MANAGER)
- **PUT** `/api/extras/[id]` - Atualizar extra (ADMIN, MANAGER)
- **DELETE** `/api/extras/[id]` - Deletar extra (ADMIN, MANAGER)

---

## 📍 Endereços e Entregas

### Endereços
- **GET** `/api/addresses` - Listar endereços do usuário
- **POST** `/api/addresses` - Criar endereço

### Áreas de Entrega
- **GET** `/api/delivery-areas` - Listar áreas (público)
- **POST** `/api/delivery-areas` - Criar área (ADMIN, MANAGER)
- **PUT** `/api/delivery-areas/[id]` - Atualizar área (ADMIN, MANAGER)
- **DELETE** `/api/delivery-areas/[id]` - Deletar área (ADMIN, MANAGER)

### Motoboys
- **GET** `/api/delivery-persons` - Listar motoboys (ADMIN, MANAGER)
- **POST** `/api/delivery-persons` - Criar motoboy (ADMIN, MANAGER)
- **PUT** `/api/delivery-persons/[id]` - Atualizar motoboy (ADMIN, MANAGER)
- **DELETE** `/api/delivery-persons/[id]` - Deletar motoboy (ADMIN, MANAGER)
- **PUT** `/api/delivery-persons/[id]/status` - Atualizar status do motoboy (ADMIN, MANAGER, CASHIER)

---

## ⚙️ Configurações

- **GET** `/api/settings` - Obter configurações do sistema
- **PUT** `/api/settings` - Atualizar configurações (ADMIN)

---

## 📊 Relatórios

- **GET** `/api/reports` - Relatórios (ADMIN, MANAGER)
  - Query params: `?start=YYYY-MM-DD&end=YYYY-MM-DD`

---

## 🖨️ Impressão

- **POST** `/api/print` - Imprimir pedido
  - Body: `{ orderId, printType }`

---

## 📤 Upload

- **POST** `/api/upload` - Upload de imagens (ADMIN)
  - FormData: `{ image: File, field: string }`

---

## 📱 iFood

- **GET** `/api/ifood/orders` - Listar pedidos do iFood (ADMIN, MANAGER)
- **POST** `/api/ifood/orders` - Processar pedidos do iFood (ADMIN, MANAGER, CASHIER)
  - Body: `{ action: 'sync' | 'update_status', orderId?, status? }`

- **GET** `/api/ifood/settings` - Obter configurações do iFood (ADMIN, MANAGER)
- **PUT** `/api/ifood/settings` - Atualizar configurações do iFood (ADMIN, MANAGER)

- **GET** `/api/ifood/stats` - Estatísticas do iFood (ADMIN, MANAGER, CASHIER)

- **POST** `/api/ifood/sync` - Sincronizar pedidos do iFood (ADMIN, MANAGER, CASHIER)
  - Body: `{ orders: [...] }`

- **POST** `/api/ifood/test-connection` - Testar conexão com iFood (ADMIN, MANAGER)
  - Body: `{ apiUrl, apiKey, merchantId }`

---

## 🤖 Chatbot

- **GET** `/api/chatbot/templates` - Listar templates (autenticado)
- **POST** `/api/chatbot/templates` - Criar template (ADMIN, MANAGER)
- **PUT** `/api/chatbot/templates/[id]` - Atualizar template (ADMIN, MANAGER)
- **DELETE** `/api/chatbot/templates/[id]` - Deletar template (ADMIN, MANAGER)

- **POST** `/api/chatbot/send` - Enviar mensagem via chatbot
  - Body: `{ templateId?, orderId?, phone?, trigger?, templateData? }`

- **POST** `/api/chatbot/test-whatsapp` - Testar conexão WhatsApp (ADMIN, MANAGER)
  - Body: `{ phoneNumberId, accessToken }`

---

## 🔔 Notificações

- **GET** `/api/notifications` - Listar notificações do usuário
- **POST** `/api/notifications` - Criar notificação
- **PUT** `/api/notifications/[id]/read` - Marcar notificação como lida

---

## 🛠️ Setup e Diagnóstico

- **GET** `/api/health` - Healthcheck do sistema
  - Query params: `?action=create-users|create-tables|diagnose`

- **GET** `/api/setup/diagnose` - Diagnóstico completo do sistema
- **GET** `/api/setup/test-connection` - Testar conexão com banco
- **GET** `/api/setup/debug-env` - Debug de variáveis de ambiente
- **GET** `/api/setup/ping` - Teste de ping

- **GET** `/api/setup/create-users` - Criar usuários padrão
- **GET** `/api/setup/create-tables` - Criar tabelas no banco

- **GET** `/api/setup/populate-menu` - Popular cardápio
- **GET** `/api/setup/populate-combos` - Popular combos
- **GET** `/api/setup/populate-pizzas` - Popular dados de pizza
- **GET** `/api/setup/populate-delivery-areas` - Popular áreas de entrega
- **GET** `/api/setup/update-combos-config` - Atualizar configuração de combos

---

## 📱 WhatsApp

- **GET** `/api/whatsapp/menu` - Obter cardápio para WhatsApp
- **POST** `/api/whatsapp/webhook` - Webhook do WhatsApp

---

## 🧪 Testes

- **GET** `/api/test-auth` - Testar autenticação
- **GET** `/api/test-categories` - Testar categorias
- **GET** `/api/test-ping` - Teste de ping simples

---

## 📄 Páginas Principais

- `/` - Página inicial
- `/auth/signin` - Página de login
- `/auth/signup` - Página de cadastro
- `/dashboard` - Dashboard principal
- `/debug` - Página de debug

### Admin
- `/admin/users` - Gerenciar usuários
- `/admin/combos` - Gerenciar produtos
- `/admin/combos/customization` - Customização de combos
- `/admin/orders` - Gerenciar pedidos
- `/admin/orders/history` - Histórico de pedidos
- `/admin/settings` - Configurações
- `/admin/reports` - Relatórios
- `/admin/print` - Impressão
- `/admin/chatbot` - Chatbot
- `/admin/ifood/dashboard` - Dashboard iFood
- `/admin/ifood/settings` - Configurações iFood
- `/admin/ifood/partners` - Parceiros iFood
- `/admin/categories` - Categorias
- `/admin/flavors` - Sabores
- `/admin/extras` - Extras
- `/admin/delivery-areas` - Áreas de entrega
- `/admin/delivery-persons` - Motoboys

### Caixa
- `/cashier/cash` - Gerenciamento de caixa

### Cliente
- `/client/menu` - Cardápio público
- `/client/checkout` - Checkout
- `/client/checkout-public` - Checkout público
- `/client/orders` - Meus pedidos

### Cozinha
- `/kitchen/orders` - Pedidos da cozinha

---

## 🔑 Permissões por Role

- **ADMIN**: Acesso total
- **MANAGER**: Acesso a gestão (exceto usuários)
- **CASHIER**: Acesso a caixa e pedidos
- **KITCHEN**: Acesso apenas a pedidos da cozinha
- **CLIENT**: Acesso ao cardápio e seus pedidos

---

## 📝 Notas Importantes

1. **Autenticação**: Todas as rotas protegidas requerem autenticação via cookies
2. **Métodos HTTP**: 
   - GET = Leitura
   - POST = Criação
   - PUT = Atualização
   - DELETE = Exclusão
3. **Status Codes**:
   - 200 = Sucesso
   - 201 = Criado
   - 400 = Erro de validação
   - 401 = Não autenticado
   - 403 = Sem permissão
   - 404 = Não encontrado
   - 500 = Erro interno

---

## 🚀 URLs de Produção (Railway)

Base URL: `https://centraldaspizzas.up.railway.app`

Exemplos:
- Login: `https://centraldaspizzas.up.railway.app/api/login`
- Dashboard: `https://centraldaspizzas.up.railway.app/dashboard`
- Healthcheck: `https://centraldaspizzas.up.railway.app/api/health`

