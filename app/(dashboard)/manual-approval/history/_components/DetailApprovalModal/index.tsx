"use client";

import {AxiosResponse} from "axios";
import React, {
	FunctionComponent,
	useCallback,
	useEffect,
	useState,
} from "react";

import ImageContainer from "@/components/molecules/ImageContainer";
import LoadingSpinner from "@/components/molecules/LoadingSpinner";
import Modal from "@/components/molecules/Modal";
import axiosInstance from "@/config/client/axios";
import {ManualHistoryApprovalDetailResponse} from "@/types/ManualHistoryApprovalDetailResponse";

import ZoomImageModal from "../ZoomImageModal";
import ApprovalDetail from "./_components/ApprovalDetail";
import CustomerData from "./_components/CustomerData";
import LivenessStatusFrame from "./_components/LivenessStatusFrame";

type DetailApplicationProps = {
	selectedApplication?: string;
	handleClose: () => void;
	isShow: boolean;
};

const DetailApplication: FunctionComponent<DetailApplicationProps> = ({
	selectedApplication,
	handleClose,
	isShow,
}) => {
	const [data, setData] = useState<ManualHistoryApprovalDetailResponse>();

	const [isShowZoomKtpImageModal, setIsShowZoomKtpImageModal] =
		useState<boolean>(false);
	const [isShowZoomSelfieImageModal, setIsShowZoomSelfieImageModal] =
		useState<boolean>(false);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchDetail = useCallback(async () => {
		try {
			setIsLoading(true);
			const res: AxiosResponse<ManualHistoryApprovalDetailResponse> =
				await axiosInstance.get(
					`/api/manual-approval/history/${selectedApplication}`,
				);
			setData(res.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			if (error) {
				setData(undefined);
			}
		}
	}, [selectedApplication]);

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
					<div className="flex flex-col bg-light-10 p-4 rounded-2xl gap-4">
						<ApprovalDetail data={data?.data} />
						<span className="font-semibold text-base">
							Detail Pengajuan Nasabah
						</span>
						<div className="flex gap-4">
							<div className="w-full flex flex-col gap-3">
								<span className="font-semibold text-base">Foto KTP</span>
								<ImageContainer
									id="image-ktp"
									data-testid="ktp"
									src={data?.data?.ktpPath}
									alt="KTP Image"
									onClick={() => setIsShowZoomKtpImageModal(true)}
								/>
							</div>
							<div className="w-full flex flex-col gap-3">
								<span className="font-semibold text-base">Foto Selfie</span>
								<ImageContainer
									id="image-selfie"
									data-testid="selfie"
									src={data?.data?.selfiePath}
									alt="Selfie Image"
									onClick={() => setIsShowZoomSelfieImageModal(true)}
								/>
							</div>
						</div>
						<LivenessStatusFrame
							livenessScore={data?.data?.livenessScore}
							frStatus={data?.data?.faceCompareStatus}
						/>
						<CustomerData data={data?.data} />
					</div>
				</Modal.Body>
			</Modal>

			<ZoomImageModal
				isShow={isShowZoomKtpImageModal}
				imageToggle={() => setIsShowZoomKtpImageModal(false)}
				src={data?.data?.ktpPath}
				alt={""}
			/>
			<ZoomImageModal
				isShow={isShowZoomSelfieImageModal}
				imageToggle={() => setIsShowZoomSelfieImageModal(false)}
				src={data?.data?.selfiePath}
				alt={""}
			/>

			<LoadingSpinner isShow={isLoading} />
		</>
	);
};

export default DetailApplication;
