import React from "react";

import {fireEvent, render} from "@testing-library/react";

import Button from "./";

describe("Button component", () => {
	it("renders a button with the correct class names", () => {
		const {container} = render(
			<Button variant="primary" size="lg" bordered>
				Click me
			</Button>,
		);

		const button = container.querySelector("button");

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass("btn primary lg bordered");
	});

	it("handles clicks when onClick is provided", () => {
		const handleClick = jest.fn();
		const {getByText} = render(<Button onClick={handleClick}>Click me</Button>);

		const button = getByText("Click me");
		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalled();
	});

	it("forwards the ref correctly", () => {
		const buttonRef = React.createRef<HTMLButtonElement>();
		render(<Button ref={buttonRef}>Click me</Button>);

		expect(buttonRef.current).toBeDefined();
		expect(buttonRef.current?.tagName).toBe("BUTTON");
	});
});
