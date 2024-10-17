import mongoose, { Schema, Document } from "mongoose";

export interface ExpenseDetails extends Document {
    price: number,
    labourCost: number,
    createdAt: Date,
    metrial: string
}
const ExpenseDetailsSchema: Schema<ExpenseDetails> = new Schema({
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true
    },
    labourCost:{
        type: Number,
        required: [true, "Cost is required"],
        trim: true
    },
    createdAt: {
        type: Date,
        required: [true, "Date is required"],
        trim: true
    },
    metrial: {
        type: String,
        required: [true, "Metrial is required"],
        trim: true
    }
})

export interface Plote extends Document {
    title: string,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    expenseDetails: ExpenseDetails[],
    createdAt: Date
}


const PloteSchema: Schema<Plote> = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner is required"],

    },
    expenseDetails: [ExpenseDetailsSchema],
    createdAt: {
        type: Date, 
        default: Date.now()
    }
});

export const PloteModel = (mongoose.models.Plote as mongoose.Model<Plote>) || mongoose.model<Plote>("Plote", PloteSchema)