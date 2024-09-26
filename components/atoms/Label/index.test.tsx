import React from "react";

import {render} from "@testing-library/react";

import Label from "./";

describe("Label component", () => {
	it("renders a label element with custom class and attributes", () => {
		const {getByTestId} = render(
			<Label
				htmlFor="inputField"
				className="custom-label"
				aria-label="Custom Label"
				data-testid="label"
			>
				Input Field:
			</Label>,
		);

		// Find the rendered label element
		const labelElement = getByTestId("label");

		// Assert that the label element has the expected attributes and text
		expect(labelElement).toBeInTheDocument();
		expect(labelElement).toHaveAttribute("for", "inputField");
		expect(labelElement).toHaveAttribute("class", "label custom-label");
		expect(labelElement).toHaveAttribute("aria-label", "Custom Label");
		expect(labelElement.textContent).toBe("Input Field:");
	});
});
