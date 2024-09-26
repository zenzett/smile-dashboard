"use client";

import "./style.css";

import Link from "next/link";
import React, {
	Fragment,
	FunctionComponent,
	HTMLAttributes,
	useCallback,
	useContext,
	useState,
} from "react";

import windowNavigate from "@/utils/windowNavigate";

import {NavbarContext} from "../..";
import LogoutConfirmationModal from "./_components/LogoutConfirmationModal";
import ProfileDropdown from "./_components/ProfileDropdown";

type NavbarMenuProps = HTMLAttributes<HTMLDivElement>;

const NavbarMenu: FunctionComponent<NavbarMenuProps> = ({
	className,
	...attrs
}) => {
	const {isExpand, name} = useContext(NavbarContext);

	const [isShowConfirmation, setIsShowConfirmation] = useState<boolean>(false);

	const handleLogout = useCallback(() => {
		document.cookie = `TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		document.cookie = `REFRESH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		document.cookie = `USER_TYPE_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		document.cookie = `NAME=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		windowNavigate("/login");
	}, []);

	return (
		<Fragment>
			<div
				className={"navbar-menu"
					.concat(!isExpand ? " collapsed" : "")
					.concat(className ? ` ${className}` : "")}
				{...attrs}
			>
				<Link
					href="#"
					title="Notifikasi"
					className="flex gap-2 items-center w-full lg:w-auto text-light-80"
				>
					<i className="fas fa-bell fa-lg"></i>
					<span className="font-medium text-dark-40 text-base lg:hidden">
						Notifikasi
					</span>
				</Link>
				<ProfileDropdown
					id="profile-dropdown"
					data-testid="profile-dropdown"
					className="profile-dropdown"
					name={name}
					menus={[
						{
							label: "Logout",
							onClick: () => {
								setIsShowConfirmation(true);
							},
						},
					]}
				/>
			</div>

			<LogoutConfirmationModal
				isShow={isShowConfirmation}
				handleClose={() => setIsShowConfirmation((state) => !state)}
				handleLogout={handleLogout}
			/>
		</Fragment>
	);
};

export default NavbarMenu;
