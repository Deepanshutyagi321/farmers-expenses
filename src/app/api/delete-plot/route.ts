import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { PloteModel } from "@/models/Plote";
import dbConnect from "@/lib/dbconnect";
import mongoose from "mongoose";
import userModel from "@/models/user";



export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'Not authenticated'
                }, { status: 401 });
        }
        await dbConnect();
        const { plotId } = await request.json();
        if (!plotId) {
            return Response.json(
                {
                    success: false,
                    message: 'Plot ID is required'
                }, { status: 400 });


        }

        const plot = await PloteModel.deleteOne({ _id: plotId });
        if (!plot) {
            return Response.json(
                {
                    success: false,
                    message: 'Plot not found'
                }, { status: 404 });
        }
        // console.log(user.id);
        const updateResult = await userModel.updateOne(
            { _id: user.id },
            { $pull: { plotes: new mongoose.Types.ObjectId(plotId) } }
        );
        
        
          if (updateResult.modifiedCount === 0) {
            return Response.json(
              { message: 'Plot not found or already deleted', success: false },
              { status: 404 }
            );
          }
        return Response.json(
            {
                success: true,
                message: 'Plot deleted successfully'
            }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json(
            {
                success: false,
                message: 'Error deleting plot'
            }, { status: 500 });
    }
}
