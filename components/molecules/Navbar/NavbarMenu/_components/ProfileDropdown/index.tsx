import {
	FunctionComponent,
	HTMLAttributes,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import Avatar from "@/components/atoms/Avatar";

type ProfileDropdownMenu = {
	label: string | ReactNode;
	onClick?: () => void;
};

type ProfileDropdownProps = HTMLAttributes<HTMLDivElement> & {
	name?: string;
	menus: ProfileDropdownMenu[];
	togglerClassName?: string;
};

const ProfileDropdown: FunctionComponent<ProfileDropdownProps> = ({
	name,
	children,
	menus,
	className,
	togglerClassName,
	...attrs
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	const dropdownMenuRef = useRef<HTMLUListElement>(null);

	const [isShowDropdownMenu, setIsShowDropdownMenu] = useState<boolean>(false);

	const toggleDropdownMenu = useCallback(() => {
		setIsShowDropdownMenu((state) => !state);
	}, []);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Element) &&
				dropdownMenuRef.current?.classList.contains("active")
			) {
				setIsShowDropdownMenu(false);
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<div
			className={"dropdown".concat(className ? ` ${className}` : "")}
			{...attrs}
			ref={dropdownRef}
		>
			<button
				className={"dropdown-toggler".concat(
					togglerClassName ? ` ${togglerClassName}` : "",
				)}
				onClick={toggleDropdownMenu}
			>
				<div className="flex gap-2 items-center w-full lg:w-auto text-light-80">
					<span className="font-medium text-dark-40 text-base order-2 lg:order-1">
						{name}
					</span>
					<Avatar
						name={name || ""}
						title={name}
						className="order-1 lg:order-2"
					/>
					<i className="fas fa-chevron-down order-3"></i>
				</div>
			</button>
			<ul
				className={"dropdown-menu".concat(isShowDropdownMenu ? " active" : "")}
				ref={dropdownMenuRef}
			>
				{menus.map((menu, index) => (
					<li
						className="dropdown-item"
						key={index}
						onClick={() => {
							menu.onClick && menu.onClick();
							setIsShowDropdownMenu(false);
						}}
					>
						{menu.label}
					</li>
				))}
			</ul>
		</div>
	);
};

ProfileDropdown.displayName = "ProfileDropdown";

export default ProfileDropdown;
