import dayjs from "dayjs";
import React, {FunctionComponent, useMemo} from "react";

import Badge from "@/components/atoms/Badge";
import {ManualHistoryApprovalDetail} from "@/types/ManualHistoryApprovalDetail";

interface ApprovalDetailProps {
	data?: ManualHistoryApprovalDetail;
}

const ApprovalDetail: FunctionComponent<ApprovalDetailProps> = ({data}) => {
	const useDataProperty = (propertyName: string | number | undefined) =>
		useMemo(() => {
			if (!propertyName) {
				return "-";
			}
			return propertyName;
		}, [propertyName]);

	const getStatusBadge = useMemo(() => {
		if (data?.status === "APPROVED") {
			return "success";
		} else {
			return "error";
		}
	}, [data?.status]);

	return (
		<div className="flex flex-col gap-4">
			<span className="font-semibold text-base">Detail Approval</span>
			<div className="flex w-full gap-4">
				<div className="flex flex-col w-full gap-3">
					<div className="flex items-center gap-1">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							Tgl / Waktu Approval
						</span>
						<span
							id="value-approval-date"
							data-testid="value-approval-date"
							className="w-2/3 font-semibold text-base"
						>
							:{" "}
							{data?.createdAt
								? dayjs(data?.createdAt)?.format("DD MMM YY, HH:mm")
								: "-"}
						</span>
					</div>
					<div className="flex items-center gap-1">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							PIC Approval
						</span>
						<span
							id="value-approvedby"
							data-testid="value-approvedby"
							className="w-2/3 font-semibold text-base capitalize"
						>
							: {useDataProperty(data?.approvedBy)}
						</span>
					</div>
				</div>
				<div className="flex flex-col w-full gap-3">
					<div className="flex items-center gap-1">
						<span className="w-1/3 text-dark-10 font-semibold text-base">
							Status Approval
						</span>
						<div
							id="value-status"
							data-testid="value-status"
							className="w-2/3 font-semibold text-base flex items-center gap-2"
						>
							<span>:</span>
							{data?.status ? (
								<Badge
									size="sm"
									className="status-badge"
									status={getStatusBadge}
									text={data?.status ?? "-"}
								/>
							) : (
								<span className="text-center">-</span>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center">
				<span className="w-1/6 text-dark-10 font-semibold text-base">
					Alasan
				</span>
				<span
					id="value-reason"
					data-testid="value-reason"
					className="w-5/6 min-h-[48px] font-semibold text-base flex items-center"
				>
					:
					{data?.reason ? (
						<span
							className={"w-full rounded mx-1 ".concat(
								data?.status === "APPROVED"
									? "p-3 bg-green-10"
									: "p-3 bg-red-10",
							)}
						>
							{data?.reason}
						</span>
					) : (
						<span className="mx-1">-</span>
					)}
				</span>
			</div>
		</div>
	);
};

export default ApprovalDetail;
