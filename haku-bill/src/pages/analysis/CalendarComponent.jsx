// CalendarComponent.js
import React, { useState } from "react";
import { ja } from "date-fns/locale";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // デフォルトのスタイル
import "react-date-range/dist/theme/default.css"; // テーマ
import { format } from "date-fns";

const CalendarComponent = (props) => {
	const [range, setRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const handleSelect = (ranges) => {
		setRange(ranges.selection);
		props.getData(
			format(ranges.selection.startDate, "yyyy-MM-dd"),
			format(ranges.selection.endDate, "yyyy-MM-dd")
		);
	};

	return (
		<div>
			<DateRangePicker ranges={[range]} onChange={handleSelect} showDateDisplay={false} locale={ja} />
			<p>開始日: {range.startDate.toLocaleDateString()}</p>
			<p>終了日: {range.endDate.toLocaleDateString()}</p>
		</div>
	);
};

export default CalendarComponent;
