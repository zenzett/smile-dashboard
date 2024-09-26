import Image from "next/image";
import React, {FunctionComponent, useEffect, useState} from "react";

type ImageContainerProps = {
	id?: string;
	alt: string;
	src: string | undefined;
	"data-testid"?: string;
	onClick?: () => void;
};

const ImageContainer: FunctionComponent<ImageContainerProps> = ({
	id,
	alt,
	src,
	onClick,
	"data-testid": dataTestId,
	...attrs
}) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		setImageLoaded(false);
	}, [src]);

	return (
		<>
			{src ? (
				<Image
					id={id}
					data-testid={`image-container-${dataTestId}`}
					src={`data:image/jpg;base64,${src}`}
					alt={alt}
					width={100}
					height={100}
					className="w-full rounded-xl hover:cursor-zoom-in"
					onLoad={() => setImageLoaded(true)}
					{...attrs}
					onClick={onClick}
				/>
			) : (
				false
			)}
			{src === "" ? (
				<div
					id={id}
					data-testid={`image-invalid-${dataTestId}`}
					className="flex justify-center items-center rounded-xl bg-light-20 w-full h-[527px]"
				>
					No Image
				</div>
			) : (
				false
			)}
			{!imageLoaded && src !== "" ? (
				<div
					id={id}
					data-testid={`image-loading-${dataTestId}`}
					className="animate-pulse rounded-xl bg-light-20 w-full h-[527px]"
				></div>
			) : (
				false
			)}
		</>
	);
};

export default ImageContainer;
