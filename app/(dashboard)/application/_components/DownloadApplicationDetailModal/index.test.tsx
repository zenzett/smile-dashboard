import React from "react";

import {render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DownloadApplicationDetail from "./";

const handleClose = jest.fn();
const onSuccess = jest.fn();

describe("DownloadApplicationDetail", () => {
	it("opens the modal when the 'Download Data Pengajuan' button is clicked and submit button is disabled initially", async () => {
		const {getByTestId} = render(
			<DownloadApplicationDetail
				handleClose={handleClose}
				onSuccess={onSuccess}
				isShow
			/>,
		);
		const submitModalButton = getByTestId("submit-modal-download-btn");
		const pdfRadio = getByTestId("radio-pdf");
		const xlsRadio = getByTestId("radio-xls");

		expect(pdfRadio).not.toBeChecked();
		expect(xlsRadio).not.toBeChecked();
		expect(submitModalButton).toBeDisabled();
	});

	it("closes the modal when the close button is clicked", async () => {
		const {getByTestId, queryByTestId} = render(
			<DownloadApplicationDetail
				handleClose={handleClose}
				onSuccess={onSuccess}
				isShow
			/>,
		);
		const modal = queryByTestId("modal-download-form");

		const closeModalButton = getByTestId("modal-download-header").querySelector(
			".modal-close-btn",
		);
		if (!closeModalButton) {
			throw new Error("Element does not exist.");
		}
		userEvent.click(closeModalButton);

		await waitFor(() => {
			expect(modal).not.toHaveClass("opacity-100");
		});
	});

	it("closes the modal when the background is clicked", async () => {
		const {getByTestId} = render(
			<DownloadApplicationDetail
				handleClose={handleClose}
				onSuccess={onSuccess}
				isShow
			/>,
		);
		const modal = getByTestId("modal-download-form");

		await waitFor(() => {
			const modalBackground = modal.parentNode as Element;
			if (!modalBackground) {
				throw new Error("Element does not exist.");
			}
			userEvent.click(modalBackground);
		});

		await waitFor(() => {
			expect(modal).not.toHaveClass("opacity-100");
		});
	});

	it("submits the form with valid data", async () => {
		const {getByTestId} = render(
			<DownloadApplicationDetail
				handleClose={handleClose}
				onSuccess={onSuccess}
				isShow
			/>,
		);
		const submitModalButton = getByTestId("submit-modal-download-btn");
		const pdfRadio = getByTestId("radio-pdf");
		const xlsRadio = getByTestId("radio-xls");

		expect(pdfRadio).not.toBeChecked();
		expect(xlsRadio).not.toBeChecked();

		userEvent.click(pdfRadio);
		await waitFor(() => {
			expect(xlsRadio).not.toBeChecked();
			expect(pdfRadio).toBeChecked();
		});

		userEvent.click(xlsRadio);
		await waitFor(() => {
			expect(pdfRadio).not.toBeChecked();
			expect(xlsRadio).toBeChecked();
		});

		userEvent.click(pdfRadio);
		await waitFor(() => {
			expect(xlsRadio).not.toBeChecked();
			expect(pdfRadio).toBeChecked();
		});

		expect(submitModalButton).toBeEnabled();
		userEvent.click(submitModalButton);

		await waitFor(() => {
			expect(onSuccess).toHaveBeenCalledTimes(1);
		});
	});
});
