import {useReducer} from "react";

interface SelectedItemState {
	selectedOngoingApproval: string;
}

export enum SelectedItemActionType {
	SET_SELECTED_ONGOING_APPROVAL = "SET_SELECTED_ONGOING_APPROVAL",
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
		case SelectedItemActionType.SET_SELECTED_ONGOING_APPROVAL:
			return {
				...state,
				selectedOngoingApproval: payload,
			};
		default:
			return state;
	}
};

const initialState: SelectedItemState = {
	selectedOngoingApproval: "",
};

export const useSelectedItemState = () => {
	const [selectedItemState, selectedItemDispatch] = useReducer(
		selectedItemReducer,
		initialState,
	);

	return {selectedItemState, selectedItemDispatch};
};
