import "./style.css";

import {FunctionComponent, useEffect, useRef} from "react";
import Calendar, {CalendarProps} from "react-calendar";

interface DatePickerProps
	extends Omit<
		CalendarProps,
		"formatShortWeekday" | "locale" | "calendarType"
	> {
	formatWeekdays?: "initial" | "short";
	onDismiss?: () => void;
	isShow?: boolean;
	containerClassname?: string;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
	formatWeekdays = "initial",
	onDismiss,
	isShow,
	containerClassname,
	...attrs
}) => {
	const calendarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				calendarRef.current &&
				!calendarRef.current.contains(event.target as Node)
			) {
				onDismiss && onDismiss();
			}
		};

		if (isShow) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShow]);

	return (
		<div ref={calendarRef} className={containerClassname}>
			{isShow ? (
				<Calendar
					nextLabel={<i className="fa-solid fa-chevron-right"></i>}
					prevLabel={<i className="fa-solid fa-chevron-left"></i>}
					locale="id"
					calendarType="gregory"
					formatShortWeekday={(locale, date) => {
						if (formatWeekdays === "initial") {
							const newDate = date.toLocaleString("id-ID", {
								weekday: "narrow",
							});
							return newDate;
						}
						if (formatWeekdays === "short") {
							const newDate = date.toLocaleString("id-ID", {
								weekday: "short",
							});
							return newDate;
						}
						return "";
					}}
					{...attrs}
				/>
			) : (
				false
			)}
		</div>
	);
};

export default DatePicker;
