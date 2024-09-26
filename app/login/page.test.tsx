import React from "react";

import {render} from "@testing-library/react";

import Login from "./page";

jest.mock("next/navigation", () => ({
	useRouter: () => ({
		...jest.requireActual("next/navigation").useRouter,
	}),
}));

describe("Login Component", () => {
	it("renders the Login form", () => {
		const {getByTestId} = render(<Login />);
		const loginForm = getByTestId("login-form");
		expect(loginForm).toBeInTheDocument();
	});

	it("displays the copyright notice", () => {
		const {getByText} = render(<Login />);
		const copyrightNotice = getByText(
			/© 2023 SenyuM Powered by BRI | All Rights Reserved./i,
		);
		expect(copyrightNotice).toBeInTheDocument();
	});
});
