import React, {FunctionComponent, useCallback, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Dropdown from "@/components/molecules/Dropdown";
import Modal from "@/components/molecules/Modal";
import axiosInstance from "@/config/client/axios";
import {ApprovalActionPayload} from "@/types/ApprovalActionPayload";
import {yupResolver} from "@hookform/resolvers/yup";

import {useRejectReason} from "./_hooks/useRejectReason";

const schema = yup.object({
	reason: yup
		.string()
		.required("Alasan harus diisi.")
		.max(256, "Alasan maksimal 256 karakter.")
		.matches(/^(?!\s*$).+/, "Alasan tidak boleh hanya terdiri dari spasi."),
});

type ReasonApprovalModalProps = {
	onError: (error?: unknown) => void;
	handleCancel: () => void;
	handleClose: () => void;
	onSuccess?: (success?: string) => void;
	status?: "APPROVED" | "REJECTED";
	selectedApproval: string;
	isShow: boolean;
};

const ReasonApprovalModal: FunctionComponent<ReasonApprovalModalProps> = ({
	selectedApproval,
	handleCancel,
	handleClose,
	onSuccess,
	onError,
	status,
	isShow,
}) => {
	const {
		formState: {isValid},
		handleSubmit,
		setValue,
		control,
		watch,
	} = useForm({
		defaultValues: {
			reason: "",
		},
		resolver: yupResolver(schema),
		mode: "all",
		shouldUnregister: true,
	});

	const watchFields = watch();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [rejectReasonStatus, setRejectReasonStatus] = useState<string>("");

	const [selectedMenu, setSelectedMenu] = useState<string>("");

	const rejectReason = useRejectReason({
		config: {
			onSuccess: (response, key) => {},
			onError: () => {},
		},
	});

	const dropdownMenuList = useMemo(() => {
		if (
			rejectReason !== undefined &&
			rejectReason?.data?.data?.data?.data?.length !== 0
		) {
			const filteredData = rejectReason?.data?.data?.data?.data?.map(
				(reason) => ({
					label: reason.description,
					onClick: () => {
						setRejectReasonStatus(reason.id);
						setSelectedMenu(reason.description);
						setValue("reason", reason.description, {shouldValidate: true});
					},
				}),
			);

			return filteredData ?? [];
		}
		return [];
	}, [rejectReason, setValue]);

	const handleApprovalAction = useCallback(
		async (data: yup.InferType<typeof schema>) => {
			try {
				setIsLoading(true);
				const payload: ApprovalActionPayload = {
					...data,
					id: selectedApproval,
					status: status === "APPROVED" ? status : rejectReasonStatus,
					reason: data?.reason,
				};
				await axiosInstance.post("/api/manual-approval/action", payload);
				handleClose();
				setIsLoading(false);
				if (onSuccess && status === "APPROVED") {
					onSuccess("Pengajuan berhasil diapprove.");
				}
				if (onSuccess && status === "REJECTED") {
					onSuccess("Pengajuan berhasil direject.");
				}
			} catch (error) {
				handleClose();
				setIsLoading(false);
				if (status === "APPROVED") {
					onError("Pengajuan gagal diapprove. Silakan coba lagi!");
				}
				if (status === "REJECTED") {
					onError("Pengajuan gagal direject. Silakan coba lagi!");
				}
			}
		},
		[
			handleClose,
			onError,
			onSuccess,
			rejectReasonStatus,
			selectedApproval,
			status,
		],
	);

	const submitForm = async (data: yup.InferType<typeof schema>) => {
		await handleApprovalAction(data);
		setRejectReasonStatus("");
		setSelectedMenu("");
		setValue("reason", "", {shouldValidate: true});
	};

	const cancelForm = useCallback(() => {
		handleCancel();
		setRejectReasonStatus("");
		setSelectedMenu("");
		setValue("reason", "", {shouldValidate: true});
	}, [handleCancel, setValue]);

	const closeHandler = useCallback(() => {
		handleClose();
		setRejectReasonStatus("");
		setSelectedMenu("");
		setValue("reason", "", {shouldValidate: true});
	}, [handleClose, setValue]);

	return (
		<Modal
			id="modal-reason-form"
			data-testid="modal-reason-form"
			isShow={isShow}
			className="w-[482px]"
			containerClassName="z-20"
			onClickBackground={closeHandler}
		>
			<form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
				<Modal.Header
					id="modal-reason-header"
					data-testid="modal-reason-header"
					className="text-center"
					dismissable
					handleClose={closeHandler}
				>
					Alasan
				</Modal.Header>
				<Modal.Body id="modal-reason-body" data-testid="modal-reason-body">
					<div>
						{status === "APPROVED" ? (
							<Controller
								control={control}
								name="reason"
								render={({field, fieldState: {error}}) => (
									<FormGroup className="flex flex-col gap-2">
										<Label
											htmlFor="format-file"
											aria-label="Format File Label"
											data-testid="label-formatfile"
										>
											Silakan sertakan alasan pengajuan ini diapprove :
										</Label>
										<div className="flex flex-col gap-1.5">
											<Input
												id="username"
												data-testid="username"
												placeholder="Alasan (Wajib Diisi)"
												maxLength={256}
												{...field}
											/>
											<span className="flex justify-end text-light-60 text-xs font-medium">
												{watchFields?.reason?.length}/256
											</span>
										</div>
									</FormGroup>
								)}
							/>
						) : (
							<FormGroup className="flex flex-col gap-2">
								<Label
									htmlFor="format-file"
									aria-label="Format File Label"
									data-testid="label-formatfile"
								>
									Silakan sertakan alasan pengajuan ini direject :
								</Label>
								<div className="mb-8">
									<Dropdown
										id="dropdown-reason"
										data-testid="dropdown-reason"
										placeholder="Alasan"
										label={selectedMenu}
										menus={dropdownMenuList}
										isLoading={
											rejectReason.isLoading && rejectReason.isValidating
										}
										disabledToggler={
											rejectReason.isLoading && rejectReason.isValidating
										}
									/>
								</div>
							</FormGroup>
						)}
						<div className="flex items-center gap-2.5">
							<Button
								type="button"
								size="lg"
								transparent
								id="submit-modal-reason-btn"
								data-testid="submit-modal-reason-btn"
								className="w-full"
								onClick={() => cancelForm()}
								disabled={isLoading}
							>
								Batal
							</Button>
							{status === "APPROVED" ? (
								<Button
									type="submit"
									size="lg"
									id="submit-modal-reason-btn"
									data-testid="submit-modal-reason-btn"
									className="w-full"
									isLoading={isLoading}
									disabled={!isValid || isLoading}
								>
									Approve
								</Button>
							) : (
								<Button
									type="submit"
									size="lg"
									variant="danger"
									id="submit-modal-reason-btn"
									data-testid="submit-modal-reason-btn"
									className="w-full"
									isLoading={isLoading}
									disabled={!isValid || isLoading}
								>
									Reject
								</Button>
							)}
						</div>
					</div>
				</Modal.Body>
			</form>
		</Modal>
	);
};

export default ReasonApprovalModal;
