import "./style.css";

import {
	FunctionComponent,
	HTMLAttributes,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

type DropdownMenu = {
	label: string;
	onClick?: () => void;
};

type DropdownProps = HTMLAttributes<HTMLDivElement> & {
	label: string;
	isLoading?: boolean;
	placeholder: string;
	menus: DropdownMenu[];
	disabledToggler?: boolean;
	togglerClassName?: string;
};

const Dropdown: FunctionComponent<DropdownProps> = ({
	label,
	menus,
	isLoading,
	children,
	className,
	placeholder,
	disabledToggler,
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
				type="button"
				className={"dropdown-toggler".concat(
					togglerClassName ? ` ${togglerClassName}` : "",
				)}
				onClick={toggleDropdownMenu}
				disabled={disabledToggler}
			>
				<div className="dropdown-label">
					<span
						className={"text-sm font-normal capitalize ".concat(
							label ? " text-dark-40" : "text-light-40 ",
						)}
					>
						{label ? label : placeholder}
					</span>
					{isLoading ? (
						<i className="fa-solid fa-spinner animate-spin text-light-80"></i>
					) : (
						<i
							className={"fa-solid fa-chevron-down "
								.concat(label ? "text-dark-40" : "text-light-40")
								.concat(isShowDropdownMenu ? "transform rotate-180" : "")}
						></i>
					)}
				</div>
			</button>
			<ul
				className={"dropdown-menu dropdown-scroll".concat(
					isShowDropdownMenu ? " active" : "",
				)}
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

Dropdown.displayName = "Dropdown";

export default Dropdown;
