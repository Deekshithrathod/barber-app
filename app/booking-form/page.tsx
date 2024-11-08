"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { bookSlotAtShop } from "@/lib/action";

const formSchema = z.object({
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

// Mock data for available time slots in AM/PM format
const availableSlots = [
	"9:00 AM",
	"9:30 AM",
	"10:00 AM",
	"10:30 AM",
	"11:00 AM",
	"11:30 AM",
	"12:00 PM",
	"12:30 PM",
	"1:00 PM",
	"1:30 PM",
	"2:00 PM",
	"2:30 PM",
	"3:00 PM",
	"3:30 PM",
	"4:00 PM",
	"4:30 PM",
	"5:00 PM",
	"5:30 PM",
];

// Mock data for services
const services = [
	{ value: "haircut", label: "Haircut" },
	{ value: "beard-trim", label: "Beard Trim" },
	{ value: "haircut-and-beard", label: "Haircut & Beard Trim" },
	{ value: "hair-coloring", label: "Hair Coloring" },
];

export default function BookingForm() {
	const [date, setDate] = useState<Date>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		await bookSlotAtShop(values);

		toast({
			title: "Booking Submitted",
			description: `Your appointment is scheduled for ${format(
				values.date,
				"MMMM d, yyyy"
			)} at ${values.time}.`,
		});
	}

	return (
		<div className="px-12 py-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="John Doe" {...field} />
								</FormControl>
								<FormDescription>Please enter your full name.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="johndoe@example.com" {...field} />
								</FormControl>
								<FormDescription>
									We'll use this to send you a confirmation.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="date"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date < new Date() ||
												date >
													new Date(
														new Date().setMonth(new Date().getMonth() + 2)
													)
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormDescription>
									Select your preferred appointment date.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="time"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time</FormLabel>
								<FormControl>
									<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
										{availableSlots.map((slot) => (
											<Button
												key={slot}
												type="button"
												variant={field.value === slot ? "default" : "outline"}
												className={cn(
													"h-12",
													field.value === slot &&
														"bg-primary text-primary-foreground"
												)}
												onClick={() => field.onChange(slot)}>
												<Clock className="mr-2 h-4 w-4" />
												{slot}
											</Button>
										))}
									</div>
								</FormControl>
								<FormDescription>
									Choose your preferred time slot.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="service"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Service</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a service" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{services.map((service) => (
											<SelectItem key={service.value} value={service.value}>
												{service.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>
									Select the service you'd like to book.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Book Appointment</Button>
				</form>
			</Form>
		</div>
	);
}
