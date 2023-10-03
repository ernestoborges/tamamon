import Link from "next/link"

export default function CommunityNavbar() {

    const subNavOptions = [
        {
            name: "search",
            route: "/community/",
        },
        {
            name: "friends",
            route: "/community/friends",
        },
        {
            name: "requests",
            route: "/community/friend-requests",
        },
    ]

    return <>
        <div className="w-[32rem] flex items-center flex-col">
            <ul className="w-full flex justify-around">
                {
                    subNavOptions.map((option, index) =>
                        <li
                            key={index}
                            className="flex-1 flex justify-center"
                        >
                            <Link
                                className="w-[3rem] h-[3rem]"
                                href={option.route}
                            >
                                {option.name}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    </>
}