import {HTMLAttributes} from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
	dismissable?: boolean;
	handleClose?: () => void;
};

const Header = (props: Props) => {
	const {className, children, dismissable, handleClose, ...attrs} = props;

	const CloseBtn = () => {
		if (!dismissable) {
			return false;
		}
		return (
			<button className="modal-close-btn" onClick={handleClose} type="button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M1.23356 14.7664C0.922148 14.455 0.922148 13.9501 1.23356 13.6387L13.6387 1.23357C13.9501 0.922152 14.455 0.922152 14.7664 1.23357C15.0779 1.54499 15.0779 2.04989 14.7664 2.36131L2.3613 14.7664C2.04989 15.0779 1.54498 15.0779 1.23356 14.7664Z"
						fill="#777777"
					/>
					<path
						d="M1.23356 1.23356C1.54498 0.922146 2.04989 0.922146 2.3613 1.23356L14.7664 13.6387C15.0779 13.9501 15.0779 14.455 14.7664 14.7664C14.455 15.0779 13.9501 15.0779 13.6387 14.7664L1.23356 2.3613C0.922146 2.04989 0.922146 1.54498 1.23356 1.23356Z"
						fill="#777777"
					/>
				</svg>
			</button>
		);
	};

	return (
		<div
			className={"modal-header".concat(className ? " " + className : "")}
			{...attrs}
		>
			<div>{children}</div>
			<CloseBtn />
		</div>
	);
};

export default Header;
