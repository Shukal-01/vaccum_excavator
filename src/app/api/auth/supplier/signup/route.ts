// import { NextResponse } from "next/server";
// import { hashPassword, createToken } from "@/lib/auth";
// import { cookies } from "next/headers";
// import { MongoClient } from "mongodb";

// if (!process.env.MONGODB_URI) {
//     throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// const uri = process.env.MONGODB_URI;
// const options = {};

// export async function POST(request: Request) {
//     try {
//         const { fullName, companyName, email, password } = await request.json();

//         // Validate input
//         if (!fullName || !companyName || !email || !password) {
//             return NextResponse.json(
//                 { error: "Missing required fields" },
//                 { status: 400 }
//             );
//         }

//         const client = new MongoClient(uri, options);
//         await client.connect();
//         const db = client.db("excavator");

//         // Check if user exists
//         const existingUser = await db.collection("users").findOne({ email });
//         if (existingUser) {
//             await client.close();
//             return NextResponse.json(
//                 { error: "Email already exists" },
//                 { status: 400 }
//             );
//         }

//         // Hash password
//         const hashedPassword = await hashPassword(password);

//         // Create user with supplier details
//         const userResult = await db.collection("users").insertOne({
//             email,
//             fullName,
//             password: hashedPassword,
//             userType: "SUPPLIER",
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         });

//         const userId = userResult.insertedId;

//         // Create supplier record
//         await db.collection("suppliers").insertOne({
//             userId,
//             companyName,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         });

//         // Create session token
//         const token = await createToken({
//             id: userId.toString(),
//             email,
//             userType: "SUPPLIER",
//         });

//         // Set cookie
//         const cookieStore = await cookies();
//         cookieStore.set("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "lax",
//             maxAge: 60 * 60 * 24, // 24 hours
//         });

//         // Return user response
//         const user = {
//             id: userId.toString(),
//             email,
//             fullName,
//             userType: "SUPPLIER",
//         };

//         await client.close();
//         return NextResponse.json({ user });
//     } catch (error) {
//         console.error("Signup error:", error);
//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }


import { NextResponse } from "next/server";
import { hashPassword, createToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { fullName, companyName, email, password } = await request.json();

        if (!fullName || !companyName || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        // Create user and supplier
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                fullName,
                password: hashedPassword,
                userType: "SUPPLIER",
                Supplier: {
                    create: {
                        companyName,
                    },
                },
            },
        });

        // Create session token
        const token = await createToken({
            id: user.id,
            email: user.email,
            userType: user.userType,
        });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
