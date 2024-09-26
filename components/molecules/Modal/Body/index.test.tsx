import React from "react";

import {render} from "@testing-library/react";

import Body from "./"; // Import your Body component

describe("Body component", () => {
	it("renders the body with default class", () => {
		const {getByTestId} = render(<Body data-testid="body">Body Content</Body>);

		const body = getByTestId("body");

		expect(body).toBeInTheDocument();
		expect(body).toHaveClass("modal-body");
	});

	it("renders the body with additional custom class", () => {
		const {getByTestId} = render(
			<Body data-testid="body" className="custom-class">
				Body Content
			</Body>,
		);

		const body = getByTestId("body");

		expect(body).toBeInTheDocument();
		expect(body).toHaveClass("modal-body custom-class");
	});

	it("renders the body with custom attributes", () => {
		const {getByTestId} = render(
			<Body data-testid="body" data-custom-attr="custom-value">
				Body Content
			</Body>,
		);

		const body = getByTestId("body");

		expect(body).toBeInTheDocument();
		expect(body).toHaveAttribute("data-custom-attr", "custom-value");
	});
});
