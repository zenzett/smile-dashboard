import {CustomFlowbiteTheme} from "flowbite-react";

export const theme: CustomFlowbiteTheme = {
	datepicker: {
		views: {
			days: {
				items: {
					item: {
						base: "datepicker-item block flex-1 cursor-pointer rounded-full border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ",
						selected: "bg-blue-700 text-white hover:bg-blue-600",
					},
				},
			},
		},
		popup: {
			root: {
				base: "relative",
			},
		},
	},
};
