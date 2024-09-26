import React, {HTMLAttributes} from "react";

import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";

type Props = {
	isShow: boolean;
	handleClose: () => void;
	handleLogout: () => void;
};

const LogoutConfirmationModal = (props: Props) => {
	const {isShow, handleClose, handleLogout} = props;

	return (
		<Modal
			isShow={isShow}
			onClickBackground={handleClose}
			className="w-[482px]"
			id="logout-confirmation-modal"
			data-testid="logout-confirmation-modal"
		>
			<Modal.Header
				dismissable
				handleClose={handleClose}
				className="flex justify-center border-none"
				id="logout-confirmation-modal-title"
				data-testid="logout-confirmation-modal-title"
			>
				Logout
			</Modal.Header>
			<Modal.Body
				className="flex justify-center border-none"
				id="logout-confirmation-modal-content"
				data-testid="logout-confirmation-modal-content"
			>
				Apakah Anda yakin akan logout dari akun?
			</Modal.Body>
			<Modal.Footer className="flex gap-4 border-none">
				<Button
					id="logout-confirmation-modal-cancel-btn"
					data-testid="logout-confirmation-modal-cancel-btn"
					className="w-1/2"
					transparent
					onClick={handleClose}
				>
					Batal
				</Button>
				<Button
					id="logout-confirmation-modal-logout-btn"
					data-testid="logout-confirmation-modal-logout-btn"
					className="w-1/2"
					variant="danger"
					onClick={handleLogout}
				>
					Ya, Logout
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default LogoutConfirmationModal;
