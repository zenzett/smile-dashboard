import React from "react";

import {server} from "@/mocks/server";
import {User} from "@/types/User";
import {fireEvent, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ModalDeleteUser from "./";

const handleClose = jest.fn();

const onSuccessHandler = jest.fn();

const onErrorHandler = jest.fn();

const userData: User = {
	counter: 0,
	createdAt: "2023-10-02T21:18:23Z",
	deviceId: "fv4315Y3_gyeat2hKq7uE",
	email: "destalia@work.bri.co.id",
	id: 44,
	name: "Destalia ",
	password: "$2a$12$DszQZyPLPfsb/sJKuy7qE.y2NOLxBFP97kvtsjR73RSBFUa26ovNa",
	phoneNumber: "089618722872",
	updatedAt: "2023-10-02T21:18:23Z",
	userTypeId: "VIEWER",
	username: "90147851",
	editable: false,
};

beforeAll(() => server.listen());

afterEach(() => {
	server.resetHandlers();
	handleClose.mockReset();
});

afterAll(() => server.close());

describe("ModalDeleteUser", () => {
	it("renders the modal correctly", () => {
		const {getByTestId} = render(
			<ModalDeleteUser
				isShow
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
			/>,
		);

		const modalDelete = getByTestId("modal-delete");
		const modalDeleteHeader = getByTestId("modal-delete-header");
		const modalDeleteBody = getByTestId("modal-delete-body");
		const cancelModalDeleteBtn = getByTestId("cancel-modal-delete-btn");
		const submitModalDeleteBtn = getByTestId("submit-modal-delete-btn");

		expect(modalDelete).toBeInTheDocument();
		expect(modalDeleteHeader).toHaveTextContent("Hapus User");
		expect(modalDeleteBody).toHaveTextContent(
			"Apakah Anda yakin akan menghapus data user ini?",
		);
		expect(cancelModalDeleteBtn).toHaveTextContent("Tidak");
		expect(submitModalDeleteBtn).toHaveTextContent("Ya, Hapus");
	});

	it("closes the modal when the close button is clicked", async () => {
		const {getByTestId} = render(
			<ModalDeleteUser
				isShow
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
			/>,
		);

		const closeModalButton = getByTestId("modal-delete-header").querySelector(
			".modal-close-btn",
		);
		if (!closeModalButton) {
			throw new Error("Element does not exist.");
		}
		userEvent.click(closeModalButton);

		await waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
		});
	});

	it("closes the modal when the background is clicked", async () => {
		const {getByTestId} = render(
			<ModalDeleteUser
				isShow
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
			/>,
		);

		const modalDelete = getByTestId("modal-delete");

		await waitFor(() => {
			const modalBackground = modalDelete.parentNode;
			if (!modalBackground) {
				throw new Error("Element does not exist.");
			}
			fireEvent.click(modalBackground);
		});

		await waitFor(() => {
			expect(modalDelete).not.toHaveClass("opacity-100");
		});
	});

	it("cancel delete user", async () => {
		const {getByTestId} = render(
			<ModalDeleteUser
				isShow
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
			/>,
		);

		const cancelButton = getByTestId("cancel-modal-delete-btn");
		userEvent.click(cancelButton);

		await waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
		});
	});

	it("submit the form", async () => {
		const {getByTestId} = render(
			<ModalDeleteUser
				isShow
				handleClose={handleClose}
				onSuccess={onSuccessHandler}
				onError={onErrorHandler}
				userData={userData}
			/>,
		);

		const submitButton = getByTestId("submit-modal-delete-btn");
		userEvent.click(submitButton);

		await waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(onSuccessHandler).toHaveBeenCalledTimes(1);
		});
	});
});
