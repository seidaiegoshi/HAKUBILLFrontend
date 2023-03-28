import React from "react";
import DeliverySlipSidebar from "@/pages/deliverySlip/DeliverySlipSidebar";
import Header from "@/components/Header";

const DeliverySlipList = () => {
	return (
		<>
			<Header />
			<div className="flex">
				<div className="flex-none">
					<DeliverySlipSidebar />
				</div>
				<div className="flex-initial w-full"></div>
			</div>
		</>
	);
};

export default DeliverySlipList;
