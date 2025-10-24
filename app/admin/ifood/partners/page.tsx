'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { UserRole } from '@/lib/constants'
import { 
  ArrowLeft, 
  ExternalLink, 
  Smartphone, 
  BarChart3, 
  Settings, 
  DollarSign,
  Users,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'

interface IfoodPartnerLink {
  id: string
  title: string
  description: string
  url: string
  icon: React.ReactNode
  category: 'dashboard' | 'orders' | 'analytics' | 'settings' | 'payments'
}

export default function IfoodPartners() {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedLink, setSelectedLink] = useState<IfoodPartnerLink | null>(null)
  const [selectedUrl, setSelectedUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const ifoodLinks: IfoodPartnerLink[] = [
    {
      id: 'dashboard',
      title: 'Dashboard Principal',
      description: 'Visão geral das vendas e métricas',
      url: 'https://parceiros.ifood.com.br/dashboard',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'dashboard'
    },
    {
      id: 'orders',
      title: 'Gestão de Pedidos',
      description: 'Visualizar e gerenciar pedidos em tempo real',
      url: 'https://parceiros.ifood.com.br/pedidos',
      icon: <Package className="h-6 w-6" />,
      category: 'orders'
    },
    {
      id: 'analytics',
      title: 'Relatórios e Analytics',
      description: 'Relatórios detalhados de vendas e performance',
      url: 'https://parceiros.ifood.com.br/relatorios',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'analytics'
    },
    {
      id: 'payments',
      title: 'Pagamentos',
      description: 'Controle de pagamentos e repasses',
      url: 'https://parceiros.ifood.com.br/pagamentos',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'payments'
    },
    {
      id: 'settings',
      title: 'Configurações',
      description: 'Configurar cardápio, horários e integrações',
      url: 'https://parceiros.ifood.com.br/configuracoes',
      icon: <Settings className="h-6 w-6" />,
      category: 'settings'
    },
    {
      id: 'support',
      title: 'Suporte',
      description: 'Central de ajuda e suporte técnico',
      url: 'https://parceiros.ifood.com.br/suporte',
      icon: <Users className="h-6 w-6" />,
      category: 'settings'
    }
  ]

  const handleOpenIfood = (link: IfoodPartnerLink) => {
    setSelectedLink(link)
    setSelectedUrl(link.url)
    setShowPopup(true)
    setIsLoading(true)
    
    // Simular carregamento
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setSelectedLink(null)
    setSelectedUrl('')
    setIsLoading(false)
  }

  const handleIframeAccess = () => {
    if (selectedLink) {
      // Abrir em iframe dentro do popup
      const iframe = document.createElement('iframe')
      iframe.src = selectedLink.url
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = 'none'
      iframe.title = selectedLink.title
      
      const popupContent = document.querySelector('.popup-content')
      if (popupContent) {
        popupContent.innerHTML = ''
        popupContent.appendChild(iframe)
      }
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dashboard':
        return 'bg-blue-100 text-blue-800'
      case 'orders':
        return 'bg-green-100 text-green-800'
      case 'analytics':
        return 'bg-purple-100 text-purple-800'
      case 'payments':
        return 'bg-yellow-100 text-yellow-800'
      case 'settings':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dashboard':
        return <BarChart3 className="h-4 w-4" />
      case 'orders':
        return <Package className="h-4 w-4" />
      case 'analytics':
        return <BarChart3 className="h-4 w-4" />
      case 'payments':
        return <DollarSign className="h-4 w-4" />
      case 'settings':
        return <Settings className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER]}>
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
                <div className="flex items-center">
                  <Smartphone className="h-8 w-8 text-orange-500 mr-3" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      iFood Parceiros
                    </h1>
                    <p className="text-sm text-gray-600">
                      Acesso direto às funcionalidades do iFood
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Aviso de Integração */}
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-orange-800">
                      Integração com iFood Parceiros
                    </h3>
                    <p className="text-sm text-orange-700">
                      Acesse todas as funcionalidades do iFood diretamente do seu sistema PDV
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grid de Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ifoodLinks.map((link) => (
                <Card 
                  key={link.id} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleOpenIfood(link)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        {link.icon}
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getCategoryColor(link.category)}`}>
                        {getCategoryIcon(link.category)}
                        <span className="capitalize">{link.category}</span>
                      </span>
                    </div>
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-orange-50 group-hover:border-orange-300"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Informações Adicionais */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Vantagens da Integração
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Acesso direto sem sair do sistema
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Sincronização automática de dados
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Controle unificado de pedidos
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Relatórios integrados
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    Funcionalidades Disponíveis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Package className="h-4 w-4 text-blue-500 mr-2" />
                      Gestão de cardápio
                    </li>
                    <li className="flex items-center">
                      <BarChart3 className="h-4 w-4 text-blue-500 mr-2" />
                      Relatórios de vendas
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                      Controle financeiro
                    </li>
                    <li className="flex items-center">
                      <Users className="h-4 w-4 text-blue-500 mr-2" />
                      Suporte especializado
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Popup Modal com Iframe */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col">
              {/* Header */}
              <div className="p-4 border-b bg-gradient-to-r from-orange-50 to-orange-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Smartphone className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {selectedLink ? selectedLink.title : 'iFood Parceiros'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedLink ? selectedLink.description : 'Acesso direto ao iFood'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClosePopup}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex">
                {!selectedUrl ? (
                  <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Selecione uma funcionalidade
                      </h3>
                      <p className="text-gray-600">
                        Escolha uma das opções para acessar o iFood Parceiros
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 relative">
                    {isLoading && (
                      <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">
                            Carregando iFood Parceiros...
                          </p>
                        </div>
                      </div>
                    )}
                    <iframe
                      src={selectedUrl}
                      className="w-full h-full border-0"
                      title="iFood Parceiros"
                      onLoad={() => setIsLoading(false)}
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
