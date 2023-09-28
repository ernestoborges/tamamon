import { IPokemon } from "./Pokemon"

export interface IUser extends MongoObject {
    username: string
    email: string
    buddy: IPokemon
    pokemons: string[]
    friends: string[]
}