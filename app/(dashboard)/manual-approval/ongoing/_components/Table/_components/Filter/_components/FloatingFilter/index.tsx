"use client";

import "./style.css";

import dayjs from "dayjs";
import {
	FunctionComponent,
	HTMLAttributes,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import DatePicker from "@/components/atoms/DatePicker";
import Input from "@/components/atoms/Input";
import {FilterAction} from "@/types/FilterAction";
import {ManualOngoingApprovalCollectionParams} from "@/types/ManualOngoingApprovalCollectionParams";

import RangeInput from "./_components/RangeInput";

interface FloatingFilterProps extends HTMLAttributes<HTMLDivElement> {
	params?: ManualOngoingApprovalCollectionParams;
	onParamsChange: (
		newParams: ManualOngoingApprovalCollectionParams,
		action: FilterAction,
	) => void;
	isShow: boolean;
	handleOpen: () => void;
	handleClose: () => void;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const FloatingFilter: FunctionComponent<FloatingFilterProps> = ({
	params,
	onParamsChange,
	isShow,
	handleOpen,
	handleClose,
	className,
	...attrs
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	const dropdownMenuRef = useRef<HTMLDivElement>(null);

	const calendarRef = useRef<HTMLDivElement>(null);

	const [isShowStartDatepicker, setIsShowStartDatePicker] =
		useState<boolean>(false);

	const [isShowEndDatepicker, setIsShowEndDatePicker] =
		useState<boolean>(false);

	const [startDate, setStartDate] = useState<string>(params?.startDate ?? "");

	const [endDate, setEndDate] = useState<string>(params?.endDate ?? "");

	const [statusList, setStatusList] = useState<string[]>(
		params?.frStatus ? params?.frStatus.split(",") : [],
	);

	const [livenessScore, setLivenessScore] = useState<string>("100");

	const onClickStatus = useCallback(
		(filterStatus: string) => {
			let newStatusList = [...statusList];

			const isExist = newStatusList.includes(filterStatus);

			if (isExist) {
				newStatusList = newStatusList.filter((item) => item !== filterStatus);
			} else {
				newStatusList.push(filterStatus);
			}
			setStatusList(newStatusList);
		},
		[statusList],
	);

	const handleStartDateChange = (value: Value | null) => {
		const selectedDate = value ? value.toString() : "";

		setStartDate(selectedDate);

		if (
			endDate &&
			dayjs(selectedDate).isBefore(dayjs(endDate).subtract(89, "day"))
		) {
			const newEndDate = dayjs(selectedDate).add(89, "day").toDate();
			setEndDate(newEndDate.toString());
		}

		if (endDate && dayjs(selectedDate).isAfter(endDate)) {
			setEndDate(selectedDate);
		}
	};

	const handleEndDateChange = (value: Value) => {
		const selectedDate = value ? value.toString() : "";
		setEndDate(selectedDate);
	};

	const handleLivenessScoreChange = (value: string) => {
		setLivenessScore(value);
	};

	const maxEndDate = useMemo(() => {
		if (startDate !== "") {
			const endDate = dayjs(startDate).add(89, "day");
			return endDate.isAfter(new Date()) ? new Date() : endDate.toDate();
		} else {
			return new Date();
		}
	}, [startDate]);

	const isSubmitDisabled = useMemo(() => {
		if (!startDate && !endDate && !livenessScore && statusList.length === 0) {
			return true;
		} else {
			return false;
		}
	}, [endDate, startDate, livenessScore, statusList]);

	const isResetDisabled = useMemo(() => {
		if (
			!startDate &&
			!endDate &&
			!params?.livenessScore &&
			statusList.length === 0
		) {
			return true;
		} else {
			return false;
		}
	}, [startDate, endDate, params?.livenessScore, statusList.length]);

	const submitFilter = useCallback(() => {
		const newParams: ManualOngoingApprovalCollectionParams = {
			...params,
			page: 1,
			limit: 10,
			startDate: startDate,
			endDate: endDate,
			frStatus: statusList.join(","),
			livenessScore: livenessScore,
		};

		onParamsChange(newParams, "Filter");
		handleClose();
	}, [
		params,
		startDate,
		endDate,
		livenessScore,
		statusList,
		onParamsChange,
		handleClose,
	]);

	const resetFilter = useCallback(() => {
		setStartDate("");
		setEndDate("");
		setLivenessScore("100");
		setStatusList([]);

		const resetParams: ManualOngoingApprovalCollectionParams = {
			...params,
			page: 1,
			limit: 10,
			startDate: undefined,
			endDate: undefined,
		};

		delete resetParams.nama;
		delete resetParams.nik;
		delete resetParams.noTelp;
		delete resetParams.startDate;
		delete resetParams.endDate;
		delete resetParams.livenessScore;
		delete resetParams.frStatus;

		onParamsChange(resetParams, "Filter");
	}, [params, onParamsChange]);

	useEffect(() => {
		if (params?.startDate && params.endDate) {
			setStartDate(params?.startDate);
			setEndDate(params?.endDate);
			return;
		}

		setStartDate("");
		setEndDate("");
	}, [params?.startDate, params?.endDate]);

	useEffect(() => {
		if (!params?.frStatus) {
			setStatusList([]);
			return;
		}

		setStatusList(params.frStatus?.split(","));
	}, [params?.frStatus]);

	useEffect(() => {
		if (!params?.livenessScore) {
			setLivenessScore("100");
			return;
		}

		setLivenessScore(params?.livenessScore);
	}, [params, params?.livenessScore]);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const isFloatingFilterElementClicked = dropdownMenuRef.current?.contains(
				event.target as Node,
			);

			const isCalendarItemClicked =
				(event.target as Element).classList.contains("react-calendar__tile") ||
				(event.target as Element).tagName.toLowerCase() === "abbr";

			if (!isFloatingFilterElementClicked && !isCalendarItemClicked) {
				handleClose();
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [handleClose]);

	return (
		<div
			className={"dropdown".concat(className ? ` ${className}` : "")}
			{...attrs}
			ref={dropdownRef}
		>
			<button
				id="show-filter-btn"
				data-testid="show-filter-btn"
				className={"dropdown-toggler-filter-application".concat(
					isShow ? " active" : "",
				)}
				onClick={() => handleOpen()}
			>
				<div className="dropdown-filter-application">
					<i className="fa fa-filter text-blue-80"></i>
					<span className="text-dark-40 font-medium text-base">Filter</span>
				</div>
			</button>
			<div
				className={"dropdown-content-filter-application".concat(
					isShow ? " active" : "",
				)}
				ref={dropdownMenuRef}
			>
				<div className="container-filter-simpedes-umi">
					<div className="flex justify-between items-center pb-4 border-b-2 border-[#EAEBEB]">
						<span className="label-filter">Filter</span>
						<div className="flex items-center gap-0.5">
							<Button
								variant="primary"
								transparent
								className="button-reset-filter"
								disabled={isResetDisabled}
								onClick={resetFilter}
							>
								Reset
							</Button>
							<Button
								variant="primary"
								transparent
								className="button-apply-filter"
								disabled={isSubmitDisabled}
								onClick={submitFilter}
							>
								Terapkan
							</Button>
						</div>
					</div>
					<div
						className={"dropdown-filter-contents".concat(
							isShow ? " active" : "",
						)}
					>
						<div className="flex flex-col gap-2.5">
							<span className="label-filter-by">Tanggal</span>
							<div className="container-filter-date-range" ref={calendarRef}>
								<div className="flex items-center gap-4">
									<div className="date-range">
										<span className="label-date-range">Dari</span>
										<Input
											readOnly
											type="date"
											placeholder="Pilih"
											defaultValue={
												startDate
													? dayjs(startDate).format("DD/MM/YY")
													: params?.startDate
											}
											onClick={() => {
												setIsShowEndDatePicker(false);
												setIsShowStartDatePicker((state) => !state);
											}}
										/>
									</div>
									<div className="date-range">
										<span className="label-date-range">Hingga</span>
										<Input
											readOnly
											type="date"
											placeholder="Pilih"
											defaultValue={
												endDate
													? dayjs(endDate).format("DD/MM/YY")
													: params?.endDate
											}
											onClick={() => {
												setIsShowStartDatePicker(false);
												setIsShowEndDatePicker((state) => !state);
											}}
											disabled={!startDate}
										/>
									</div>
								</div>
								<DatePicker
									className="floating-filter-datepicker"
									containerClassname="absolute top-[4.5em] z-10"
									isShow={isShowStartDatepicker}
									formatWeekdays="short"
									value={startDate}
									next2Label={null}
									prev2Label={null}
									maxDate={new Date()}
									onChange={(selectedDate) => {
										handleStartDateChange(selectedDate);
										setIsShowStartDatePicker(!isShowStartDatepicker);
									}}
								/>
								<DatePicker
									className="floating-filter-datepicker"
									containerClassname="absolute top-[4.5em] z-10"
									isShow={isShowEndDatepicker}
									formatWeekdays="short"
									value={endDate}
									next2Label={null}
									prev2Label={null}
									minDate={startDate ? new Date(startDate) : new Date()}
									maxDate={maxEndDate}
									onChange={(selectedDate) => {
										handleEndDateChange(selectedDate);
										setIsShowEndDatePicker(!isShowEndDatepicker);
									}}
								/>
								<span className="text-xs text-[#777777] font-normal">
									Data yang dapat ditampilkan maksimal adalah 90 hari
								</span>
							</div>
						</div>
						<hr className="w-full border border-[#EAEBEB]" />
						<div className="flex flex-col gap-2">
							<span className="label-filter-by">Liveness Score</span>
							<RangeInput
								min={50}
								max={100}
								value={parseInt(livenessScore)}
								onChange={(e) => {
									handleLivenessScoreChange(e.target.value);
								}}
							/>
						</div>
						<hr className="w-full border border-[#EAEBEB]" />
						<div className="flex flex-col gap-2 mb-4">
							<span className="label-filter-by">FR Status</span>
							<div className="flex items-center gap-[104px]">
								<Checkbox
									key="true"
									label="True"
									value="true"
									data-testid="true-checkbox"
									onChange={(e) => {
										onClickStatus(e.target.value);
									}}
									checked={statusList.includes("true")}
								/>
								<Checkbox
									key="false"
									label="False"
									value="false"
									data-testid="false-checkbox"
									onChange={(e) => {
										onClickStatus(e.target.value);
									}}
									checked={statusList.includes("false")}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FloatingFilter;
