import React from "react";
import { format, parseISO } from "date-fns";

const DeliverySlipListItems = ({ deliverySlips, setPreview }) => {
	return (
		<div className="flex-none m-4 p-3 space-y-2 h-screen overflow-y-auto border-2 ">
			<ul>
				{deliverySlips.map((delivery) => (
					<li
						key={delivery.id}
						className="mb-2 w-[200px]"
						onClick={() => {
							setPreview(delivery);
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
			</ul>
		</div>
	);
};

export default DeliverySlipListItems;
