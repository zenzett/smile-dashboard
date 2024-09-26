import React from "react";

import {fireEvent, render, screen, waitFor} from "@testing-library/react";

import Toast from "./index";

describe("Toast", () => {
	test("renders toast when isShow is true", async () => {
		render(<Toast status="success" isShow={true} handleClose={() => {}} />);
		const toastElement = document.querySelector(".toast-container");
		await waitFor(async () => {
			expect(toastElement).toHaveClass(
				"toast-container",
				"opacity-100",
				"top-24",
			);
		});
		expect(toastElement).toBeInTheDocument();
	});

	test("does not render toast when isShow is false", () => {
		render(<Toast status="success" isShow={false} handleClose={() => {}} />);
		const toastElement = screen.queryByTestId("toast-container");
		expect(toastElement).not.toBeInTheDocument();
	});

	test("calls handleClose when close button is clicked", () => {
		const handleClose = jest.fn();
		render(<Toast status="success" isShow={true} handleClose={handleClose} />);
		const closeButton = screen.getByRole("button", {name: "Close Toast"});
		fireEvent.click(closeButton);
		expect(handleClose).toHaveBeenCalled();
	});

	test("renders with custom className", () => {
		const handleClose = jest.fn();
		const {getByTestId} = render(
			<Toast
				status="success"
				isShow={true}
				handleClose={handleClose}
				data-testid="toast"
				className="custom-class"
			/>,
		);
		expect(getByTestId("toast")).toHaveClass("custom-class");
	});
});
