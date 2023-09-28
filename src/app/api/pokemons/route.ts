import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const Pokemon = require("@/lib/models/pokemon.model")
const Pokedex = require("@/lib/models/pokedex.model")

export async function GET() {

    try {
        await connectToDB()

        const session = await getServerSession()

        if (!session) {
            return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });
        }

        const pokemonsList = await User.findOne({ email: session?.user?.email })
            .select("pokemons")
            .populate({
                path: 'pokemons',
                populate: {
                    path: 'specie',
                    model: "Pokedex"
                }
            })
            .exec()

        return NextResponse.json(pokemonsList, { status: 200 })

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}