"use client";

import axios, {AxiosError} from "axios";
import React, {FunctionComponent, HTMLAttributes, useState} from "react";

import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import axiosInstance from "@/config/client/axios";
import {ApiResponse} from "@/types/ApiResponse";
import {User} from "@/types/User";

type Props = HTMLAttributes<HTMLDivElement> & {
	isShow: boolean;
	handleClose: () => void;
	onSuccess: () => Promise<void>;
	onError: (error: unknown) => void;
	userData?: User;
};

const ModalDeleteUser: FunctionComponent<Props> = ({
	isShow,
	handleClose,
	userData,
	onSuccess,
	onError,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleDeleteUser = async () => {
		try {
			setIsLoading(true);
			if (!userData?.id) {
				throw new Error("Can not delete user with id undefined.");
			}
			await axiosInstance.delete(`/api/user/${userData?.id}`);
			handleClose();
			await onSuccess();
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			if (axios.isAxiosError(error)) {
				const errorData: AxiosError<ApiResponse> = error;
				const responseDescription =
					errorData.response?.data.responseDescription;

				switch (responseDescription) {
					case "FORBIDDEN":
						onError("Maaf Anda tidak dapat menghapus user ini");
						break;
					default:
						onError(error);
				}
			}
		}
	};

	return (
		<Modal
			id="modal-delete"
			data-testid="modal-delete"
			isShow={isShow}
			className="w-[482px]"
			onClickBackground={handleClose}
		>
			<Modal.Header
				id="modal-delete-header"
				data-testid="modal-delete-header"
				dismissable
				handleClose={handleClose}
				className="text-center"
			>
				Hapus User
			</Modal.Header>
			<Modal.Body
				id="modal-delete-body"
				data-testid="modal-delete-body"
				className="text-center font-semibold"
			>
				Apakah Anda yakin akan menghapus data user ini?
			</Modal.Body>
			<Modal.Footer
				id="modal-delete-footer"
				data-testid="modal-delete-footer"
				className="flex gap-2"
			>
				<Button
					id="cancel-modal-delete-btn"
					data-testid="cancel-modal-delete-btn"
					size="lg"
					type="button"
					transparent
					className="w-full"
					onClick={handleClose}
				>
					Tidak
				</Button>
				<Button
					id="submit-modal-delete-btn"
					data-testid="submit-modal-delete-btn"
					size="lg"
					variant="danger"
					className="w-full"
					onClick={handleDeleteUser}
					disabled={isLoading}
				>
					Ya, Hapus
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalDeleteUser;
