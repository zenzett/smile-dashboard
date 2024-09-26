import React from "react";

import axiosInstance from "@/config/client/axios";
import {render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DetailApplication from "./";

const handleClose = jest.fn();

const handleShowDownloadModal = jest.fn();

jest.mock("@/config/client/axios", () => ({
	get: jest.fn(),
}));

describe("DetailApplication", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("render the modal", () => {
		render(
			<DetailApplication
				isShow
				handleClose={handleClose}
				handleShowDownloadModal={handleShowDownloadModal}
				userTypeId="SUPER_ADMIN"
			/>,
		);
	});

	it("not render the modal detail and modal download by default", () => {
		const {getByTestId} = render(
			<DetailApplication
				isShow
				handleClose={handleClose}
				handleShowDownloadModal={handleShowDownloadModal}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const modalDetail = getByTestId("modal-detail-form");
		expect(modalDetail).not.toHaveClass("opacity-100");
	});

	it("render the pictures and text inside the modal", async () => {
		const responseData = {
			data: {
				id: "69157503-c34b-46bf-ab01-0f59ea85fc89",
				idNo: "3277012212940001",
				custName: "LOVINDO SITUNGKIR",
				cellPhoneNumber: "085861130329",
				dateOfBirth: "1994-12-22",
				placeOfBirth: "Jakarta Pusat",
				sex: "F",
				religion: "ISLAM",
				maritalStatus: "SINGLE",
				motherName: "LASTRINA",
				education: "S1",
				workTypeId: "AKUN",
				workPositionId: "64",
				fieldWork: "KEUANGAN",
				typeOfWork: "Akunting",
				addressDom: "JAKARTA",
				address: "SUMATRA",
				partnerId: 9,
				partnerName: "Pegadaian",
				status: "DONE_SUCCESS",
				ktpImagePath: "kpt_photo_base64",
				selfiePath: "selfie_photo_base64",
				createdAt: "2023-10-16T03:16:11.481Z",
				updatedAt: "2023-10-04T14:04:42.585989Z",
			},
		};
		jest.spyOn(axiosInstance, "get").mockResolvedValue({data: responseData});

		const {getByTestId} = render(
			<DetailApplication
				selectedApplication="someId"
				handleClose={handleClose}
				isShow={true}
				handleShowDownloadModal={handleShowDownloadModal}
				userTypeId="SUPER_ADMIN"
			/>,
		);

		const modalDetail = getByTestId("modal-detail-form");

		waitFor(() => {
			expect(modalDetail).toHaveClass("opacity-100");
		});

		const valueStatus = getByTestId("value-status");
		const valuePartnerName = getByTestId("value-partner-name");
		const photoLoadingKTP = getByTestId("image-loading-ktp");
		const photoLoadingSelfie = getByTestId("image-loading-selfie");
		const valueNIK = getByTestId("value-nik");
		const valueFullName = getByTestId("value-fullname");
		const valuePhoneNumber = getByTestId("value-phone-number");
		const valueGender = getByTestId("value-gender");
		const valueBirthdate = getByTestId("value-birthdate");
		const valueReligion = getByTestId("value-religion");
		const valueMaritalStatus = getByTestId("value-marital-status");
		const valueMotherName = getByTestId("value-mother-name");
		const valueEducation = getByTestId("value-education");
		const valueOccupation = getByTestId("value-occupation");
		const valueBusinessField = getByTestId("value-business-field");
		const valueIDAddress = getByTestId("value-id-address");
		const valueHomeAddress = getByTestId("value-home-address");

		expect(modalDetail).toHaveTextContent("Status");
		expect(modalDetail).toHaveTextContent("Partner");
		expect(modalDetail).toHaveTextContent("NIK");
		expect(modalDetail).toHaveTextContent("Nama Lengkap");
		expect(modalDetail).toHaveTextContent("No Telepon");
		expect(modalDetail).toHaveTextContent("Jenis Kelamin");
		expect(modalDetail).toHaveTextContent("Tempat, Tgl Lahir");
		expect(modalDetail).toHaveTextContent("Agama");
		expect(modalDetail).toHaveTextContent("Status Perkawinan");
		expect(modalDetail).toHaveTextContent("Nama Ibu Kandung");
		expect(modalDetail).toHaveTextContent("Pendidikan Terakhir");
		expect(modalDetail).toHaveTextContent("Pekerjaan");
		expect(modalDetail).toHaveTextContent("Bidang Usaha");
		expect(modalDetail).toHaveTextContent("Alamat KTP");
		expect(modalDetail).toHaveTextContent("Alamat Tinggal");

		waitFor(() => {
			expect(valueStatus).toHaveTextContent("DONE_SUCCESS");
			expect(valuePartnerName).toHaveTextContent("Pegadaian");
			expect(photoLoadingKTP).toBeInTheDocument();
			expect(photoLoadingSelfie).toBeInTheDocument();
			expect(valueNIK).toHaveTextContent("3277012212940001");
			expect(valueFullName).toHaveTextContent("LOVINDO SITUNGKIR");
			expect(valuePhoneNumber).toHaveTextContent("085861130329");
			expect(valueGender).toHaveTextContent("Perempuan");
			expect(valueBirthdate).toHaveTextContent("1994-12-22");
			expect(valueReligion).toHaveTextContent("ISLAM");
			expect(valueMaritalStatus).toHaveTextContent("SINGLE");
			expect(valueMotherName).toHaveTextContent("LASTRINA");
			expect(valueEducation).toHaveTextContent("S1");
			expect(valueOccupation).toHaveTextContent("Akunting");
			expect(valueBusinessField).toHaveTextContent("KEUANGAN");
			expect(valueIDAddress).toHaveTextContent("SUMATRA");
			expect(valueHomeAddress).toHaveTextContent("JAKARTA");
		});

		await waitFor(() => {
			expect(axiosInstance.get).toHaveBeenCalledWith("/api/application/someId");
			expect(getByTestId("modal-detail-body")).toBeInTheDocument();
		});
	});

	it("close the modal detail when the close button in modal detail is clicked", async () => {
		const {queryByTestId, getByTestId} = render(
			<DetailApplication
				isShow
				handleClose={handleClose}
				handleShowDownloadModal={handleShowDownloadModal}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const modalDetail = queryByTestId("modal-detail-form");

		await waitFor(() => {
			expect(modalDetail).toHaveClass("opacity-100");
		});

		const closeModalDetailButton = getByTestId(
			"modal-detail-header",
		).querySelector(".modal-close-btn");
		if (!closeModalDetailButton) {
			throw new Error("Element does not exist.");
		}
		await userEvent.click(closeModalDetailButton);

		waitFor(() => {
			expect(handleClose).toBeCalledTimes(1);
		});
		waitFor(() => {
			expect(modalDetail).not.toHaveClass("opacity-100");
		});
	});

	it("close the modal detail when the background modal detail is clicked", async () => {
		const {getByTestId} = render(
			<DetailApplication
				isShow
				handleClose={handleClose}
				handleShowDownloadModal={handleShowDownloadModal}
				userTypeId="SUPER_ADMIN"
			/>,
		);
		const modalDetail = getByTestId("modal-detail-form");

		await waitFor(() => {
			const modalDetailBackground = modalDetail.parentNode as Element;
			if (!modalDetailBackground) {
				throw new Error("Element does not exist.");
			}
			userEvent.click(modalDetailBackground);
		});

		await waitFor(() => {
			expect(handleClose).toBeCalledTimes(1);
		});
	});
});
