import React, { useEffect, useRef, useState } from "react";
import DeliverySlipSidebar from "@/pages/deliverySlip/DeliverySlipSidebar";
import Header from "@/components/Header";
import SearchDelivery from "@/pages/deliverySlip/list/SearchDelivery";
import axios from "@/libs/axios";
import { format, parseISO, startOfMonth, endOfMonth } from "date-fns";
import PrintComponent from "@/pages/deliverySlip/create/PrintComponent";
import { useReactToPrint } from "react-to-print";

const DeliverySlipList = () => {
	const currentDate = new Date();
	const defaultContent = {
		product_id: null,
		product_name: "",
		unit: "",
		price: 0,
		quantity: 0,
		cost: 0,
		gross_profit: 0,
		subtotal: 0,
		subtotal_gross_profit: 0,
	};

	const [deliverySlips, setDeliverySlips] = useState([
		{
			customer_id: null,
			id: null,
			customer_name: "",
			customer_address: "",
			publish_date: new Date().toISOString(),
			contents: [defaultContent],
			total_price: 0,
		},
	]);
	const [preview, setPreview] = useState(null);
	const [searchWords, setSearchWords] = useState({
		dateFrom: format(startOfMonth(currentDate), "yyyy-MM-dd"),
		dateTo: format(endOfMonth(currentDate), "yyyy-MM-dd"),
		word: "",
	});

	const onSearch = ({ dateFrom, dateTo, word }) => {
		const requestUrl = "/delivery_slip";
		const params = {};
		if (dateFrom !== "" && dateTo !== "") {
			params.dateFrom = dateFrom;
			params.dateTo = dateTo;
		}
		if (word !== "") {
			params.word = word;
		}
		axios
			.get(requestUrl, { params })
			.then((response) => {
				setDeliverySlips(response.data);
				setPreview(response.data[0]);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		onSearch(searchWords);
	}, []);

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<>
			<Header />
			<div className="flex">
				<div className="flex-none">
					<DeliverySlipSidebar />
				</div>
				<div className="flex-initial w-full ">
					<div className="sticky top-0 bg-white">
						<SearchDelivery search={onSearch} searchWords={searchWords} setSearchWords={setSearchWords} />
					</div>
					<div className="flex">
						<div className="flex-none  border-1">
							<ul className="mt-3 p-3 space-y-2 h-screen overflow-y-auto">
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
												<p className="text-sm  right-0">{delivery.total_price}円</p>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
						<div>
							<div className="m-4">
								{preview && <PrintComponent deliverySlipData={preview} ref={componentRef} />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeliverySlipList;
