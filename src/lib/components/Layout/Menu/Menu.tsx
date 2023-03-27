import { FC, ReactNode } from "react";
import { MenuContainer } from "./Menu.styles";

interface IMenu {
	isOpen: boolean;
	children: ReactNode;
	menuContent: ReactNode;
}
export const Menu: FC<IMenu> = ({ children, isOpen, menuContent }) => {
	return (
		<MenuContainer>
			{children}
			{isOpen && menuContent}
		</MenuContainer>
	);
};
