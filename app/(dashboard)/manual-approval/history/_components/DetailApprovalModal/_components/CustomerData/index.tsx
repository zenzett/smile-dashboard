import dayjs from "dayjs";
import React, {FunctionComponent, useMemo} from "react";

import {ManualHistoryApprovalDetail} from "@/types/ManualHistoryApprovalDetail";

interface CustomerDataProps {
	data?: ManualHistoryApprovalDetail;
}

const CustomerData: FunctionComponent<CustomerDataProps> = ({data}) => {
	const useDataProperty = (propertyName: string | number | undefined) =>
		useMemo(() => {
			if (!propertyName) {
				return "-";
			}
			return propertyName;
		}, [propertyName]);

	const placeDateOfBirth = useMemo(() => {
		if (!data?.birthPlace || !data?.dob) {
			return "-";
		}
		return `${data?.birthPlace}, ${dayjs(data?.dob).format("DD MMM YYYY")}`;
	}, [data?.birthPlace, data?.dob]);

	return (
		<div className="flex flex-col gap-4">
			<span className="font-semibold text-base">Data Nasabah</span>
			<div className="flex w-full gap-4">
				<div className="flex flex-col w-full gap-3">
					<div className="flex">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							NIK
						</span>
						<span
							id="value-nik"
							data-testid="value-nik"
							className="w-2/3 font-semibold text-base"
						>
							: {useDataProperty(data?.idNo)}
						</span>
					</div>
					<div className="flex">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							Nama Lengkap
						</span>
						<span
							id="value-fullname"
							data-testid="value-fullname"
							className="w-2/3 font-semibold text-base capitalize"
						>
							: {useDataProperty(data?.name)}
						</span>
					</div>
					<div className="flex">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							Jenis Kelamin
						</span>
						<span
							id="value-gender"
							data-testid="value-gender"
							className="w-2/3 font-semibold text-base capitalize"
						>
							: {useDataProperty(data?.gender)}
						</span>
					</div>
					<div className="flex">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							Tempat, Tgl Lahir
						</span>
						<span
							id="value-birthdate"
							data-testid="value-birthdate"
							className="w-2/3 font-semibold text-base capitalize"
						>
							: {placeDateOfBirth}
						</span>
					</div>
					<div className="flex">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							Agama
						</span>
						<span
							id="value-religion"
							data-testid="value-religion"
							className="w-2/3 font-semibold text-base capitalize"
						>
							: {useDataProperty(data?.religion)}
						</span>
					</div>
				</div>
				<div className="flex flex-col w-full gap-3">
					<div className="flex">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							Status Perkawinan
						</span>
						<span
							id="value-marital-status"
							data-testid="value-marital-status"
							className="w-2/3 font-semibold text-base capitalize"
						>
							: {useDataProperty(data?.maritalStatus)}
						</span>
					</div>
					<div className="flex">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							Pekerjaan
						</span>
						<span
							id="value-occupation"
							data-testid="value-occupation"
							className="w-2/3 font-semibold text-base capitalize"
						>
							: {useDataProperty(data?.job)}
						</span>
					</div>
					<div className="flex">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							Alamat KTP
						</span>
						<span
							id="value-id-address"
							data-testid="value-id-address"
							className="w-2/3 font-semibold text-base capitalize"
						>
							: {useDataProperty(data?.address)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomerData;
