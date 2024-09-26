"use client";

import Link from "next/link";
import React, {
	createContext,
	Fragment,
	HTMLAttributes,
	useEffect,
	useState,
} from "react";

import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";

type NavbarContextType = {
	isExpand: boolean;
	name?: string;
};

const navbarContextInitialState: NavbarContextType = {
	isExpand: false,
};

export const NavbarContext = createContext(navbarContextInitialState);

type Props = HTMLAttributes<HTMLDivElement> & {
	isLoggedIn?: boolean;
	name?: string;
};

const Navbar = (props: Props) => {
	const {isLoggedIn, name, ...attrs} = props;

	const [isExpand, setIsExpand] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			setIsExpand(false);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<NavbarContext.Provider
			value={{
				isExpand: isExpand,
				name,
			}}
		>
			<div className="navbar" {...attrs}>
				<div className="navbar-inner">
					<Link href="#">
						<NavbarLogo data-testid="navbar-logo" />
					</Link>
					{isLoggedIn ? (
						<Fragment>
							<button
								className="menu-toggler"
								data-testid="menu-toggler"
								type="button"
								onClick={() => setIsExpand((state) => !state)}
							>
								<FontAwesomeIcon icon={faBars} />
							</button>
							<NavbarMenu data-testid="navbar-menu" />
						</Fragment>
					) : (
						false
					)}
				</div>
			</div>
		</NavbarContext.Provider>
	);
};

export default Navbar;
