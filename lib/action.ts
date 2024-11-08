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

const createShop = async (values: z.infer<typeof formSchema>) => {
	// console.log(data);
	console.log(values);
	// save this values object to DB using mongoose

	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		const Shopn = mongoose.model("Shop", Shop.schema);
		const newShop = new Shopn(values);
		await newShop.save();
	} catch (error) {
		console.log(error);
	}

	console.log(`receirved`);
};

// create a function to book a slot at a shop with _id
const bookSlotAtShop = async () => {
	// console.log(data);
	// save this values object to DB using mongoose

	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		// const Shopn = mongoose.model("Shop", Shop.schema);
		// const newShop = new Shopn(values);
		// await newShop.save();
	} catch (error) {
		console.log(error);
	}
};

export default createShop;
