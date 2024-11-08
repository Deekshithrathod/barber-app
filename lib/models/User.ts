import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser {
	name: string;
	phone: string;
	slotDuration: number;
}

const userSchema: Schema = new mongoose.Schema({
	name: String,
	phone: String,
	slotDuration: { type: Number, enum: [30, 60] }, // duration in minutes
});

export const User: Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>("User", userSchema);
