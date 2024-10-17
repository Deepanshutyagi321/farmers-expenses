import { PloteModel } from "@/models/Plote";
import dbConnect from "@/lib/dbconnect";
import { ExpenseDetails } from "@/models/Plote";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(request: Request) {
    try {
        await dbConnect();
        const { data, ploteId} = await request.json();
        const price = data.price;
        const metrial = data.metrial;
        const labourCost = data.labourCost

        // if (!data.metrial || !data.price) {
        //     return Response.json(
        //         {
        //             success: false,
        //             message: "metrial and price are required"
        //         }, { status: 400 }
        //     );
        // }
        const session = await getServerSession(authOptions);
        const user = session?.user;
        if (!user) {
            return Response.json(
                { success: false, message: "Not authenticated" },
                { status: 401 }
            );
        }
        const plote = await PloteModel.findOne({ _id: ploteId });
        if (!plote) {
            return Response.json(
                {
                    success: false,
                    message: "Plot not found"
                }, { status: 404 }

            );
        }

        const expenseDetails = {
            metrial,
            labourCost,
            price,
            createdAt: new Date(),
        };
        // console.log(expenseDetails);
        plote.expenseDetails.push(expenseDetails as ExpenseDetails);
        await plote.save();
        

        return Response.json(
            { success: true, message: "Expense added successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return Response.json(
            { success: false, message: "faild to add expense" },
            { status: 500 }
        );
    }
}



