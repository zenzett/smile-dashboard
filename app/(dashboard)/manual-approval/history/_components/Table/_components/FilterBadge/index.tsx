import React, {
	Fragment,
	FunctionComponent,
	HTMLAttributes,
	useCallback,
	useMemo,
} from "react";

import {ManualHistoryApprovalCollectionParams} from "@/types/ManualHistoryApprovalCollectionParams";

interface FilterBadgeProps extends HTMLAttributes<HTMLDivElement> {
	params: ManualHistoryApprovalCollectionParams;
	onRemoveItem: (newParams: ManualHistoryApprovalCollectionParams) => void;
}

const FilterBadge: FunctionComponent<FilterBadgeProps> = ({
	params,
	onRemoveItem,
}) => {
	const filterStatusList = useMemo(() => {
		if (!params?.status) {
			return;
		}
		const filterStatus = params?.status;
		const arrFilterStatus = filterStatus.split(",");

		return arrFilterStatus;
	}, [params?.status]);

	const deleteFilterDate = useCallback(() => {
		const newParams = {...params};

		delete newParams?.startDate;
		delete newParams?.endDate;

		onRemoveItem(newParams);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const deleteStatusFilter = useCallback(
		(value?: string) => {
			let newParams: ManualHistoryApprovalCollectionParams = {...params};

			if (params?.status !== "") {
				const statusListFiltered = filterStatusList?.filter(
					(item) => item !== value,
				);
				const newFilterStatus = statusListFiltered?.join(",");
				newParams = {...params, status: newFilterStatus};
			}

			onRemoveItem(newParams);
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filterStatusList, params],
	);

	const renderFilterBadges = useMemo(() => {
		return (
			params?.startDate !== undefined ||
			params?.endDate !== undefined ||
			params?.status !== undefined
		);
	}, [params?.startDate, params?.endDate, params?.status]);

	const resetFilter = useCallback(() => {
		const newParams = {...params};

		delete newParams?.nama;
		delete newParams?.nik;
		delete newParams?.startDate;
		delete newParams?.endDate;
		delete newParams?.status;

		onRemoveItem(newParams);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	return (
		<Fragment>
			{renderFilterBadges ? (
				<div className="flex flex-wrap gap-4">
					{params?.startDate && params?.endDate !== "" ? (
						<div className="px-2.5 py-2 rounded-lg bg-light-10 flex gap-2.5 items-center">
							<span className="text-dark-10 text-sm font-semibold">{`${params?.startDate.replace(
								/-/g,
								"/",
							)} - ${
								params?.endDate ? params?.endDate.replace(/-/g, "/") : "-"
							}`}</span>
							<button onClick={deleteFilterDate}>
								<i className="fa fa-circle-xmark text-light-80"></i>
							</button>
						</div>
					) : (
						false
					)}
					{params?.status !== undefined
						? filterStatusList?.map((item, index) => (
								<div
									key={item}
									className="px-2.5 py-2 rounded-lg bg-light-10 flex gap-2.5 items-center"
								>
									<span className="text-dark-10 text-sm font-semibold capitalize">
										{item === "AUTO_REJECTED"
											? "Auto-Reject"
											: item.toLowerCase()}
									</span>
									<button onClick={() => deleteStatusFilter(item)}>
										<i className="fa fa-circle-xmark text-light-80"></i>
									</button>
								</div>
						  ))
						: false}
					<button
						className="text-blue-80 font-normal text-base"
						onClick={resetFilter}
					>
						Reset Filter
					</button>
				</div>
			) : (
				false
			)}
		</Fragment>
	);
};

export default FilterBadge;
