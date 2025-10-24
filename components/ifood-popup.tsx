'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ExternalLink, 
  X, 
  Smartphone, 
  BarChart3, 
  Settings, 
  DollarSign,
  Package,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'

interface IfoodPopupProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

interface IfoodQuickLink {
  id: string
  title: string
  description: string
  url: string
  icon: React.ReactNode
  category: string
}

export function IfoodPopup({ isOpen, onClose, title = "iFood Parceiros", description = "Acesso direto às funcionalidades do iFood" }: IfoodPopupProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLink, setSelectedLink] = useState<IfoodQuickLink | null>(null)

  const quickLinks: IfoodQuickLink[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Visão geral das vendas',
      url: 'https://parceiros.ifood.com.br/dashboard',
      icon: <BarChart3 className="h-5 w-5" />,
      category: 'dashboard'
    },
    {
      id: 'orders',
      title: 'Pedidos',
      description: 'Gerenciar pedidos em tempo real',
      url: 'https://parceiros.ifood.com.br/pedidos',
      icon: <Package className="h-5 w-5" />,
      category: 'orders'
    },
    {
      id: 'analytics',
      title: 'Relatórios',
      description: 'Analytics e relatórios',
      url: 'https://parceiros.ifood.com.br/relatorios',
      icon: <BarChart3 className="h-5 w-5" />,
      category: 'analytics'
    },
    {
      id: 'payments',
      title: 'Pagamentos',
      description: 'Controle financeiro',
      url: 'https://parceiros.ifood.com.br/pagamentos',
      icon: <DollarSign className="h-5 w-5" />,
      category: 'payments'
    },
    {
      id: 'settings',
      title: 'Configurações',
      description: 'Configurar restaurante',
      url: 'https://parceiros.ifood.com.br/configuracoes',
      icon: <Settings className="h-5 w-5" />,
      category: 'settings'
    },
    {
      id: 'support',
      title: 'Suporte',
      description: 'Central de ajuda',
      url: 'https://parceiros.ifood.com.br/suporte',
      icon: <Users className="h-5 w-5" />,
      category: 'support'
    }
  ]

  const handleQuickAccess = (link: IfoodQuickLink) => {
    setSelectedLink(link)
    setIsLoading(true)
    
    // Simular carregamento
    setTimeout(() => {
      setIsLoading(false)
      window.open(link.url, '_blank', 'noopener,noreferrer')
      onClose()
    }, 1000)
  }

  const handleDirectAccess = () => {
    window.open('https://parceiros.ifood.com.br', '_blank', 'noopener,noreferrer')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Smartphone className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Aviso de Integração */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-orange-600 mr-3" />
              <div>
                <h3 className="font-medium text-orange-800">
                  Integração Completa
                </h3>
                <p className="text-sm text-orange-700">
                  Acesse todas as funcionalidades do iFood sem sair do seu sistema PDV
                </p>
              </div>
            </div>
          </div>

          {/* Acesso Rápido */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Acesso Rápido</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Card 
                  key={link.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleQuickAccess(link)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        {link.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{link.title}</h4>
                        <p className="text-xs text-gray-600 truncate">{link.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Acesso Completo */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Acesso Completo</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Portal Completo do iFood</h4>
                    <p className="text-sm text-gray-600">
                      Acesso a todas as funcionalidades do iFood Parceiros
                    </p>
                  </div>
                  <Button onClick={handleDirectAccess}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Acessar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Benefícios */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Benefícios da Integração</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Acesso direto sem sair do sistema</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Sincronização automática de dados</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Controle unificado de pedidos</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Relatórios integrados</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Gestão de cardápio</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Suporte especializado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
          {isLoading && selectedLink && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Conectando ao iFood...
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedLink.title}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


