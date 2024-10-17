import  {PloteModel}  from "@/models/Plote";
import   dbConnect  from "@/lib/dbconnect"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import userModel from "@/models/user";


export async function POST(request: Request) {
    try {
        await dbConnect();
        let {title} = await request.json();
        
        if (!title) {
            return Response.json(
                { success: false, 
                message: 'title  are required'
                },{ status: 400 }
            )
        }
        // check if user is authenticated
        const session = await getServerSession(authOptions);
        const user = session?.user;
        if (!user) {
            return Response.json(   
                { success: false, message: 'Not authenticated' },
                { status: 401 }
            );
        }
    
        const newPlote = new PloteModel({
            title,
            owner: user.id
        });
       const newPloteCreated = await newPlote.save();
        if (!newPlote) {
            return Response.json(
                { success: false, 
                message: 'unable to create plote'
                },{ status: 500 }
            )
        }
        const updatedUser = await userModel.findByIdAndUpdate(user.id, {
            $push: { plotes: newPloteCreated._id }
        }, { new: true });

        if (!updatedUser) {
            return Response.json(
                { success: false, 
                message: 'unable to update user'
                },{ status: 500 }
            )
        }
    
        return Response.json(
            { success: true,
            message: 'plote created successfully'
            },{ status: 200 }
        );
    }catch(err) {
        return Response.json(
            { success: false, 
            message: err
            },{ status: 500 }
        )
    }
   
   
}