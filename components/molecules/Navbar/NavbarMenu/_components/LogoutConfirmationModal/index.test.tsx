import React from "react";

import {fireEvent, render, screen} from "@testing-library/react";

import LogoutConfirmationModal from "./";

describe("LogoutConfirmationModal", () => {
	test("renders correctly", () => {
		const handleClose = jest.fn();
		const handleLogout = jest.fn();

		const {getByTestId} = render(
			<LogoutConfirmationModal
				isShow={true}
				handleClose={handleClose}
				handleLogout={handleLogout}
			/>,
		);

		const modalHeader = getByTestId("logout-confirmation-modal-title");
		const modalContent = getByTestId("logout-confirmation-modal-content");
		const cancelBtn = getByTestId("logout-confirmation-modal-cancel-btn");
		const logoutBtn = getByTestId("logout-confirmation-modal-logout-btn");

		expect(modalHeader).toHaveTextContent("Logout");
		expect(modalContent).toHaveTextContent(
			"Apakah Anda yakin akan logout dari akun?",
		);
		expect(cancelBtn).toHaveTextContent("Batal");
		expect(logoutBtn).toHaveTextContent("Ya, Logout");
	});

	test("calls handleClose on 'Batal' button click", () => {
		const handleClose = jest.fn();
		const handleLogout = jest.fn();

		render(
			<LogoutConfirmationModal
				isShow={true}
				handleClose={handleClose}
				handleLogout={handleLogout}
			/>,
		);

		fireEvent.click(screen.getByText("Batal"));

		expect(handleClose).toHaveBeenCalled();
	});

	test("calls handleLogout on 'Ya, Logout' button click", () => {
		const handleClose = jest.fn();
		const handleLogout = jest.fn();

		render(
			<LogoutConfirmationModal
				isShow={true}
				handleClose={handleClose}
				handleLogout={handleLogout}
			/>,
		);

		// Mengklik tombol 'Ya, Logout'
		fireEvent.click(screen.getByText("Ya, Logout"));

		// Memastikan handleLogout dipanggil
		expect(handleLogout).toHaveBeenCalled();
	});
});
