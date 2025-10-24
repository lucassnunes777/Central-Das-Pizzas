'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Printer, Eye, Save, Download } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard/shell'
import { ProtectedRoute } from '@/components/protected-route'
import { UserRole } from '@/lib/constants'
import toast from 'react-hot-toast'

interface PrintSettings {
  restaurantName: string
  restaurantAddress: string
  restaurantPhone: string
  restaurantEmail: string
  headerText: string
  footerText: string
  kitchenHeader: string
  receiptHeader: string
  showLogo: boolean
  showDateTime: boolean
  showOrderNumber: boolean
  showCustomerInfo: boolean
  showDeliveryInfo: boolean
  showPaymentInfo: boolean
  showNotes: boolean
  paperWidth: number
  fontSize: number
}

const defaultSettings: PrintSettings = {
  restaurantName: 'CENTRAL DAS PIZZAS',
  restaurantAddress: 'Rua das Pizzas, 123 - Centro',
  restaurantPhone: '(11) 99999-9999',
  restaurantEmail: 'contato@centraldaspizzas.com',
  headerText: 'Bem-vindo à Central das Pizzas!',
  footerText: 'Obrigado pela preferência!',
  kitchenHeader: 'PEDIDO PARA COZINHA',
  receiptHeader: 'CUPOM FISCAL',
  showLogo: true,
  showDateTime: true,
  showOrderNumber: true,
  showCustomerInfo: true,
  showDeliveryInfo: true,
  showPaymentInfo: true,
  showNotes: true,
  paperWidth: 40,
  fontSize: 12
}

export default function PrintSettingsPage() {
  const [settings, setSettings] = useState<PrintSettings>(defaultSettings)
  const [previewContent, setPreviewContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Sample order data for preview
  const sampleOrder = {
    id: 'ORD123456',
    user: {
      name: 'João Silva',
      phone: '(11) 99999-8888'
    },
    items: [
      { combo: { name: 'Pizza Margherita' }, quantity: 1, price: 29.90 },
      { combo: { name: 'Pizza Calabresa' }, quantity: 1, price: 32.90 },
      { combo: { name: 'Coca-Cola 350ml' }, quantity: 2, price: 4.50 }
    ],
    total: 67.30,
    deliveryType: 'DELIVERY',
    paymentMethod: 'PIX',
    notes: 'Sem cebola na pizza calabresa',
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    }
  }

  const generatePreview = (printType: 'kitchen' | 'receipt') => {
    const now = new Date()
    const dateTime = now.toLocaleString('pt-BR')
    
    let content = ''
    
    // Header
    content += '='.repeat(settings.paperWidth) + '\n'
    if (settings.showLogo) {
      content += settings.restaurantName + '\n'
    }
    content += '='.repeat(settings.paperWidth) + '\n'
    
    if (settings.showDateTime) {
      content += `Data/Hora: ${dateTime}\n`
    }
    
    if (settings.showOrderNumber) {
      content += `Pedido: #${sampleOrder.id}\n`
    }
    
    if (settings.showCustomerInfo) {
      content += `Cliente: ${sampleOrder.user.name}\n`
      content += `Telefone: ${sampleOrder.user.phone}\n`
    }
    
    content += '-'.repeat(settings.paperWidth) + '\n'

    if (printType === 'kitchen') {
      content += settings.kitchenHeader + '\n'
      content += '-'.repeat(settings.paperWidth) + '\n'
      
      sampleOrder.items.forEach((item: any) => {
        content += `${item.quantity}x ${item.combo.name}\n`
        content += `   R$ ${item.price.toFixed(2)} cada\n`
        if (settings.showNotes && sampleOrder.notes) {
          content += `   Obs: ${sampleOrder.notes}\n`
        }
        content += '\n'
      })
      
      content += '-'.repeat(settings.paperWidth) + '\n'
      content += `TOTAL: R$ ${sampleOrder.total.toFixed(2)}\n`
      
      if (settings.showDeliveryInfo && sampleOrder.deliveryType === 'DELIVERY') {
        content += '\nENTREGA\n'
        if (sampleOrder.address) {
          content += `${sampleOrder.address.street}, ${sampleOrder.address.number}\n`
          if (sampleOrder.address.complement) {
            content += `${sampleOrder.address.complement}\n`
          }
          content += `${sampleOrder.address.neighborhood}\n`
          content += `${sampleOrder.address.city} - ${sampleOrder.address.state}\n`
          content += `CEP: ${sampleOrder.address.zipCode}\n`
        }
      } else if (sampleOrder.deliveryType === 'PICKUP') {
        content += '\nRETIRADA NO BALCÃO\n'
      }
      
    } else if (printType === 'receipt') {
      content += settings.receiptHeader + '\n'
      content += '-'.repeat(settings.paperWidth) + '\n'
      
      sampleOrder.items.forEach((item: any) => {
        content += `${item.combo.name}\n`
        content += `   ${item.quantity} x R$ ${item.price.toFixed(2)} = R$ ${(item.price * item.quantity).toFixed(2)}\n`
      })
      
      content += '-'.repeat(settings.paperWidth) + '\n'
      content += `SUBTOTAL: R$ ${sampleOrder.total.toFixed(2)}\n`
      
      if (sampleOrder.deliveryType === 'DELIVERY') {
        content += `TAXA ENTREGA: R$ 5,00\n`
        content += `TOTAL: R$ ${(sampleOrder.total + 5).toFixed(2)}\n`
      } else {
        content += `TOTAL: R$ ${sampleOrder.total.toFixed(2)}\n`
      }
      
      content += '-'.repeat(settings.paperWidth) + '\n'
      
      if (settings.showPaymentInfo) {
        content += `FORMA DE PAGAMENTO: ${getPaymentMethodText(sampleOrder.paymentMethod)}\n`
        content += `TIPO: ${sampleOrder.deliveryType === 'DELIVERY' ? 'ENTREGA' : 'RETIRADA'}\n`
      }
      
      if (settings.showNotes && sampleOrder.notes) {
        content += `\nOBSERVAÇÕES:\n${sampleOrder.notes}\n`
      }
      
      content += '\n' + '='.repeat(settings.paperWidth) + '\n'
      content += settings.footerText + '\n'
      content += '='.repeat(settings.paperWidth) + '\n'
    }

    return content
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'CASH': return 'DINHEIRO'
      case 'CREDIT_CARD': return 'CARTÃO DE CRÉDITO'
      case 'DEBIT_CARD': return 'CARTÃO DE DÉBITO'
      case 'PIX': return 'PIX'
      case 'IFOOD': return 'IFOOD'
      default: return method
    }
  }

  const handlePreview = (printType: 'kitchen' | 'receipt') => {
    const content = generatePreview(printType)
    setPreviewContent(content)
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      // Aqui você salvaria as configurações no banco de dados
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulação
      toast.success('Configurações salvas com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar configurações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([previewContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `preview-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    toast.success('Arquivo baixado!')
  }

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <DashboardShell>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Configurações de Impressão</h1>
              <p className="text-muted-foreground">Configure como as comandas serão impressas</p>
            </div>
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configurações */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Restaurante</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="restaurantName">Nome do Restaurante</Label>
                    <Input
                      id="restaurantName"
                      value={settings.restaurantName}
                      onChange={(e) => setSettings({...settings, restaurantName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="restaurantAddress">Endereço</Label>
                    <Input
                      id="restaurantAddress"
                      value={settings.restaurantAddress}
                      onChange={(e) => setSettings({...settings, restaurantAddress: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="restaurantPhone">Telefone</Label>
                    <Input
                      id="restaurantPhone"
                      value={settings.restaurantPhone}
                      onChange={(e) => setSettings({...settings, restaurantPhone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="restaurantEmail">Email</Label>
                    <Input
                      id="restaurantEmail"
                      value={settings.restaurantEmail}
                      onChange={(e) => setSettings({...settings, restaurantEmail: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Textos Personalizados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="headerText">Texto do Cabeçalho</Label>
                    <Input
                      id="headerText"
                      value={settings.headerText}
                      onChange={(e) => setSettings({...settings, headerText: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="footerText">Texto do Rodapé</Label>
                    <Input
                      id="footerText"
                      value={settings.footerText}
                      onChange={(e) => setSettings({...settings, footerText: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="kitchenHeader">Cabeçalho Cozinha</Label>
                    <Input
                      id="kitchenHeader"
                      value={settings.kitchenHeader}
                      onChange={(e) => setSettings({...settings, kitchenHeader: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="receiptHeader">Cabeçalho Cupom</Label>
                    <Input
                      id="receiptHeader"
                      value={settings.receiptHeader}
                      onChange={(e) => setSettings({...settings, receiptHeader: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Layout</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="paperWidth">Largura do Papel (caracteres)</Label>
                      <Input
                        id="paperWidth"
                        type="number"
                        value={settings.paperWidth}
                        onChange={(e) => setSettings({...settings, paperWidth: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                      <Input
                        id="fontSize"
                        type="number"
                        value={settings.fontSize}
                        onChange={(e) => setSettings({...settings, fontSize: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preview da Impressão</CardTitle>
                  <CardDescription>Visualize como ficará a comanda impressa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handlePreview('kitchen')}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Cozinha
                      </Button>
                      <Button 
                        onClick={() => handlePreview('receipt')}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Cupom
                      </Button>
                      {previewContent && (
                        <Button 
                          onClick={handleDownload}
                          variant="outline"
                          size="sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                      )}
                    </div>
                    
                    {previewContent && (
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
                        <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed">
                          {previewContent}
                        </pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardShell>
    </ProtectedRoute>
  )
}

