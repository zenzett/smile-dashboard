import "./style.css";

import dayjs from "dayjs";
import React, {FunctionComponent, HTMLAttributes, useMemo} from "react";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import {ManualHistoryApproval} from "@/types/ManualHistoryApproval";
import {ManualHistoryApprovalCollectionParams} from "@/types/ManualHistoryApprovalCollectionParams";

interface TableItemProps extends HTMLAttributes<HTMLDivElement> {
	item: ManualHistoryApproval;
	params: ManualHistoryApprovalCollectionParams;
	index: number;
	onClickDetail: () => void;
}

const TableItem: FunctionComponent<TableItemProps> = ({
	item,
	params,
	index,
	onClickDetail,
}) => {
	const tableNumber = useMemo(() => {
		const numberOfTable: number = params?.page * 10 - 10;
		return numberOfTable;
	}, [params?.page]);

	const getStatusBadge = useMemo(() => {
		if (item?.status === "APPROVED") {
			return "success";
		} else {
			return "error";
		}
	}, [item?.status]);

	return (
		<tr key={index}>
			<td className="td-history-number">{tableNumber + (index + 1)}</td>
			<td className="td-history-date">
				{item?.createdAt
					? dayjs(item?.createdAt).format("DD MMM YY, HH:mm")
					: "-"}
			</td>
			<td className="td-history-customer-name">
				{item?.name ? item?.name : "-"}
			</td>
			<td className="td-history-nik">{item?.idNo ? item?.idNo : "-"}</td>
			<td className="td-history-status-approval">
				{item?.status ? (
					<Badge
						size="sm"
						className="status-badge"
						status={getStatusBadge}
						text={
							item?.status === "AUTO_REJECTED" ? "AUTO-REJECT" : item?.status
						}
					/>
				) : (
					<span className="text-center">-</span>
				)}
			</td>
			<td className="td-history-reason">{item?.reason ? item?.reason : "-"}</td>
			<td className="td-history-action">
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
			</td>
		</tr>
	);
};

export default TableItem;
