import React from "react";
import Header from "../components/Header";
import SideButton from "../components/SideButton";
import CreateDeliverySlip from "../pages/deliverySlip/CreateDeliverySlip";

const DeliverySlip = () => {
	return (
		<>
			<SideButton />
			<CreateDeliverySlip />
		</>
	);
};

export default DeliverySlip;
