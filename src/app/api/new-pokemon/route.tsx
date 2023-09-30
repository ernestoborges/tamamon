import Pokedex from "@/lib/models/pokedex.model"
import Pokemon from "@/lib/models/pokemon.model"
import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {

    try {
        const session = await getServerSession()

        await connectToDB()

        const foundUser = await User.findOne({ email: session?.user?.email })
        if (!foundUser) return NextResponse.json({ message: "User session not found" }, { status: 400 })

        const arr = [1, 4, 7]
        const pokemonId = arr[Math.floor(Math.random() * 3)]

        const foundPokedex = await Pokedex.findOne({ id: pokemonId })
        if (!foundPokedex) return NextResponse.json({ message: "Internal error" }, { status: 500 })

        const isShiny = Math.floor(Math.random() * 450) + 1 === 1
        const scalarHeight = Math.floor(Math.random() * 255) + 1
        const scalarWeight = Math.floor(Math.random() * 255) + 1
        const randomIVs = {
            hp: Math.floor(Math.random() * 32),
            atk: Math.floor(Math.random() * 32),
            def: Math.floor(Math.random() * 32),
            sp_atk: Math.floor(Math.random() * 32),
            sp_def: Math.floor(Math.random() * 32),
            speed: Math.floor(Math.random() * 32),
        }

        const newPokemon = new Pokemon({
            specie: foundPokedex._id,
            name: foundPokedex.name,
            is_shiny: isShiny,
            is_egg: false,
            wh_scalar: {
                height: scalarHeight,
                weight: scalarWeight
            },
            ivs: randomIVs,
            owner: foundUser._id,
        })

        await newPokemon.save()

        foundUser.pokemons.push(newPokemon._id)

        await foundUser.save()

        return NextResponse.json({ message: `Pokemon generated successfully` }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `Error generating pokemon: ${error}` }, { status: 500 })
    }
}