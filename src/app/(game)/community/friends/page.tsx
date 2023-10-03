import CommunityNavbar from "@/components/GameComponents/Community/navbar"
import PokemonIcon from "@/components/PokemonIcon";
import { getDaysFromDate } from "@/utils/datesCalcs";
import { headers } from "next/headers"

const getData = async () => {

    try {
        const res = await fetch(`http://localhost:3000/api/friends`, {
            method: 'GET',
            cache: "no-store",
            headers: headers()
        });

        if (!res.ok) {
            console.log("Fetch data error")
            return []
        }

        return res.json()

    } catch (error) {
        console.log(`Error fetching pokemons: ${error}`)
    }
}

export default async function MenuFriendsList() {
    const data = await getData()

    return <>
        <div className="w-[32rem] flex items-center flex-col">
            <CommunityNavbar />
            <ul className="w-full">
                {
                    data.friends.map((friend: any, index: number) =>
                        <li
                            key={index}
                            className="flex justify-between items-center"
                        >
                            <div>
                                {friend.friend.username}
                            </div>
                            <div>
                                <PokemonIcon
                                    id={friend.friend.buddy.specie.id}
                                    name={friend.friend.buddy.specie.name}
                                    isEgg={friend.friend.buddy.is_egg}
                                />
                            </div>
                            <div>
                                {`${getDaysFromDate(friend.friendship.createdAt)} days`}
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    </>
}

