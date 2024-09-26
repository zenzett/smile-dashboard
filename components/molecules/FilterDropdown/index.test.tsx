import React from "react";

import {fireEvent, render} from "@testing-library/react";

import DropdownFilter from "./";

describe("DropdownFilter", () => {
	it("renders correctly when isOpen is true", () => {
		const onClickDropdown = jest.fn();
		const {getByText, getByTestId} = render(
			<DropdownFilter
				onClickDropdown={onClickDropdown}
				isShowDropdown={true}
			/>,
		);

		expect(getByTestId("filter-title")).toBeInTheDocument();
		expect(getByText("Tanggal")).toBeInTheDocument();
		expect(getByText("Dari")).toBeInTheDocument();
		expect(getByText("Hingga")).toBeInTheDocument();
		expect(getByText("Partner")).toBeInTheDocument();
		expect(getByText("End User")).toBeInTheDocument();
		expect(getByText("Seller PGD")).toBeInTheDocument();
		expect(getByText("Seller BRI")).toBeInTheDocument();
		expect(getByText("Seller PNM")).toBeInTheDocument();
		expect(getByText("Terapkan")).toBeInTheDocument();
	});

	it("calls onClickDropdown when button is clicked", () => {
		const onClickDropdown = jest.fn();
		const {getByTestId} = render(
			<DropdownFilter
				onClickDropdown={onClickDropdown}
				isShowDropdown={false}
			/>,
		);

		fireEvent.click(getByTestId("dropdown-filter-btn-trigger"));
		expect(onClickDropdown).toHaveBeenCalled();
	});

	it("handles checkbox click", () => {
		const onClickDropdown = jest.fn();
		const {getByText, getByTestId} = render(
			<DropdownFilter
				onClickDropdown={onClickDropdown}
				isShowDropdown={true}
			/>,
		);

		const endUserCheckbox = getByTestId("end-user-checkbox");
		fireEvent.click(endUserCheckbox);
		expect(endUserCheckbox).toBeChecked();

		// const sellerPGDCheckbox = getByText("Seller PGD");
		// fireEvent.click(sellerPGDCheckbox);
		// expect(sellerPGDCheckbox).toBeChecked();
	});
});
