import React from "react";

import axiosInstance from "@/config/client/axios";
import {
	createUserErrorEmailAlreadyRegistered,
	createUserErrorUsernameAlreadyRegistered,
	createUserGeneralError,
} from "@/mocks/handlers/user";
import {server} from "@/mocks/server";
import {fireEvent, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddUser from "./";

const onSuccessCallback = jest.fn();

const onErrorCallback = jest.fn();

jest.mock("nanoid", () => {
	return {
		nanoid: () => 123456,
	};
});

describe("AddUser", () => {
	beforeAll(() => server.listen());

	afterEach(() => {
		server.resetHandlers();

		onSuccessCallback.mockClear();
		onErrorCallback.mockClear();
	});

	afterAll(() => server.close());

	it("renders the 'Tambah User' button", async () => {
		const {getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const modal = getByTestId("modal-form");
		const showModalButton = getByTestId("show-modal-btn");

		expect(showModalButton).toBeInTheDocument();
		userEvent.click(showModalButton);
		userEvent.click(showModalButton);

		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});
	});

	it("opens the modal when the 'Tambah User' button is clicked", async () => {
		const {getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const modal = getByTestId("modal-form");
		const showModalButton = getByTestId("show-modal-btn");
		const submitButton = getByTestId("add-user-modal-submit-btn");
		const usernameInput = getByTestId("username");
		const passwordInput = getByTestId("password");
		const emailInput = getByTestId("email");
		const nameInput = getByTestId("name");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		expect(usernameInput).toHaveValue("");
		expect(nameInput).toHaveValue("");
		expect(emailInput).toHaveValue("");
		expect(passwordInput).toHaveValue("");
		expect(submitButton).toBeDisabled();
	});

	it("closes the modal when the close button is clicked", async () => {
		const {getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const closeModalButton =
			getByTestId("modal-header").querySelector(".modal-close-btn");
		if (!closeModalButton) {
			throw new Error("Element does not exist.");
		}
		userEvent.click(closeModalButton);

		await waitFor(() => {
			expect(modal).not.toHaveClass("opacity-100");
		});
	});

	it("closes the modal when the background is clicked", async () => {
		const {getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		await waitFor(() => {
			const modalBackground = modal.parentNode;
			if (!modalBackground) {
				throw new Error("Element does not exist.");
			}
			fireEvent.click(modalBackground);
		});

		await waitFor(() => {
			expect(modal).not.toHaveClass("opacity-100");
		});
	});

	it("check the radio super admin and admin to be available when user type is super admin", async () => {
		const {getByTestId, queryByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="ADMIN"
			/>,
		);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const superAdminRadio = queryByTestId("radio-super-admin");
		const adminRadio = queryByTestId("radio-admin");
		const viewerRadio = getByTestId("radio-viewer");
		await waitFor(() => {
			expect(superAdminRadio).not.toBeInTheDocument();
			expect(adminRadio).not.toBeInTheDocument();
			expect(viewerRadio).toBeInTheDocument();
		});
	});

	it("displays validation errors when submitting empty inputs", async () => {
		const {findByTestId, getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const showModalButton = getByTestId("show-modal-btn");
		const submitButton = getByTestId("add-user-modal-submit-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const usernameInput = getByTestId("username");
		const nameInput = getByTestId("name");
		const emailInput = getByTestId("email");
		const passwordInput = getByTestId("password");
		const passwordConfirmInput = getByTestId("password-confirm");

		userEvent.click(usernameInput);
		userEvent.click(nameInput);
		userEvent.click(emailInput);
		userEvent.click(passwordInput);
		userEvent.click(passwordConfirmInput);
		userEvent.click(submitButton);
		userEvent.keyboard("{Tab}");

		expect(await findByTestId("username-error-message")).toBeInTheDocument();
		expect(await findByTestId("name-error-message")).toBeInTheDocument();
		expect(await findByTestId("email-error-message")).toBeInTheDocument();
		expect(await findByTestId("password-error-message")).toBeInTheDocument();
		expect(
			await findByTestId("password-confirm-error-message"),
		).toBeInTheDocument();
	});

	it("displays validation errors when submitting an invalid email or password", async () => {
		const {getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		await waitFor(() => {
			expect(modal).not.toHaveClass("opacity-100");
		});

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const emailInput = getByTestId("email");
		const passwordInput = getByTestId("password");
		const passwordConfirmInput = getByTestId("password-confirm");

		userEvent.type(emailInput, "invalidemail");
		userEvent.type(passwordInput, "invalidpassword");
		userEvent.type(passwordConfirmInput, "notinvalidpassword");
		userEvent.keyboard("{Tab}");

		await waitFor(() => {
			expect(getByTestId("email-error-message")).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(getByTestId("password-error-message")).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(getByTestId("password-confirm-error-message")).toBeInTheDocument();
		});
	});

	it("submits the form with valid data", async () => {
		const {getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const usernameInput = getByTestId("username");
		const nameInput = getByTestId("name");
		const emailInput = getByTestId("email");
		const superAdminRadio = getByTestId("radio-super-admin");
		const adminRadio = getByTestId("radio-admin");
		const viewerRadio = getByTestId("radio-viewer");
		const passwordInput = getByTestId("password");
		const passwordConfirmInput = getByTestId("password-confirm");

		userEvent.type(usernameInput, "909090");
		userEvent.type(nameInput, "Test User");
		userEvent.type(emailInput, "testuser@bri.co.id");
		userEvent.click(superAdminRadio);
		await waitFor(() => {
			expect(superAdminRadio).toBeChecked();
		});
		userEvent.click(adminRadio);
		await waitFor(() => {
			expect(adminRadio).toBeChecked();
		});
		userEvent.click(viewerRadio);
		await waitFor(() => {
			expect(viewerRadio).toBeChecked();
		});

		userEvent.type(passwordInput, "Password123!");

		const showPasswordButton = getByTestId("toggle-password-btn");
		userEvent.click(showPasswordButton);
		await waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "password");
		});

		userEvent.click(showPasswordButton);
		await waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "text");
		});

		userEvent.type(passwordConfirmInput, "Password123!");

		const showPasswordConfirmButton = getByTestId(
			"toggle-password-confirm-btn",
		);
		userEvent.click(showPasswordConfirmButton);
		await waitFor(() => {
			expect(passwordConfirmInput).toHaveAttribute("type", "password");
		});

		userEvent.click(showPasswordConfirmButton);
		await waitFor(() => {
			expect(passwordConfirmInput).toHaveAttribute("type", "text");
		});

		const submitButton = getByTestId("add-user-modal-submit-btn");
		await waitFor(() => {
			expect(submitButton).toHaveAttribute("disabled", "");
		});
		userEvent.click(submitButton);

		userEvent.clear(passwordInput);

		await waitFor(() => {
			expect(submitButton).toBeDisabled();
		});
	});

	it("should call onSuccessCallback when success to submit new user", async () => {
		const {getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);

		const showModalBtn = getByTestId("show-modal-btn");
		fireEvent.click(showModalBtn);

		await waitFor(() => {
			expect(getByTestId("modal-form").parentElement).toHaveClass(
				"flex justify-center items-center",
			);
		});

		await userEvent.type(getByTestId("username"), "901506012");
		await userEvent.type(getByTestId("name"), "John Doe");
		await userEvent.type(getByTestId("email"), "john.doe@work.bri.co.id");
		await userEvent.type(getByTestId("phone-number"), "1234567890");
		await userEvent.click(getByTestId("radio-admin"));
		await userEvent.type(getByTestId("password"), "Password123!");
		await userEvent.type(getByTestId("password-confirm"), "Password123!");

		await waitFor(() => {
			expect(getByTestId("add-user-modal-submit-btn")).not.toBeDisabled();
		});

		const submitBtn = getByTestId("add-user-modal-submit-btn");
		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(onSuccessCallback).toHaveBeenCalled();
		});
	});

	it("handles error when USERNAME_ALREADY_REGISTERED", async () => {
		server.use(createUserErrorUsernameAlreadyRegistered);

		const {getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);

		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const usernameInput = getByTestId("username");
		const nameInput = getByTestId("name");
		const emailInput = getByTestId("email");
		const phoneNumberInput = getByTestId("phone-number");
		const adminRadio = getByTestId("radio-admin");
		const passwordInput = getByTestId("password");
		const passwordConfirmInput = getByTestId("password-confirm");

		await userEvent.type(usernameInput, "901506012");
		await userEvent.type(nameInput, "John Doe");
		await userEvent.type(emailInput, "john.doe@work.bri.co.id");
		await userEvent.type(phoneNumberInput, "1234567890");
		await userEvent.click(adminRadio);
		await waitFor(() => {
			expect(adminRadio).toBeChecked();
		});

		await userEvent.type(passwordInput, "Password123!");
		await userEvent.type(passwordConfirmInput, "Password123!");

		const submitButton = getByTestId("add-user-modal-submit-btn");
		await waitFor(() => {
			expect(submitButton).not.toBeDisabled();
		});
		userEvent.click(submitButton);

		await waitFor(() => {
			expect(onErrorCallback).toHaveBeenCalledWith(
				"Username sudah terdaftar. Silahkan coba lagi.",
			);
		});
	});

	it("handles error when EMAIL_ALREADY_REGISTERED", async () => {
		server.use(createUserErrorEmailAlreadyRegistered);

		const {getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);

		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const usernameInput = getByTestId("username");
		const nameInput = getByTestId("name");
		const emailInput = getByTestId("email");
		const phoneNumberInput = getByTestId("phone-number");
		const adminRadio = getByTestId("radio-admin");
		const passwordInput = getByTestId("password");
		const passwordConfirmInput = getByTestId("password-confirm");

		await userEvent.type(usernameInput, "901506012");
		await userEvent.type(nameInput, "John Doe");
		await userEvent.type(emailInput, "john.doe@work.bri.co.id");
		await userEvent.type(phoneNumberInput, "1234567890");
		await userEvent.click(adminRadio);
		await waitFor(() => {
			expect(adminRadio).toBeChecked();
		});

		await userEvent.type(passwordInput, "Password123!");
		await userEvent.type(passwordConfirmInput, "Password123!");

		const submitButton = getByTestId("add-user-modal-submit-btn");
		await waitFor(() => {
			expect(submitButton).not.toBeDisabled();
		});
		userEvent.click(submitButton);

		await waitFor(() => {
			expect(onErrorCallback).toHaveBeenCalledWith(
				"Email sudah terdaftar. Silahkan coba lagi.",
			);
		});
	});

	it("handles general error", async () => {
		server.use(createUserGeneralError);

		try {
			const res = await axiosInstance.post("/api/user", {});
			console.log(res);
		} catch (error) {
			console.log("error", error);
		}

		const {getByTestId} = render(
			<AddUser
				onSuccess={onSuccessCallback}
				onError={onErrorCallback}
				userTypeId="SUPER_ADMIN"
			/>,
		);

		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const usernameInput = getByTestId("username");
		const nameInput = getByTestId("name");
		const emailInput = getByTestId("email");
		const phoneNumberInput = getByTestId("phone-number");
		const adminRadio = getByTestId("radio-admin");
		const passwordInput = getByTestId("password");
		const passwordConfirmInput = getByTestId("password-confirm");

		await userEvent.type(usernameInput, "901506012");
		await userEvent.type(nameInput, "John Doe");
		await userEvent.type(emailInput, "john.doe@work.bri.co.id");
		await userEvent.type(phoneNumberInput, "1234567890");
		await userEvent.click(adminRadio);
		await waitFor(() => {
			expect(adminRadio).toBeChecked();
		});

		await userEvent.type(passwordInput, "Password123!");
		await userEvent.type(passwordConfirmInput, "Password123!");

		const submitButton = getByTestId("add-user-modal-submit-btn");
		await waitFor(() => {
			expect(submitButton).not.toBeDisabled();
		});
		userEvent.click(submitButton);

		await waitFor(() => {
			expect(onErrorCallback).toHaveBeenCalledTimes(1);
		});
	});
});
