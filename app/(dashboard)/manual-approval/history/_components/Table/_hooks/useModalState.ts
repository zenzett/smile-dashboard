import {useReducer} from "react";

interface ModalState {
	isShowDetailModal: boolean;
	isShowDownloadDetailModal: boolean;
	isShowDownloadBulkModal: boolean;
}

export enum ModalActionType {
	SET_IS_SHOW_DETAIL_MODAL = "SET_IS_SHOW_DETAIL_MODAL",
	SET_IS_SHOW_DOWNLOAD_DETAIL_MODAL = "SET_IS_SHOW_DOWNLOAD_DETAIL_MODAL",
	SET_IS_SHOW_DOWNLOAD_BULK_MODAL = "SET_IS_SHOW_DOWNLOAD_BULK_MODAL",
}

interface ModalAction<T = any> {
	type: ModalActionType;
	payload: T;
}

const modalReducer = (
	state: ModalState,
	action: ModalAction<boolean>,
): ModalState => {
	const {type, payload} = action;

	switch (type) {
		case ModalActionType.SET_IS_SHOW_DETAIL_MODAL:
			return {
				...state,
				isShowDetailModal: payload,
			};
		case ModalActionType.SET_IS_SHOW_DOWNLOAD_DETAIL_MODAL:
			return {
				...state,
				isShowDownloadDetailModal: payload,
			};
		case ModalActionType.SET_IS_SHOW_DOWNLOAD_BULK_MODAL:
			return {
				...state,
				isShowDownloadBulkModal: payload,
			};
		default:
			return state;
	}
};

const initialState: ModalState = {
	isShowDetailModal: false,
	isShowDownloadDetailModal: false,
	isShowDownloadBulkModal: false,
};

export const useModalState = () => {
	const [modalState, modalDispatch] = useReducer(modalReducer, initialState);

	return {modalState, modalDispatch};
};
