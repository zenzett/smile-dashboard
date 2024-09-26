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
import Toast from "@/components/molecules/Toast";
import {FilterAction} from "@/types/FilterAction";
import {ManualOngoingApprovalCollectionParams} from "@/types/ManualOngoingApprovalCollectionParams";
import {UserTypeID} from "@/types/UserTypeID";

import DetailApprovalModal from "../DetailApprovalModal";
import ReasonApprovalModal from "../ReasonApprovalModal";
import ApprovalMarkingAlert from "./_components/ApprovalMarkingAlert";
import Filter from "./_components/Filter";
import FilterBadge from "./_components/FilterBadge";
import SkeletonLoading from "./_components/SkeletonLoading";
import TableItem from "./_components/TableItem";
import {ModalActionType, useModalState} from "./_hooks/useModalState";
import {useOngoingApproval} from "./_hooks/useOngoingApproval";
import {
	SelectedItemActionType,
	useSelectedItemState,
} from "./_hooks/useSelectedItem";

type OngoingApprovalTableProps = {
	userTypeId: UserTypeID;
};

const OngoingApprovalTable: FunctionComponent<OngoingApprovalTableProps> = ({
	userTypeId,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [statusApproval, setStatusApproval] = useState<
		"APPROVED" | "REJECTED" | undefined
	>(undefined);

	const [isShowToast, setIsShowToast] = useState<boolean>(false);
	const [toastStatus, setToastStatus] = useState<boolean>();
	const [toastMessage, setToastMessage] = useState<string>();

	const {modalState, modalDispatch} = useModalState();

	const {selectedItemState, selectedItemDispatch} = useSelectedItemState();

	const [action, setAction] = useState<FilterAction>("Filter");

	const [invalidValidation, setInvalidValidation] = useState<boolean>(false);

	const [params, setParams] = useState<ManualOngoingApprovalCollectionParams>({
		page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
	});

	const updateQueryUrlParams = useCallback(
		(params: ManualOngoingApprovalCollectionParams) => {
			for (const key in params) {
				if (
					params[key as keyof ManualOngoingApprovalCollectionParams] === "" &&
					key !== "nama" &&
					key !== "nik"
				) {
					delete params[key as keyof ManualOngoingApprovalCollectionParams];
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

	const getQueryUrlParams = (): ManualOngoingApprovalCollectionParams => {
		const paramsFromUrl = Object.fromEntries(searchParams);
		const newSearchParams = {
			...paramsFromUrl,
			page: params.page,
			limit: params.limit,
		};
		return newSearchParams;
	};

	const ongoingApproval = useOngoingApproval({
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

	const hasApprovalMark = useMemo(() => {
		const checkCountdownAutoRejectNotNull =
			ongoingApproval?.data?.data?.data?.data?.some(
				(item) => item.countdownAutoReject !== null,
			);

		return checkCountdownAutoRejectNotNull;
	}, [ongoingApproval?.data?.data?.data?.data]);

	const submitFilter = (
		newParams: ManualOngoingApprovalCollectionParams,
		action: FilterAction,
	) => {
		const updatedParams: ManualOngoingApprovalCollectionParams = {
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

	const handleSubmitStatusApproval = (status: "APPROVED" | "REJECTED") => {
		setStatusApproval(status);
		modalDispatch({
			type: ModalActionType.SET_IS_SHOW_DETAIL_MODAL,
			payload: false,
		});
		setTimeout(() => {
			modalDispatch({
				type: ModalActionType.SET_IS_SHOW_REASON_MODAL,
				payload: true,
			});
		}, 250);
	};

	const onRemoveItem = (newParams: ManualOngoingApprovalCollectionParams) => {
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
			const newParams: ManualOngoingApprovalCollectionParams = {
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
		const total = ongoingApproval?.data?.data?.data?.recordsFiltered || 0;
		return Math.ceil(total / 10);
	}, [ongoingApproval?.data?.data?.data?.recordsFiltered]);

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
		const newParams: ManualOngoingApprovalCollectionParams = {
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
			ongoingApproval.data?.data?.data?.data?.length === 0 || invalidValidation;

		const filterNotEmpty =
			params.nama ||
			params.nik ||
			params.startDate ||
			params.endDate ||
			params.livenessScore ||
			params.frStatus;

		if (filterNotEmpty && noData) {
			return true;
		} else {
			return false;
		}
	}, [
		ongoingApproval.data?.data?.data?.data?.length,
		invalidValidation,
		params.nama,
		params.nik,
		params.startDate,
		params.endDate,
		params.livenessScore,
		params.frStatus,
	]);

	const isSearchActive = useMemo(() => {
		if (ongoingApproval.data?.data?.data?.data?.length === 0 && params.search) {
			return true;
		}
		return false;
	}, [ongoingApproval.data?.data?.data?.data?.length, params.search]);

	useEffect(() => {
		const params = getQueryUrlParams();
		setParams(params);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Card
			className={"flex flex-col gap-6".concat(isSearchActive ? " h-full" : "")}
		>
			{!ongoingApproval.isLoading && !ongoingApproval.isValidating ? (
				<>
					<PageTitle>Approval Manual</PageTitle>

					<Filter onSubmit={submitFilter} params={params} />

					{dataNotFound ? (
						<DataNotFound onResetFilter={resetFilter} action={action} />
					) : (
						<>
							<FilterBadge onRemoveItem={onRemoveItem} params={params} />

							<div className="flex flex-col gap-6">
								{hasApprovalMark ? <ApprovalMarkingAlert /> : false}
								<TableContainer>
									<Table>
										<thead>
											<tr>
												<th>No</th>
												<th>Tanggal / Waktu</th>
												<th>Nama Nasabah</th>
												<th>NIK</th>
												<th>Partner</th>
												<th>FR Status</th>
												<th>
													<span className="flex w-fit mx-auto">
														Liveness Score
													</span>
												</th>
												<th>Aksi</th>
											</tr>
										</thead>
										<tbody>
											{ongoingApproval.data?.data?.data?.data?.length !== 0 ? (
												ongoingApproval.data?.data.data.data?.map(
													(item, index) => (
														<TableItem
															key={index}
															item={item}
															index={index}
															params={params}
															approvalMark={item.countdownAutoReject}
															onClickDetail={() => {
																selectedItemDispatch({
																	type: SelectedItemActionType.SET_SELECTED_ONGOING_APPROVAL,
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
							</div>
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

			<Toast
				id="toast"
				data-testid="toast"
				status={toastStatus ? "success" : "error"}
				isShow={isShowToast}
				handleClose={() => {
					setIsShowToast(false);
				}}
			>
				{toastMessage}
			</Toast>

			<DetailApprovalModal
				selectedApproval={selectedItemState.selectedOngoingApproval}
				isShow={modalState.isShowDetailModal}
				handleClose={() =>
					modalDispatch({
						type: ModalActionType.SET_IS_SHOW_DETAIL_MODAL,
						payload: false,
					})
				}
				handleSubmit={handleSubmitStatusApproval}
			/>

			<ReasonApprovalModal
				selectedApproval={selectedItemState.selectedOngoingApproval}
				isShow={modalState.isShowReasonModal}
				status={statusApproval}
				handleClose={() =>
					modalDispatch({
						type: ModalActionType.SET_IS_SHOW_REASON_MODAL,
						payload: false,
					})
				}
				handleCancel={() => {
					modalDispatch({
						type: ModalActionType.SET_IS_SHOW_REASON_MODAL,
						payload: false,
					});
					setTimeout(() => {
						modalDispatch({
							type: ModalActionType.SET_IS_SHOW_DETAIL_MODAL,
							payload: true,
						});
					}, 250);
				}}
				onSuccess={(successMessage) => {
					setToastStatus(true);
					setIsShowToast(true);
					setToastMessage(successMessage);
					ongoingApproval.mutate();
				}}
				onError={(error) => {
					const errorMessage = new Error(error as any).message;
					setToastStatus(false);
					setIsShowToast(true);
					setToastMessage(errorMessage);
				}}
			/>
		</Card>
	);
};

export default OngoingApprovalTable;
