import React from "react";

import {fireEvent, render} from "@testing-library/react";

import ButtonFilter from "./"; // Adjust the import path as needed

describe("ButtonFilter Component", () => {
	it("renders without errors", () => {
		const {getByText} = render(<ButtonFilter />);
		const filterButton = getByText("Filter");
		expect(filterButton).toBeInTheDocument();
	});

	it("renders with custom class name", () => {
		const {container} = render(<ButtonFilter className="custom-class" />);
		const button = container.querySelector(".filter-button.custom-class");
		expect(button).toBeInTheDocument();
	});

	it("calls onClick handler when clicked", () => {
		const onClickMock = jest.fn();
		const {getByText} = render(<ButtonFilter onClick={onClickMock} />);
		const filterButton = getByText("Filter");

		fireEvent.click(filterButton);
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	it("forwards ref to the button element", () => {
		const ref = React.createRef<HTMLButtonElement>();
		render(<ButtonFilter ref={ref} />);
		expect(ref.current).toBeInTheDocument();
	});
});
