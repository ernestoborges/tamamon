import CommunityNavbar from "@/components/GameComponents/Community/navbar"
import FriendsSearch from "@/components/GameComponents/Community/search"

export default function MenuFriends({ children }: { children: React.ReactNode }) {

    return <>
        <div className="w-[32rem] flex items-center flex-col">
            <CommunityNavbar />
            <FriendsSearch />
        </div>
    </>
}