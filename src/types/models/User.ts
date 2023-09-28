import { IPokemon } from "./Pokemon"

export interface IUser extends MongoObject {
    username: string
    email: string
    buddy: string
    pokemons: string[]
    friends: string[]
}