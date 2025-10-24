import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    // Buscar o pedido
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      return NextResponse.json(
        { message: 'Pedido não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se o caixa está aberto
    const lastCashLog = await prisma.cashLog.findFirst({
      where: {
        type: {
          in: ['OPEN', 'CLOSE']
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!lastCashLog || lastCashLog.type === 'CLOSE') {
      return NextResponse.json(
        { message: 'Caixa não está aberto' },
        { status: 400 }
      )
    }

    // Criar log de venda
    const cashLog = await prisma.cashLog.create({
      data: {
        orderId: order.id,
        type: 'ORDER',
        amount: Number(order.total),
        description: `Venda - Pedido #${order.id.slice(-8)}`
      }
    })

    return NextResponse.json(cashLog, { status: 201 })
  } catch (error) {
    console.error('Erro ao registrar venda no caixa:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



