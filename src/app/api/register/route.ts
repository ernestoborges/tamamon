import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import User from "@/lib/models/user.model";
import Pokemon from "@/lib/models/pokemon.model";
import Pokedex from "@/lib/models/pokedex.model";
import generateNewPokemon from "@/utils/newPokemon";

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
        await newUser.save()

        const newPokemon = await generateNewPokemon(newUser)

        newUser.pokemons.push(newPokemon._id)
        newUser.buddy = newPokemon._id
        await newUser.save()

        return NextResponse.json({ message: `User created successfully` }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Failed to register new user: ${error}` }, { status: 500 })
    }
}