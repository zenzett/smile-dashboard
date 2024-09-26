import {useReducer} from "react";

interface ModalState {
	isShowDetailModal: boolean;
	isShowReasonModal: boolean;
}

export enum ModalActionType {
	SET_IS_SHOW_DETAIL_MODAL = "SET_IS_SHOW_DETAIL_MODAL",
	SET_IS_SHOW_REASON_MODAL = "SET_IS_SHOW_REASON_MODAL",
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
		case ModalActionType.SET_IS_SHOW_REASON_MODAL:
			return {
				...state,
				isShowReasonModal: payload,
			};
		default:
			return state;
	}
};

const initialState: ModalState = {
	isShowDetailModal: false,
	isShowReasonModal: false,
};

export const useModalState = () => {
	const [modalState, modalDispatch] = useReducer(modalReducer, initialState);

	return {modalState, modalDispatch};
};
