import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { OAuth2Client } from 'google-auth-library'

const prisma = new PrismaClient()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export async function POST(request: Request) {
    try {
        const { credential, userType } = await request.json()

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const { email, name, sub: googleId } = ticket.getPayload()!

        // Find or create user
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { googleId }
                ]
            }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: email!,
                    fullName: name!,
                    googleId,
                    userType,
                    ...(userType === 'SUPPLIER'
                        ? { supplier: { create: {} } }
                        : { customer: { create: {} } }
                    )
                }
            })
        }

        // Create session token
        const token = await createToken({
            id: user.id,
            email: user.email,
            userType: user.userType
        })

        // Set cookie
        ;(await
            // Set cookie
            cookies()).set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 // 24 hours
        })

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                userType: user.userType
            }
        })

    } catch (error) {
        console.error('Google auth error:', error)
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 401 }
        )
    }
}

