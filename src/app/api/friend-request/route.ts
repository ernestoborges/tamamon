import FriendRequest from "@/lib/models/friendRequest.model";
import Friendship from "@/lib/models/friendship.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {

    try {
        connectToDB()
        const session = await getServerSession()
        const foundUser = await User.findOne({ email: session?.user?.email })

        const foundRequests = await FriendRequest.find({ receiver: foundUser._id })
            .populate({
                path: "sender"
            })

        return NextResponse.json(foundRequests, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `Error finding friend requets: ${error}` }, { status: 500 })
    }

}

export async function POST(req: NextRequest) {

    const { trainer } = await req.json()
    try {
        const session = await getServerSession()

        connectToDB()

        const foundUser = await User.findOne({ email: session?.user?.email })
        if (!foundUser) return NextResponse.json({ message: "User session not found" }, { status: 400 })

        const foundTrainer = await User.findOne({ username: trainer })
        if (!foundTrainer) return NextResponse.json({ message: "Trainer not found" }, { status: 400 })

        const foundRequest1 = await FriendRequest.findOne({ sender: foundTrainer._id, receiver: foundUser._id })
        if (foundRequest1) {
            const newFriendship = new Friendship({
                user1: foundTrainer._id,
                user2: foundUser._id,
            })
            await newFriendship.save()

            foundUser.friends.push({
                friendship: newFriendship._id,
                friend: foundTrainer._id
            })
            foundTrainer.friends.push({
                friendship: newFriendship._id,
                friend: foundUser._id
            })

            await foundUser.save()
            await foundTrainer.save()

            await FriendRequest.findOneAndRemove({ _id: foundRequest1._id })

            return NextResponse.json({ status: 200 })
        }

        const foundRequest2 = await FriendRequest.findOne({ sender: foundUser._id, receiver: foundTrainer._id })
        if (foundRequest2) return NextResponse.json({ message: "Friend request already made" }, { status: 400 })

        const friendRequest = new FriendRequest({
            sender: foundUser._id,
            receiver: foundTrainer._id,
            pending: true
        })

        await friendRequest.save()
        if (!friendRequest) return NextResponse.json({ message: "Cannot add friend" }, { status: 401 });

        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Error creating friend request: ${error}` }, { status: 500 })
    }

}