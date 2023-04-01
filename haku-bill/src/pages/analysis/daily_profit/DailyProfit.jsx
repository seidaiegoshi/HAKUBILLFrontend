import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import axios from "@/libs/axios.js";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, parseISO, differenceInDays } from "date-fns";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ReferenceLine,
} from "recharts";
import CalendarComponent from "@/pages/analysis/CalendarComponent";
import AnalysisSidebar from "@/pages/analysis/AnalysisSidebar";

const DailyProfit = () => {
	const [graphData, setGraphData] = useState([]);
	const now = new Date();
	const [startDate, setStartDate] = useState(format(startOfMonth(now), "yyyy-MM-dd"));
	const [endDate, setEndDate] = useState(format(endOfMonth(now), "yyyy-MM-dd"));
	const [fixedCostDay, setFixedCostDay] = useState(null);
	const [fixedCostGraph, setFixedCostGraph] = useState(null);
	const [yRangeState, setYRangeState] = useState(null);

	const handleChangeDate = (startDate, endDate) => {
		setStartDate(startDate);
		setEndDate(endDate);
	};
	const fetchProfit = (startDate, endDate, fixedCostDay) => {
		const requestUrl = `/analysis/daily_profit/${startDate}/${endDate}`;
		axios
			.get(requestUrl)
			.then((response) => {
				const filledData = fillMissingDates(cumulativeData(response.data));
				const daysDiff = differenceInDays(new Date(endDate), new Date(startDate)) + 1;
				const currentFixedCostGraph = Math.floor(daysDiff * fixedCostDay);
				setFixedCostGraph(currentFixedCostGraph);

				const maxDailyProfit = Math.max(...filledData.map((data) => data.daily_profit));
				const maxYRange = Math.max(maxDailyProfit, currentFixedCostGraph);
				setYRangeState(maxYRange + 1000);
				console.log(maxYRange);

				setGraphData(filledData);
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
		let previousDataPoint = 0;
		const filledData = dateRange.map((date) => {
			const formattedDate = format(date, "yyyy-MM-dd");
			const dataPoint = data.find((d) => d.publish_date === formattedDate);
			const daily_profit = dataPoint ? dataPoint.daily_profit : previousDataPoint;
			previousDataPoint = daily_profit;
			return { publish_date: formattedDate, daily_profit };
		});

		return filledData;
	};

	const fetchFixedCost = () => {
		const requestUrl = `/fixed_cost/day`;
		axios
			.get(requestUrl)
			.then((response) => {
				setFixedCostDay(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchFixedCost();
	}, []);

	useEffect(() => {
		fetchProfit(startDate, endDate);
		if (fixedCostDay !== null) {
			fetchProfit(startDate, endDate, fixedCostDay);
		}
	}, [startDate, endDate, fixedCostDay]);

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
									<YAxis domain={[0, yRangeState]} />
									<Tooltip />
									<Legend />
									<ReferenceLine
										y={fixedCostGraph}
										label={"固定費" + Math.floor(fixedCostGraph)}
										stroke="red"
									/>
									<Line dataKey="daily_profit" name="累積粗利" stroke="#8884d8" />
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
