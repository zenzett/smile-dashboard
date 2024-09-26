"use client";

import "./style.css";

import dayjs from "dayjs";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {
	FunctionComponent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

import Card from "@/components/atoms/Card";
import PageTitle from "@/components/atoms/PageTitle";
import Pagination from "@/components/atoms/Pagination";
import Table from "@/components/atoms/Table";
import TableContainer from "@/components/atoms/TableContainer";
import DataNotFound from "@/components/molecules/DataNotFound";
import {FilterAction} from "@/types/FilterAction";
import {ManualHistoryApprovalCollectionParams} from "@/types/ManualHistoryApprovalCollectionParams";
import {UserTypeID} from "@/types/UserTypeID";

import DetailApprovalModal from "../DetailApprovalModal";
import {Filter} from "./_components/Filter";
import FilterBadge from "./_components/FilterBadge";
import SkeletonLoading from "./_components/SkeletonLoading";
import TableItem from "./_components/TableItem";
import {useHistoryApproval} from "./_hooks/useHistoryApproval";
import {ModalActionType, useModalState} from "./_hooks/useModalState";
import {
	SelectedItemActionType,
	useSelectedItemState,
} from "./_hooks/useSelectedItem";

type HistoryApprovalTableProps = {
	userTypeId: UserTypeID;
};

const HistoryApprovalTable: FunctionComponent<HistoryApprovalTableProps> = ({
	userTypeId,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const {modalState, modalDispatch} = useModalState();

	const {selectedItemState, selectedItemDispatch} = useSelectedItemState();

	const [action, setAction] = useState<FilterAction>("Filter");

	const [invalidValidation, setInvalidValidation] = useState<boolean>(false);

	const [params, setParams] = useState<ManualHistoryApprovalCollectionParams>({
		page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
	});

	const updateQueryUrlParams = useCallback(
		(params: ManualHistoryApprovalCollectionParams) => {
			for (const key in params) {
				if (
					params[key as keyof ManualHistoryApprovalCollectionParams] === "" &&
					key !== "nama" &&
					key !== "nik"
				) {
					delete params[key as keyof ManualHistoryApprovalCollectionParams];
				}
			}

			const queryString = Object.keys(params)
				.map((key) => key + "=" + (params as any)[key])
				.join("&");

			const url = `${pathname}?${queryString}`;

			router.push(url);
		},
		[pathname, router],
	);

	const getQueryUrlParams = (): ManualHistoryApprovalCollectionParams => {
		const paramsFromUrl = Object.fromEntries(searchParams);
		const newSearchParams = {
			...paramsFromUrl,
			page: params.page,
			limit: params.limit,
		};
		return newSearchParams;
	};

	const historyApproval = useHistoryApproval({
		params,
		config: {
			onSuccess: (response, key) => {
				updateQueryUrlParams(params);
			},
			onError: (response, key) => {
				if (
					response?.response?.data?.data?.nama?.[0] ===
						"The nama is only filled by space" ||
					response?.response?.data?.data?.nik?.[0] ===
						"The nik field must be numeric"
				) {
					setInvalidValidation(true);
				}
			},
			shouldRetryOnError: false,
		},
	});

	const submitFilter = (
		newParams: ManualHistoryApprovalCollectionParams,
		action: FilterAction,
	) => {
		const updatedParams: ManualHistoryApprovalCollectionParams = {
			...newParams,
			page: 1,
			limit: 10,
			startDate: newParams.startDate
				? dayjs(newParams.startDate).format("YYYY-MM-DD")
				: "",
			endDate: newParams.endDate
				? dayjs(newParams.endDate).format("YYYY-MM-DD")
				: "",
		};

		setAction(action);
		setInvalidValidation(false);
		setParams(updatedParams);
		updateQueryUrlParams(updatedParams);
	};

	const onRemoveItem = (newParams: ManualHistoryApprovalCollectionParams) => {
		const updatedParams = {
			...newParams,
			page: 1,
			limit: 10,
		};

		setAction("Filter");
		setParams(updatedParams);
		updateQueryUrlParams(updatedParams);
	};

	const handlePagination = useCallback(
		(event: {selected: number}) => {
			const newParams: ManualHistoryApprovalCollectionParams = {
				...params,
				page: event.selected + 1,
			};

			setParams(newParams);
			updateQueryUrlParams(newParams);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[params],
	);

	const pageCount = useMemo(() => {
		const total = historyApproval.data?.data?.data?.recordsFiltered || 0;
		return Math.ceil(total / 10);
	}, [historyApproval.data?.data?.data?.recordsFiltered]);

	const handleForward = useCallback(() => {
		const newParams = {...params, page: pageCount};

		setParams(newParams);
		updateQueryUrlParams(newParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageCount, params]);

	const handleBackward = useCallback(() => {
		const newParams = {...params, page: 1};

		setParams(newParams);
		updateQueryUrlParams(newParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const resetFilter = useCallback(() => {
		const newParams: ManualHistoryApprovalCollectionParams = {
			page: 1,
			limit: 10,
		};

		setInvalidValidation(false);
		setParams(newParams);
		updateQueryUrlParams(newParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const dataNotFound = useMemo(() => {
		const noData =
			historyApproval.data?.data?.data?.data?.length === 0 || invalidValidation;

		const filterNotEmpty =
			params.nama ||
			params.nik ||
			params.startDate ||
			params.endDate ||
			params.status;

		if (filterNotEmpty && noData) {
			return true;
		} else {
			return false;
		}
	}, [
		historyApproval.data?.data?.data?.data?.length,
		invalidValidation,
		params.nama,
		params.nik,
		params.startDate,
		params.endDate,
		params.status,
	]);

	const isSearchActive = useMemo(() => {
		if (historyApproval.data?.data?.data?.data?.length === 0 && params.search) {
			return true;
		}
		return false;
	}, [historyApproval.data?.data?.data?.data?.length, params.search]);

	useEffect(() => {
		const params = getQueryUrlParams();
		setParams(params);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Card
			className={"flex flex-col gap-6".concat(isSearchActive ? " h-full" : "")}
		>
			{!historyApproval.isLoading && !historyApproval.isValidating ? (
				<>
					<PageTitle>Riwayat Approval</PageTitle>

					<Filter onSubmit={submitFilter} params={params} />

					{dataNotFound ? (
						<DataNotFound onResetFilter={resetFilter} action={action} />
					) : (
						<>
							<FilterBadge onRemoveItem={onRemoveItem} params={params} />

							<TableContainer>
								<Table>
									<thead>
										<tr>
											<th>No</th>
											<th>Tanggal / Waktu</th>
											<th>Nama Nasabah</th>
											<th>NIK</th>
											<th>
												<span className="flex w-fit mx-auto">
													Status Approval
												</span>
											</th>
											<th>Alasan</th>
											<th>Aksi</th>
										</tr>
									</thead>
									<tbody>
										{historyApproval.data?.data?.data?.data?.length !== 0 ? (
											historyApproval.data?.data?.data?.data?.map(
												(item, index) => (
													<TableItem
														key={index}
														item={item}
														params={params}
														index={index}
														onClickDetail={() => {
															selectedItemDispatch({
																type: SelectedItemActionType.SET_SELECTED_HISTORY_APPROVAL,
																payload: item.id,
															});
															modalDispatch({
																type: ModalActionType.SET_IS_SHOW_DETAIL_MODAL,
																payload: true,
															});
														}}
													/>
												),
											)
										) : (
											<tr>
												<td className="!text-center" colSpan={8}>
													Tidak Ada Data
												</td>
											</tr>
										)}
									</tbody>
								</Table>
							</TableContainer>
						</>
					)}

					<Pagination
						page={params?.page}
						pageCount={pageCount}
						onPageChange={handlePagination}
						forward={handleForward}
						backward={handleBackward}
					/>
				</>
			) : (
				<SkeletonLoading />
			)}

			<DetailApprovalModal
				isShow={modalState.isShowDetailModal}
				handleClose={() =>
					modalDispatch({
						type: ModalActionType.SET_IS_SHOW_DETAIL_MODAL,
						payload: false,
					})
				}
				selectedApplication={selectedItemState.selectedHistoryApproval}
			/>
		</Card>
	);
};

export default HistoryApprovalTable;
