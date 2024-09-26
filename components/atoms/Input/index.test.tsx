import {render, fireEvent} from "@testing-library/react";
import React from "react";

import Input from "./";

describe("Input Component", () => {
	it("renders without crashing", () => {
		const {getByTestId} = render(<Input data-testid="input" />);
		const inputElement = getByTestId("input");
		expect(inputElement).toBeInTheDocument();
	});

	it("applies additional className", () => {
		const {container} = render(<Input className="custom-class" />);
		const inputElement = container.querySelector("input");
		expect(inputElement).toBeInTheDocument();
		if (inputElement) {
			expect(inputElement).toHaveClass("custom-class");
		}
	});

	it('applies "error" variant', () => {
		const {container} = render(<Input variant="error" />);
		const inputElement = container.querySelector("input");
		expect(inputElement).toBeInTheDocument();
		if (inputElement) {
			expect(inputElement).toHaveClass("input error");
		}
	});

	it("handles onChange event", () => {
		const handleChange = jest.fn();
		const {container} = render(<Input onChange={handleChange} />);
		const inputElement = container.querySelector("input");
		expect(inputElement).toBeInTheDocument();
		if (inputElement) {
			fireEvent.change(inputElement, {target: {value: "Test"}});
			expect(handleChange).toHaveBeenCalledTimes(1);
		}
	});
});
