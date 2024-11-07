import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Barbero",
	description: "Find your perfect barber on Barbero!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<header className="flex flex-col items-center justify-between p-8">
					<Image
						src="/logo.svg"
						width={50}
						height={50}
						alt="Picture of the author"
					/>
					<h1 className="text-3xl font-sans font-extrabold">Barbero</h1>
				</header>
				{children}
				<footer className="m-8 text-center text-sm text-muted-foreground">
					<p>&copy; 2024 BarberShop. All rights reserved.</p>
				</footer>
			</body>
		</html>
	);
}
