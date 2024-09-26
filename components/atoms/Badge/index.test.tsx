import {render, screen} from "@testing-library/react";
import React from "react";

import Badge from "./";

describe("Badge component", () => {
	it("renders with custom className", () => {
		render(<Badge className="test" data-testid="badge-test" />);
		const badgeElement = screen.getByTestId("badge-test");
		expect(badgeElement).toBeInTheDocument();
		expect(badgeElement).toHaveClass("test");
	});

	it("renders with default 'pending' status and 'md' size", () => {
		render(<Badge data-testid="badge-pending" />);
		const badgeElement = screen.getByTestId("badge-pending");
		expect(badgeElement).toBeInTheDocument();
		expect(badgeElement).toHaveClass("badge pending md");
	});

	it("renders with 'success' status and 'sm' size", () => {
		render(<Badge status="success" size="sm" data-testid="badge-success" />);
		const badgeElement = screen.getByTestId("badge-success");
		expect(badgeElement).toBeInTheDocument();
		expect(badgeElement).toHaveClass("badge success sm");
	});

	it("renders with 'error' status and custom text", () => {
		render(<Badge status="error" text="Custom Text" />);
		const badgeElement = screen.getByText("Custom Text");
		expect(badgeElement).toBeInTheDocument();
		expect(badgeElement).toHaveClass("badge error md");
	});
});
