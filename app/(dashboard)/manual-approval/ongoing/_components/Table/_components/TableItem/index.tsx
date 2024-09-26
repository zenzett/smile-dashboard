import "./style.css";

import dayjs from "dayjs";
import React, {FunctionComponent, HTMLAttributes, useMemo} from "react";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import {ManualOngoingApproval} from "@/types/ManualOngoingApproval";
import {ManualOngoingApprovalCollectionParams} from "@/types/ManualOngoingApprovalCollectionParams";

import ApprovalMarking from "./_components/ApprovalMarking";

interface TableItemProps extends HTMLAttributes<HTMLDivElement> {
	index: number;
	item: ManualOngoingApproval;
	params: ManualOngoingApprovalCollectionParams;
	approvalMark: string | null;
	onClickDetail: () => void;
}

const TableItem: FunctionComponent<TableItemProps> = ({
	item,
	index,
	params,
	approvalMark,
	onClickDetail,
}) => {
	const tableNumber = useMemo(() => {
		const numberOfTable: number = params?.page * 10 - 10;
		return numberOfTable;
	}, [params?.page]);

	const getFrStatusBadgeStatus = useMemo(() => {
		if (item?.faceCompareStatus === "false") {
			return "error";
		} else {
			return "success";
		}
	}, [item?.faceCompareStatus]);

	const getLivenessBadgeStatus = useMemo(() => {
		if (parseInt(item?.livenessScore) > 79) {
			return "success";
		} else {
			return "pending";
		}
	}, [item?.livenessScore]);

	return (
		<tr key={index} className={approvalMark !== null ? "tr-ongoing-row" : ""}>
			<td className="td-ongoing-number">{tableNumber + (index + 1)}</td>
			<td className="td-ongoing-date">
				<div className="date-container">
					{approvalMark !== null ? (
						<ApprovalMarking label={approvalMark} />
					) : (
						false
					)}
					<span className="date-label">
						{item?.createdAt
							? dayjs(item?.createdAt).format("DD MMM YY, HH:mm")
							: "-"}
					</span>
				</div>
			</td>
			<td className="td-ongoing-customer-name">
				{item?.name ? item?.name : "-"}
			</td>
			<td className="td-ongoing-nik">{item?.idNo ? item?.idNo : "-"}</td>
			<td className="td-ongoing-partner-name">
				{item?.partnerName ? item?.partnerName : "-"}
			</td>
			<td className="td-ongoing-fr-status">
				{item?.faceCompareStatus ? (
					<Badge
						size="xs"
						className="fr-status-badge"
						status={getFrStatusBadgeStatus}
						text={item?.faceCompareStatus}
					/>
				) : (
					<span className="text-center">-</span>
				)}
			</td>
			<td className="td-ongoing-liveness-score">
				{item?.livenessScore ? (
					<Badge
						size="xxs"
						className="liveness-badge"
						status={getLivenessBadgeStatus}
						text={item?.livenessScore + "%"}
					/>
				) : (
					<span className="text-center">-</span>
				)}
			</td>
			<td>
				<div className="td-ongoing-action">
					<Button
						id="show-detail-modal-btn"
						data-testid="show-detail-modal-btn"
						onClick={() => {
							onClickDetail();
						}}
						className="action-btn"
						transparent
					>
						Detail
					</Button>
				</div>
			</td>
		</tr>
	);
};

export default TableItem;
