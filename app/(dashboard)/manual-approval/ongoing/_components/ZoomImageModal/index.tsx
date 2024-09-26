import Image from "next/image";
import React, {FunctionComponent, useEffect, useRef} from "react";
import {createPortal} from "react-dom";

type ZoomImageProps = {
	isShow: boolean;
	imageToggle: () => void;
	src: string | undefined;
	alt: string;
};

const ZoomImageModal: FunctionComponent<ZoomImageProps> = ({
	imageToggle,
	isShow,
	src,
	alt,
}) => {
	const imageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (imageRef.current && !imageRef.current.contains(e.target as Node)) {
				imageToggle();
			}
		};

		if (isShow) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isShow, imageToggle]);

	return isShow ? (
		<React.Fragment>
			{createPortal(
				<>
					<div className={"zoom-image-bg"} onClick={imageToggle}>
						<div
							id="zoom-image-container"
							data-testid="zoom-image-container"
							className="zoom-image-container"
							ref={imageRef}
						>
							<Image
								id="zoom-image"
								data-testid="zoom-image"
								className="zoom-image"
								src={`data:image/jpg;base64,${src}`}
								alt={alt}
								width={0}
								height={0}
								onClick={(e) => e.stopPropagation()}
							/>
						</div>
					</div>
				</>,
				document.body,
			)}
		</React.Fragment>
	) : (
		false
	);
};

export default ZoomImageModal;
