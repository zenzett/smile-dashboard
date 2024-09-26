import "./global.css";

import {render} from "@testing-library/react";

import RootLayout from "./layout";

describe("RootLayout", () => {
	it("renders children correctly", () => {
		const {getByText, debug} = render(
			<RootLayout>
				<div data-testid="test-child">Test Child</div>
			</RootLayout>,
		);

		// Check if the child element is present in the rendered output
		const testChildElement = getByText("Test Child");
		expect(testChildElement).toBeInTheDocument();
	});
});
