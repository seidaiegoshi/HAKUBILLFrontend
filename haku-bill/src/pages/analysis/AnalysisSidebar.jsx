import React from "react";
import LinkButton from "@/components/Atoms/LinkButton";
import { SlGraph } from "react-icons/sl";
import { BsBarChartSteps } from "react-icons/bs";
const AnalysisSidebar = () => {
	return (
		<>
			<aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l ">
				<div className="flex flex-col justify-between flex-1 mt-6">
					<nav>
						<LinkButton to={"/analysis/daily_profit"} text={"利益線グラフ"} svg={<SlGraph />} />
						<LinkButton to={"/analysis/product_sales"} text={"商品販売数一覧"} svg={<BsBarChartSteps />} />
					</nav>
				</div>
			</aside>
		</>
	);
};

export default AnalysisSidebar;
