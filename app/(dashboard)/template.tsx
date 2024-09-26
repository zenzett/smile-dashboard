export const dynamic = "auto";

import {cookies} from "next/headers";
import {Fragment, FunctionComponent} from "react";

import Navbar from "@/components/molecules/Navbar";
import {UserTypeID} from "@/types/UserTypeID";

import ClientSidebarMenu from "./_components/ClientSidebarMenu";
import {getProfile} from "./_utils/profile";

interface AdminTemplateProps {
	children: React.ReactNode;
}

const AdminTemplate: FunctionComponent<AdminTemplateProps> = async ({
	children,
}) => {
	const cookieStore = cookies();
	const TOKEN = cookieStore.get("TOKEN")?.value;
	const name = cookieStore.get("NAME")?.value;

	let profile = await getProfile();

	const userTypeId: UserTypeID = profile?.userTypeId || "VIEWER";

	return (
		<Fragment>
			<Navbar isLoggedIn={!!TOKEN} name={name} />
			<div className="wrapper">
				<div className="inner-wrapper">
					<div className="py-4">
						<ClientSidebarMenu userTypeId={userTypeId} />
					</div>
					<div className="w-full p-4">{children}</div>
				</div>
			</div>
		</Fragment>
	);
};

export default AdminTemplate;
