import userModel from "@/models/user";
import dbConnect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET() {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        // console.log(user.id)
        if (!user) {
            return Response.json({
                success: false,
                message: "Not authenticated",
            });
        }
        // console.log(mongoose.models)
        const userPlote = await userModel.findOne({ _id: user.id }).populate("plotes");
        

        if (!userPlote || !userPlote.plotes) {
            return Response.json({
                success: false,
                message: "Plote not found for the user",
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Plote fetched successfully",
            plotes: userPlote.plotes
        }, { status: 200 });

    
    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message: error
        }, { status: 500 });
    }
    }