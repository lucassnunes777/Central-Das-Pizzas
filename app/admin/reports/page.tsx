'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/protected-route'
import { UserRole } from '@/lib/constants'
import { ArrowLeft, Download, TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react'
import toast from 'react-hot-toast'

interface ReportData {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  averageOrderValue: number
  salesByDay: Array<{
    date: string
    sales: number
    orders: number
  }>
  topCombos: Array<{
    id: string
    name: string
    quantity: number
    revenue: number
  }>
  salesByPaymentMethod: Array<{
    method: string
    count: number
    total: number
  }>
}

export default function AdminReports() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })
  const router = useRouter()

  useEffect(() => {
    fetchReportData()
  }, [dateRange])

  const fetchReportData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/reports?start=${dateRange.start}&end=${dateRange.end}`)
      const data = await response.json()
      setReportData(data)
    } catch (error) {
      toast.error('Erro ao carregar relatórios')
    } finally {
      setIsLoading(false)
    }
  }

  const exportReport = async (format: 'csv' | 'pdf') => {
    try {
      const response = await fetch(`/api/reports/export?start=${dateRange.start}&end=${dateRange.end}&format=${format}`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `relatorio-${dateRange.start}-${dateRange.end}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('Relatório exportado com sucesso!')
      } else {
        toast.error('Erro ao exportar relatório')
      }
    } catch (error) {
      toast.error('Erro ao exportar relatório')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
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
                  Relatórios
                </h1>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => exportReport('csv')}
                  disabled={isLoading}
                >
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => exportReport('pdf')}
                  disabled={isLoading}
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Filtros */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Final
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-500">Carregando relatórios...</p>
              </div>
            ) : reportData ? (
              <>
                {/* Cards de Resumo */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Vendas Totais</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(reportData.totalSales)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <ShoppingCart className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Pedidos</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {reportData.totalOrders}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Clientes</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {reportData.totalCustomers}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(reportData.averageOrderValue)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Gráficos e Tabelas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Top Combos */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Combos Mais Vendidos</CardTitle>
                      <CardDescription>Ranking dos combos por quantidade vendida</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {reportData.topCombos.map((combo, index) => (
                          <div key={combo.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <span className="font-medium">{combo.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{combo.quantity} vendas</p>
                              <p className="text-sm text-gray-600">{formatCurrency(combo.revenue)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vendas por Método de Pagamento */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Vendas por Método de Pagamento</CardTitle>
                      <CardDescription>Distribuição das vendas por forma de pagamento</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {reportData.salesByPaymentMethod.map((method, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="font-medium">{method.method}</span>
                            <div className="text-right">
                              <p className="font-bold">{method.count} pedidos</p>
                              <p className="text-sm text-gray-600">{formatCurrency(method.total)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Vendas por Dia */}
                <Card>
                  <CardHeader>
                    <CardTitle>Vendas por Dia</CardTitle>
                    <CardDescription>Evolução das vendas no período selecionado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Data</th>
                            <th className="text-right py-2">Vendas</th>
                            <th className="text-right py-2">Pedidos</th>
                            <th className="text-right py-2">Ticket Médio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.salesByDay.map((day, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{formatDate(day.date)}</td>
                              <td className="text-right py-2 font-bold">{formatCurrency(day.sales)}</td>
                              <td className="text-right py-2">{day.orders}</td>
                              <td className="text-right py-2">{formatCurrency(day.sales / day.orders)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum dado encontrado para o período selecionado.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

