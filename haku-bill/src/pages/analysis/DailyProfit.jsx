import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import axios from "@/libs/axios.js";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CalendarComponent from "@/pages/analysis/CalendarComponent";
import AnalysisSidebar from "@/pages/analysis/AnalysisSidebar";

const DailyProfit = () => {
	const [graphData, setGraphData] = useState([]);

	const fetchProfit = (startDate, endDate) => {
		const requestUrl = `/analysis/daily_profit/${startDate}/${endDate}`;
		console.log(requestUrl);
		axios
			.get(requestUrl)
			.then((response) => {
				setGraphData(cumulativeData(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		const now = new Date();
		const start = format(startOfMonth(now), "yyyy-MM-dd");
		const end = format(endOfMonth(now), "yyyy-MM-dd");
		fetchProfit(start, end);
	}, []);

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
							<CalendarComponent getData={fetchProfit} />
						</div>
						<div>
							<ResponsiveContainer width="90%" height={500}>
								<LineChart
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
