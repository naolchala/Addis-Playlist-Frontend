import { useAppSelector } from "$stores/hooks";
import { Toast } from "./Toast";
import { ToastListContainer } from "./Toast.style";

export const ToastProvider = () => {
	const toastState = useAppSelector((state) => state.toast);
	return (
		<ToastListContainer>
			{toastState.toasts.map((toast) => (
				<Toast {...toast} />
			))}
		</ToastListContainer>
	);
};
