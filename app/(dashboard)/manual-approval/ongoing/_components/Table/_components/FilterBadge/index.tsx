import React, {
	Fragment,
	FunctionComponent,
	HTMLAttributes,
	useCallback,
	useMemo,
} from "react";

import {ManualOngoingApprovalCollectionParams} from "@/types/ManualOngoingApprovalCollectionParams";

interface FilterBadgeProps extends HTMLAttributes<HTMLDivElement> {
	params: ManualOngoingApprovalCollectionParams;
	onRemoveItem: (newParams: ManualOngoingApprovalCollectionParams) => void;
}

const FilterBadge: FunctionComponent<FilterBadgeProps> = ({
	params,
	onRemoveItem,
}) => {
	const filterLiveness = useMemo(() => {
		if (!params?.livenessScore) {
			return;
		}
		const filterLivenessScore = params?.livenessScore;

		return filterLivenessScore;
	}, [params?.livenessScore]);

	const filterStatusList = useMemo(() => {
		if (!params?.frStatus) {
			return;
		}
		const filterStatus = params?.frStatus;
		const arrFilterStatus = filterStatus.split(",");

		return arrFilterStatus;
	}, [params?.frStatus]);

	const deleteFilterDate = useCallback(() => {
		const newParams = {...params};

		delete newParams?.startDate;
		delete newParams?.endDate;

		onRemoveItem(newParams);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const deleteFilterLivenessScoreStatus = useCallback(
		(filterName: string, valueFilter?: string) => {
			let newParams: ManualOngoingApprovalCollectionParams = {...params};

			switch (filterName) {
				case "livenessScore":
					if (params?.livenessScore !== undefined) {
						delete newParams?.livenessScore;
					}
					break;
				case "frStatus":
					if (params?.frStatus !== "") {
						const statusListFiltered = filterStatusList?.filter(
							(item) => item !== valueFilter,
						);
						const newFilterStatus = statusListFiltered?.join(",");
						newParams = {...params, frStatus: newFilterStatus};
					}
					break;
			}

			onRemoveItem(newParams);
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filterStatusList, filterLiveness, params],
	);

	const renderFilterBadges = useMemo(() => {
		return (
			params?.startDate !== undefined ||
			params?.endDate !== undefined ||
			params?.livenessScore !== undefined ||
			params?.frStatus !== undefined
		);
	}, [
		params?.startDate,
		params?.endDate,
		params?.livenessScore,
		params?.frStatus,
	]);

	const resetFilter = useCallback(() => {
		const newParams = {...params};

		delete newParams?.nama;
		delete newParams?.nik;
		delete newParams?.startDate;
		delete newParams?.endDate;
		delete newParams?.livenessScore;
		delete newParams?.frStatus;

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
					{params?.livenessScore !== undefined ? (
						<div className="px-2.5 py-2 rounded-lg bg-light-10 flex gap-2.5 items-center">
							<span className="text-dark-10 text-sm font-semibold">
								{params.livenessScore !== "50"
									? `Liveness 50% - ${params?.livenessScore}%`
									: "Liveness 50%"}
							</span>
							<button
								onClick={() => deleteFilterLivenessScoreStatus("livenessScore")}
							>
								<i className="fa fa-circle-xmark text-light-80"></i>
							</button>
						</div>
					) : (
						false
					)}
					{params?.frStatus !== undefined
						? filterStatusList?.map((item, index) => (
								<div
									key={item}
									className="px-2.5 py-2 rounded-lg bg-light-10 flex gap-2.5 items-center"
								>
									<span className="text-dark-10 text-sm font-semibold capitalize">
										{item.toLowerCase()}
									</span>
									<button
										onClick={() =>
											deleteFilterLivenessScoreStatus("frStatus", item)
										}
									>
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
