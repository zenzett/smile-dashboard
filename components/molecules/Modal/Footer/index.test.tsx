import React from "react";

import {render} from "@testing-library/react";

import Footer from "./";

describe("Footer component", () => {
	it("renders the footer with default class", () => {
		const {getByTestId} = render(
			<Footer data-testid="footer">Footer Content</Footer>,
		);

		const footer = getByTestId("footer");

		expect(footer).toBeInTheDocument();
		expect(footer).toHaveClass("modal-footer");
	});

	it("renders the footer with additional custom class", () => {
		const {getByTestId} = render(
			<Footer data-testid="footer" className="custom-class">
				Footer Content
			</Footer>,
		);

		const footer = getByTestId("footer");

		expect(footer).toBeInTheDocument();
		expect(footer).toHaveClass("modal-footer custom-class");
	});

	it("renders the footer with custom attributes", () => {
		const {getByTestId} = render(
			<Footer data-testid="footer" data-custom-attr="custom-value">
				Footer Content
			</Footer>,
		);

		const footer = getByTestId("footer");

		expect(footer).toBeInTheDocument();
		expect(footer).toHaveAttribute("data-custom-attr", "custom-value");
	});
});
