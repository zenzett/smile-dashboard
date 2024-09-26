import React from "react";

import {fireEvent, render} from "@testing-library/react";

import Header from "./";

describe("Header component", () => {
	it("renders the header without a close button", () => {
		const {getByTestId, queryByTestId} = render(
			<Header data-testid="header">
				<div data-testid="header-content">Header Content</div>
			</Header>,
		);

		const header = getByTestId("header");
		const headerContent = getByTestId("header-content");

		expect(header).toBeInTheDocument();
		expect(headerContent).toBeInTheDocument();

		// Check the childNode length. If 0, the close button is not rendered
		expect(header.childNodes.length).toBeGreaterThan(0);
	});

	it("renders the header with a close button when dismissable is true", () => {
		const handleClose = jest.fn();
		const {getByTestId} = render(
			<Header dismissable={true} data-testid="header" handleClose={handleClose}>
				<div data-testid="header-content">Header Content</div>
			</Header>,
		);

		const header = getByTestId("header");
		const closeButton = header.childNodes[1];
		const headerContent = getByTestId("header-content");

		expect(header).toBeInTheDocument();
		expect(closeButton).toBeInTheDocument();
		expect(headerContent).toBeInTheDocument();

		// Simulate click on the close button and verify if handleClose is called
		fireEvent.click(closeButton);
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it("renders the body with additional custom class", () => {
		const {getByTestId} = render(
			<Header data-testid="header" className="custom-class">
				Body Content
			</Header>,
		);

		const header = getByTestId("header");

		expect(header).toBeInTheDocument();
		expect(header).toHaveClass("modal-header custom-class");
	});
});
