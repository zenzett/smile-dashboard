import React from "react";

const PartnerSkeletonLoading = () => {
	const getRandomWidth = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return (
		<div className="grid grid-cols-2 gap-2">
			{[...Array(6)].map((_, i) => (
				<div key={i} className="flex items-center gap-2">
					<div className="w-[24px] h-[24px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
					<div
						className="h-[10px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"
						style={{width: `${getRandomWidth(70, 110)}px`}}
					></div>
				</div>
			))}
		</div>
	);
};

export default PartnerSkeletonLoading;
