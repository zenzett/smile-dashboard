import {useReducer} from "react";

interface SelectedItemState {
	selectedName: string;
	selectedApplication: string;
}

export enum SelectedItemActionType {
	SET_SELECTED_NAME = "SET_SELECTED_NAME",
	SET_SELECTED_APPLICATION = "SET_SELECTED_APPLICATION",
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
		case SelectedItemActionType.SET_SELECTED_NAME:
			return {
				...state,
				selectedName: payload,
			};
		case SelectedItemActionType.SET_SELECTED_APPLICATION:
			return {
				...state,
				selectedApplication: payload,
			};
		default:
			return state;
	}
};

const initialState: SelectedItemState = {
	selectedName: "",
	selectedApplication: "",
};

export const useSelectedItemState = () => {
	const [selectedItemState, selectedItemDispatch] = useReducer(
		selectedItemReducer,
		initialState,
	);

	return {selectedItemState, selectedItemDispatch};
};
