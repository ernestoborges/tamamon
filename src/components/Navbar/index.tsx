'use client'

import Image from "next/image";
import Link from "next/link";
import trainerIcon from "../../../public/icons/trainer.svg"
import bagIcon from "../../../public/icons/bag.svg"
import pokedexIcon from "../../../public/icons/pokedex.svg"
import configIcon from "../../../public/icons/config.svg"
import pokeballIcon from "../../../public/icons/pokeball.svg"
import pcIcon from "../../../public/icons/pc.svg"
import friendsIcon from "../../../public/icons/friends.svg"
import { usePathname } from "next/navigation"

const menuList = [
    {
        route: "/profile",
        alt: "Trainer icon",
        img: trainerIcon,
        width: 30,
        height: 30,
        background: true,
    },
    {
        route: "/bag",
        alt: "Bag icon",
        img: bagIcon,
        width: 30,
        height: 30,
        background: true,
    },
    {
        route: "/pc",
        alt: "Computer icon",
        img: pcIcon,
        width: 30,
        height: 30,
        background: true,
    },
    {
        route: "/pokemon",
        alt: "Pokeball icon",
        img: pokeballIcon,
        width: 30,
        height: 30,
        background: false,
    },
    {
        route: "/pokedex",
        alt: "Pokedex icon",
        img: pokedexIcon,
        width: 30,
        height: 30,
        background: true,
    },
    {
        route: "/friends",
        alt: "Book icon",
        img: friendsIcon,
        width: 30,
        height: 30,
        background: true,
    },
    {
        route: "/settings",
        alt: "Settings icon",
        img: configIcon,
        width: 30,
        height: 30,
        background: true,
    },
]

export default function Navbar() {

    const pathname = usePathname()

    function handleOptionBackground(hasBackground: boolean, pathname:string, route: string){

        return (
            hasBackground
            ? pathname == route
                ? "bg-gray-500"
                : "bg-gray-700"
            : pathname == route
                ? "bg-gray-500"
                : ""
        )
    }

    return <>
        <nav className="fixed bottom-0 left-0 w-full p-4 bg-gray-800" >
            <ul className="w-full flex justify-between items-center">
                {
                    menuList.map((option, index) =>
                        <li
                            key={index}
                            className={
                                `flex p-2 rounded bg-red transition-colors duration-500 ${handleOptionBackground(option.background, pathname, option.route)}`}
                        >
                            <Link
                                className="w-[3rem] h-[3rem]"
                                href={option.route}
                            >
                                <Image
                                    className="w-full h-full object-contain"
                                    src={option.img}
                                    alt={option.alt}
                                />
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    </>
}