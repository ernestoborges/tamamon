import FriendRequest from "@/lib/models/friendRequest.model";
import Friendship from "@/lib/models/friendship.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { requestId, option } = await req.json()

    try {
        connectToDB()
        const foundRequest = await FriendRequest.findOne({ _id: requestId })
        if (!foundRequest) return NextResponse.json({ message: "Cannot find friend request" }, { status: 400 })

        switch (option) {
            case "accept":
                const foundSender = await User.findOne({ _id: foundRequest.sender })
                const foundReceiver = await User.findOne({ _id: foundRequest.receiver })

                const newFriendship = new Friendship({
                    user1: foundSender._id,
                    user2: foundReceiver._id,
                })
                await newFriendship.save()
                
                foundSender.friends.push({
                    friendship: newFriendship._id,
                    friend: foundReceiver._id
                })
                foundReceiver.friends.push({
                    friendship: newFriendship._id,
                    friend: foundSender._id
                })

                await foundSender.save()
                await foundReceiver.save()
                await FriendRequest.findOneAndRemove({ _id: foundRequest._id })

                return NextResponse.json({ status: 200 });
            case "reject":
                await FriendRequest.findOneAndRemove({ _id: foundRequest._id })
                return NextResponse.json({ status: 200 });
            default:
                return NextResponse.json({ message: "Cannot find friend request" }, { status: 400 })

        }
    } catch (error) {
        return NextResponse.json({ message: `Error adding trainer: ${error}` }, { status: 500 })
    }

}