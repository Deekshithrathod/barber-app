import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBooking extends Document {
	userId: string;
	slotTime: Date;
	status: "booked" | "canceled" | "unavailable";
}

export const bookingSchema: Schema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	slotTime: Date,
	status: { type: String, default: "booked" }, // booked, canceled, unavailable
});

export const Booking: Model<IBooking> =
	mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);
