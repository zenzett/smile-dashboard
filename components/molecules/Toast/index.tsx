import React, {
	FunctionComponent,
	HTMLAttributes,
	useEffect,
	useRef,
	useState,
} from "react";
import {createPortal} from "react-dom";

type ToastProps = HTMLAttributes<HTMLElement> & {
	handleClose: () => void;
	status: "success" | "error";
	isShow: boolean;
	dismissable?: boolean;
};

const Toast: FunctionComponent<ToastProps> = ({
	handleClose,
	status,
	isShow,
	children,
	className,
	dismissable = true,
	...attrs
}) => {
	const toastContainerRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (isShow) {
			toastContainerRef.current?.classList.add("flex");
			setTimeout(() => {
				toastContainerRef.current?.classList.add("opacity-100");
				toastContainerRef.current?.classList.add("top-24");
			}, 50);
		} else {
			toastContainerRef.current?.classList.remove("top-24");
			toastContainerRef.current?.classList.remove("opacity-100");
			setTimeout(() => {
				toastContainerRef.current?.classList.remove("flex");
			}, 50);
		}
	}, [isShow]);

	useEffect(() => {
		if (!isShow && !dismissable) {
			return;
		}

		const timeoutId = setTimeout(() => {
			handleClose();
		}, 3000);

		return () => {
			clearTimeout(timeoutId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShow]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<React.Fragment>
			{createPortal(
				<div className="toast-container" ref={toastContainerRef}>
					<div
						className={"toast"
							.concat(status ? ` ${status}` : "")
							.concat(className ? ` ${className}` : "")}
						{...attrs}
					>
						<div className="mr-8">{children}</div>
						<button
							className="toast-close-btn"
							onClick={handleClose}
							aria-label="Close Toast"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#clip0_668_3175)">
									<path
										d="M15.25 4.75831C14.925 4.43331 14.4 4.43331 14.075 4.75831L9.99998 8.82498L5.92498 4.74998C5.59998 4.42498 5.07498 4.42498 4.74998 4.74998C4.42498 5.07498 4.42498 5.59998 4.74998 5.92498L8.82498 9.99998L4.74998 14.075C4.42498 14.4 4.42498 14.925 4.74998 15.25C5.07498 15.575 5.59998 15.575 5.92498 15.25L9.99998 11.175L14.075 15.25C14.4 15.575 14.925 15.575 15.25 15.25C15.575 14.925 15.575 14.4 15.25 14.075L11.175 9.99998L15.25 5.92498C15.5666 5.60831 15.5666 5.07498 15.25 4.75831Z"
										fill="white"
									/>
								</g>
								<defs>
									<clipPath id="clip0_668_3175">
										<rect width="20" height="20" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</button>
					</div>
				</div>,
				document.body,
			)}
		</React.Fragment>
	);
};

export default Toast;
