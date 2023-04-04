import React from "react";
import { format, parseISO } from "date-fns";
import Button from "@/components/Atoms/Button";

const DeliverySlipListItems = ({
	deliverySlips,
	setSelectedDeliverySlip,
	loadMoreDeliverySlips,
	currentPage,
	totalPages,
}) => {
	return (
		<div className="flex flex-col">
			<p className="ml-4 mt-4 ">表示件数: {deliverySlips.length}</p>
			<div className="flex-none ml-4 p-3 space-y-2 h-[600px] overflow-y-auto border-2 ">
				<ul>
					{deliverySlips.map((delivery) => (
						<li
							key={delivery.id}
							className="mb-2 w-[200px]"
							onClick={() => {
								setSelectedDeliverySlip(delivery);
							}}>
							<div className="bg-white py-1 px-3 rounded shadow border-1 cursor-pointer">
								<p className="text-sm text-gray-500">
									{format(parseISO(delivery.publish_date), "yyyy/M/d")}【{delivery.id}】
								</p>
								<p className="text-sm font-semibold">{delivery.customer_name}</p>
								<div className="flex flex-row-reverse">
									<p className="text-sm right-0">{delivery.total_price}円</p>
								</div>
							</div>
						</li>
					))}
					{currentPage < totalPages && <Button onClick={() => loadMoreDeliverySlips()}>もっと表示</Button>}
				</ul>
			</div>
			<p className="ml-4">表示件数: {deliverySlips.length}</p>
		</div>
	);
};

export default DeliverySlipListItems;
