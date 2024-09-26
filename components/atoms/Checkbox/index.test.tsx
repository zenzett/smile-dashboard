import React from "react";

import {render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Checkbox from "./";

test("Checkbox renders correctly with label", async () => {
	const {getByText, container} = render(<Checkbox label="Test Checkbox" />);

	// Ensure the label text is displayed
	const labelText = getByText("Test Checkbox");
	expect(labelText).toBeInTheDocument();

	// Ensure the checkbox is not checked by default
	const checkboxes = container.getElementsByTagName("input");
	if (checkboxes.length === 0) {
		throw new Error("Element not found.");
	}
	const checkbox = checkboxes[0];
	expect(checkbox).not.toBeChecked();

	// Simulate a click event on the checkbox
	userEvent.click(checkbox);

	// Ensure the checkbox is now checked
	await waitFor(() => {
		expect(checkbox).toBeChecked();
	});
});

test("Checkbox can be disabled", () => {
	const {container} = render(<Checkbox label="Disabled Checkbox" disabled />);

	// Ensure the checkbox is disabled
	const checkboxes = container.getElementsByTagName("input");
	if (checkboxes.length === 0) {
		throw new Error("Element not found.");
	}
	const checkbox = checkboxes[0];
	expect(checkbox).toBeDisabled();
});
