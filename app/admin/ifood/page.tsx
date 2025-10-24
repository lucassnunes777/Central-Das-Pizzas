'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { UserRole, OrderStatus } from '@/lib/constants'
import { ArrowLeft, RefreshCw, Clock, CheckCircle, XCircle, Truck } from 'lucide-react'
import toast from 'react-hot-toast'

interface IfoodOrder {
  id: string
  total: number
  status: OrderStatus
  deliveryType: string
  paymentMethod: string
  notes?: string
  createdAt: string
  ifoodOrderId?: string
  items: {
    id: string
    quantity: number
    price: number
    combo: {
      id: string
      name: string
      image?: string
    }
  }[]
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
  }
}

export default function IfoodOrders() {
  const [orders, setOrders] = useState<IfoodOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/ifood/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      toast.error('Erro ao carregar pedidos do iFood')
    } finally {
      setIsLoading(false)
    }
  }

  const syncOrders = async () => {
    setIsSyncing(true)
    try {
      const response = await fetch('/api/ifood/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sync'
        }),
      })

      if (response.ok) {
        toast.success('Sincronização realizada!')
        fetchOrders()
      } else {
        toast.error('Erro na sincronização')
      }
    } catch (error) {
      toast.error('Erro na sincronização')
    } finally {
      setIsSyncing(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const response = await fetch('/api/ifood/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_status',
          orderId,
          status
        }),
      })

      if (response.ok) {
        toast.success('Status atualizado!')
        fetchOrders()
      } else {
        toast.error('Erro ao atualizar status')
      }
    } catch (error) {
      toast.error('Erro ao atualizar status')
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Clock className="h-5 w-5 text-yellow-500" />
      case OrderStatus.CONFIRMED:
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case OrderStatus.PREPARING:
        return <Clock className="h-5 w-5 text-orange-500" />
      case OrderStatus.READY:
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case OrderStatus.DELIVERED:
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case OrderStatus.CANCELLED:
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'Aguardando confirmação'
      case OrderStatus.CONFIRMED:
        return 'Confirmado'
      case OrderStatus.PREPARING:
        return 'Preparando'
      case OrderStatus.READY:
        return 'Pronto'
      case OrderStatus.DELIVERED:
        return 'Entregue'
      case OrderStatus.CANCELLED:
        return 'Cancelado'
      default:
        return 'Desconhecido'
    }
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800'
      case OrderStatus.CONFIRMED:
        return 'bg-blue-100 text-blue-800'
      case OrderStatus.PREPARING:
        return 'bg-orange-100 text-orange-800'
      case OrderStatus.READY:
        return 'bg-green-100 text-green-800'
      case OrderStatus.DELIVERED:
        return 'bg-green-100 text-green-800'
      case OrderStatus.CANCELLED:
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    switch (currentStatus) {
      case OrderStatus.PENDING:
        return OrderStatus.CONFIRMED
      case OrderStatus.CONFIRMED:
        return OrderStatus.PREPARING
      case OrderStatus.PREPARING:
        return OrderStatus.READY
      case OrderStatus.READY:
        return OrderStatus.DELIVERED
      default:
        return null
    }
  }

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
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
                  Pedidos iFood
                </h1>
              </div>
              
              <Button 
                onClick={syncOrders}
                disabled={isSyncing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              </div>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500 mb-4">Nenhum pedido do iFood encontrado.</p>
                  <Button onClick={syncOrders}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sincronizar Pedidos
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const nextStatus = getNextStatus(order.status)
                  
                  return (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Truck className="h-5 w-5 text-orange-500" />
                              Pedido iFood #{order.id.slice(-8)}
                              {order.ifoodOrderId && (
                                <span className="text-sm text-gray-500">
                                  (iFood: {order.ifoodOrderId.slice(-8)})
                                </span>
                              )}
                            </CardTitle>
                            <CardDescription>
                              {formatDate(order.createdAt)}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(order.status)}
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Itens do Pedido */}
                          <div>
                            <h4 className="font-medium mb-2">Itens:</h4>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                  <div className="flex items-center space-x-3">
                                    {item.combo.image && (
                                      <img
                                        src={item.combo.image}
                                        alt={item.combo.name}
                                        className="w-12 h-12 object-cover rounded"
                                      />
                                    )}
                                    <div>
                                      <span className="font-medium">{item.combo.name}</span>
                                      <span className="text-gray-600 ml-2">x{item.quantity}</span>
                                    </div>
                                  </div>
                                  <span className="font-medium">
                                    R$ {(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Informações de Entrega */}
                          <div className="border-t pt-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Truck className="h-4 w-4 text-primary" />
                              <span className="font-medium">Entrega</span>
                            </div>
                            
                            {order.address && (
                              <div className="text-sm text-gray-600 ml-6">
                                {order.address.street}, {order.address.number}
                                {order.address.complement && ` - ${order.address.complement}`}
                                <br />
                                {order.address.neighborhood}, {order.address.city} - {order.address.state}
                              </div>
                            )}
                          </div>

                          {/* Observações */}
                          {order.notes && (
                            <div className="border-t pt-4">
                              <div className="font-medium mb-1">Observações:</div>
                              <div className="text-gray-600">{order.notes}</div>
                            </div>
                          )}

                          {/* Total */}
                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                              <span>Total:</span>
                              <span>R$ {order.total.toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Ações */}
                          {nextStatus && (
                            <div className="border-t pt-4">
                              <Button
                                onClick={() => updateOrderStatus(order.id, nextStatus)}
                                className="w-full"
                              >
                                Avançar para: {getStatusText(nextStatus)}
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}



