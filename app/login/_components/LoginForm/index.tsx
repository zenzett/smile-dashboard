"use client";

import axios, {AxiosError} from "axios";
import Link from "next/link";
import React, {
	FunctionComponent,
	HTMLAttributes,
	useCallback,
	useEffect,
	useState,
} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import FormIcon from "@/components/atoms/FormIcon";
import FormMessage from "@/components/atoms/FormMessage";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Toast from "@/components/molecules/Toast";
import axiosInstance from "@/config/client/axios";
import {ApiResponse} from "@/types/ApiResponse";
import windowNavigate from "@/utils/windowNavigate";
import {yupResolver} from "@hookform/resolvers/yup";

type LoginFormProps = HTMLAttributes<HTMLDivElement>;

const schema = yup.object({
	username: yup
		.string()
		.required("Username harus diisi.")
		.min(8, "Username minimal 8 karakter."),
	password: yup
		.string()
		.required("Password harus diisi.")
		.min(6, "Password minimal 6 karakter."),
	deviceId: yup.string().required(),
});

const LoginForm: FunctionComponent<LoginFormProps> = ({
	className,
	...attrs
}) => {
	const [isShowToast, setIsShowToast] = useState<boolean>(false);

	const [toastMessage, setToastMessage] = useState<string>();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isUnmaskPassword, setIsUnmaskPassword] = useState<boolean>(false);

	const [userAgent, setUserAgent] = useState<string>("");

	useEffect(() => {
		setUserAgent(window.navigator.userAgent.replace(/\s+/g, ""));
	}, []);

	const {
		control,
		handleSubmit,
		formState: {isValid},
	} = useForm({
		values: {
			username: "",
			password: "",
			deviceId: userAgent,
		},
		resolver: yupResolver(schema),
		mode: "all",
	});

	const fetchLogin = useCallback(async (data: yup.InferType<typeof schema>) => {
		setIsShowToast(false);
		setToastMessage(undefined);

		try {
			setIsLoading(true);
			await axiosInstance.post("/api/login", data);
			await axiosInstance.get("/api/profile");
			windowNavigate("/");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorData: AxiosError<ApiResponse> = error;
				const responseDescription =
					errorData.response?.data.responseDescription;
				switch (responseDescription) {
					case "INVALID_USERNAME_OR_PASSWORD":
					case "RESOURCE_NOT_FOUND":
						setIsShowToast(true);
						setToastMessage("Username atau password tidak valid.");
						break;
					case "FREEZE":
						setIsShowToast(true);
						setToastMessage(
							"Anda salah menginputkan username atau password sebanyak 5x. Silakan coba lagi setelah 3 menit.",
						);
						break;
				}
			}
		}
		setIsLoading(false);
	}, []);

	const onSubmit = async (data: yup.InferType<typeof schema>) => {
		let timeout: NodeJS.Timeout | undefined = undefined;
		timeout && clearTimeout(timeout);
		timeout = setTimeout(() => {
			fetchLogin(data);
		}, 200);
	};

	useEffect(() => {
		if (!isShowToast) {
			return;
		}

		const timeoutId = setTimeout(() => {
			setIsShowToast(false);
		}, 3000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [isShowToast]);

	return (
		<div
			className={"login-form".concat(className ? ` ${className}` : "")}
			{...attrs}
		>
			<div className="text-[28px] font-semibold text-primary-90">Masuk</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name="username"
					render={({field, fieldState: {error}}) => (
						<FormGroup>
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								{...field}
								placeholder="Masukkan Personal Number/NIK"
								variant={error ? "error" : undefined}
								data-testid="username"
							/>
							{error ? (
								<FormMessage
									variant="danger"
									id="username-error-message"
									data-testid="username-error-message"
								>
									{error.message}
								</FormMessage>
							) : (
								false
							)}
						</FormGroup>
					)}
				/>
				<Controller
					control={control}
					name="password"
					render={({field, fieldState: {error}}) => (
						<FormGroup>
							<Label htmlFor="password">Password</Label>
							<FormIcon data-testid="password-form-icon">
								<Input
									id="password"
									type={isUnmaskPassword ? "text" : "password"}
									{...field}
									variant={error ? "error" : undefined}
									className="pr-10"
									data-testid="password"
									placeholder="Masukkan Password"
								/>
								<button
									className="icon"
									id="password-toggler-btn"
									data-testid="password-toggler-btn"
									type="button"
									onClick={() => setIsUnmaskPassword(!isUnmaskPassword)}
								>
									{isUnmaskPassword ? (
										<i className="fas fa-eye-slash"></i>
									) : (
										<i className="fas fa-eye"></i>
									)}
								</button>
							</FormIcon>
							{error ? (
								<FormMessage
									variant="danger"
									id="password-error-message"
									data-testid="password-error-message"
								>
									{error.message}
								</FormMessage>
							) : (
								false
							)}
						</FormGroup>
					)}
				/>
				<div className="text-right mt-4">
					<Link
						id="forgot-password"
						data-testid="forgot-password"
						href="#"
						className="text-primary-80 text-sm font-medium"
					>
						Lupa Password?
					</Link>
				</div>

				<Button
					size="lg"
					variant="primary"
					className="w-full mt-4"
					isLoading={isLoading}
					disabled={!isValid || isLoading}
					data-testid="submit-btn"
				>
					Masuk
				</Button>
			</form>

			<Toast
				id="toast"
				data-testid="toast"
				isShow={isShowToast}
				handleClose={() => {
					setIsShowToast(false);
				}}
				status="error"
			>
				{toastMessage}
			</Toast>
		</div>
	);
};

export default LoginForm;
