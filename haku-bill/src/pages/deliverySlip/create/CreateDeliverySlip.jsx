import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import SideButton from "@/pages/deliverySlip/create/SideButton";
import ProductSelectModal from "@/pages/deliverySlip/create/ProductSelectModal";
import axios from "@/libs/axios";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import PrintComponent from "@/pages/deliverySlip/PrintComponent";
import DeliverySlipSidebar from "@/pages/deliverySlip/DeliverySlipSidebar";
import CustomerSearchModal from "./CustomerSearchModal";
import DeliverySlipTable from "./DeliverySlipTable";
import Button from "@/components/Atoms/Button";
const CreateDeliverySlip = () => {
	const [searchWord, setSearchWord] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [displayResult, setDisplayResult] = useState(false);
	const [customerModal, setCustomerModal] = useState(false);
	const [selectedCustomerName, setSelectedCustomerName] = useState("");
	const [productModal, setProductModal] = useState(false); //modalの状態管理
	const [rowIndex, setRowIndex] = useState(null);

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

	const [deliverySlip, setDeliverySlip] = useState({
		customer_id: null,
		id: null,
		customer_name: "",
		customer_address: "",
		publish_date: format(new Date(), "yyyy-M-d"),
		contents: [defaultContent],
		total_price: 0,
	});

	const fetchDeliverySlipId = () => {
		const requestUrl = "/delivery_slip/create";
		axios
			.get(requestUrl)
			.then((response) => {
				const newDS = { ...deliverySlip };
				newDS.id = response.data + 1;
				setDeliverySlip(newDS);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchDeliverySlipId();
	}, []);

	const getCustomerList = async (word) => {
		const requestUrl = "/customer";
		const params = {};
		if (word !== "") {
			params.customer_name = word;
		}
		let res;
		await axios
			.get(requestUrl, { params })
			.then((response) => {
				res = response.data;
			})
			.catch((e) => {
				console.log(e);
			});
		return res;
	};

	const handleChangeCustomerInput = (e) => {
		const input = e.target.value;
		setSearchWord(input);
		setDisplayResult(true);
		getCustomerList(input).then((res) => {
			setSuggestions(res);
		});
	};

	const handleClickSuggestion = (customer) => {
		const newDeliverySlip = { ...deliverySlip };
		newDeliverySlip.customer_id = customer.id;
		newDeliverySlip.customer_name = customer.name;
		newDeliverySlip.customer_address = customer.address;
		setSearchWord(customer.name);
		setDeliverySlip(newDeliverySlip);
		setSelectedCustomerName(customer.name);
		setDisplayResult(false);
		setCustomerModal(false);
	};

	const showProductSelectModal = (index) => {
		setRowIndex(index);
		setProductModal(true);
	};

	const handleChange = (index, obj) => {
		const newDeliverySlip = { ...deliverySlip };
		newDeliverySlip.contents[index] = { ...newDeliverySlip.contents[index], ...obj };

		// 粗利、小計、小計粗利
		newDeliverySlip.contents[index].subtotal =
			newDeliverySlip.contents[index].quantity * newDeliverySlip.contents[index].price;
		newDeliverySlip.contents[index].gross_profit =
			newDeliverySlip.contents[index].price - newDeliverySlip.contents[index].total_cost;
		newDeliverySlip.contents[index].subtotal_gross_profit =
			newDeliverySlip.contents[index].gross_profit * newDeliverySlip.contents[index].quantity;

		// 合計金額
		newDeliverySlip.total_price = newDeliverySlip.contents.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.subtotal;
		}, 0);

		setDeliverySlip(newDeliverySlip);
	};

	const postDeliverySlip = async () => {
		const requestUrl = "/delivery_slip";
		// const param = new FormData();
		let deliverySlipId = null;
		const data = deliverySlip.contents;
		console.log(deliverySlip);
		const param = {
			customer_id: deliverySlip.customer_id,
			customer_name: deliverySlip.customer_name,
			customer_address: deliverySlip.customer_address,
			publish_date: deliverySlip.publish_date,
			contents: data,
			total_price: deliverySlip.total_price,
		};

		await axios
			.post(requestUrl, param)
			.then((response) => {
				console.log(response.data);
				deliverySlipId = response.data.id;
			})
			.catch((e) => {
				console.log(e);
			})
			.finally();
	};

	const addRow = () => {
		const newData = { ...defaultContent };
		const newDeliverySlipContents = [...deliverySlip.contents, newData];

		const newDeliverySlip = { ...deliverySlip };
		newDeliverySlip.contents = newDeliverySlipContents;
		setDeliverySlip(newDeliverySlip);
	};

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const showCustomerSelectModal = () => {
		setCustomerModal(true);
	};

	return (
		<>
			<Header />
			<SideButton register={postDeliverySlip} print={handlePrint} />
			<div className="flex">
				<div className="flex-none">
					<DeliverySlipSidebar />
				</div>
				<div className="flex-initial w-full">
					<div className="flex flex-col">
						<div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
							<div className="mb-4 flex items-center">
								<Button onClick={showCustomerSelectModal} className="mr-4">
									取引先選択
								</Button>
								{selectedCustomerName ? (
									<span>{selectedCustomerName}</span>
								) : (
									<span className="text-red-500">取引先を選択してください</span>
								)}
							</div>
							<DeliverySlipTable
								deliverySlip={deliverySlip}
								handleChange={handleChange}
								showProductSelectModal={showProductSelectModal}
								addRow={addRow}
							/>
						</div>
					</div>
					<div className="m-4 flex justify-center">
						<PrintComponent deliverySlipData={deliverySlip} ref={componentRef} />
					</div>
				</div>
			</div>
			<ProductSelectModal
				showFlag={productModal}
				setModal={setProductModal}
				setProduct={handleChange}
				rowIndex={rowIndex}
				customerId={deliverySlip.customer_id}
			/>
			<CustomerSearchModal
				searchWord={searchWord}
				displayResult={displayResult}
				suggestions={suggestions}
				handleChangeCustomerInput={handleChangeCustomerInput}
				handleClickSuggestion={handleClickSuggestion}
				showFlag={customerModal}
				setModal={setCustomerModal}
				customers={suggestions}
			/>
		</>
	);
};

export default CreateDeliverySlip;
