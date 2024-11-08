// lib/models/Shop.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IShop extends Document {
	shopName: string;
	ownerName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	workingDays: string[];
	openTime: string;
	closeTime: string;
	services: string;
	description?: string;
}

const ShopSchema: Schema = new mongoose.Schema({
	shopName: { type: String, required: true },
	ownerName: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	address: { type: String, required: true },
	city: { type: String, required: true },
	state: { type: String, required: true },
	zipCode: { type: String, required: true },
	workingDays: [{ type: String }],
	openTime: { type: String, required: true },
	closeTime: { type: String, required: true },
	services: { type: String, required: true },
	description: { type: String },
});

export const Shop: Model<IShop> =
	mongoose.models.Shop || mongoose.model<IShop>("Shop", ShopSchema);
