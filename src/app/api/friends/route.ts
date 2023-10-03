import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const Pokemon = require("@/lib/models/pokemon.model")
const Pokedex = require("@/lib/models/pokedex.model")
const Friendship = require("@/lib/models/friendship.model")

export async function GET() {

    try {
        await connectToDB()

        const session = await getServerSession()

        if (!session) {
            return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });
        }
        const friendsList = await User.findOne({ email: session?.user?.email })
            .select("friends")
            .populate("friends.friendship")
            .populate({
                path:"friends.friend",
                model:'User',
                populate: {
                    path: "buddy",
                    model: "Pokemon",
                    populate: {
                        path: 'specie',
                        model: 'Pokedex'
                    }
                }
            })
            .exec()

        return NextResponse.json(friendsList, { status: 200 })

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}