"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Card } from "./ui/card";

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

const days = [
	{ id: "monday", label: "Monday" },
	{ id: "tuesday", label: "Tuesday" },
	{ id: "wednesday", label: "Wednesday" },
	{ id: "thursday", label: "Thursday" },
	{ id: "friday", label: "Friday" },
	{ id: "saturday", label: "Saturday" },
	{ id: "sunday", label: "Sunday" },
];

const timeSlots = [
	"6:00 AM",
	"7:00 AM",
	"8:00 AM",
	"9:00 AM",
	"10:00 AM",
	"11:00 AM",
	"12:00 PM",
	"1:00 PM",
	"2:00 PM",
	"3:00 PM",
	"4:00 PM",
	"5:00 PM",
	"6:00 PM",
	"7:00 PM",
	"8:00 PM",
	"9:00 PM",
	"10:00 PM",
	"11:00 PM",
];

export default function OnboardingForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			shopName: "",
			ownerName: "",
			email: "",
			phone: "",
			address: "",
			city: "",
			state: "",
			zipCode: "",
			workingDays: [],
			openTime: "",
			closeTime: "",
			services: "",
			description: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		toast({
			title: "Onboarding Submitted",
			description: "Your shop information has been successfully submitted.",
		});
	}

	return (
		<>
			<div className="flex">
				<Card className="w-full p-10">
					<h1 className="text-2xl font-bold m-10">Navigate to other pages</h1>
					<div className="flex gap-2">
						<Button>
							<Link href="/dashboard">Dashboard</Link>
						</Button>
						<Link href="/booking-form">Bookings</Link>
					</div>
				</Card>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="shopName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Shop Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter your shop name" {...field} />
								</FormControl>
								<FormDescription>
									This is the name that will be displayed to customers.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="ownerName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Owner Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter owner's name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Enter your email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input placeholder="Enter your phone number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input placeholder="Enter your shop address" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input placeholder="Enter city" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="state"
							render={({ field }) => (
								<FormItem>
									<FormLabel>State</FormLabel>
									<FormControl>
										<Input placeholder="Enter state" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="zipCode"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Zip Code</FormLabel>
									<FormControl>
										<Input placeholder="Enter zip code" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="workingDays"
						render={() => (
							<FormItem>
								<div className="mb-4">
									<FormLabel className="text-base">Working Days</FormLabel>
									<FormDescription>
										Select the days your shop is open.
									</FormDescription>
								</div>
								<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
									{days.map((day) => (
										<FormField
											key={day.id}
											control={form.control}
											name="workingDays"
											render={({ field }) => {
												return (
													<FormItem
														key={day.id}
														className="flex flex-row items-start space-x-3 space-y-0">
														<FormControl>
															<Checkbox
																checked={field.value?.includes(day.id)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([...field.value, day.id])
																		: field.onChange(
																				field.value?.filter(
																					(value) => value !== day.id
																				)
																		  );
																}}
															/>
														</FormControl>
														<FormLabel className="font-normal">
															{day.label}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<FormField
							control={form.control}
							name="openTime"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Opening Time</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select opening time" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{timeSlots.map((time) => (
												<SelectItem key={time} value={time}>
													{time}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="closeTime"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Closing Time</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select closing time" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{timeSlots.map((time) => (
												<SelectItem key={time} value={time}>
													{time}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="services"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Services Offered</FormLabel>
								<FormControl>
									<Textarea
										placeholder="List your services (e.g., Haircut, Beard Trim, Hair Coloring)"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Separate multiple services with commas.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Shop Description (Optional)</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Tell us about your shop..."
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Provide a brief description of your shop and any special
									features.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit Onboarding Information</Button>
				</form>
			</Form>
		</>
	);
}
