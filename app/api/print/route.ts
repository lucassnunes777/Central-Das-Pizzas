import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { orderId, printType } = await request.json()

    // Buscar o pedido
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            combo: true
          }
        },
        address: true,
        user: true
      }
    })

    if (!order) {
      return NextResponse.json(
        { message: 'Pedido não encontrado' },
        { status: 404 }
      )
    }

    // Gerar conteúdo para impressão
    const printContent = generatePrintContent(order, printType)

    // Em produção, enviar para a impressora
    await sendToPrinter(printContent, printType)

    return NextResponse.json({ 
      message: 'Impressão enviada com sucesso',
      content: printContent 
    })
  } catch (error) {
    console.error('Erro ao imprimir:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

function generatePrintContent(order: any, printType: string) {
  const now = new Date()
  const dateTime = now.toLocaleString('pt-BR')
  
  let content = ''
  
  // Cabeçalho
  content += '='.repeat(40) + '\n'
  content += 'CENTRAL DAS PIZZAS\n'
  content += '='.repeat(40) + '\n'
  content += `Data/Hora: ${dateTime}\n`
  content += `Pedido: #${order.id.slice(-8)}\n`
  content += `Cliente: ${order.user.name}\n`
  content += `Telefone: ${order.user.phone || 'N/A'}\n`
  content += '-'.repeat(40) + '\n'

  if (printType === 'kitchen') {
    // Impressão para cozinha
    content += 'PEDIDO PARA COZINHA\n'
    content += '-'.repeat(40) + '\n'
    
    order.items.forEach((item: any) => {
      content += `${item.quantity}x ${item.combo.name}\n`
      content += `   R$ ${item.price.toFixed(2)} cada\n`
      if (order.notes) {
        content += `   Obs: ${order.notes}\n`
      }
      content += '\n'
    })
    
    content += '-'.repeat(40) + '\n'
    content += `TOTAL: R$ ${order.total.toFixed(2)}\n`
    
    if (order.deliveryType === 'DELIVERY') {
      content += '\nENTREGA\n'
      if (order.address) {
        content += `${order.address.street}, ${order.address.number}\n`
        if (order.address.complement) {
          content += `${order.address.complement}\n`
        }
        content += `${order.address.neighborhood}\n`
        content += `${order.address.city} - ${order.address.state}\n`
        content += `CEP: ${order.address.zipCode}\n`
      }
    } else {
      content += '\nRETIRADA NO BALCÃO\n'
    }
    
  } else if (printType === 'receipt') {
    // Impressão de cupom fiscal
    content += 'CUPOM FISCAL\n'
    content += '-'.repeat(40) + '\n'
    
    order.items.forEach((item: any) => {
      content += `${item.combo.name}\n`
      content += `   ${item.quantity} x R$ ${item.price.toFixed(2)} = R$ ${(item.price * item.quantity).toFixed(2)}\n`
    })
    
    content += '-'.repeat(40) + '\n'
    content += `SUBTOTAL: R$ ${order.total.toFixed(2)}\n`
    
    if (order.deliveryType === 'DELIVERY') {
      content += `TAXA ENTREGA: R$ 5,00\n`
      content += `TOTAL: R$ ${(order.total + 5).toFixed(2)}\n`
    } else {
      content += `TOTAL: R$ ${order.total.toFixed(2)}\n`
    }
    
    content += '-'.repeat(40) + '\n'
    content += `FORMA DE PAGAMENTO: ${getPaymentMethodText(order.paymentMethod)}\n`
    content += `TIPO: ${order.deliveryType === 'DELIVERY' ? 'ENTREGA' : 'RETIRADA'}\n`
    
    if (order.notes) {
      content += `\nOBSERVAÇÕES:\n${order.notes}\n`
    }
    
    content += '\n' + '='.repeat(40) + '\n'
    content += 'OBRIGADO PELA PREFERÊNCIA!\n'
    content += '='.repeat(40) + '\n'
  }

  return content
}

function getPaymentMethodText(method: string) {
  switch (method) {
    case 'CASH':
      return 'DINHEIRO'
    case 'CREDIT_CARD':
      return 'CARTÃO DE CRÉDITO'
    case 'DEBIT_CARD':
      return 'CARTÃO DE DÉBITO'
    case 'PIX':
      return 'PIX'
    case 'IFOOD':
      return 'IFOOD'
    default:
      return method
  }
}

async function sendToPrinter(content: string, printType: string) {
  try {
    const printerIP = process.env.PRINTER_IP
    const printerPort = process.env.PRINTER_PORT || '9100'
    
    if (!printerIP) {
      console.log('Impressora não configurada. Conteúdo para impressão:')
      console.log(content)
      return
    }

    // Em produção, usar uma biblioteca como 'node-printer' ou fazer requisição HTTP para a impressora
    // Por enquanto, apenas logar o conteúdo
    console.log(`Enviando para impressora ${printerIP}:${printerPort}`)
    console.log(`Tipo: ${printType}`)
    console.log('Conteúdo:')
    console.log(content)
    
    // Simulação de envio para impressora
    // await fetch(`http://${printerIP}:${printerPort}`, {
    //   method: 'POST',
    //   body: content,
    //   headers: {
    //     'Content-Type': 'text/plain'
    //   }
    // })
    
  } catch (error) {
    console.error('Erro ao enviar para impressora:', error)
    throw error
  }
}



