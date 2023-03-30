import React from "react";
import LinkButton from "@/components/Atoms/LinkButton";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { BsList } from "react-icons/bs";

const DeliverySlipSidebar = () => {
	return (
		<>
			<aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l ">
				<div className="flex flex-col justify-between flex-1 mt-6">
					<nav>
						<LinkButton to={"/delivery-slip/list"} text={"一覧"} svg={<BsList />} />
						<LinkButton to={"/delivery-slip/new"} text={"作成"} svg={<BsFileEarmarkPlus />} />
					</nav>
				</div>
			</aside>
		</>
	);
};

export default DeliverySlipSidebar;
