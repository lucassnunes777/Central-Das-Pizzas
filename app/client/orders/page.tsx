'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { UserRole, OrderStatus } from '@/lib/constants'
import { ArrowLeft, Clock, CheckCircle, XCircle, Truck, Home } from 'lucide-react'

interface Order {
  id: string
  total: number
  status: OrderStatus
  deliveryType: string
  paymentMethod: string
  notes?: string
  createdAt: string
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

export default function ClientOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    } finally {
      setIsLoading(false)
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

  return (
    <ProtectedRoute allowedRoles={[UserRole.CLIENT]}>
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
                  Meus Pedidos
                </h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              </div>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500 mb-4">Você ainda não fez nenhum pedido.</p>
                  <Button onClick={() => router.push('/client/menu')}>
                    Fazer Pedido
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            Pedido #{order.id.slice(-8)}
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
                            {order.deliveryType === 'DELIVERY' ? (
                              <Truck className="h-4 w-4 text-primary" />
                            ) : (
                              <Home className="h-4 w-4 text-primary" />
                            )}
                            <span className="font-medium">
                              {order.deliveryType === 'DELIVERY' ? 'Entrega' : 'Retirada'}
                            </span>
                          </div>
                          
                          {order.deliveryType === 'DELIVERY' && order.address && (
                            <div className="text-sm text-gray-600 ml-6">
                              {order.address.street}, {order.address.number}
                              {order.address.complement && ` - ${order.address.complement}`}
                              <br />
                              {order.address.neighborhood}, {order.address.city} - {order.address.state}
                            </div>
                          )}
                        </div>

                        {/* Forma de Pagamento */}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Forma de Pagamento:</span>
                            <span className="text-gray-600">
                              {order.paymentMethod === 'PIX' && 'PIX'}
                              {order.paymentMethod === 'CREDIT_CARD' && 'Cartão de Crédito'}
                              {order.paymentMethod === 'DEBIT_CARD' && 'Cartão de Débito'}
                              {order.paymentMethod === 'CASH' && 'Dinheiro'}
                            </span>
                          </div>
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}



