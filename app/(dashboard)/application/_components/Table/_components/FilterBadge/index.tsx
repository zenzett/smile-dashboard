import React, {
	Fragment,
	FunctionComponent,
	HTMLAttributes,
	useCallback,
	useMemo,
} from "react";

import {SimpedesUmiApplicationCollectionParams} from "@/types/SimpedesUmiApplicationCollectionParams";

interface FilterBadgeProps extends HTMLAttributes<HTMLDivElement> {
	params: SimpedesUmiApplicationCollectionParams;
	onRemoveItem: (newParams: SimpedesUmiApplicationCollectionParams) => void;
}

const FilterBadge: FunctionComponent<FilterBadgeProps> = ({
	params,
	onRemoveItem,
}) => {
	const listFilterPartner = useMemo(() => {
		if (!params?.partnerName) {
			return;
		}
		const filterPartner = params?.partnerName;
		const arrFilterPartner = filterPartner.split(",");

		return arrFilterPartner;
	}, [params?.partnerName]);

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

	const deleteFilterPartnerStatus = useCallback(
		(filterName: string, valueFilter: string) => {
			let newParams: SimpedesUmiApplicationCollectionParams = {...params};

			switch (filterName) {
				case "partner":
					if (params?.partnerName !== "") {
						const partnerListFiltered = listFilterPartner?.filter(
							(item) => item !== valueFilter,
						);
						const newFilterPartner = partnerListFiltered?.join(",");
						newParams = {...newParams, partnerName: newFilterPartner};
					}
					break;
				case "status":
					if (params?.status !== "") {
						const statusListFiltered = filterStatusList?.filter(
							(item) => item !== valueFilter,
						);
						const newFilterStatus = statusListFiltered?.join(",");
						newParams = {...params, status: newFilterStatus};
					}
					break;
			}

			onRemoveItem(newParams);
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filterStatusList, listFilterPartner, params],
	);

	const renderFilterBadges = useMemo(() => {
		return (
			params?.startDate !== undefined ||
			params?.endDate !== undefined ||
			params?.partnerName !== undefined ||
			params?.status !== undefined
		);
	}, [params?.startDate, params?.endDate, params?.partnerName, params?.status]);

	const resetFilter = useCallback(() => {
		const newParams = {...params};

		delete newParams?.nama;
		delete newParams?.nik;
		delete newParams?.noTelp;
		delete newParams?.startDate;
		delete newParams?.endDate;
		delete newParams?.partnerName;
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
					{params?.partnerName !== undefined
						? listFilterPartner?.map((item, index) => (
								<div
									key={item}
									className="px-2.5 py-2 rounded-lg bg-light-10 flex gap-2.5 items-center"
								>
									<span className="text-dark-10 text-sm font-semibold">{`${item}`}</span>
									<button
										onClick={() => deleteFilterPartnerStatus("partner", item)}
									>
										<i className="fa fa-circle-xmark text-light-80"></i>
									</button>
								</div>
						  ))
						: false}
					{params?.status !== undefined
						? filterStatusList?.map((item, index) => (
								<div
									key={item}
									className="px-2.5 py-2 rounded-lg bg-light-10 flex gap-2.5 items-center"
								>
									<span className="text-dark-10 text-sm font-semibold">{`${item}`}</span>
									<button
										onClick={() => deleteFilterPartnerStatus("status", item)}
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
