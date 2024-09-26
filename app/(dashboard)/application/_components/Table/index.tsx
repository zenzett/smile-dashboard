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

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import PageTitle from "@/components/atoms/PageTitle";
import Pagination from "@/components/atoms/Pagination";
import Table from "@/components/atoms/Table";
import TableContainer from "@/components/atoms/TableContainer";
import DataNotFound from "@/components/molecules/DataNotFound";
import Toast from "@/components/molecules/Toast";
import {FilterAction} from "@/types/FilterAction";
import {SimpedesUmiApplicationCollectionParams} from "@/types/SimpedesUmiApplicationCollectionParams";
import {UserTypeID} from "@/types/UserTypeID";

import DetailApplicationModal from "../DetailApplicationModal";
import DownloadApplicationBulkModal from "../DownloadApplicationBulkModal";
import DownloadApplicationDetailModal from "../DownloadApplicationDetailModal";
import Filter from "./_components/Filter";
import FilterBadge from "./_components/FilterBadge";
import SkeletonLoading from "./_components/SkeletonLoading";
import TableItem from "./_components/TableItem";
import {useApplication} from "./_hooks/useApplication";
import {ModalActionType, useModalState} from "./_hooks/useModalState";
import {
	SelectedItemActionType,
	useSelectedItemState,
} from "./_hooks/useSelectedItem";

type ApplicationTableProps = {
	userTypeId: UserTypeID;
};

const ApplicationTable: FunctionComponent<ApplicationTableProps> = ({
	userTypeId,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const {modalState, modalDispatch} = useModalState();

	const {selectedItemState, selectedItemDispatch} = useSelectedItemState();

	const [action, setAction] = useState<FilterAction>("Filter");

	const [invalidValidation, setInvalidValidation] = useState<boolean>(false);

	const [params, setParams] = useState<SimpedesUmiApplicationCollectionParams>({
		page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
	});

	const [isShowToast, setIsShowToast] = useState<boolean>(false);
	const [toastStatus, setToastStatus] = useState<boolean>();
	const [toastMessage, setToastMessage] = useState<string>();

	const updateQueryUrlParams = useCallback(
		(params: SimpedesUmiApplicationCollectionParams) => {
			for (const key in params) {
				if (
					params[key as keyof SimpedesUmiApplicationCollectionParams] === "" &&
					key !== "nama" &&
					key !== "nik" &&
					key !== "noTelp"
				) {
					delete params[key as keyof SimpedesUmiApplicationCollectionParams];
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

	const getQueryUrlParams = (): SimpedesUmiApplicationCollectionParams => {
		const paramsFromUrl = Object.fromEntries(searchParams);
		const newSearchParams = {
			...paramsFromUrl,
			page: params.page,
			limit: params.limit,
		};
		return newSearchParams;
	};

	const application = useApplication({
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
		newParams: SimpedesUmiApplicationCollectionParams,
		action: FilterAction,
	) => {
		const updatedParams: SimpedesUmiApplicationCollectionParams = {
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

	const onRemoveItem = (newParams: SimpedesUmiApplicationCollectionParams) => {
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
			const newParams: SimpedesUmiApplicationCollectionParams = {
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
		const total = application.data?.data?.data?.recordsFiltered || 0;
		return Math.ceil(total / 10);
	}, [application.data?.data?.data?.recordsFiltered]);

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
		const newParams: SimpedesUmiApplicationCollectionParams = {
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
			application.data?.data?.data?.data?.length === 0 || invalidValidation;

		const filterNotEmpty =
			params.nama ||
			params.nik ||
			params.noTelp ||
			params.startDate ||
			params.endDate ||
			params.partnerName ||
			params.status;

		if (filterNotEmpty && noData) {
			return true;
		} else {
			return false;
		}
	}, [
		application.data?.data?.data?.data?.length,
		invalidValidation,
		params.nama,
		params.nik,
		params.noTelp,
		params.startDate,
		params.endDate,
		params.partnerName,
		params.status,
	]);

	const isSearchActive = useMemo(() => {
		if (application.data?.data?.data?.data?.length === 0 && params.search) {
			return true;
		}
		return false;
	}, [application.data?.data?.data?.data?.length, params.search]);

	useEffect(() => {
		const params = getQueryUrlParams();
		setParams(params);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Card
			className={"flex flex-col gap-6".concat(isSearchActive ? " h-full" : "")}
		>
			{!application.isLoading && !application.isValidating ? (
				<>
					<div className="flex justify-between items-center">
						<PageTitle>Pengajuan Simpedes UMi</PageTitle>
						{userTypeId !== "VIEWER" ? (
							<Button
								variant="primary-outline"
								className="gap-2"
								onClick={() => {
									modalDispatch({
										type: ModalActionType.SET_IS_SHOW_DOWNLOAD_BULK_MODAL,
										payload: true,
									});
								}}
								disabled={!userTypeId}
							>
								<i className="fa fa-download"></i>
								Download Data Pengajuan
							</Button>
						) : (
							false
						)}
					</div>

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
											<th>No Telepon</th>
											<th>Partner</th>
											<th>Status</th>
											<th>Aksi</th>
										</tr>
									</thead>
									<tbody>
										{application.data?.data?.data?.data?.length !== 0 ? (
											application.data?.data?.data?.data?.map((item, index) => (
												<TableItem
													key={index}
													userTypeId={userTypeId}
													item={item}
													params={params}
													index={index}
													onClickDetail={() => {
														selectedItemDispatch({
															type: SelectedItemActionType.SET_SELECTED_NAME,
															payload: item.custName,
														});
														selectedItemDispatch({
															type: SelectedItemActionType.SET_SELECTED_APPLICATION,
															payload: item.id,
														});
														modalDispatch({
															type: ModalActionType.SET_IS_SHOW_DETAIL_MODAL,
															payload: true,
														});
													}}
													onClickDownloadDetail={() => {
														selectedItemDispatch({
															type: SelectedItemActionType.SET_SELECTED_NAME,
															payload: item.custName,
														});
														selectedItemDispatch({
															type: SelectedItemActionType.SET_SELECTED_APPLICATION,
															payload: item.id,
														});
														modalDispatch({
															type: ModalActionType.SET_IS_SHOW_DOWNLOAD_DETAIL_MODAL,
															payload: true,
														});
													}}
												/>
											))
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

			<DetailApplicationModal
				userTypeId={userTypeId}
				isShow={modalState.isShowDetailModal}
				handleClose={() =>
					modalDispatch({
						type: ModalActionType.SET_IS_SHOW_DETAIL_MODAL,
						payload: false,
					})
				}
				selectedApplication={selectedItemState.selectedApplication}
				handleShowDownloadModal={() =>
					modalDispatch({
						type: ModalActionType.SET_IS_SHOW_DOWNLOAD_DETAIL_MODAL,
						payload: true,
					})
				}
			/>

			<DownloadApplicationDetailModal
				isShow={modalState.isShowDownloadDetailModal}
				handleClose={() =>
					modalDispatch({
						type: ModalActionType.SET_IS_SHOW_DOWNLOAD_DETAIL_MODAL,
						payload: false,
					})
				}
				selectedName={selectedItemState.selectedName}
				selectedApplication={selectedItemState.selectedApplication}
				onError={(error) => {
					const errorMessage = new Error(error as any).message;
					setToastStatus(false);
					setIsShowToast(true);
					setToastMessage(errorMessage);
					modalDispatch({
						type: ModalActionType.SET_IS_SHOW_DOWNLOAD_DETAIL_MODAL,
						payload: false,
					});
				}}
			/>

			<DownloadApplicationBulkModal
				isShow={modalState.isShowDownloadBulkModal}
				handleClose={() =>
					modalDispatch({
						type: ModalActionType.SET_IS_SHOW_DOWNLOAD_BULK_MODAL,
						payload: false,
					})
				}
				onError={(error) => {
					const errorMessage = new Error(error as any).message;
					setToastStatus(false);
					setIsShowToast(true);
					setToastMessage(errorMessage);
					modalDispatch({
						type: ModalActionType.SET_IS_SHOW_DOWNLOAD_BULK_MODAL,
						payload: false,
					});
				}}
			/>
		</Card>
	);
};

export default ApplicationTable;
