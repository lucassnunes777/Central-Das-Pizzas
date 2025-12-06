# 🔍 Diagnóstico: 404 em /api/setup

## ✅ Teste Rápido

Teste estes endpoints na ordem:

### 1. Health Check (deve funcionar)
```
https://centraldaspizzas.up.railway.app/api/health
```
✅ **Se funcionar:** A API está online

### 2. Test Ping (fora de /api/setup)
```
https://centraldaspizzas.up.railway.app/api/test-ping
```
✅ **Se funcionar:** O problema é específico de `/api/setup`

### 3. Setup Ping (dentro de /api/setup)
```
https://centraldaspizzas.up.railway.app/api/setup/ping
```
❌ **Se retornar 404:** Confirma problema com `/api/setup`

---

## 🔧 Soluções

### Solução 1: Limpar Cache do Railway

1. **Railway Dashboard** → Serviço "web"
2. **Settings** → Procure "Clear Build Cache" ou "Rebuild"
3. Clique para limpar cache
4. Aguarde 3-5 minutos

### Solução 2: Forçar Redeploy

1. **Railway Dashboard** → Serviço "web"
2. **Deployments** → Clique nos 3 pontos (⋯) do último deploy
3. Selecione **"Redeploy"**
4. Aguarde 3-5 minutos

### Solução 3: Verificar Logs

1. **Railway Dashboard** → Serviço "web"
2. **Logs** → Procure por:
   - ❌ `Module not found: Can't resolve '@/api/setup'`
   - ❌ `Error: Route not found`
   - ❌ `404 - Page not found`

### Solução 4: Verificar se Arquivos Estão no Git

Execute localmente:
```bash
git ls-files app/api/setup/
```

Deve listar todos os arquivos. Se algum estiver faltando:
```bash
git add app/api/setup/
git commit -m "fix: adiciona arquivos de setup"
git push origin main
```

---

## 🎯 Resultado Esperado

Após limpar cache e fazer redeploy:

✅ `/api/health` → Funciona
✅ `/api/test-ping` → Funciona  
✅ `/api/setup/ping` → **Deve funcionar agora**
✅ `/api/setup/create-tables` → Deve funcionar
✅ `/api/setup/create-users` → Deve funcionar

---

## 🚨 Se Ainda Não Funcionar

O problema pode ser:
- Railway não está conectado ao GitHub corretamente
- Build está falhando silenciosamente
- Problema de permissões

**Solução:** Recrie o serviço no Railway ou entre em contato com suporte.

