import React from "react";

import {fireEvent, render, screen} from "@testing-library/react";

import ImageContainer from "./";

describe("ImageContainer Component", () => {
	it("renders an image when `src` is not empty", () => {
		render(
			<ImageContainer
				data-testid="random"
				alt="Test Image"
				src="your-base64-encoded-image-data-here"
			/>,
		);

		const image = screen.getByTestId("image-container-random");
		expect(image).toBeInTheDocument();

		fireEvent.load(image);
	});

	it('renders "No Image" when `src` is empty', () => {
		render(<ImageContainer data-testid="random" alt="Test Image" src="" />);

		const noImageText = screen.getByTestId("image-invalid-random");
		expect(noImageText).toBeInTheDocument();
	});

	it("renders a loading placeholder when `src` is not loaded", () => {
		render(<ImageContainer data-testid="random" alt="Test Image" src="." />);

		const loadingPlaceholder = screen.getByTestId("image-loading-random");
		expect(loadingPlaceholder).toBeInTheDocument();
		expect(loadingPlaceholder).toHaveClass("animate-pulse");
	});
});
