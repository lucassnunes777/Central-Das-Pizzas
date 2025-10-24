'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Printer, Download } from 'lucide-react'
import toast from 'react-hot-toast'

interface PrintOrderProps {
  orderId: string
  orderNumber: string
}

export function PrintOrder({ orderId, orderNumber }: PrintOrderProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = async (printType: 'kitchen' | 'receipt') => {
    setIsPrinting(true)
    
    try {
      const response = await fetch('/api/print', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          printType
        }),
      })

      if (response.ok) {
        const data = await response.json()
        toast.success(`${printType === 'kitchen' ? 'Impressão para cozinha' : 'Cupom fiscal'} enviada!`)
        
        // Opcional: mostrar preview do conteúdo
        if (data.content) {
          console.log('Conteúdo para impressão:', data.content)
        }
      } else {
        toast.error('Erro ao imprimir')
      }
    } catch (error) {
      toast.error('Erro ao imprimir')
    } finally {
      setIsPrinting(false)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/print', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          printType: 'receipt'
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Criar e baixar arquivo de texto
        const blob = new Blob([data.content], { type: 'text/plain' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `pedido-${orderNumber}.txt`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        toast.success('Arquivo baixado!')
      } else {
        toast.error('Erro ao gerar arquivo')
      }
    } catch (error) {
      toast.error('Erro ao gerar arquivo')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Printer className="h-5 w-5" />
          Impressão
        </CardTitle>
        <CardDescription>
          Imprimir pedido #{orderNumber}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button
            onClick={() => handlePrint('kitchen')}
            disabled={isPrinting}
            className="w-full"
          >
            <Printer className="h-4 w-4 mr-2" />
            {isPrinting ? 'Imprimindo...' : 'Imprimir para Cozinha'}
          </Button>
          
          <Button
            onClick={() => handlePrint('receipt')}
            disabled={isPrinting}
            variant="outline"
            className="w-full"
          >
            <Printer className="h-4 w-4 mr-2" />
            {isPrinting ? 'Imprimindo...' : 'Imprimir Cupom Fiscal'}
          </Button>
          
          <Button
            onClick={handleDownload}
            variant="outline"
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar Arquivo
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}



