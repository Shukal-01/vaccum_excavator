import { NextResponse } from "next/server";
import { hashPassword, createToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI;
const options = {};

export async function POST(request: Request) {
    try {
        const { fullName, email, password } = await request.json();

        // Validate input
        if (!fullName || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const client = new MongoClient(uri, options);
        await client.connect();
        const db = client.db("your_database_name");

        // Check if user exists
        const existingUser = await db.collection("users").findOne({ email });

        if (existingUser) {
            await client.close();
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        // Create user and customer
        const hashedPassword = await hashPassword(password);

        const result = await db.collection("users").insertOne({
            email,
            fullName,
            password: hashedPassword,
            userType: 'CUSTOMER',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const user = {
            id: result.insertedId.toString(),
            email,
            fullName,
            userType: 'CUSTOMER'
        };

        // Create customer record
        await db.collection("customers").insertOne({
            userId: result.insertedId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Create session token
        const token = await createToken({
            id: user.id,
            email: user.email,
            userType: user.userType
        });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 // 24 hours
        });

        await client.close();
        return NextResponse.json({ user });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

