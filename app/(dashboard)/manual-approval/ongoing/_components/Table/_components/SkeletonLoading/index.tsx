import React from "react";

const SkeletonLoading = () => {
	const getRandomWidth = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return (
		<div className="flex flex-col py-6 gap-12 w-full">
			{/* Title */}
			<div className="w-[174px] h-[17px] rounded-[25px] bg-[#E6E6E6] animate-pulse"></div>

			{/* Filter */}
			<div className="flex flex-row items-center justify-between px-4">
				<div className="flex items-center gap-12">
					<div className="flex items-center gap-4">
						<div className="w-[95px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
						<div className="w-[13.2px] h-[5.91px] rounded-[5.91px] bg-[#E6E6E6] animate-pulse"></div>
					</div>
					<div className="flex items-center gap-4">
						<div className="w-[20px] h-[20px] rounded-[20px] bg-[#E6E6E6] animate-pulse"></div>
						<div className="w-[400px] h-[14px] rounded-[20px] bg-[#E6E6E6] animate-pulse"></div>
					</div>
				</div>
				<div className="flex items-center">
					<div className="flex items-center gap-2">
						<div className="w-[20px] h-[20px] rounded-[10px] bg-[#E6E6E6] animate-pulse"></div>
						<div className="w-[60px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="flex items-center w-full gap-4">
				{/* Number Column */}
				<div className="flex flex-col gap-10 w-[52px]">
					<div className="w-[30px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
					{[...Array(9)].map((_, i) => (
						<div
							key={i}
							className="h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"
							style={{width: `${getRandomWidth(16, 16)}px`}}
						></div>
					))}
					<div className="w-[22px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
				</div>

				{/* Date Column */}
				<div className="flex flex-col gap-10 w-[150px]">
					<div className="w-[120px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
					{[...Array(10)].map((_, i) => (
						<div
							key={i}
							className="h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"
							style={{width: `${getRandomWidth(60, 120)}px`}}
						></div>
					))}
				</div>

				{/* Customer Name Column */}
				<div className="flex flex-col gap-10 w-[170px]">
					<div className="w-[140px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
					{[...Array(10)].map((_, i) => (
						<div
							key={i}
							className="h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"
							style={{width: `${getRandomWidth(70, 140)}px`}}
						></div>
					))}
				</div>

				{/* NIK Column */}
				<div className="flex flex-col gap-10 w-[158px]">
					<div className="w-[60px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
					{[...Array(10)].map((_, i) => (
						<div
							key={i}
							className="h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"
							style={{width: `${getRandomWidth(60, 120)}px`}}
						></div>
					))}
				</div>

				{/* Phone Number Column */}
				<div className="flex flex-col gap-10 w-[140px]">
					<div className="w-[100px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
					{[...Array(10)].map((_, i) => (
						<div
							key={i}
							className="h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"
							style={{width: `${getRandomWidth(50, 100)}px`}}
						></div>
					))}
				</div>

				{/* Partner Column */}
				<div className="flex flex-col gap-10 w-[100px]">
					<div className="w-[80px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
					{[...Array(10)].map((_, i) => (
						<div
							key={i}
							className="h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"
							style={{width: `${getRandomWidth(50, 100)}px`}}
						></div>
					))}
				</div>

				{/* Liveness Score Column */}
				<div className="flex flex-col gap-10 w-[150px] items-center">
					<div className="w-[120px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
					{[...Array(10)].map((_, i) => (
						<div
							key={i}
							className="h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"
							style={{width: `${getRandomWidth(60, 120)}px`}}
						></div>
					))}
				</div>

				{/* Action Column */}
				<div className="flex flex-col gap-10 w-1/12">
					<div className="w-[70px] h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"></div>
					{[...Array(10)].map((_, i) => (
						<div
							key={i}
							className="h-[12.25px] rounded-[17.5px] bg-[#E6E6E6] animate-pulse"
							style={{width: `${getRandomWidth(80, 80)}px`}}
						></div>
					))}
				</div>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-center gap-4">
				<div className="w-[24px] h-[24px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
				<div className="w-[24px] h-[24px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
				<div className="w-[12px] h-[16px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
				<div className="w-[12px] h-[16px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
				<div className="w-[12px] h-[16px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
				<div className="w-[16px] h-[8px] rounded-[4px] bg-[#E6E6E6] animate-pulse mb-[-8px]"></div>
				<div className="w-[12px] h-[16px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
				<div className="w-[12px] h-[16px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
				<div className="w-[12px] h-[16px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
				<div className="w-[24px] h-[24px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
				<div className="w-[24px] h-[24px] rounded-[4px] bg-[#E6E6E6] animate-pulse"></div>
			</div>
		</div>
	);
};

export default SkeletonLoading;
