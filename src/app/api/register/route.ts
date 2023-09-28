import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import User from "@/lib/models/user.model";
import Pokemon from "@/lib/models/pokemon.model";
import Pokedex from "@/lib/models/pokedex.model";

export async function POST(req: Request) {
    try {

        const { username, password, email } = await req.json()

        await connectToDB()

        const foundUser = await User.findOne({ username })
        if (foundUser) return NextResponse.json({ message: "Username already taken" }, { status: 400 })

        const foundEmail = await User.findOne({ email })
        if (foundEmail) return NextResponse.json({ message: "Email already taken" }, { status: 400 })

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        })

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

        await newUser.save()

        const newPokemon = new Pokemon({
            specie: foundPokedex._id,
            name: foundPokedex.name,
            is_shiny: isShiny,
            is_egg: true,
            wh_scalar: {
                height: scalarHeight,
                weight: scalarWeight
            },
            ivs: randomIVs,
            owner: newUser._id,
        })

        await newPokemon.save()
        
        console.log(JSON.stringify(newPokemon))

        newUser.pokemons.push(newPokemon._id)

        await newUser.save()

        return NextResponse.json({ message: `User created successfully` }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Failed to register new user: ${error}` }, { status: 500 })
    }
}