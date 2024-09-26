"use client";

import dayjs from "dayjs";
import React from "react";

const Footer = () => {
	const date = new Date();

	return (
		<p className="text-center text-light-60 text-sm font-semibold">
			© {dayjs(date).format("YYYY")} SenyuM Powered by BRI | All Rights
			Reserved.
		</p>
	);
};

export default Footer;
