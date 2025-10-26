# 🚀 Guia de Deploy Automático

Este projeto está configurado para deploy automático no Railway. Siga as instruções abaixo para fazer alterações e atualizar automaticamente.

## 📋 Pré-requisitos

- Git configurado
- Node.js instalado
- Acesso ao repositório GitHub
- Projeto conectado ao Railway

## 🔄 Deploy Automático

### Opção 1: Script PowerShell (Recomendado para Windows)

```powershell
# Execute no terminal PowerShell
.\deploy.ps1
```

### Opção 2: Script NPM

```bash
# Para Windows
npm run deploy:win

# Para outros sistemas
npm run deploy
```

### Opção 3: Manual

```bash
# 1. Adicionar arquivos
git add .

# 2. Fazer commit
git commit -m "feat: Sua descrição da alteração"

# 3. Push para o repositório
git push origin main
```

## 🏗️ Processo de Deploy no Railway

1. **Push para GitHub**: As alterações são enviadas para o repositório
2. **Deploy Automático**: O Railway detecta as mudanças e inicia o deploy
3. **Build**: Instala dependências e gera o cliente Prisma
4. **Database**: Aplica migrações e popula dados
5. **Start**: Inicia a aplicação

## 📁 Arquivos de Configuração

- `deploy.ps1` - Script PowerShell para Windows
- `scripts/auto-deploy.js` - Script Node.js multiplataforma
- `railway-deploy.sh` - Script de build para Railway
- `package.json` - Scripts NPM configurados

## ⚠️ Importante

- Sempre teste localmente antes do deploy
- O Railway fará deploy automático a cada push para `main`
- O banco de dados será atualizado automaticamente
- Dados de pizza serão populados automaticamente

## 🐛 Troubleshooting

### Erro de Permissão (PowerShell)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Erro de Git
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Erro de Dependências
```bash
npm install
npm run db:generate
```

## 📞 Suporte

Em caso de problemas, verifique:
1. Status do Railway no dashboard
2. Logs de deploy no Railway
3. Status do repositório GitHub
4. Configuração das variáveis de ambiente