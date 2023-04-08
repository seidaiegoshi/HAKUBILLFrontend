import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/resources/logo.png";

import { BsBarChartSteps } from "react-icons/bs";

const Header = () => {
	return (
		<header className="text-gray-600 body-font h-[80px]">
			<div className="h-full container flex flex-wrap p-5 flex-col md:flex-row items-center">
				<img className="h-full object-cover" src={Logo} alt="logo" />
				<nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
					{/* <a className="mr-5 hover:text-gray-900">製造</a> */}
					{/* <a className="mr-5 hover:text-gray-900">在庫</a> */}
					<Link to="/delivery-slip/list" className="mr-5 hover:text-gray-900">
						納品
					</Link>
					<Link to="/analysis/daily_profit" className="mr-5 hover:text-gray-900">
						分析
					</Link>
					<Link to="/setting/product" className="mr-5 hover:text-gray-900">
						設定
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
