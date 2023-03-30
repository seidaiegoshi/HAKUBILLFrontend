import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import axios from "@/libs/axios.js";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CalendarComponent from "@/pages/analysis/CalendarComponent";
import AnalysisSidebar from "@/pages/analysis/AnalysisSidebar";

const DailyProfit = () => {
	const [graphData, setGraphData] = useState([]);
	const now = new Date();
	const [startDate, setStartDate] = useState(format(startOfMonth(now), "yyyy-MM-dd"));
	const [endDate, setEndDate] = useState(format(endOfMonth(now), "yyyy-MM-dd"));

	const handleChangeDate = (startDate, endDate) => {
		setStartDate(startDate);
		setEndDate(endDate);
	};
	const fetchProfit = (startDate, endDate) => {
		const requestUrl = `/analysis/daily_profit/${startDate}/${endDate}`;
		axios
			.get(requestUrl)
			.then((response) => {
				const filledData = fillMissingDates(cumulativeData(response.data));
				setGraphData(filledData);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchProfit(startDate, endDate);
	}, [startDate, endDate]);

	const cumulativeData = (data) => {
		let cumulative = 0;
		const newData = [];
		data.forEach((obj) => {
			cumulative += Number(Math.floor(obj.sum_gross_profit));
			newData.push({
				publish_date: obj.publish_date,
				daily_profit: cumulative,
			});
		});
		return newData;
	};

	// startDateからendDateの範囲で、データが存在しないところもラベル出力のために日付を埋める。
	const fillMissingDates = (data) => {
		const dateRange = eachDayOfInterval({ start: parseISO(startDate), end: parseISO(endDate) });
		const filledData = dateRange.map((date) => {
			const formattedDate = format(date, "yyyy-MM-dd");
			const dataPoint = data.find((d) => d.publish_date === formattedDate);
			const daily_profit = dataPoint ? dataPoint.daily_profit : null;
			return { publish_date: formattedDate, daily_profit };
		});

		return filledData;
	};

	return (
		<>
			<Header />
			<div className="flex">
				<div className="flex-none">
					<AnalysisSidebar />
				</div>
				<div className="flex-initial w-full">
					<div>DailyProfit</div>

					<div>
						<div>
							<CalendarComponent setDate={handleChangeDate} />
						</div>
						<div>
							<ResponsiveContainer width="90%" height={500}>
								<LineChart
									key={`${startDate}-${endDate}`}
									data={graphData}
									margin={{
										top: 20,
										right: 30,
										left: 20,
										bottom: 5,
									}}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="publish_date" />
									<YAxis domain={[0, "dataMax + 1000"]} />
									<Tooltip />
									<Legend />
									<Line dataKey="daily_profit" stroke="#8884d8" />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DailyProfit;
