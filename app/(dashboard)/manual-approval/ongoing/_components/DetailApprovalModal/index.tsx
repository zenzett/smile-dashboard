"use client";

import {AxiosResponse} from "axios";
import React, {
	FunctionComponent,
	useCallback,
	useEffect,
	useState,
} from "react";

import Button from "@/components/atoms/Button";
import ImageContainer from "@/components/molecules/ImageContainer";
import Modal from "@/components/molecules/Modal";
import axiosInstance from "@/config/client/axios";
import {ManualOngoingApprovalDetailResponse} from "@/types/ManualOngoingApprovalDetailResponse";

import ZoomImageModal from "../ZoomImageModal";
import CustomerData from "./_components/CustomerData";
import LivenessStatusFrame from "./_components/LivenessStatusFrame";

type DetailApprovalProps = {
	handleSubmit: (status: "APPROVED" | "REJECTED") => void;
	handleClose: () => void;
	selectedApproval?: string;
	isShow: boolean;
};

const DetailApproval: FunctionComponent<DetailApprovalProps> = ({
	selectedApproval,
	handleSubmit,
	handleClose,
	isShow,
}) => {
	const [data, setData] = useState<ManualOngoingApprovalDetailResponse>();

	const [isShowZoomKtpImageModal, setIsShowZoomKtpImageModal] =
		useState<boolean>(false);
	const [isShowZoomSelfieImageModal, setIsShowZoomSelfieImageModal] =
		useState<boolean>(false);

	const fetchDetail = useCallback(async () => {
		try {
			const res: AxiosResponse<ManualOngoingApprovalDetailResponse> =
				await axiosInstance.get(
					`/api/manual-approval/ongoing/${selectedApproval}`,
				);
			setData(res.data);
		} catch (error) {
			if (error) {
				setData(undefined);
			}
		}
	}, [selectedApproval]);

	useEffect(() => {
		if (isShow) {
			fetchDetail();
		}
		if (!isShow) {
			setData(undefined);
		}
	}, [fetchDetail, isShow]);

	return (
		<>
			<Modal
				id="modal-detail-form"
				data-testid="modal-detail-form"
				isShow={isShow}
				className="w-[822px]"
				onClickBackground={handleClose}
			>
				<Modal.Header
					id="modal-detail-header"
					data-testid="modal-detail-header"
					dismissable
					handleClose={handleClose}
				>
					Detail Data Pengajuan
				</Modal.Header>
				<Modal.Body id="modal-detail-body" data-testid="modal-detail-body">
					<div className="flex flex-col bg-light-10 p-4 rounded-2xl gap-2.5">
						<span className="font-semibold text-base">
							Detail Pengajuan Nasabah
						</span>
						<div className="flex gap-4">
							<div className="w-full flex flex-col gap-3">
								<span className="font-semibold text-base">Foto KTP</span>
								<ImageContainer
									id="image-ktp"
									data-testid="ktp"
									src={data?.data.ktpPath}
									alt="KTP Image"
									onClick={() => setIsShowZoomKtpImageModal(true)}
								/>
							</div>
							<div className="w-full flex flex-col gap-3">
								<span className="font-semibold text-base">Foto Selfie</span>
								<ImageContainer
									id="image-selfie"
									data-testid="selfie"
									src={data?.data.selfiePath}
									alt="Selfie Image"
									onClick={() => setIsShowZoomSelfieImageModal(true)}
								/>
							</div>
						</div>
						<LivenessStatusFrame
							livenessScore={data?.data.livenessScore}
							frStatus={data?.data.faceCompareStatus}
						/>
						<CustomerData data={data?.data} />
					</div>
				</Modal.Body>
				<Modal.Footer
					id="modal-detail-footer"
					data-testid="modal-detail-footer"
				>
					<div className="flex items-center justify-between gap-5 px-4">
						<Button
							size="lg"
							variant="danger-outline"
							className="w-[361px]"
							onClick={() => handleSubmit("REJECTED")}
						>
							Reject
						</Button>
						<Button
							size="lg"
							variant="primary"
							className="w-[361px]"
							onClick={() => handleSubmit("APPROVED")}
						>
							Approve
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			<ZoomImageModal
				isShow={isShowZoomKtpImageModal}
				imageToggle={() => setIsShowZoomKtpImageModal(false)}
				src={data?.data.ktpPath}
				alt={""}
			/>
			<ZoomImageModal
				isShow={isShowZoomSelfieImageModal}
				imageToggle={() => setIsShowZoomSelfieImageModal(false)}
				src={data?.data.selfiePath}
				alt={""}
			/>
		</>
	);
};

export default DetailApproval;
