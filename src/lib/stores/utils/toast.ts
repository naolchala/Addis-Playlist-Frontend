import { colorSchemes } from "$config/Theme/colors";
import { useAppDispatch } from "$stores/hooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastProps {
	colorScheme?: keyof typeof colorSchemes;
	id: number;
	title?: string;
	desc?: string;
	duration?: number;
}

export interface ToastState {
	counter: number;
	toasts: ToastProps[];
}

const initialToastState: ToastState = {
	counter: 0,
	toasts: [],
};

const ToastSlice = createSlice({
	name: "toast",
	initialState: initialToastState,
	reducers: {
		addToast(state, action: PayloadAction<Omit<ToastProps, "id">>) {
			let newToast: ToastProps = { ...action.payload, id: state.counter };
			state.toasts.push(newToast);
			state.counter++;
		},
		removeToast(state, action: PayloadAction<ToastProps>) {
			state.toasts = state.toasts.filter(
				(t) => t.id != action.payload.id
			);
		},
	},
});

export const useToast = () => {
	const dispatch = useAppDispatch();
	const createToast = (toast: Omit<ToastProps, "id">) => {
		dispatch(addToast(toast));
	};
	return createToast;
};

export const { addToast, removeToast } = ToastSlice.actions;
export default ToastSlice.reducer;
