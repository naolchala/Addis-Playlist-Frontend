import { useAppDispatch } from "$stores/hooks";
import { ToastProps, removeToast } from "$stores/utils/toast";
import { useEffect } from "react";
import { ToastContainer, ToastTitle, ToastDesc } from "./Toast.style";

export const Toast = (toast: ToastProps) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		setTimeout(() => {
			dispatch(removeToast(toast));
		}, toast.duration || 3000);
	}, []);

	return (
		<ToastContainer colorScheme={toast.colorScheme}>
			<ToastTitle>{toast?.title}</ToastTitle>
			<ToastDesc>{toast?.desc}</ToastDesc>
		</ToastContainer>
	);
};
