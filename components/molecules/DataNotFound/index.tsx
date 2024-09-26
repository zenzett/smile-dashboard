import Image from "next/image";
import React, {FunctionComponent, HTMLAttributes, useMemo} from "react";

import {FilterAction} from "@/types/FilterAction";

interface DataNotFoundProps extends HTMLAttributes<HTMLDivElement> {
	onResetFilter: () => void;
	action?: FilterAction;
}

const DataNotFound: FunctionComponent<DataNotFoundProps> = ({
	onResetFilter,
	action,
}) => {
	const actionExecuted = useMemo(() => {
		if (action === "Filter") {
			return "Filter";
		}
		if (action === "Search") {
			return "Pencarian";
		}
	}, [action]);

	return (
		<div className="flex justify-center h-full items-center">
			<div className="flex items-center flex-col w-[368.61px]">
				<Image
					priority
					src={require("./_assets/data-not-found.png")}
					alt="Not found"
				/>
				<span className="text-xl text-dark-40 font-bold">
					{" "}
					Data Tidak Ditemukan{" "}
				</span>
				<button
					className="text-base text-blue-80 font-medium"
					onClick={onResetFilter}
				>
					Reset {actionExecuted}
				</button>
			</div>
		</div>
	);
};

export default DataNotFound;
