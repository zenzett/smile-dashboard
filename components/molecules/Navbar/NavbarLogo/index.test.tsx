import React from "react";

import {render} from "@testing-library/react";

import NavbarLogo from "./";

describe("NavbarLogo component", () => {
	it("renders without errors", () => {
		render(<NavbarLogo />);
	});

	it("renders with custom className", () => {
		const {container} = render(<NavbarLogo className="custom-class" />);
		const logoElement = container.querySelector(".custom-class");
		expect(logoElement).toBeInTheDocument();
	});

	it("renders SVG elements", () => {
		const {container} = render(<NavbarLogo />);
		const svgElements = container.querySelectorAll("svg");
		expect(svgElements.length).toBe(2); // Check that there are two SVG elements
	});
});
