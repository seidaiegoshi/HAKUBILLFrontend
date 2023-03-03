import React from "react";
import Header from "@/components/Header";
import SideButton from "@/components/SideButton";
import CreateDeliverySlip from "@/components/home/CreateDeliverySlip";

const DeliverySlip = () => {
	return (
		<div>
			<Header />
			<SideButton />
			<CreateDeliverySlip />
		</div>
	);
};

export default DeliverySlip;
