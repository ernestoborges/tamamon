export function getPokemonHeight(hScalar: number, hBase: number) {
    const height = (((hScalar / 255) * 0.79999995) + 0.6) * hBase / 10
    return height
}

export function getPokemonWeight(wScalar: number, hScalar: number, wBase: number, hBase: number) {
    const weight = (((wScalar / 255) * 0.40000004) + 8) * getPokemonHeight(hScalar, hBase) * wBase / 10
    return weight
}

export function getPokemonSizeTag(scalar: number) {
    if (scalar > 241) {
        return "XXL"
    } else if (scalar > 195) {
        return "XL"
    } else if (scalar > 160) {
        return "L"
    } else if (scalar > 99) {
        return "M"
    } else if (scalar > 60) {
        return "S"
    } else if (scalar > 30) {
        return "XS"
    } else {
        return "XXS"
    }
}