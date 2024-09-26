import "./style.css";

import dayjs from "dayjs";
import React, {
	FunctionComponent,
	HTMLAttributes,
	useCallback,
	useMemo,
} from "react";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import {SimpedesUmiApplication} from "@/types/SimpedesUmiApplication";
import {SimpedesUmiApplicationCollectionParams} from "@/types/SimpedesUmiApplicationCollectionParams";
import {UserTypeID} from "@/types/UserTypeID";

interface TableItemProps extends HTMLAttributes<HTMLDivElement> {
	userTypeId: UserTypeID;
	item: SimpedesUmiApplication;
	params: SimpedesUmiApplicationCollectionParams;
	index: number;
	onClickDetail: () => void;
	onClickDownloadDetail: () => void;
}

const TableItem: FunctionComponent<TableItemProps> = ({
	userTypeId,
	item,
	params,
	index,
	onClickDetail,
	onClickDownloadDetail,
}) => {
	const tableNumber = useMemo(() => {
		const numberOfTable: number = params?.page * 10 - 10;
		return numberOfTable;
	}, [params?.page]);

	const getStatusBadge = useCallback((status: string) => {
		switch (status) {
			case "DONE_SUCCESS":
				return "success";
			case "CANCELED":
			case "PENDING_ESB":
			case "PRIVY_REGISTER_FAILED":
				return "error";
			default:
				return "pending";
		}
	}, []);

	return (
		<tr key={index}>
			<td>{tableNumber + (index + 1)}</td>
			<td>
				{item?.createdAt
					? dayjs(item?.createdAt).format("DD MMM YY, HH:mm")
					: "-"}
			</td>
			<td className="td-customer-name">
				{item?.custName ? item?.custName : "-"}
			</td>
			<td className="td-nik">{item?.idNo ? item?.idNo : "-"}</td>
			<td className="td-phone">
				{item?.cellPhoneNumber ? item?.cellPhoneNumber : "-"}
			</td>
			<td className="td-partner-name">
				{item?.partnerName ? item?.partnerName : "-"}
			</td>
			<td>
				{item?.status ? (
					<Badge
						className="truncate"
						status={getStatusBadge(item?.status)}
						text={item?.status}
					/>
				) : (
					<span className="text-center">-</span>
				)}
			</td>
			<td>
				<div className="td-action">
					<Button
						id="show-detail-modal-btn"
						data-testid="show-detail-modal-btn"
						onClick={() => {
							onClickDetail();
						}}
						transparent
					>
						Detail
					</Button>
					{userTypeId !== "VIEWER" ? (
						<Button
							id="show-download-modal-btn"
							data-testid="show-download-modal-btn"
							onClick={() => {
								onClickDownloadDetail();
							}}
							transparent
						>
							<i className="fa fa-download"></i>
						</Button>
					) : (
						false
					)}
				</div>
			</td>
		</tr>
	);
};

export default TableItem;
