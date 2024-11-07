"use client";

import { useState } from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, ChevronRight, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock data for booked slots
const mockBookings = [
	{ time: "09:00", client: "John Doe", service: "Haircut" },
	{ time: "10:00", client: "Jane Smith", service: "Beard Trim" },
	{ time: "11:30", client: "Mike Johnson", service: "Haircut & Beard Trim" },
	{ time: "13:00", client: "Emily Brown", service: "Hair Coloring" },
	{ time: "14:30", client: "Chris Wilson", service: "Haircut" },
	{ time: "16:00", client: "Alex Lee", service: "Beard Trim" },
	{ time: "17:30", client: "Sam Taylor", service: "Haircut" },
];

export default function BarberCalendar() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const { toast } = useToast();

	const handleNextDay = () => {
		setCurrentDate(addDays(currentDate, 1));
	};

	const handleShare = async () => {
		const shareUrl = `https://your-barber-booking-site.com/book?date=${format(
			currentDate,
			"yyyy-MM-dd"
		)}`;

		if (navigator.share) {
			try {
				await navigator.share({
					title: "Book a haircut",
					text: "Check out available slots and book your haircut!",
					url: shareUrl,
				});
				toast({
					title: "Shared successfully",
					description: "The booking link has been shared.",
				});
			} catch (error) {
				console.error("Error sharing:", error);
			}
		} else {
			navigator.clipboard.writeText(shareUrl).then(
				() => {
					toast({
						title: "Link copied",
						description: "The booking link has been copied to your clipboard.",
					});
				},
				(err) => {
					console.error("Could not copy text: ", err);
				}
			);
		}
	};

	return (
		<Card className="w-full max-w-3xl mx-auto">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-10">
				<CardTitle className="text-2xl font-bold">Barber Dashboard</CardTitle>
				<div className="flex items-center space-x-2">
					<Button variant="outline" size="icon" onClick={handleShare}>
						<Share2 className="h-4 w-4" />
					</Button>
					<CalendarIcon className="mr-2 h-4 w-4" />
					<span className="text-lg">{format(currentDate, "MMMM d, yyyy")}</span>
					<Button variant="outline" size="icon" onClick={handleNextDay}>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[calc(100vh-200px)] pr-4">
					{mockBookings.map((booking, index) => (
						<div
							key={index}
							className={cn(
								"flex justify-between items-center p-4 rounded-lg mb-2",
								index % 2 === 0 ? "bg-secondary" : "bg-primary/5"
							)}>
							<div className="flex items-center">
								<span className="text-lg font-semibold mr-4">
									{booking.time}
								</span>
								<div>
									<p className="font-medium">{booking.client}</p>
									<p className="text-sm text-muted-foreground">
										{booking.service}
									</p>
								</div>
							</div>
						</div>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
