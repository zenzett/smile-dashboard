import {useReducer} from "react";

interface SelectedItemState {
	selectedHistoryApproval: string;
}

export enum SelectedItemActionType {
	SET_SELECTED_HISTORY_APPROVAL = "SET_SELECTED_HISTORY_APPROVAL",
}

interface SelectedItemAction<T = any> {
	type: SelectedItemActionType;
	payload: T;
}

const selectedItemReducer = (
	state: SelectedItemState,
	action: SelectedItemAction,
): SelectedItemState => {
	const {type, payload} = action;

	switch (type) {
		case SelectedItemActionType.SET_SELECTED_HISTORY_APPROVAL:
			return {
				...state,
				selectedHistoryApproval: payload,
			};
		default:
			return state;
	}
};

const initialState: SelectedItemState = {
	selectedHistoryApproval: "",
};

export const useSelectedItemState = () => {
	const [selectedItemState, selectedItemDispatch] = useReducer(
		selectedItemReducer,
		initialState,
	);

	return {selectedItemState, selectedItemDispatch};
};
