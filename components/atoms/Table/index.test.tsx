import React from "react";

import {render} from "@testing-library/react";

import Table from "./"; // Sesuaikan dengan lokasi komponen Anda

describe("Table", () => {
	it("Table renders correctly with data", () => {
		const {getByText} = render(
			<Table>
				<tr>
					<td>Example</td>
				</tr>
			</Table>,
		);

		expect(getByText("Example")).toBeInTheDocument();
	});

	it("Table renders correctly without data", () => {
		const {getByTestId} = render(<Table data-testid="table" />);

		expect(getByTestId("table").childNodes.length).toBe(0);
	});
});
