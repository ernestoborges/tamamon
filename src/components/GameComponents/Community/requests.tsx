'use client'

async function respondFriendRequest(requestId: string, option: "accept" | "reject") {
    const response = await fetch("http://localhost:3000/api/respond-friend-request", {
        method: 'POST',
        body: JSON.stringify({ requestId, option })
    })
}

export default function FriendRequestList({ data }: { data: any }) {

    return <>
        <li className="flex justify-between w-full">
            <div>{data.sender.username}</div>
            <div>
                <button onClick={() => respondFriendRequest(data._id, "reject") }>X</button>
                <button onClick={() => respondFriendRequest(data._id, "accept")}>V</button>
            </div>
        </li>
    </>
}