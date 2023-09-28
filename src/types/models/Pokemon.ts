export interface IPokemon extends MongoObject {
    name: string
    specie: ISpecie
    is_shiny: boolean
    is_egg: boolean
    wh_scalar: {
        weight: number
        height: number
    }
    ivs: {
        hp: number
        atk: number
        def: number
        sp_atk: number
        sp_def: number
        speed: number
    }
    owner: string
    prev_owners: string[]
}

export interface IStat {
    name: string
    base_stat: number
    effort: number
}

export interface IType {
    slot: number
    name: string
}

export interface IAbility {
    name: string
    slot: number
    is_hidden: boolean
}

export interface ISpecie extends MongoObject {
    id: number
    name: string
    base_experience: number
    height: number
    weight: number
    stats: IStat[]
    types: IType[]

}   
