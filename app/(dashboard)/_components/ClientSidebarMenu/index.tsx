"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {FunctionComponent, useMemo} from "react";

import Sidebar from "@/components/molecules/Sidebar";
import SidebarMenu from "@/components/molecules/SidebarMenu";
import SidebarSubMenu from "@/components/molecules/SidebarSubMenu";
import {UserTypeID} from "@/types/UserTypeID";

import HistoryApprovalIcon from "./_components/HistoryApprovalIcon";
import ManualApprovalIcon from "./_components/ManualApprovalIcon";
import OngoingApprovalIcon from "./_components/OngoingApprovalIcon";

type ClientSidebarProps = {
	userTypeId: UserTypeID;
};
const ClientSidebarMenu: FunctionComponent<ClientSidebarProps> = ({
	userTypeId,
}) => {
	const pathname = usePathname();

	const toggleApproval = useMemo(() => {
		if (pathname.includes("/manual-approval")) {
			return true;
		} else {
			return false;
		}
	}, [pathname]);

	const userType = useMemo(() => {
		switch (userTypeId) {
			case "SUPER_ADMIN":
				return true;
			case "ADMIN":
				return true;
			default:
				return false;
		}
	}, [userTypeId]);

	return (
		<Sidebar>
			<Link href="/">
				<SidebarMenu isActive={pathname === "/application"}>
					<i className="fa-solid fa-file"></i>
					<span>Pengajuan Simpedes UMi</span>
				</SidebarMenu>
			</Link>
			{userType ? (
				<>
					<Link href="/admin">
						<SidebarMenu isActive={pathname === "/admin"}>
							<i className="fa-solid fa-user-group"></i>
							<span>Tabel User</span>
						</SidebarMenu>
					</Link>
					<Link href="/manual-approval/ongoing">
						<SidebarMenu isActive={pathname.includes("/manual-approval")}>
							<div className="flex gap-2 items-center w-full">
								<ManualApprovalIcon />
								<span>Approval Manual</span>
							</div>
							{toggleApproval ? (
								<i className="fa-solid fa-chevron-up"></i>
							) : (
								<i className="fa-solid fa-chevron-down"></i>
							)}
						</SidebarMenu>
					</Link>
				</>
			) : (
				false
			)}
			{userType && toggleApproval ? (
				<>
					<Link href="/manual-approval/ongoing">
						<SidebarSubMenu isActive={pathname === "/manual-approval/ongoing"}>
							<OngoingApprovalIcon />
							<span>Ongoing Approval</span>
						</SidebarSubMenu>
					</Link>
					<Link href="/manual-approval/history">
						<SidebarSubMenu isActive={pathname === "/manual-approval/history"}>
							<HistoryApprovalIcon />
							<span>Riwayat Approval</span>
						</SidebarSubMenu>
					</Link>
				</>
			) : (
				false
			)}
		</Sidebar>
	);
};

export default ClientSidebarMenu;
