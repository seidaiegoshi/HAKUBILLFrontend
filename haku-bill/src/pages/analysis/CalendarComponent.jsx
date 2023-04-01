// CalendarComponent.js
import React, { useState } from "react";
import { ja } from "date-fns/locale";
import { DateRangePicker } from "react-date-range";
import {
	format,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	startOfYear,
	endOfYear,
	subWeeks,
	subMonths,
	subYears,
} from "date-fns";

import "react-date-range/dist/styles.css"; // デフォルトのスタイル
import "react-date-range/dist/theme/default.css"; // テーマ

const CalendarComponent = (props) => {
	const now = new Date();

	const [range, setRange] = useState({
		startDate: startOfMonth(now),
		endDate: endOfMonth(now),
		key: "selection",
	});

	const handleSelect = (ranges) => {
		setRange(ranges.selection);
		props.setDate(
			format(ranges.selection.startDate, "yyyy-MM-dd"),
			format(ranges.selection.endDate, "yyyy-MM-dd")
		);
	};
	const customStaticRanges = [
		// {
		// 	label: "今週",
		// 	range: () => ({
		// 		startDate: startOfWeek(new Date()),
		// 		endDate: endOfWeek(new Date()),
		// 	}),
		// 	isSelected: () => false,
		// },
		// {
		// 	label: "先週",
		// 	range: () => {
		// 		const lastWeek = subWeeks(new Date(), 1);
		// 		return {
		// 			startDate: startOfWeek(lastWeek),
		// 			endDate: endOfWeek(lastWeek),
		// 		};
		// 	},
		// 	isSelected: () => false,
		// },
		{
			label: "今月",
			range: () => ({
				startDate: startOfMonth(new Date()),
				endDate: endOfMonth(new Date()),
			}),
			isSelected: () => false,
		},
		{
			label: "先月",
			range: () => {
				const lastMonth = subMonths(new Date(), 1);
				return {
					startDate: startOfMonth(lastMonth),
					endDate: endOfMonth(lastMonth),
				};
			},
			isSelected: () => false,
		},
		{
			label: "今年",
			range: () => ({
				startDate: startOfYear(new Date()),
				endDate: endOfYear(new Date()),
			}),
			isSelected: () => false,
		},
		{
			label: "去年",
			range: () => {
				const lastYear = subYears(new Date(), 1);
				return {
					startDate: startOfYear(lastYear),
					endDate: endOfYear(lastYear),
				};
			},
			isSelected: () => false,
		},
	];

	const inputRanges = [];

	return (
		<div>
			<DateRangePicker
				ranges={[range]}
				onChange={handleSelect}
				showDateDisplay={false}
				locale={ja}
				staticRanges={customStaticRanges}
				inputRanges={inputRanges}
			/>
			<p>開始日: {format(range.startDate, "yyyy/MM/dd")}</p>
			<p>終了日: {format(range.endDate, "yyyy/MM/dd")}</p>
		</div>
	);
};

export default CalendarComponent;
