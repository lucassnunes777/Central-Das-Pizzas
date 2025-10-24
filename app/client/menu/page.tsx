'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { UserRole } from '@/lib/constants'
import { ShoppingCart, Plus, Minus, ArrowLeft, MapPin, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

interface Combo {
  id: string
  name: string
  description: string
  price: number
  image?: string
  isActive: boolean
  category: {
    id: string
    name: string
  }
}

interface CartItem {
  combo: Combo
  quantity: number
}

export default function ClientMenu() {
  const [combos, setCombos] = useState<Combo[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCart, setShowCart] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchCombos()
  }, [])

  const fetchCombos = async () => {
    try {
      const response = await fetch('/api/combos')
      const data = await response.json()
      setCombos(data.filter((combo: Combo) => combo.isActive))
    } catch (error) {
      toast.error('Erro ao carregar cardápio')
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = (combo: Combo) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.combo.id === combo.id)
      
      if (existingItem) {
        return prevCart.map(item =>
          item.combo.id === combo.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { combo, quantity: 1 }]
      }
    })
    toast.success('Item adicionado ao carrinho!')
  }

  const removeFromCart = (comboId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.combo.id === comboId)
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.combo.id === comboId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      } else {
        return prevCart.filter(item => item.combo.id !== comboId)
      }
    })
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.combo.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error('Carrinho vazio')
      return
    }
    router.push('/client/checkout')
  }

  const groupedCombos = combos.reduce((groups, combo) => {
    const category = combo.category.name
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(combo)
    return groups
  }, {} as Record<string, Combo[]>)

  return (
    <ProtectedRoute allowedRoles={[UserRole.CLIENT]}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                  className="mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <h1 className="text-xl font-bold text-gray-900">
                  Cardápio - Central Das Pizzas
                </h1>
              </div>
              
              <Button 
                onClick={() => setShowCart(true)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Carrinho
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
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
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedCombos).map(([categoryName, categoryCombos]) => (
                  <div key={categoryName}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {categoryName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryCombos.map((combo) => (
                        <Card key={combo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          {combo.image && (
                            <div className="aspect-video bg-gray-200">
                              <img
                                src={combo.image}
                                alt={combo.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <CardTitle className="text-lg">{combo.name}</CardTitle>
                            <CardDescription>{combo.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <span className="text-xl font-bold text-primary">
                                R$ {combo.price.toFixed(2)}
                              </span>
                              <Button onClick={() => addToCart(combo)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold">Carrinho</h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowCart(false)}
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Carrinho vazio
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.combo.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-medium">{item.combo.name}</h3>
                            <p className="text-sm text-gray-600">
                              R$ {item.combo.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(item.combo.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addToCart(item.combo)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {cart.length > 0 && (
                  <div className="border-t p-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-xl font-bold text-primary">
                        R$ {getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <Button 
                      onClick={proceedToCheckout}
                      className="w-full"
                    >
                      Finalizar Pedido
                    </Button>
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



