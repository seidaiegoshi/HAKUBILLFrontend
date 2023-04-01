import React, { useEffect, useRef, useState } from "react";
import DeliverySlipSidebar from "@/pages/deliverySlip/DeliverySlipSidebar";
import Header from "@/components/Header";
import SearchDelivery from "@/pages/deliverySlip/list/SearchDelivery";
import axios from "@/libs/axios";
import { format, parseISO, startOfMonth, endOfMonth } from "date-fns";
import PrintComponent from "@/pages/deliverySlip/create/PrintComponent";
import { useReactToPrint } from "react-to-print";
import DeliverySlipListItems from "./DeliverySlipListItems";
import Pagination from "@/pages/deliverySlip/list/Pagination";

const DeliverySlipList = () => {
	const defaultContent = {
		product_id: null,
		product_name: "",
		unit: "",
		price: 0,
		quantity: 0,
		total_cost: 0,
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
		dateFrom: "",
		dateTo: "",
		word: "",
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const onSearch = ({ dateFrom, dateTo, word, page }) => {
		const requestUrl = "/delivery_slip";
		const params = { page };
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
				console.log(response.data);
				setDeliverySlips(response.data.data);
				setCurrentPage(response.data.current_page);
				setTotalPages(response.data.last_page);
				setPreview(response.data.data[0]);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		onSearch({ ...searchWords, page: currentPage });
	}, [currentPage]);

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<>
			<Header />
			<div className="flex">
				<div className="flex-none border-r-2">
					<DeliverySlipSidebar />
				</div>
				<div className="flex-initial w-full">
					<div className="sticky top-0 bg-white">
						<SearchDelivery search={onSearch} searchWords={searchWords} setSearchWords={setSearchWords} />
					</div>
					<div className="flex">
						<div className="flex-none flex flex-col">
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={(page) => onSearch({ ...searchWords, page })}
							/>
							<div className="flex">
								<DeliverySlipListItems deliverySlips={deliverySlips} setPreview={setPreview} />
							</div>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={(page) => onSearch({ ...searchWords, page })}
							/>
						</div>
						<div className="m-4">
							{preview && <PrintComponent deliverySlipData={preview} ref={componentRef} />}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeliverySlipList;
