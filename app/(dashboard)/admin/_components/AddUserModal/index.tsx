"use client";

import axios, {AxiosError} from "axios";
import {nanoid} from "nanoid";
import React, {
	Fragment,
	FunctionComponent,
	useCallback,
	useEffect,
	useRef,
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
import Radio from "@/components/atoms/Radio";
import Modal from "@/components/molecules/Modal";
import axiosInstance from "@/config/client/axios";
import {ApiResponse} from "@/types/ApiResponse";
import {CreateUserPayload} from "@/types/CreateUserPayload";
import {UserTypeID} from "@/types/UserTypeID";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
	username: yup
		.string()
		.required("Username harus diisi.")
		.matches(/^\d+$/, "Username hanya boleh memiliki angka.")
		.min(8, "Username minimal 8 karakter.")
		.max(16, "Username maksimal 16 karakter."),
	name: yup
		.string()
		.required("Nama harus diisi.")
		.max(60, "Nama maksimal 60 karakter")
		.matches(/^[A-Za-z\s]+$/, "Nama hanya boleh mengandung huruf alfabet.")
		.test(
			"no-leading-trailing-spaces",
			"Nama tidak boleh hanya berisi spasi.",
			function (value) {
				return value.trim() !== "";
			},
		),
	email: yup
		.string()
		.required("Email harus diisi.")
		.max(50, "Email maksimal 50 karakter")
		.matches(
			/^[\w.]+@(bri\.co\.id|work\.bri\.co\.id|corp\.bri\.co\.id)$/,
			"Email hanya bisa memiliki kombinasi huruf, angka, simbol underscore dan titik dengan domain yang valid.",
		),
	phoneNumber: yup
		.string()
		.required("Nomor Telepon harus diisi.")
		.min(7, "Nomor Telepon minimal 7 karakter.")
		.max(15, "Nomor Telepon maksimal 15 karakter.")
		.matches(
			/^\+?\d+$/,
			"Nomor Telepon hanya boleh mengandung angka dan satu simbol plus opsional.",
		),
	userTypeId: yup
		.mixed()
		.oneOf(["SUPER_ADMIN", "ADMIN", "VIEWER"], "Tipe User tidak valid.")
		.required("Tipe User harus dipilih."),
	password: yup
		.string()
		.required("Password harus diisi.")
		.min(8, "Password minimal 8 karakter.")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]+$/,
			"Password harus memiliki kombinasi huruf besar, huruf kecil dan angka.",
		),
	passwordConfirm: yup
		.string()
		.required("Konfirmasi Password harus diisi.")
		.oneOf(
			[yup.ref("password")],
			"Konfirmasi Password harus sama dengan Password.",
		),
});

type AddUserProps = {
	onSuccess: () => Promise<void>;
	onError: (error: unknown) => void;
	userTypeId: UserTypeID;
};

const initialValue: yup.InferType<typeof schema> = {
	username: "",
	name: "",
	email: "",
	phoneNumber: "",
	userTypeId: "",
	password: "",
	passwordConfirm: "",
};

const AddUser: FunctionComponent<AddUserProps> = ({
	onSuccess,
	onError,
	userTypeId,
}) => {
	const [isUnmaskPassword, setIsUnmaskPassword] = useState<boolean>(false);

	const [isUnmaskPasswordConfirmation, setIsUnmaskPasswordConfirmation] =
		useState<boolean>(false);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isShow, setIsShow] = useState<boolean>(false);

	const clickTimeoutRef = useRef<NodeJS.Timeout>();

	const {
		control,
		handleSubmit,
		reset,
		formState: {isValid},
		setValue,
	} = useForm({
		values: {...initialValue},
		resolver: yupResolver(schema),
		mode: "all",
	});

	const createUser = useCallback(
		async (data: yup.InferType<typeof schema>) => {
			try {
				const payload: CreateUserPayload = {
					...data,
					deviceId: nanoid(),
				};
				setIsLoading(true);
				await axiosInstance.post("/api/user", payload);
				setIsShow(false);
				setIsLoading(false);
				await onSuccess();
			} catch (error) {
				setIsLoading(false);
				if (axios.isAxiosError(error)) {
					const errorData: AxiosError<ApiResponse> = error;
					const responseDescription =
						errorData.response?.data.responseDescription;

					switch (responseDescription) {
						case "USERNAME_ALREADY_REGISTERED":
							onError("Username sudah terdaftar. Silahkan coba lagi.");
							break;
						case "EMAIL_ALREADY_REGISTERED":
							onError("Email sudah terdaftar. Silahkan coba lagi.");
							break;
						default:
							onError(error);
							break;
					}
				}
			}
		},
		[onError, onSuccess],
	);

	const submitForm = async (data: yup.InferType<typeof schema>) => {
		let timeout: NodeJS.Timeout | undefined = undefined;
		timeout && clearTimeout(timeout);
		timeout = setTimeout(() => {
			createUser(data);
		}, 200);
	};

	const handleClose = useCallback(() => {
		if (!isLoading) {
			setIsShow(false);
		}
	}, [isLoading]);

	useEffect(() => {
		reset(initialValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShow]);

	return (
		<Fragment>
			<Button
				id="show-modal-btn"
				data-testid="show-modal-btn"
				onClick={() => {
					if (clickTimeoutRef.current) {
						clearTimeout(clickTimeoutRef.current);
					}
					clickTimeoutRef.current = setTimeout(() => {
						setIsShow(true);
					}, 100);
				}}
				bordered
				variant="primary-outline"
				className="gap-2"
				type="button"
			>
				<i className="fa fa-circle-plus"></i>
				Tambah User
			</Button>

			<Modal
				id="modal-form"
				data-testid="modal-form"
				isShow={isShow}
				className="w-[482px]"
				onClickBackground={handleClose}
			>
				<form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
					<Modal.Header
						id="modal-header"
						data-testid="modal-header"
						dismissable
						handleClose={handleClose}
					>
						Tambah User
					</Modal.Header>
					<Modal.Body id="modal-body" data-testid="modal-body">
						<Controller
							control={control}
							name="username"
							render={({field, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="username"
										aria-label="Username Label"
										data-testid="label-username"
									>
										Username
									</Label>
									<Input
										id="username"
										data-testid="username"
										placeholder="Personal Number/NIK"
										{...field}
										variant={error ? "error" : undefined}
									/>
									{error?.message ? (
										<FormMessage
											id="username-error-message"
											data-testid="username-error-message"
											variant="danger"
										>
											{error?.message}
										</FormMessage>
									) : (
										false
									)}
								</FormGroup>
							)}
						/>
						<Controller
							control={control}
							name="name"
							render={({field, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="name"
										aria-label="Name Label"
										data-testid="label-name"
									>
										Nama
									</Label>
									<Input
										id="name"
										data-testid="name"
										placeholder="Nama"
										{...field}
										variant={error ? "error" : undefined}
									/>
									{error?.message ? (
										<FormMessage
											id="name-error-message"
											data-testid="name-error-message"
											variant="danger"
										>
											{error?.message}
										</FormMessage>
									) : (
										false
									)}
								</FormGroup>
							)}
						/>
						<Controller
							control={control}
							name="email"
							render={({field: {onChange, ...attrs}, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="email"
										aria-label="Email Label"
										data-testid="label-email"
									>
										Email Kantor
									</Label>
									<Input
										id="email"
										data-testid="email"
										placeholder="Email berdomain @bri.co.id / @corp.bri.co.id / @work.bri.co.id"
										type="email"
										{...attrs}
										onChange={(e) => {
											const value = e.currentTarget.value.trim().toLowerCase();
											onChange(value);
										}}
										variant={error ? "error" : undefined}
									/>
									{error?.message ? (
										<FormMessage
											id="email-error-message"
											data-testid="email-error-message"
											aria-label="email-error-message"
											variant="danger"
										>
											{error?.message}
										</FormMessage>
									) : (
										false
									)}
								</FormGroup>
							)}
						/>
						<Controller
							control={control}
							name="phoneNumber"
							render={({field, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="phone-number"
										aria-label="Phone Number Label"
										data-testid="label-phone-number"
									>
										Nomor Telepon
									</Label>
									<Input
										id="phone-number"
										data-testid="phone-number"
										placeholder="Nomor Telepon"
										{...field}
										variant={error ? "error" : undefined}
									/>
									{error?.message ? (
										<FormMessage
											id="phone-number-error-message"
											data-testid="phone-number-error-message"
											variant="danger"
										>
											{error?.message}
										</FormMessage>
									) : (
										false
									)}
								</FormGroup>
							)}
						/>
						<Controller
							control={control}
							name="userTypeId"
							render={({field: {value, onChange}, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="user-type"
										aria-label="User Type Label"
										data-testid="label-usertype"
									>
										Tipe User
									</Label>
									<div id="user-type" className="flex mt-2">
										{userTypeId && userTypeId === "SUPER_ADMIN" ? (
											<>
												<Radio
													label="Super Admin"
													id="radio-super-admin"
													data-testid="radio-super-admin"
													name="usertype-option"
													className="w-full"
													value="SUPER_ADMIN"
													checked={value === "SUPER_ADMIN"}
													onChange={onChange}
													onClick={() => {
														setValue("userTypeId", "SUPER_ADMIN");
													}}
												/>
												<Radio
													label="Admin"
													id="radio-admin"
													data-testid="radio-admin"
													name="usertype-option"
													className="w-full"
													value="ADMIN"
													checked={value === "ADMIN"}
													onChange={onChange}
													onClick={() => {
														setValue("userTypeId", "ADMIN");
													}}
												/>
											</>
										) : (
											false
										)}

										<Radio
											label="Viewer"
											id="radio-viewer"
											data-testid="radio-viewer"
											name="usertype-option"
											className="w-full"
											value="VIEWER"
											checked={value === "VIEWER"}
											onChange={onChange}
											onClick={() => {
												setValue("userTypeId", "VIEWER");
											}}
										/>
									</div>
								</FormGroup>
							)}
						/>
						<Controller
							control={control}
							name="password"
							render={({field, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="password"
										aria-label="Password Label"
										data-testid="label-password"
									>
										Password
									</Label>
									<FormIcon data-testid="password-form-icon">
										<Input
											id="password"
											data-testid="password"
											type={isUnmaskPassword ? "text" : "password"}
											{...field}
											variant={error ? "error" : undefined}
											className="pr-10"
										/>
										<button
											className="icon"
											type="button"
											onClick={() => setIsUnmaskPassword(!isUnmaskPassword)}
											data-testid="toggle-password-btn"
										>
											{isUnmaskPassword ? (
												<i className="fas fa-eye"></i>
											) : (
												<i className="fas fa-eye-slash"></i>
											)}
										</button>
									</FormIcon>
									{error?.message ? (
										<FormMessage
											id="password-error-message"
											data-testid="password-error-message"
											aria-label="password-error-message"
											variant="danger"
											className="mt-1.5"
										>
											{error?.message}
										</FormMessage>
									) : (
										false
									)}
									<FormMessage>
										Min. 8 karakter serta merupakan kombinasi huruf besar dan
										angka.
									</FormMessage>
								</FormGroup>
							)}
						/>
						<Controller
							control={control}
							name="passwordConfirm"
							render={({field, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="password-confirm"
										aria-label="Password Confirm Label"
										data-testid="label-password-confirm"
									>
										Konfirmasi Password
									</Label>
									<FormIcon data-testid="password-confirm-form-icon">
										<Input
											id="password-confirm"
											data-testid="password-confirm"
											type={isUnmaskPasswordConfirmation ? "text" : "password"}
											{...field}
											variant={error ? "error" : undefined}
											className="pr-10"
										/>
										<button
											className="icon"
											type="button"
											onClick={() =>
												setIsUnmaskPasswordConfirmation(
													!isUnmaskPasswordConfirmation,
												)
											}
											data-testid="toggle-password-confirm-btn"
										>
											{isUnmaskPasswordConfirmation ? (
												<i className="fas fa-eye"></i>
											) : (
												<i className="fas fa-eye-slash"></i>
											)}
										</button>
									</FormIcon>
									{error?.message ? (
										<FormMessage
											id="password-confirm-error-message"
											data-testid="password-confirm-error-message"
											aria-label="password-confirm-error-message"
											variant="danger"
											className="mt-1.5"
										>
											{error?.message}
										</FormMessage>
									) : (
										false
									)}
								</FormGroup>
							)}
						/>
					</Modal.Body>
					<Modal.Footer id="modal-footer" data-testid="modal-footer">
						<div>
							<Button
								id="submit-modal-btn"
								data-testid="add-user-modal-submit-btn"
								variant="primary"
								className="w-full"
								disabled={!isValid || isLoading}
							>
								Tambah User
							</Button>
						</div>
					</Modal.Footer>
				</form>
			</Modal>
		</Fragment>
	);
};

export default AddUser;
