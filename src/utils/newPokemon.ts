import Pokedex from "@/lib/models/pokedex.model";
import Pokemon from "@/lib/models/pokemon.model";
import { IUser } from "@/types/models/User";

export default async function generateNewPokemon(user: IUser) {

    const arr = [1, 4, 7]
    const pokemonId = arr[Math.floor(Math.random() * 3)]

    const foundPokedex = await Pokedex.findOne({ id: pokemonId })
    if (!foundPokedex) return false

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
        owner: user._id,
    })

    const response = await newPokemon.save()
    return response
}