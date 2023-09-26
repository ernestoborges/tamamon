import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        
        const { username, password, email } = await req.json()

        await connectToDB()

        const foundUsername = await User.findOne({ username })
        if (foundUsername) return NextResponse.json({ message: "Username already taken" }, { status: 400 })

        const foundEmail = await User.findOne({ email })
        if (foundEmail) return NextResponse.json({ message: "Email already taken" }, { status: 400 })

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword, email })

        return NextResponse.json({ message: `User created successfully` }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Failed to register new user: ${error}` }, { status: 500 })
    }
}