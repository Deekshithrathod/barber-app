"use server";

import mongoose from "mongoose";
import { z } from "zod";
import { Shop } from "./models/Shop";

const formSchema = z.object({
	shopName: z.string().min(2, {
		message: "Shop name must be at least 2 characters.",
	}),
	ownerName: z.string().min(2, {
		message: "Owner name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	phone: z.string().min(10, {
		message: "Please enter a valid phone number.",
	}),
	address: z.string().min(5, {
		message: "Please enter a valid address.",
	}),
	city: z.string().min(2, {
		message: "City must be at least 2 characters.",
	}),
	state: z.string().min(2, {
		message: "State must be at least 2 characters.",
	}),
	zipCode: z.string().min(5, {
		message: "Please enter a valid zip code.",
	}),
	workingDays: z
		.array(z.string())
		.refine((value) => value.some((item) => item), {
			message: "You have to select at least one working day.",
		}),
	openTime: z.string({
		required_error: "Please select an opening time.",
	}),
	closeTime: z.string({
		required_error: "Please select a closing time.",
	}),
	services: z.string().min(1, {
		message: "Please list at least one service.",
	}),
	description: z.string().optional(),
});

const bookingFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	date: z.date({
		required_error: "Please select a date.",
	}),
	time: z.string({
		required_error: "Please select a time slot.",
	}),
	service: z.string({
		required_error: "Please select a service.",
	}),
});

const createShop = async (values: z.infer<typeof formSchema>) => {
	console.log(values);
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		const Shopn = mongoose.model("Shop", Shop.schema);
		const newShop = new Shopn(values);
		await newShop.save();
	} catch (error) {
		console.log(error);
	}
};

// create a function to book a slot at a shop with _id
const bookSlotAtShop = async (values: z.infer<typeof bookingFormSchema>) => {
	console.log(values);

	const user = await mongoose.model("User").findOne({ email: values.email });

	if (!user) {
		throw new Error("User does not exist");
	}

	const booking = new (mongoose.model("Booking"))({
		userId: user._id,
		slotTime: new Date(values.date + "T" + values.time),
		status: "booked",
	});

	await booking.save();

	return { message: "Booking successful", bookingId: booking._id };
};

export { bookSlotAtShop };
export default createShop;
