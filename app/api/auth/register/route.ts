import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, cpf } = await request.json()

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Verificar se o CPF já existe (se fornecido)
    if (cpf) {
      const existingCpf = await prisma.user.findUnique({
        where: { cpf }
      })

      if (existingCpf) {
        return NextResponse.json(
          { message: 'CPF já cadastrado' },
          { status: 400 }
        )
      }
    }

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        phone,
        cpf,
        role: 'CLIENT'
      }
    })

    // Remover a senha da resposta
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { message: 'Usuário criado com sucesso', user: userWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



