"use client";

import {AxiosResponse} from "axios";
import {
	ChangeEvent,
	FunctionComponent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import ModalAddUser from "@/app/(dashboard)/admin/_components/AddUserModal";
import ModalDeleteUser from "@/app/(dashboard)/admin/_components/DeleteUserModal";
import ModalEditUser from "@/app/(dashboard)/admin/_components/EditUserModal";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormGroup from "@/components/atoms/FormGroup";
import FormIcon from "@/components/atoms/FormIcon";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import PageTitle from "@/components/atoms/PageTitle";
import Pagination from "@/components/atoms/Pagination";
import Table from "@/components/atoms/Table";
import TableContainer from "@/components/atoms/TableContainer";
import Toast from "@/components/molecules/Toast";
import axiosInstance from "@/config/client/axios";
import {User} from "@/types/User";
import {UserCollectionParams} from "@/types/UserCollectionParams";
import {UserCollectionResponse} from "@/types/UserCollectionResponse";
import {UserTypeID} from "@/types/UserTypeID";
import {yupResolver} from "@hookform/resolvers/yup";

type UserTableProps = {
	userTypeId: UserTypeID;
};

const schema = yup.object({
	search: yup.string().optional(),
	filter: yup.array().of(yup.string()).optional(),
	isSuperAdmin: yup.boolean().optional(),
	isAdmin: yup.boolean().optional(),
	isViewer: yup.boolean().optional(),
});

const UserTable: FunctionComponent<UserTableProps> = ({userTypeId}) => {
	const [params, setParams] = useState<UserCollectionParams>({
		page: 1,
		limit: 10,
	});

	const [data, setData] = useState<UserCollectionResponse>();
	const [isShowToast, setIsShowToast] = useState<boolean>(false);
	const [toastStatus, setToastStatus] = useState<boolean>();
	const [toastMessage, setToastMessage] = useState<string>();
	const [selectedUser, setSelectedUser] = useState<User>();
	const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
	const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
	const [searchBy, setSearchBy] = useState<string>();
	const timeoutRef = useRef<NodeJS.Timeout>();

	const {control, handleSubmit, resetField, setValue} = useForm({
		values: {
			search: "",
		},
		resolver: yupResolver(schema),
	});

	const fetchData = useCallback(async (params: UserCollectionParams) => {
		try {
			const res: AxiosResponse<UserCollectionResponse> =
				await axiosInstance.get("/api/user", {
					params,
				});

			setData(res.data);
		} catch (error) {
			if (error) {
				setData(undefined);
			}
		}
	}, []);

	const onSubmit = useCallback(
		(data: yup.InferType<typeof schema>) => {
			const newParams = {...params, search: data?.search};
			setParams(newParams);
		},
		[params],
	);

	const handlePageClick = useCallback(
		(event: {selected: number}) => {
			const newParams = {...params, page: event.selected + 1};
			setParams(newParams);

			fetchData(newParams);
		},
		[fetchData, params],
	);

	const pageCount = useMemo(() => {
		const total = data?.data.recordsFiltered || 0;
		return Math.ceil(total / 10);
	}, [data?.data.recordsFiltered]);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			fetchData(params);
		}, 1000);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const tableNumber = useMemo(() => {
		const numberOfTable: number = params?.page * 10 - 10;

		return numberOfTable;
	}, [params?.page]);

	const isEditable = useCallback((data: User) => {
		return data.editable;
	}, []);

	const handleForward = useCallback(() => {
		const newParams = {...params, page: pageCount};
		setParams(newParams);
	}, [pageCount, params]);

	const handleBackward = useCallback(() => {
		const newParams = {...params, page: 1};
		setParams(newParams);
	}, [params]);

	const clearFilter = useCallback(() => {
		const resetParams: UserCollectionParams = {
			page: 1,
			limit: 10,
		};
		setSearchBy(undefined);
		resetField("search");
		setValue("search", "");
		setParams(resetParams);
	}, [resetField, setValue]);

	const handleFilter = useCallback(
		(filterName: string) => {
			const newParams: UserCollectionParams = {...params};
			if (!Object.keys(newParams).length) {
				return;
			}
			if (!Object.keys(newParams).includes("userTypeId")) {
				setParams({...newParams, userTypeId: filterName, page: 1});
				return;
			}
			let userTypeIdList = newParams.userTypeId?.split(",");

			if (userTypeIdList?.includes(filterName)) {
				userTypeIdList = userTypeIdList.filter((item) => item !== filterName);
			} else {
				userTypeIdList?.push(filterName);
			}

			Object.assign(newParams, {
				userTypeId: userTypeIdList?.join(","),
				page: 1,
			});

			setParams({...newParams, userTypeId: userTypeIdList?.join(","), page: 1});
		},
		[params],
	);

	useEffect(() => {
		if (!isShowToast) {
			return;
		}

		const timeoutId = setTimeout(() => {
			setIsShowToast(false);
		}, 3000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [isShowToast]);

	const onChangeSearchInput = useCallback(
		(val: string) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			const newParams: UserCollectionParams = {...params, search: val};
			timeoutRef.current = setTimeout(() => {
				fetchData(newParams);
			}, 1000);
		},
		[fetchData, params],
	);

	return (
		<Card className="flex flex-col gap-6">
			<form
				action=""
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<div className="flex justify-between items-center">
					<PageTitle>Tabel User</PageTitle>
					{userTypeId && userTypeId !== "VIEWER" ? (
						<ModalAddUser
							userTypeId={userTypeId}
							onSuccess={async () => {
								setToastStatus(true);
								setIsShowToast(true);
								setToastMessage("User berhasil dibuat.");
								await fetchData({
									...params,
									page: 1,
									search: undefined,
									userId: undefined,
									sortBy: undefined,
								});
							}}
							onError={(error) => {
								const errorMessage = new Error(error as any).message;
								setToastStatus(false);
								setIsShowToast(true);
								setToastMessage(errorMessage);
							}}
						/>
					) : (
						false
					)}
				</div>

				<div className="flex justify-between items-center">
					<Controller
						control={control}
						name="search"
						render={({field: {onChange, ...attrs}}) => (
							<FormGroup className="mb-0">
								<FormIcon iconPosition="right">
									<Input
										placeholder="Username/Nama/Email"
										className="w-[25.875rem] pl-10"
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											onChange(e);
											onChangeSearchInput(e.currentTarget.value);
										}}
										{...attrs}
									/>
									<i className="fa-solid fa-search icon pointer-events-none left-3"></i>
									{attrs?.value ? (
										<button
											className="icon"
											id="btn-clear-search"
											data-testid="btn-clear-search"
											type="button"
											onClick={clearFilter}
										>
											<i className="fa-solid fa-circle-xmark text-light-40"></i>
										</button>
									) : (
										false
									)}
								</FormIcon>
							</FormGroup>
						)}
					/>
				</div>
			</form>

			<div className="flex gap-4 items-center">
				<Label className="mb-0">Filter </Label>
				<button
					className={"checkbox-filter".concat(
						params?.userTypeId &&
							params?.userTypeId?.split(",").includes("SUPER_ADMIN")
							? " active"
							: "",
					)}
					onClick={() => handleFilter("SUPER_ADMIN")}
				>
					<span>Super Admin</span>
				</button>
				<button
					className={"checkbox-filter".concat(
						params?.userTypeId &&
							params?.userTypeId?.split(",").includes("ADMIN")
							? " active"
							: "",
					)}
					onClick={() => handleFilter("ADMIN")}
				>
					<span>Admin</span>
				</button>
				<button
					className={"checkbox-filter".concat(
						params?.userTypeId &&
							params?.userTypeId?.split(",").includes("VIEWER")
							? " active"
							: "",
					)}
					onClick={() => handleFilter("VIEWER")}
				>
					<span>Viewer</span>
				</button>
			</div>

			<TableContainer>
				<Table>
					<thead>
						<tr>
							<th>No</th>
							<th>Username</th>
							<th>Nama</th>
							<th>Email Kantor</th>
							<th>Tipe User</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{data !== undefined ? (
							data?.data.data.map((item, index) => (
								<tr key={index}>
									<td>{tableNumber + (index + 1)}</td>
									<td>{item.username}</td>
									<td>{item.name}</td>
									<td>{item.email}</td>
									<td>{item.userTypeId}</td>
									<td className="flex gap-1">
										<Button
											id="show-edit-modal-btn"
											data-testid="show-edit-modal-btn"
											onClick={
												isEditable(item)
													? () => {
															setSelectedUser(item);
															setIsShowEditModal(true);
													  }
													: undefined
											}
											transparent
											disabled={!isEditable(item)}
										>
											<i
												className={"fa-regular fa-pen-to-square".concat(
													isEditable(item) ? "" : " text-light-50",
												)}
											></i>
										</Button>
										<Button
											id="show-delete-modal-btn"
											data-testid="show-delete-modal-btn"
											onClick={
												isEditable(item)
													? () => {
															setSelectedUser(item);
															setIsShowDeleteModal(true);
													  }
													: undefined
											}
											transparent
											disabled={!isEditable(item)}
										>
											<i
												className={"fas fa-trash-alt".concat(
													isEditable(item) ? " text-red-80" : " text-light-50",
												)}
											></i>
										</Button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td className="!text-center" colSpan={6}>
									Tidak Ada Data
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</TableContainer>
			<Pagination
				page={params?.page}
				pageCount={pageCount}
				onPageChange={handlePageClick}
				forward={handleForward}
				backward={handleBackward}
			/>

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

			<ModalEditUser
				userTypeId={userTypeId}
				isShow={isShowEditModal}
				handleClose={() => setIsShowEditModal(false)}
				userData={selectedUser}
				onSuccess={async () => {
					setToastStatus(true);
					setIsShowToast(true);
					setToastMessage("User berhasil diubah.");
					await fetchData({
						...params,
						page: 1,
						search: undefined,
						userId: undefined,
						sortBy: undefined,
					});
				}}
				onError={(error) => {
					const errorMessage = new Error(error as any).message;
					setToastStatus(false);
					setIsShowToast(true);
					setToastMessage(errorMessage);
					setIsShowEditModal(false);
				}}
			/>

			<ModalDeleteUser
				isShow={isShowDeleteModal}
				handleClose={() => setIsShowDeleteModal(false)}
				userData={selectedUser}
				onSuccess={async () => {
					setToastStatus(true);
					setIsShowToast(true);
					setToastMessage("User berhasil dihapus.");
					await fetchData({
						...params,
						page: 1,
						search: undefined,
						userId: undefined,
						sortBy: undefined,
					});
				}}
				onError={(error) => {
					const errorMessage = new Error(error as any).message;
					setToastStatus(false);
					setIsShowToast(true);
					setToastMessage(errorMessage);
					setIsShowDeleteModal(false);
				}}
			/>
		</Card>
	);
};

export default UserTable;
