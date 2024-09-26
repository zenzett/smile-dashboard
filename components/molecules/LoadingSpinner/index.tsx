import React, {HTMLAttributes, useEffect, useRef} from "react";
import {createPortal} from "react-dom";

type Props = HTMLAttributes<HTMLDivElement> & {
	isShow: boolean;
	containerClassName?: string;
};

const LoadingSpinner = (props: Props) => {
	const {isShow, containerClassName, className, ...attrs} = props;

	const loadingBgRef = useRef<HTMLDivElement>(null);

	const loadingRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isShow) {
			document.body.style.overflow = "hidden";
			loadingBgRef.current?.classList.remove("hidden");
		} else {
			document.body.style.overflow = "";
			loadingBgRef.current?.classList.add("hidden");
		}
	}, [isShow]);

	return (
		<React.Fragment>
			{createPortal(
				<div
					className="fixed flex justify-center items-center inset-0 h-full z-10 bg-black/40"
					ref={loadingBgRef}
				>
					<i
						className="fa-solid fa-spinner text-primary-80 animate-spin text-5xl"
						ref={loadingRef}
						{...attrs}
					></i>
				</div>,
				document.body,
			)}
		</React.Fragment>
	);
};

export default LoadingSpinner;
