/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				light: {
					10: "#F8F9F9",
					20: "#EAEBEB",
					30: "#D3D4D4",
					40: "#B5B6B6",
					50: "#A3A3A3",
					60: "#929393",
					70: "#848484",
					80: "#777777",
				},
				primary: {
					10: "#DDEFFC",
					30: "#9ACEF7",
					40: "#78BDF4",
					70: "#138CEC",
					80: "#1078CA",
					90: "#00447E",
					100: "#0C5A98",
				},
				secondary: {
					10: "#FEEDDF",
					80: "#F87304",
					90: "#F47104",
					100: "#D16104",
				},
				red: {
					10: "#FCE7E7",
					40: "#FBD5D5",
					50: "#F8B4B4",
					80: "#E84040",
					100: "#C41818",
				},
				green: {
					10: "#E1F8EB",
					80: "#27AE60",
				},
				yellow: {
					20: "#FCF2D2",
					100: "#DEAB10",
				},
				dark: {
					10: "#666666",
					20: "#525252",
					40: "#292929",
				},
				blue: {
					10: "#CCE8FF",
					80: "#1078CA",
				},
			},
			boxShadow: {
				"level-2": "0px 8px 20px 0px rgba(119, 119, 119, 0.10)",
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
