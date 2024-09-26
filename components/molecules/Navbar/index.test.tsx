import React from "react";

import {fireEvent, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "./";

jest.mock("@/utils/windowNavigate", () => jest.fn());

function simulateWindowResize(width: number) {
	const resizeEvent = new Event("resize");

	window.innerWidth = width;

	window.dispatchEvent(resizeEvent);
}

describe("Navbar component", () => {
	it("renders without errors", () => {
		render(<Navbar />);
	});

	it("renders the NavbarLogo component", () => {
		const {getByTestId} = render(<Navbar />);
		const navbarLogo = getByTestId("navbar-logo");
		expect(navbarLogo).toBeInTheDocument();
	});

	it("renders the NavbarMenu component", () => {
		const {getByTestId} = render(<Navbar isLoggedIn />);
		const navbarMenu = getByTestId("navbar-menu");
		expect(navbarMenu).toBeInTheDocument();
	});

	it("initially renders the menu as collapsed", () => {
		const {getByTestId} = render(<Navbar isLoggedIn />);
		const navbarMenu = getByTestId("navbar-menu");
		expect(navbarMenu).toHaveClass("collapsed");
	});

	it("expands the menu when the button is clicked", () => {
		const {getByTestId} = render(<Navbar isLoggedIn />);
		const menuButton = getByTestId("menu-toggler");
		const navbarMenu = getByTestId("navbar-menu");

		expect(navbarMenu).toHaveClass("collapsed");

		fireEvent.click(menuButton);

		expect(navbarMenu).not.toHaveClass("collapsed");
	});

	it("checks navbarMenu display property based on window width", () => {
		const {getByTestId} = render(<Navbar isLoggedIn />);
		const menuButton = getByTestId("menu-toggler");
		const navbarMenu = getByTestId("navbar-menu");

		fireEvent.click(menuButton);

		simulateWindowResize(1024);

		waitFor(() => {
			expect(navbarMenu).not.toHaveClass("collapsed");
		});

		simulateWindowResize(1023);

		waitFor(() => {
			expect(navbarMenu).toHaveClass("collapsed");
		});
	});

	it("collapses the menu when the button is clicked twice", () => {
		const {getByTestId} = render(<Navbar isLoggedIn />);
		const menuButton = getByTestId("menu-toggler");
		const navbarMenu = getByTestId("navbar-menu");

		// Click the menu button twice to toggle the menu
		fireEvent.click(menuButton);
		fireEvent.click(menuButton);

		// Check if the menu is collapsed again
		expect(navbarMenu).toHaveClass("collapsed");
	});

	it("close LogoutConfirmationModal when cancel button is clicked", async () => {
		const {debug, getByTestId, container} = render(<Navbar isLoggedIn />);
		debug(undefined, 300000);

		const profileDropdown = getByTestId("profile-dropdown");
		const profileDropdownTogglers =
			profileDropdown.getElementsByClassName("dropdown-toggler");

		if (!profileDropdownTogglers) {
			throw new Error("Element does not exist.");
		}

		const profileDropdownToggler = profileDropdownTogglers[0];

		fireEvent.click(profileDropdownToggler);

		const dropdownMenus =
			profileDropdown.getElementsByClassName("dropdown-menu");
		if (!dropdownMenus) {
			throw new Error("Element does not exist.");
		}
		const dropdownMenu = dropdownMenus[0];

		await waitFor(() => {
			expect(dropdownMenu).toHaveClass("active");
		});

		const logoutDropdownItem =
			profileDropdown.getElementsByClassName("dropdown-item");

		if (!logoutDropdownItem) {
			throw new Error("Element does not exist.");
		}

		userEvent.click(logoutDropdownItem[0]);

		await waitFor(() => {
			expect(dropdownMenu).not.toHaveClass("active");
		});

		const logoutConfirmationModal = getByTestId("logout-confirmation-modal");
		await waitFor(() => {
			expect(logoutConfirmationModal.parentElement).toHaveClass(
				"flex justify-center items-center",
			);
		});

		const logoutConfirmationModalLogoutBtn = getByTestId(
			"logout-confirmation-modal-logout-btn",
		);
		fireEvent.click(logoutConfirmationModalLogoutBtn);

		await waitFor(() => {
			expect(require("@/utils/windowNavigate")).toHaveBeenCalledWith("/login");
		});
	});
});
