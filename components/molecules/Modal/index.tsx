import React, {HTMLAttributes, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";

import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

type Props = HTMLAttributes<HTMLDivElement> & {
	isShow: boolean;
	containerClassName?: string;
	onClickBackground?: () => void;
};

const Modal = (props: Props) => {
	const {isShow, onClickBackground, containerClassName, className, ...attrs} =
		props;

	const modalBgRef = useRef<HTMLDivElement>(null);

	const modalRef = useRef<HTMLDivElement>(null);

	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isShow) {
			document.body.style.overflow = "hidden";
			modalBgRef.current?.classList.add(
				"flex",
				"justify-center",
				"items-center",
			);
			setTimeout(() => {
				modalRef.current?.classList.add("opacity-100");
				modalRef.current?.classList.add("scale-100");
			}, 100);
		} else {
			setTimeout(() => {
				modalRef.current?.classList.remove("scale-100");
				modalRef.current?.classList.remove("opacity-100");
			}, 100);
			setTimeout(() => {
				modalBgRef.current?.classList.remove(
					"flex",
					"justify-center",
					"items-center",
				);
				document.body.style.overflow = "unset";
			}, 200);
		}
	}, [isShow]);

	useEffect(() => {
		const keypressHandler = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isShow && onClickBackground) {
				onClickBackground();
			}
		};

		window.addEventListener("keypress", keypressHandler);

		return () => {
			window.removeEventListener("keypress", keypressHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShow]);

	if (!isMounted) {
		return false;
	}

	return (
		<React.Fragment>
			{createPortal(
				<React.Fragment>
					<div
						className={"modal-bg".concat(
							containerClassName ? " " + containerClassName : "",
						)}
						onClick={onClickBackground}
						ref={modalBgRef}
					>
						<div
							className={"modal".concat(className ? " " + className : "")}
							ref={modalRef}
							onClick={(e) => e.stopPropagation()}
							{...attrs}
						/>
					</div>
				</React.Fragment>,
				document.body,
			)}
		</React.Fragment>
	);
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
