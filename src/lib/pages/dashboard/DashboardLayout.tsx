import { Background, DashboardBackground } from "$components/Background";
import {
	DashboardContainer,
	DashboardOutletContainer,
	DashboardSideNav,
	SideNavItem,
	SideNavTitle,
} from "$components/styles/DashboardStyles";
import { Spacer } from "$components/styles/RegisterStyles";
import {
	BiAddToQueue,
	BiGlobe,
	BiGlobeAlt,
	BiHomeAlt,
	BiShareAlt,
	BiUser,
	BiWorld,
} from "react-icons/bi";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
	return (
		<DashboardBackground>
			<DashboardContainer>
				<DashboardSideNav>
					<SideNavTitle>
						<div>Addis</div>
						<div>Playlist</div>
					</SideNavTitle>
					<SideNavItem
						to={"/dashboard/"}
						label="Home"
						icon={<BiHomeAlt />}
					/>
					<SideNavItem
						to={"/dashboard/create-playlist"}
						label="Create Playlist"
						icon={<BiAddToQueue />}
					/>
					<SideNavItem
						to={"/dashboard/shared"}
						label="Shared with me"
						icon={<BiShareAlt />}
					/>
					<SideNavItem
						to={"/dashboard/public"}
						label="Public Playlists"
						icon={<BiWorld />}
					/>
					<Spacer />

					<SideNavItem
						to={"/dashboard/create"}
						label="profile"
						icon={<BiUser />}
					/>
				</DashboardSideNav>
				<DashboardOutletContainer>
					<Outlet></Outlet>
				</DashboardOutletContainer>
			</DashboardContainer>
		</DashboardBackground>
	);
};
