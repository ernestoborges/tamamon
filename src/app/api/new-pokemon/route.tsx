import Pokedex from "@/lib/models/pokedex.model"
import Pokemon from "@/lib/models/pokemon.model"
import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import generateNewPokemon from "@/utils/newPokemon"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {

    try {
        const session = await getServerSession()

        await connectToDB()

        const foundUser = await User.findOne({ email: session?.user?.email })
        if (!foundUser) return NextResponse.json({ message: "User session not found" }, { status: 400 })

        const newPokemon = await generateNewPokemon(foundUser)
        if(!newPokemon) return NextResponse.json({ message: "Error generating new pokemon" }, { status: 400 })

        foundUser.pokemons.push(newPokemon._id)

        await foundUser.save()

        return NextResponse.json({ message: `Pokemon generated successfully` }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `Error generating pokemon: ${error}` }, { status: 500 })
    }
}