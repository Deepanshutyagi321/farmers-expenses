import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { PloteModel } from "@/models/Plote";
import dbConnect from "@/lib/dbconnect";
import mongoose from "mongoose";


export  async function DELETE(request: Request) {
    dbConnect();
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json(
                {
                    success: false,
                    message: 'Not authenticated'
                },
                { status: 401 }
            );
        }

        const {ploteId, expenseId}  = await request.json();
         
        if (!ploteId || !expenseId) {
            return Response.json(
                {
                    success: false,
                    message: 'Plot ID and expense ID are required'
                },
                { status: 400 }
            );
        }

        const deletedExpense = await PloteModel.updateOne(
            { _id: ploteId },
            { $pull: { expenseDetails:{ _id: new mongoose.Types.ObjectId(expenseId)}  } },
            
        );
        // console.log(deletedExpense)
        if (deletedExpense.modifiedCount === 0) {
            return Response.json(
                {
                    success: false,
                    message: 'Expense not found'
                },
                { status: 404 }
            );
        }
        return Response.json(
            {
                success: true,
                message: 'Expense deleted successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting expense:', error);
        return Response.json(
            {
                success: false,
                message: 'An error occurred while deleting the expense'
            },
            { status: 500 }
        )
    }
   
    

}