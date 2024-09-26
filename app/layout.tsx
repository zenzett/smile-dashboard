import "./global.css";

import {Metadata} from "next";

export const metadata: Metadata = {
	title: "SenyuM Dashboard",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" className="h-full bg-[#EFF3F6]">
			<body className="h-full">{children}</body>
		</html>
	);
}
