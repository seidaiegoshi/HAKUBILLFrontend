import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import AnalysisSidebar from "@/pages/analysis/AnalysisSidebar";
import CalendarComponent from "@/pages/analysis/CalendarComponent";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import axios from "@/libs/axios.js";
import { startOfMonth, endOfMonth, format } from "date-fns";

const ProductSales = () => {
	const [salesData, setSalesData] = useState([]);
	const [sortOrder, setSortOrder] = useState("desc");
	const [sortColumn, setSortColumn] = useState("created_at");

	const chartHeight = salesData.length * 50;

	const addPercentage = (data) => {
		const totalProfit = data.reduce((total, current) => total + Number(current.sum_gross_profit), 0);
		const totalQuantity = data.reduce((total, current) => total + Number(current.sum_quantity), 0);
		return data.map((item) => {
			const profitRate = ((item.sum_gross_profit / totalProfit) * 100).toFixed(2);
			const quantityRate = ((item.sum_quantity / totalQuantity) * 100).toFixed(2);
			return {
				...item,
				profit_rate: profitRate,
				quantity_rate: quantityRate,
			};
		});
	};

	const fetchProfit = (startDate, endDate) => {
		const requestUrl = `/analysis/sales/${startDate}/${endDate}`;
		axios
			.get(requestUrl)
			.then((response) => {
				const dataWithPercentage = addPercentage(response.data);
				setSalesData(dataWithPercentage);
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

	const handleSortClick = (column) => {
		if (column === sortColumn) {
			setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
		} else {
			setSortColumn(column);
			setSortOrder("asc");
		}
	};

	const sortedSalesData = [...salesData].sort((a, b) => {
		const aValue = sortColumn === "name" ? a[sortColumn] : parseFloat(a[sortColumn]);
		const bValue = sortColumn === "name" ? b[sortColumn] : parseFloat(b[sortColumn]);

		if (sortOrder === "asc") {
			return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
		} else {
			return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
		}
	});

	return (
		<>
			<Header />
			<div className="flex">
				<div className="flex-none">
					<AnalysisSidebar />
				</div>
				<div className="flex-initial w-full">
					<div className="min-h-screen">
						<div>Product Sales</div>
						<div>
							<CalendarComponent getData={fetchProfit} />
						</div>
						<div className="flex flex-row w-full">
							<div className="w-1/2">
								<table className="min-w-full">
									<thead className="bg-white border-b sticky top-0">
										<tr>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
												onClick={() => handleSortClick("name")}>
												商品名
												{sortColumn === "name" && (
													<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
												)}
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
												onClick={() => handleSortClick("sum_gross_profit")}>
												粗利
												{sortColumn === "sum_gross_profit" && (
													<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
												)}
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
												onClick={() => handleSortClick("profit_rate")}>
												粗利割合
												{sortColumn === "profit_rate" && (
													<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
												)}
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
												onClick={() => handleSortClick("sum_quantity")}>
												販売数
												{sortColumn === "sum_quantity" && (
													<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
												)}
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
												onClick={() => handleSortClick("quantity_rate")}>
												販売数割合
												{sortColumn === "quantity_rate" && (
													<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
												)}
											</th>
										</tr>
									</thead>
									<tbody>
										{sortedSalesData.map((value) => (
											<tr key={value.product_id} className="bg-white border-b">
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{value.name}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{Number(value.sum_gross_profit).toLocaleString("jp-JP") + "円"}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
													{value.profit_rate}%
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
													{value.sum_quantity + " " + value.unit}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
													{value.quantity_rate}%
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<div className="w-1/2">
								<ResponsiveContainer width="100%" height={chartHeight}>
									<BarChart
										width={600}
										height={300}
										data={sortedSalesData}
										layout="vertical"
										margin={{
											top: 20,
											right: 50,
											left: 100,
											bottom: 10,
										}}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis type="number" domain={[0, "auto"]} />
										<YAxis dataKey="name" type="category" />
										<Tooltip />
										<Legend verticalAlign="top" height={36} />
										<Bar dataKey="profit_rate" name="粗利[%]" fill="#82ca9d" barSize={10} />
										<Bar dataKey="quantity_rate" name="販売数[%]" fill="#8884d8" barSize={10} />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductSales;
