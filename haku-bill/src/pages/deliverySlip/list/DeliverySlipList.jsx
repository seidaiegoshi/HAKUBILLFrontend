import React, { useEffect, useRef, useState } from "react";
import DeliverySlipSidebar from "@/pages/deliverySlip/DeliverySlipSidebar";
import Header from "@/components/Header";
import SearchDelivery from "@/pages/deliverySlip/list/SearchDelivery";
import axios from "@/libs/axios";
import { format, parseISO, startOfMonth, endOfMonth } from "date-fns";
import PrintComponent from "@/pages/deliverySlip/PrintComponent";
import { useReactToPrint } from "react-to-print";
import DeliverySlipListItems from "./DeliverySlipListItems";
import Button from "@/components/Atoms/Button";
import { useNavigate } from "react-router-dom";

const DeliverySlipList = () => {
	const [deliverySlips, setDeliverySlips] = useState([]);
	const [selectedDeliverySlip, setSelectedDeliverySlip] = useState(null);
	const [searchWords, setSearchWords] = useState({
		dateFrom: "",
		dateTo: "",
		word: "",
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const navigate = useNavigate();
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
				// console.log(response.data);
				if (response.data.current_page === 1) {
					setDeliverySlips(response.data.data);
				} else {
					setDeliverySlips((prevDeliverySlips) => [...prevDeliverySlips, ...response.data.data]);
				}
				setCurrentPage(response.data.current_page);
				setTotalPages(response.data.last_page);
				setSelectedDeliverySlip(response.data.data[0]);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadMoreDeliverySlips = () => {
		if (currentPage < totalPages) {
			onSearch({ ...searchWords, page: currentPage + 1 });
		}
	};

	useEffect(() => {
		onSearch({ ...searchWords, page: currentPage });
	}, []);

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const handleDuplicate = () => {
		navigate("/delivery-slip/new", { state: { deliverySlip: selectedDeliverySlip } });
	};
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
					{deliverySlips.length > 0 ? (
						<div className="flex">
							<div className="flex-none flex flex-col">
								<div className="flex">
									<DeliverySlipListItems
										deliverySlips={deliverySlips}
										setSelectedDeliverySlip={setSelectedDeliverySlip}
										loadMoreDeliverySlips={loadMoreDeliverySlips}
										currentPage={currentPage}
										totalPages={totalPages}
									/>
								</div>
							</div>
							<div className="m-4">
								{selectedDeliverySlip && (
									<>
										<Button onClick={handleDuplicate}>複製</Button>
										<PrintComponent deliverySlipData={selectedDeliverySlip} ref={componentRef} />
									</>
								)}
							</div>
						</div>
					) : (
						<div className="m-auto">検索条件に当てはまる納品書はありません</div>
					)}
				</div>
			</div>
		</>
	);
};

export default DeliverySlipList;
