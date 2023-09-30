import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose"
import { IUser } from "@/types/models/User";
import { getServerSession } from "next-auth";
import Image from 'next/image'

const Pokedex = require("@/lib/models/pokedex.model")
const Pokemon = require("@/lib/models/pokemon.model")


const getUser = async () => {
    await connectToDB();
    const session = await getServerSession()

    if (!session) return console.log("Not authenticated")

    const response = await User.findOne({ email: session?.user?.email })
    .populate({
        path: "buddy",
        populate: {
            path: "specie",
            model: "Pokedex"
        }
    })
    if(!response) return console.log("Can not fetch user data")
    return response    
}

export default async function MenuProfile(){

    const userData: IUser = await getUser()
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${userData.buddy?.is_egg ? "egg" : userData.buddy.specie.id}.png`

    return <>
        <div>Perfil</div>
        <ul>
            <li>Name: {userData.username}</li>
            <li>Email: {userData.email}</li>
            <li>Buddy: <span><Image className="-scale-x-[1]" src={url} width={48} height={48} alt="pokemon icon" />{userData.buddy.name}</span></li>
        </ul>
    </>
}