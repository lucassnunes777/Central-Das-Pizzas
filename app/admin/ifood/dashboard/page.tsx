'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { UserRole } from '@/lib/constants'
import { 
  ArrowLeft, 
  RefreshCw, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Clock,
  Smartphone,
  Download,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface IfoodStats {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  pendingOrders: number
  completedOrders: number
  todayOrders: number
  todayRevenue: number
}

interface IfoodOrder {
  id: string
  ifoodOrderId: string
  total: number
  status: string
  customerName: string
  createdAt: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

export default function IfoodDashboard() {
  const [stats, setStats] = useState<IfoodStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<IfoodOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchStats()
    fetchRecentOrders()
    const interval = setInterval(() => {
      fetchStats()
      fetchRecentOrders()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/ifood/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      toast.error('Erro ao carregar estatísticas')
    }
  }

  const fetchRecentOrders = async () => {
    try {
      const response = await fetch('/api/ifood/orders?limit=10')
      const data = await response.json()
      setRecentOrders(data)
    } catch (error) {
      toast.error('Erro ao carregar pedidos recentes')
    } finally {
      setIsLoading(false)
    }
  }

  const syncOrders = async () => {
    setIsSyncing(true)
    try {
      // Simular sincronização com iFood
      const mockOrders = [
        {
          id: `ifood_${Date.now()}`,
          customer: {
            name: 'Cliente iFood',
            phone: '11999999999',
            email: 'cliente@ifood.com'
          },
          items: [
            {
              name: 'Pizza Margherita',
              quantity: 1,
              price: 29.90,
              description: 'Pizza com molho de tomate, mussarela e manjericão'
            }
          ],
          total: 29.90,
          deliveryFee: 5.00,
          paymentMethod: 'CREDIT_CARD',
          deliveryType: 'DELIVERY',
          address: {
            street: 'Rua das Flores',
            number: '123',
            neighborhood: 'Centro',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567'
          },
          notes: 'Sem cebola',
          createdAt: new Date().toISOString()
        }
      ]

      const response = await fetch('/api/ifood/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders: mockOrders }),
      })

      if (response.ok) {
        toast.success('Pedidos sincronizados com sucesso!')
        fetchStats()
        fetchRecentOrders()
      } else {
        toast.error('Erro na sincronização')
      }
    } catch (error) {
      toast.error('Erro na sincronização')
    } finally {
      setIsSyncing(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success('Status atualizado!')
        fetchRecentOrders()
      } else {
        toast.error('Erro ao atualizar status')
      }
    } catch (error) {
      toast.error('Erro ao atualizar status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800'
      case 'PREPARING':
        return 'bg-orange-100 text-orange-800'
      case 'READY':
        return 'bg-green-100 text-green-800'
      case 'DELIVERED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-4 h-4" />
      case 'CONFIRMED':
        return <CheckCircle className="w-4 h-4" />
      case 'PREPARING':
        return <AlertCircle className="w-4 h-4" />
      case 'READY':
        return <CheckCircle className="w-4 h-4" />
      case 'DELIVERED':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <XCircle className="w-4 h-4" />
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
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
                      Dashboard iFood
                    </h1>
                    <p className="text-sm text-gray-600">
                      Gestão de pedidos e integração
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => router.push('/admin/ifood/settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Button>
                <Button
                  onClick={syncOrders}
                  disabled={isSyncing}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Cards de Estatísticas */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <ShoppingCart className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Receita Total</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(stats.totalRevenue)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(stats.averageOrderValue)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pendentes</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Pedidos Recentes */}
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Recentes do iFood</CardTitle>
                <CardDescription>
                  Últimos pedidos recebidos da plataforma iFood
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-gray-500">Carregando pedidos...</p>
                  </div>
                ) : recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-medium">#{order.ifoodOrderId}</span>
                              <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                <span>{order.status}</span>
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              Cliente: {order.customerName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.createdAt)}
                            </p>
                            <div className="mt-2">
                              <p className="font-bold text-lg">
                                {formatCurrency(order.total)}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {order.status === 'PENDING' && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}
                              >
                                Confirmar
                              </Button>
                            )}
                            {order.status === 'CONFIRMED' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                              >
                                Preparar
                              </Button>
                            )}
                            {order.status === 'PREPARING' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateOrderStatus(order.id, 'READY')}
                              >
                                Pronto
                              </Button>
                            )}
                            {order.status === 'READY' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                              >
                                Entregue
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhum pedido do iFood encontrado</p>
                    <Button onClick={syncOrders} className="mt-4">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sincronizar Pedidos
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

