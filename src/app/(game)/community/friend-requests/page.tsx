import CommunityNavbar from "@/components/GameComponents/Community/navbar"
import FriendRequestList from "@/components/GameComponents/Community/requests"
import { headers } from "next/headers"


const getData = async () => {

    try {
        const res = await fetch(`http://localhost:3000/api/friend-request`, {
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


export default async function MenuFriendsRequest() {
    const data = await getData()
    return <>
        <div className="w-[32rem] flex items-center flex-col">
            <CommunityNavbar />
            <ul className="w-full">
                {
                    data.map((request: any, index: number) =>
                        <FriendRequestList key={index} data={request} />
                    )
                }
            </ul>
        </div>
    </>
}

