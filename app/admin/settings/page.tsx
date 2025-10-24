'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { UserRole } from '@/lib/constants'
import { ArrowLeft, Save, Settings, Zap, Printer, Smartphone, Database } from 'lucide-react'
import toast from 'react-hot-toast'

interface SystemSettings {
  restaurantName: string
  restaurantAddress: string
  restaurantPhone: string
  restaurantEmail: string
  ifoodApiKey: string
  ifoodApiSecret: string
  printerIp: string
  printerPort: string
  autoPrint: boolean
  taxRate: number
  deliveryFee: number
  minOrderValue: number
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SystemSettings>({
    restaurantName: 'Central Das Pizzas',
    restaurantAddress: '',
    restaurantPhone: '',
    restaurantEmail: '',
    ifoodApiKey: '',
    ifoodApiSecret: '',
    printerIp: '',
    printerPort: '9100',
    autoPrint: true,
    taxRate: 0,
    deliveryFee: 0,
    minOrderValue: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      toast.error('Erro ao carregar configurações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast.success('Configurações salvas com sucesso!')
      } else {
        toast.error('Erro ao salvar configurações')
      }
    } catch (error) {
      toast.error('Erro ao salvar configurações')
    } finally {
      setIsSaving(false)
    }
  }

  const testPrinter = async () => {
    try {
      const response = await fetch('/api/print/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip: settings.printerIp,
          port: settings.printerPort
        }),
      })

      if (response.ok) {
        toast.success('Teste de impressão realizado com sucesso!')
      } else {
        toast.error('Erro no teste de impressão')
      }
    } catch (error) {
      toast.error('Erro no teste de impressão')
    }
  }

  const testIfoodConnection = async () => {
    try {
      const response = await fetch('/api/ifood/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: settings.ifoodApiKey,
          apiSecret: settings.ifoodApiSecret
        }),
      })

      if (response.ok) {
        toast.success('Conexão com iFood testada com sucesso!')
      } else {
        toast.error('Erro na conexão com iFood')
      }
    } catch (error) {
      toast.error('Erro na conexão com iFood')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                  className="mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Configurações do Sistema
                </h1>
              </div>
              
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 space-y-6">
            {/* Informações do Restaurante */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Informações do Restaurante
                </CardTitle>
                <CardDescription>
                  Configure as informações básicas do seu restaurante
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="restaurantName">Nome do Restaurante</Label>
                    <Input
                      id="restaurantName"
                      value={settings.restaurantName}
                      onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
                      placeholder="Central Das Pizzas"
                    />
                  </div>
                  <div>
                    <Label htmlFor="restaurantPhone">Telefone</Label>
                    <Input
                      id="restaurantPhone"
                      value={settings.restaurantPhone}
                      onChange={(e) => setSettings({ ...settings, restaurantPhone: e.target.value })}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="restaurantAddress">Endereço</Label>
                  <Input
                    id="restaurantAddress"
                    value={settings.restaurantAddress}
                    onChange={(e) => setSettings({ ...settings, restaurantAddress: e.target.value })}
                    placeholder="Rua das Flores, 123 - Centro"
                  />
                </div>
                <div>
                  <Label htmlFor="restaurantEmail">Email</Label>
                  <Input
                    id="restaurantEmail"
                    type="email"
                    value={settings.restaurantEmail}
                    onChange={(e) => setSettings({ ...settings, restaurantEmail: e.target.value })}
                    placeholder="contato@centraldaspizzas.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Integração iFood */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Integração iFood
                </CardTitle>
                <CardDescription>
                  Configure a integração com o iFood para receber pedidos automaticamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ifoodApiKey">API Key</Label>
                    <Input
                      id="ifoodApiKey"
                      type="password"
                      value={settings.ifoodApiKey}
                      onChange={(e) => setSettings({ ...settings, ifoodApiKey: e.target.value })}
                      placeholder="Sua chave da API do iFood"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifoodApiSecret">API Secret</Label>
                    <Input
                      id="ifoodApiSecret"
                      type="password"
                      value={settings.ifoodApiSecret}
                      onChange={(e) => setSettings({ ...settings, ifoodApiSecret: e.target.value })}
                      placeholder="Seu secret da API do iFood"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={testIfoodConnection}
                  className="w-full"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Testar Conexão
                </Button>
              </CardContent>
            </Card>

            {/* Configurações de Impressão */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Printer className="h-5 w-5 mr-2" />
                  Configurações de Impressão
                </CardTitle>
                <CardDescription>
                  Configure a impressora para impressão automática de pedidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="printerIp">IP da Impressora</Label>
                    <Input
                      id="printerIp"
                      value={settings.printerIp}
                      onChange={(e) => setSettings({ ...settings, printerIp: e.target.value })}
                      placeholder="192.168.1.100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="printerPort">Porta</Label>
                    <Input
                      id="printerPort"
                      value={settings.printerPort}
                      onChange={(e) => setSettings({ ...settings, printerPort: e.target.value })}
                      placeholder="9100"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="autoPrint"
                    checked={settings.autoPrint}
                    onChange={(e) => setSettings({ ...settings, autoPrint: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="autoPrint">Impressão automática de pedidos</Label>
                </div>
                <Button
                  variant="outline"
                  onClick={testPrinter}
                  className="w-full"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Testar Impressora
                </Button>
              </CardContent>
            </Card>

            {/* Configurações Financeiras */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Configurações Financeiras
                </CardTitle>
                <CardDescription>
                  Configure taxas e valores mínimos do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="taxRate">Taxa de Serviço (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.01"
                      value={settings.taxRate}
                      onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryFee">Taxa de Entrega (R$)</Label>
                    <Input
                      id="deliveryFee"
                      type="number"
                      step="0.01"
                      value={settings.deliveryFee}
                      onChange={(e) => setSettings({ ...settings, deliveryFee: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minOrderValue">Pedido Mínimo (R$)</Label>
                    <Input
                      id="minOrderValue"
                      type="number"
                      step="0.01"
                      value={settings.minOrderValue}
                      onChange={(e) => setSettings({ ...settings, minOrderValue: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}


