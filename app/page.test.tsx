import {render, screen} from "@testing-library/react";

import Page from "./page";

test('renders "Hello, Next.js!"', () => {
	render(<Page />);
	const headingElement = screen.getByText("Hello, Next.js!");
	expect(headingElement).toBeInTheDocument();
});
