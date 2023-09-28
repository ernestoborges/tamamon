import User from "@/lib/models/user.model";
import Pokemon from "@/lib/models/pokemon.model";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const Pokedex = require("@/lib/models/pokedex.model")

export async function POST(req: NextRequest) {

    const { pokemon } = await req.json()

    try {
        const session = await getServerSession()
        if (!session) {
            return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });
        }
        await connectToDB()
        const foundPokemon = await Pokemon.findOne({ _id: pokemon._id })
        if (!foundPokemon) return NextResponse.json({ message: "Pokemon not found" }, { status: 401 });
        const foundUser = await User.findOneAndUpdate(
            { email: session?.user?.email },
            {
                $set: { buddy: foundPokemon._id }
            }, { new: true })
        if (!foundUser) return NextResponse.json({ message: "User not found!" }, { status: 401 });

        return NextResponse.json({ message: "Buddy changed" }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }
}

export async function GET() {

    try {
        const session = await getServerSession()
        if (!session) {
            return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });
        }
        await connectToDB()
        const foundBuddy = await User.findOne({ email: session?.user?.email })
            .select("buddy")
            .populate({
                path: "buddy",
                // model: "Pokemon",
                populate: {
                    path: "specie",
                    model: "Pokedex"
                }
            })
        if (!foundBuddy) return NextResponse.json({ message: "Buddy not found" }, { status: 401 });

        return NextResponse.json(foundBuddy, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }
}