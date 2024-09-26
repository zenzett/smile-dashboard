import {render, fireEvent, getByTestId} from "@testing-library/react";
import React from "react";

import Radio from "./";

describe("Radio Component", () => {
	it("renders with default props", () => {
		const {getByTestId, getByText, getByRole} = render(
			<Radio label="Radio Label" />,
		);
		const radioId = getByTestId("radio-label");
		const radioLabel = getByText("Radio Label");
		const radioInput = getByRole("radio");

		expect(radioId).toHaveClass("radio-label md");
		expect(radioLabel).toBeInTheDocument();
		expect(radioInput).toBeInTheDocument();
		expect(radioInput).not.toBeChecked();
	});

	it("renders with checked prop", () => {
		const {getByRole} = render(<Radio label="Radio Label" checked={true} />);
		const radioInput = getByRole("radio");

		fireEvent.click(radioInput);

		expect(radioInput).toBeChecked();
	});

	it("renders with disabled prop", () => {
		const {getByRole} = render(<Radio label="Radio Label" disabled />);
		const radioInput = getByRole("radio");

		expect(radioInput).toBeDisabled();
	});

	it("calls the provided onChange function when clicked", () => {
		const onChangeMock = jest.fn();
		const {getByRole} = render(
			<Radio label="Radio Label" onChange={onChangeMock} />,
		);
		const radioInput = getByRole("radio");

		fireEvent.click(radioInput);

		expect(onChangeMock).toHaveBeenCalledTimes(1);
	});

	it("applies custom classNames", () => {
		const {container} = render(
			<Radio label="Radio Label" className="custom-class" />,
		);
		const radioLabel = container.querySelector(".custom-class");

		expect(radioLabel).toBeInTheDocument();
	});
});
