"use server";

import Image from "next/image";
import React from "react";

import Footer from "./_components/Footer";
import LoginForm from "./_components/LoginForm";
import BgImageLogin from "./_images/image-login.svg";

const Login = async () => {
	return (
		<div
			className="flex flex-wrap md:flex-nowrap bg-[#EFF3F6]"
			style={{minHeight: "calc(100vh - 56px)"}}
		>
			<div className="w-full bg-white hidden lg:flex items-center justify-center px-4 md:px-7">
				<Image priority src={BgImageLogin} alt="bg-image-login" />
			</div>
			<div className="w-full flex flex-col items-center justify-center px-4 lg:px-7 gap-4 lg:gap-7 py-4 lg:py-7">
				<div className="flex-1 flex items-center">
					<LoginForm data-testid="login-form" />
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Login;
