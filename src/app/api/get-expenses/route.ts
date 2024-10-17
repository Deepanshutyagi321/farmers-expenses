import { PloteModel } from "@/models/Plote";
import dbConnect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET(request: Request) {
    dbConnect();
    try {
        const url = new URL(request.url);
        const ploteId = url.searchParams.get("id");
        if (!ploteId) {
            return Response.json({
                success: false,
                message: "Plote ID is required"
            }, {
                status: 400
            });
        }
        const session = await getServerSession(authOptions);
        const user = session?.user;
        if (!user) {
            return Response.json({
                success: false,
                message: "Not authenticated",
            }, {
                status: 401
            });
        }

        const plote = await PloteModel.findOne({ _id: ploteId });
        if (!plote) {
            return Response.json({
                success: false,
                message: "Plote not found",
            }, {
                status: 404
            });
        }

        return Response.json({
            success: true,
            message: "Expenses fetched successfully",
            expenses: plote.expenseDetails
        }, {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message: "An error occurred while fetching expenses",
        }, {
            status: 500
        });
    }
    }

    
   