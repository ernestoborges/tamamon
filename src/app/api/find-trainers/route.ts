import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { query } = await req.json()
    try {
        connectToDB()


        const foundTrainers = await User.find(
            { username: { $regex: query, $options: 'i' } },
            { username: 1, _id: 0 })
            .limit(5)

        if (!foundTrainers) return NextResponse.json({ message: "Trainers not found" }, { status: 401 });

        const data = foundTrainers.sort((a, b) => (a.username.length - query.length) - (b.username.length - query.length))
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Error finding trainers: ${error}` }, { status: 500 })
    }

}