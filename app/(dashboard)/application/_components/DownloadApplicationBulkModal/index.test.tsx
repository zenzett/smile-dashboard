import React from "react";
import {act} from "react-dom/test-utils";

import {
	downloadTableNullData,
	downloadTableSuccess,
} from "@/mocks/handlers/download";
import {server} from "@/mocks/server";
import {fireEvent, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DownloadApplicationBulk from "./";

const onError = jest.fn();
const onSuccess = jest.fn();
const handleClose = jest.fn();

describe("DownloadApplicationBulk", () => {
	beforeAll(() => server.listen());

	afterEach(() => {
		server.resetHandlers();

		onSuccess.mockClear();
		onError.mockClear();
	});

	afterAll(() => server.close());

	it("opens the modal when the 'Download Data Pengajuan' button is clicked and submit button is disabled initially", async () => {
		const {getByTestId} = render(
			<DownloadApplicationBulk
				isShow
				onError={onError}
				onSuccess={onSuccess}
				handleClose={handleClose}
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
			<DownloadApplicationBulk
				isShow
				onError={onError}
				onSuccess={onSuccess}
				handleClose={handleClose}
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
			<DownloadApplicationBulk
				isShow
				onError={onError}
				onSuccess={onSuccess}
				handleClose={handleClose}
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
			<DownloadApplicationBulk
				isShow
				onError={onError}
				onSuccess={onSuccess}
				handleClose={handleClose}
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

		const startDateInput = getByTestId("datepicker-startdate");
		const endDateInput = getByTestId("datepicker-enddate");

		await act(async () => {
			userEvent.click(startDateInput);
			userEvent.type(startDateInput, "01/01/23");
		});
		waitFor(() => {
			expect(startDateInput).toHaveValue("01/01/23");
		});

		await act(async () => {
			userEvent.click(endDateInput);
			userEvent.type(endDateInput, "29/01/23");
		});
		waitFor(() => {
			expect(endDateInput).toHaveValue("29/01/23");
		});

		waitFor(() => {
			expect(submitModalButton).toBeEnabled();
		});
		await act(async () => {
			userEvent.click(submitModalButton);
		});

		waitFor(() => {
			expect(onSuccess).toHaveBeenCalledTimes(1);
		});
	});

	it("should handle download bulk correctly and data result is not null", async () => {
		server.use(downloadTableSuccess);
		// const mockAxiosInstanceGet = jest.spyOn(axios, "get").mockResolvedValue({
		// 	data: {
		// 		responseDescription: "SUCCESS",
		// 		data: {link: ["mockLink1", "mockLink2"]},
		// 	},
		// });

		const {getByTestId} = render(
			<DownloadApplicationBulk
				handleClose={handleClose}
				onError={onError}
				onSuccess={onSuccess}
				isShow={true}
			/>,
		);

		const startDateInput = getByTestId("datepicker-startdate");
		const endDateInput = getByTestId("datepicker-startdate");

		const xlsRadio = getByTestId("radio-xls");

		const submitButton = getByTestId("submit-modal-download-btn");

		// Fill in form data
		userEvent.type(startDateInput, "06/11/23");
		await waitFor(() => {
			expect(startDateInput).toHaveValue("06/11/23");
		});
		// userEvent.type(endDateInput, "10/05/23");

		userEvent.click(xlsRadio);
		await waitFor(() => {
			expect(xlsRadio).toBeChecked();
		});

		await waitFor(() => {
			expect(submitButton).not.toBeDisabled();
		});
		userEvent.click(submitButton);

		await waitFor(() => {
			// Assertions
			// expect(mockAxiosInstanceGet).toHaveBeenCalledWith("/api/download/pdf", {
			// 	params: {startDate: "2023-01-01", endDate: "2023-01-05"},
			// });
			// expect(handleClose).toHaveBeenCalled();
			// expect(onSuccess).toHaveBeenCalled();
			expect(onError).not.toHaveBeenCalled();
		});
	});

	it("handle download bulk with null data result", async () => {
		server.use(downloadTableNullData);

		// const mockAxiosInstanceGet = jest.spyOn(axios, "get").mockResolvedValue({
		// 	data: {
		// 		responseDescription: "SUCCESS",
		// 		data: {link: ["mockLink1", "mockLink2"]},
		// 	},
		// });

		const {getByTestId} = render(
			<DownloadApplicationBulk
				handleClose={handleClose}
				onError={onError}
				onSuccess={onSuccess}
				isShow={true}
			/>,
		);

		const startDateInput = getByTestId("datepicker-startdate");
		const endDateInput = getByTestId("datepicker-startdate");

		const csvRadio = getByTestId("radio-csv");

		const submitButton = getByTestId("submit-modal-download-btn");

		// Fill in form data
		// userEvent.type(startDateInput, "01/11/23");
		fireEvent.change(startDateInput, {target: {value: "01/01/22"}});
		await waitFor(() => {
			expect(startDateInput).toHaveValue("01/11/23");
		});

		userEvent.type(endDateInput, "10/11/23");
		await waitFor(() => {
			expect(endDateInput).toHaveValue("10/11/23");
		});

		userEvent.click(csvRadio);
		await waitFor(() => {
			expect(csvRadio).toBeChecked();
		});

		await waitFor(() => {
			expect(submitButton).not.toBeDisabled();
		});
		userEvent.click(submitButton);

		await waitFor(() => {
			// Assertions
			// expect(mockAxiosInstanceGet).toHaveBeenCalledWith("/api/download/pdf", {
			// 	params: {startDate: "2023-01-01", endDate: "2023-01-05"},
			// });
			// expect(handleClose).toHaveBeenCalled();
			// expect(onSuccess).toHaveBeenCalled();
			expect(onError).toHaveBeenCalledWith(
				"Maaf, tidak ada data pengajuan pada tanggal yang dipilih.",
			);
		});
	});
});
