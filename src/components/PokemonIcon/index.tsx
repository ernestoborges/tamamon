import Image from "next/image";

export default function PokemonIcon({ id, name, isEgg }: { id: number, name: string, isEgg: boolean }) {

    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${isEgg ? "egg" : id}.png`
    return <>
        <Image
            src={url}
            width={48}
            height={48}
            alt={`${name} pokemon ${isEgg ? "egg " : " "}icon`}
        />
    </>
}