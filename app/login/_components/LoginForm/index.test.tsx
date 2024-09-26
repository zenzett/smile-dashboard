import {act, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "./index";

jest.mock("@/utils/windowNavigate", () => jest.fn());

describe("LoginForm", () => {
	it("renders login form correctly", () => {
		const {getByTestId} = render(<LoginForm data-testid="login-form" />);

		expect(getByTestId("login-form")).toBeInTheDocument();
		expect(getByTestId("username")).toBeInTheDocument();
		expect(getByTestId("password")).toBeInTheDocument();
		expect(getByTestId("submit-btn")).toBeInTheDocument();
	});

	it("renders error message when the username and password leaves blank after blur", async () => {
		const {getByTestId, findByTestId} = render(<LoginForm />);

		const usernameInput = getByTestId("username");
		const passwordInput = getByTestId("password");
		const submitBtn = getByTestId("submit-btn");

		expect(submitBtn).toBeDisabled();

		userEvent.click(usernameInput);
		userEvent.click(passwordInput);
		userEvent.click(submitBtn);

		// const usernameErrorMessage = getByTestId("username-error-message");
		// expect(usernameErrorMessage).toBeInTheDocument();
		// expect(usernameErrorMessage).toHaveTextContent("Username harus diisi.");
		expect(await findByTestId("username-error-message")).toBeInTheDocument();
		expect(await findByTestId("username-error-message")).toHaveTextContent(
			"Username harus diisi.",
		);

		// const passwordErrorMessage = getByTestId("password-error-message");
		// expect(passwordErrorMessage).toBeInTheDocument();
		// expect(passwordErrorMessage).toHaveTextContent("Password harus diisi.");
		expect(await findByTestId("password-error-message")).toBeInTheDocument();
		expect(await findByTestId("password-error-message")).toHaveTextContent(
			"Password harus diisi.",
		);
	});

	it("submits login form with correct username and password", async () => {
		const {getByTestId} = render(<LoginForm />);

		const usernameInput = getByTestId("username");
		const passwordInput = getByTestId("password");
		const submitBtn = getByTestId("submit-btn");
		const toast = getByTestId("toast");

		expect(toast).not.toHaveClass("opacity-100");
		expect(submitBtn).toBeDisabled();

		// act(() => {
		userEvent.type(usernameInput, "testuser");
		// });
		await waitFor(() => {
			expect(usernameInput).toHaveValue("testuser");
		});

		await waitFor(() => {
			expect(submitBtn).toBeDisabled();
		});

		// act(() => {
		userEvent.type(passwordInput, "password");
		// });
		await waitFor(() => {
			expect(passwordInput).toHaveValue("password");
		});

		await waitFor(() => {
			expect(submitBtn).not.toBeDisabled();
		});

		// act(() => {
		userEvent.click(submitBtn);
		// });

		waitFor(() => {
			expect(require("@/utils/windowNavigate")).toHaveBeenCalledWith("/");
		});
	});

	it("submits login form with invalid username and password", () => {
		const {getByTestId} = render(<LoginForm />);

		const usernameInput = getByTestId("username");
		const passwordInput = getByTestId("password");
		const submitBtn = getByTestId("submit-btn");
		const toast = getByTestId("toast");

		expect(toast).not.toHaveClass("opacity-100");
		expect(submitBtn).toBeDisabled();

		act(() => {
			userEvent.type(usernameInput, "invalidusername");
		});
		waitFor(() => {
			expect(usernameInput).toHaveValue("invalidusername");
		});

		waitFor(() => {
			expect(submitBtn).toBeDisabled();
		});

		act(() => {
			userEvent.type(passwordInput, "invalidpassword");
		});
		waitFor(() => {
			expect(passwordInput).toHaveValue("invalidpassword");
		});

		waitFor(() => {
			expect(submitBtn).not.toBeDisabled();
		});

		act(() => {
			userEvent.click(submitBtn);
		});

		waitFor(() => {
			expect(toast.parentElement).toHaveClass("toast-container");
			expect(toast.parentElement).toHaveClass("opacity-100");
			expect(toast.parentElement).toHaveClass("flex", "opacity-100", "top-24");
			expect(toast.parentElement).toHaveClass("top-24");
			expect(toast).toHaveTextContent("Username atau password tidak valid.");
		});

		const toastCloseBtn = toast.getElementsByClassName("toast-close-btn");
		if (!toastCloseBtn) {
			throw new Error("Element does not exist.");
		}
		act(() => {
			userEvent.click(toastCloseBtn[0]);
		});

		waitFor(() => {
			expect(toast.parentElement).not.toHaveClass("opacity-100");
			expect(toast.parentElement).not.toHaveClass("flex");
			expect(toast.parentElement).not.toHaveClass("top-24");
		});
	});

	it("should toggle password field type", () => {
		const {getByTestId} = render(<LoginForm />);

		const passwordTogglerBtn = getByTestId("password-toggler-btn");

		const passwordInput = getByTestId("password");

		expect(passwordInput).toHaveAttribute("type", "password");

		act(() => {
			userEvent.click(passwordTogglerBtn);
		});

		waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "text");
		});

		act(() => {
			userEvent.click(passwordTogglerBtn);
		});

		waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "password");
		});
	});

	it("renders with custom className", () => {
		const {getByTestId} = render(
			<LoginForm data-testid="login-form" className="custom-class" />,
		);
		expect(getByTestId("login-form")).toHaveClass("custom-class");
	});
});
