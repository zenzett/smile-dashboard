import React from "react";

import {server} from "@/mocks/server";
import {User} from "@/types/User";
import {render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EditUser from "./";

const handleClose = jest.fn();

const onSuccessHandler = jest.fn();

const onErrorHandler = jest.fn();

const userData: User = {
	counter: 0,
	createdAt: "2023-10-02T21:18:23Z",
	deviceId: "fv4315Y3_gyeat2hKq7uE",
	email: "destalia@work.bri.co.id",
	id: 44,
	name: "Destalia ",
	password: "$2a$12$DszQZyPLPfsb/sJKuy7qE.y2NOLxBFP97kvtsjR73RSBFUa26ovNa",
	phoneNumber: "089618722872",
	updatedAt: "2023-10-02T21:18:23Z",
	userTypeId: "SUPER_ADMIN",
	username: "90147851",
	editable: true,
};

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("EditUser", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("opens the Edit modal with disabled components", async () => {
		const {getByTestId} = render(
			<EditUser
				isShow={true}
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const submitButton = getByTestId("submit-modal-edit-btn");
		const usernameInput = getByTestId("username-edit");
		const nameInput = getByTestId("name-edit");

		expect(usernameInput).toBeDisabled();
		expect(nameInput).toBeDisabled();
		expect(submitButton).toBeDisabled();
	});

	it("closes the modal when the close button is clicked", async () => {
		const {getByTestId} = render(
			<EditUser
				isShow={true}
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const modal = getByTestId("modal-edit-form");

		const closeModalButton =
			getByTestId("modal-edit-header").querySelector(".modal-close-btn");
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
			<EditUser
				isShow={true}
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const modal = getByTestId("modal-edit-form");
		const modalBackground = modal.parentElement as Element;

		await userEvent.click(modalBackground);

		await waitFor(() => {
			expect(handleClose).toBeCalledTimes(1);
		});
	});

	it("displays validation errors when submitting empty inputs", async () => {
		const {getByTestId} = render(
			<EditUser
				isShow={true}
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
				userTypeId="SUPER_ADMIN"
			/>,
		);

		const emailInput = getByTestId("email-edit");
		const passwordInput = getByTestId("password-edit");
		const passwordConfirmInput = getByTestId("password-confirm-edit");

		await userEvent.click(emailInput);
		await userEvent.clear(emailInput);

		await userEvent.click(passwordInput);
		await userEvent.clear(passwordInput);
		await userEvent.type(passwordInput, "test");

		await userEvent.click(passwordConfirmInput);
		await userEvent.clear(passwordConfirmInput);
		await userEvent.type(passwordConfirmInput, "test!");

		await userEvent.keyboard("{Tab}");

		await waitFor(() => {
			expect(getByTestId("email-error-message-edit")).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(getByTestId("password-error-message-edit")).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(
				getByTestId("password-confirm-error-message-edit"),
			).toBeInTheDocument();
		});
	});

	it("displays validation errors when submitting an invalid email or password", async () => {
		const {getByTestId} = render(
			<EditUser
				isShow={true}
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
				userTypeId="SUPER_ADMIN"
			/>,
		);

		const emailInput = getByTestId("email-edit");
		await userEvent.clear(emailInput);
		await userEvent.type(emailInput, "email123@bro.co.id");
		await waitFor(() => {
			expect(emailInput).toHaveValue("email123@bro.co.id");
		});

		const passwordInput = getByTestId("password-edit");
		await userEvent.clear(passwordInput);
		await userEvent.type(passwordInput, "password123");
		await waitFor(() => {
			expect(passwordInput).toHaveValue("password123");
		});

		const passwordConfirmInput = getByTestId("password-confirm-edit");
		await userEvent.clear(passwordConfirmInput);
		await userEvent.type(passwordConfirmInput, "Password123!");
		await waitFor(() => {
			expect(passwordConfirmInput).toHaveValue("Password123!");
		});
		userEvent.keyboard("{Tab}");

		await waitFor(() => {
			expect(getByTestId("email-error-message-edit")).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(getByTestId("password-error-message-edit")).toBeInTheDocument();
		});
	});

	it("submits the form with valid data", async () => {
		const {getByTestId} = render(
			<EditUser
				isShow={true}
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
				userTypeId="SUPER_ADMIN"
			/>,
		);

		const usernameInput = getByTestId("username-edit");
		expect(usernameInput).toBeDisabled();

		const nameInput = getByTestId("name-edit");
		expect(nameInput).toBeDisabled();

		const emailInput = getByTestId("email-edit");
		await userEvent.clear(emailInput);
		await userEvent.type(emailInput, "testuser@work.bri.co.id");
		expect(emailInput).toHaveValue("testuser@work.bri.co.id");

		const adminRadio = getByTestId("radio-admin-edit");
		userEvent.click(adminRadio);
		await waitFor(() => {
			expect(adminRadio).toBeChecked();
		});

		const passwordInput = getByTestId("password-edit");
		await userEvent.clear(passwordInput);
		await userEvent.type(passwordInput, "Password123!");
		await waitFor(() => {
			expect(passwordInput).toHaveValue("Password123!");
		});

		const passwordConfirmInput = getByTestId("password-confirm-edit");
		await userEvent.clear(passwordConfirmInput);
		await userEvent.type(passwordConfirmInput, "Password123!");
		await waitFor(() => {
			expect(passwordConfirmInput).toHaveValue("Password123!");
		});

		const showPasswordButton = getByTestId("toggle-hide-password-edit-btn");
		userEvent.click(showPasswordButton);
		await waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "password");
		});

		userEvent.click(showPasswordButton);
		await waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "text");
		});

		const showPasswordConfirmButton = getByTestId(
			"toggle-hide-password-confirm-edit-btn",
		);
		userEvent.click(showPasswordConfirmButton);
		await waitFor(() => {
			expect(passwordConfirmInput).toHaveAttribute("type", "password");
		});

		userEvent.click(showPasswordConfirmButton);
		await waitFor(() => {
			expect(passwordConfirmInput).toHaveAttribute("type", "text");
		});

		const submitButton = getByTestId("submit-modal-edit-btn");
		expect(submitButton).not.toBeDisabled();
		userEvent.click(submitButton);

		await waitFor(() => {
			expect(handleClose).toHaveBeenCalled();
			expect(onSuccessHandler).toHaveBeenCalled();
		});
	});
});
