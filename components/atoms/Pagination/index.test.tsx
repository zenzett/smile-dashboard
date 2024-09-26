import React from "react";

import {render, waitFor} from "@testing-library/react";

import Pagination from "./"; // Ganti path import sesuai struktur proyek Anda

describe("Pagination component", () => {
	it("renders correctly for the first page", () => {
		const props = {
			pageCount: 10,
			page: 1,
		};

		const {getByText} = render(<Pagination {...props} />);

		expect(getByText("...")).toBeInTheDocument();
		expect(getByText("1")).toBeInTheDocument();
	});

	it("renders correctly for an intermediate page", () => {
		const props = {
			pageCount: 10,
			page: 5,
		};

		const {getByText} = render(<Pagination {...props} />);

		expect(getByText("1")).toBeInTheDocument();
	});

	it("renders correctly for the last page", () => {
		const props = {
			pageCount: 10,
			page: 10,
		};

		const {getByText} = render(<Pagination {...props} />);

		expect(getByText("10")).toBeInTheDocument();
	});

	it("handles custom className", () => {
		const props = {
			pageCount: 10,
			page: 1,
			className: "custom-class",
		};

		const {container} = render(<Pagination {...props} />);

		waitFor(() => {
			expect(container.querySelector(".container-pagination")).toHaveClass(
				"custom-class",
			);
		});
	});
});
