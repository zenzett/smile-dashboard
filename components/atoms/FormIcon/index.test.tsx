import React from "react";

import {fireEvent, render} from "@testing-library/react";

import FormIcon from "./";

const mockOnClickIcon = jest.fn();

describe("FormIcon Component", () => {
	it("renders children and icon properly", () => {
		const {container} = render(
			<FormIcon>
				<div>Child Component</div>
				<button className="icon">
					<i className="fa-solid fa-users" data-testid="icon"></i>
				</button>
			</FormIcon>,
		);

		// Check if the child component is rendered
		expect(container).toHaveTextContent("Child Component");

		// Check if the icon is rendered
		const buttons = container.getElementsByTagName("button");
		if (buttons.length === 0) {
			throw new Error("Element does not exist");
		}
		const btn = buttons[0];
		expect(btn).toHaveClass("icon");
	});

	it("calls onClickIcon callback when icon is clicked", () => {
		const {getByTestId} = render(
			<FormIcon>
				<div>Child Component</div>
				<button className="icon" onClick={mockOnClickIcon}>
					<i className="fa-solid fa-users" data-testid="icon"></i>
				</button>
			</FormIcon>,
		);

		// Simulate a click on the icon
		const btn = getByTestId("icon");
		fireEvent.click(btn);

		// Check if the onClickIcon callback was called
		expect(mockOnClickIcon).toHaveBeenCalledTimes(1);
	});

	it("applies custom className when provided", () => {
		const {container} = render(
			<FormIcon className="custom-class">
				<div>Child Component</div>
				<button className="icon">
					<i className="fa-solid fa-users" data-testid="icon"></i>
				</button>
			</FormIcon>,
		);

		// Check if the custom className is applied
		expect(container.querySelector(".form-icon")).toHaveClass("custom-class");
	});
});
