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
  Loader2,
  Maximize2,
  Minimize2,
  RefreshCw
} from 'lucide-react'

interface IfoodIframePopupProps {
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

export function IfoodIframePopup({ 
  isOpen, 
  onClose, 
  title = "iFood Parceiros", 
  description = "Acesso direto às funcionalidades do iFood" 
}: IfoodIframePopupProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState<string>('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

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
    setSelectedUrl(link.url)
    setIsLoading(true)
    
    // Simular carregamento
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleClose = () => {
    setSelectedUrl('')
    setIsLoading(false)
    setIsFullscreen(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${isFullscreen ? 'p-0' : ''}`}>
      <div className={`bg-white rounded-xl shadow-2xl w-full ${isFullscreen ? 'h-full max-w-none' : 'max-w-6xl'} max-h-[90vh] overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Smartphone className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {selectedUrl && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFullscreen}
                  >
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar com links rápidos */}
          {!selectedUrl && (
            <div className="w-80 border-r bg-gray-50 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-orange-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-orange-800">
                        Integração Completa
                      </h3>
                      <p className="text-sm text-orange-700">
                        Acesse o iFood sem sair do sistema PDV
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Acesso Rápido</h3>
                  <div className="space-y-2">
                    {quickLinks.map((link) => (
                      <Card 
                        key={link.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleQuickAccess(link)}
                      >
                        <CardContent className="p-3">
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

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">Benefícios</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Acesso direto sem sair do sistema</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Sincronização automática</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Controle unificado</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Relatórios integrados</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Área principal com iframe */}
          <div className="flex-1 flex flex-col">
            {selectedUrl ? (
              <div className="flex-1 relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Carregando iFood Parceiros...
                      </p>
                    </div>
                  </div>
                )}
                
                <iframe
                  key={iframeKey}
                  src={selectedUrl}
                  className="w-full h-full border-0"
                  title="iFood Parceiros"
                  onLoad={() => setIsLoading(false)}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Selecione uma funcionalidade
                  </h3>
                  <p className="text-gray-600">
                    Escolha uma das opções ao lado para acessar o iFood Parceiros
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


