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
		customer_post_code: "",
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
				console.log(response.data);
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
		getCustomerList(input).then((res) => {
			setSuggestions(res);
		});
	};

	const handleClickSuggestion = (customer) => {
		const newDeliverySlip = { ...deliverySlip };
		newDeliverySlip.customer_id = customer.id;
		newDeliverySlip.customer_name = customer.name;
		newDeliverySlip.customer_address = customer.address;
		newDeliverySlip.customer_post_code = customer.post_code;
		setSearchWord(customer.name);
		setDeliverySlip(newDeliverySlip);
		setSelectedCustomerName(customer.name);
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
		if (!deliverySlip.customer_id || !deliverySlip.contents.some((content) => content.product_id)) {
			alert("取引先と商品は必ず選択してください。");
			return;
		}

		const requestUrl = "/delivery_slip";
		const data = deliverySlip.contents;
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
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(alert("登録しました"));
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

	const printDeliverySlip = () => {
		if (!deliverySlip.customer_id || !deliverySlip.contents.some((content) => content.product_id)) {
			alert("取引先と商品は必ず選択してください。");
			return;
		}
		postDeliverySlip();
		handlePrint();
	};

	const showCustomerSelectModal = () => {
		setCustomerModal(true);
	};
	const removeRow = (index) => {
		const newContents = deliverySlip.contents.filter((_, i) => i !== index);
		setDeliverySlip({ ...deliverySlip, contents: newContents });
	};

	return (
		<>
			<Header />
			<SideButton postDeliverySlip={postDeliverySlip} handlePrint={printDeliverySlip} />
			<div className="flex">
				<div className="flex-none">
					<DeliverySlipSidebar />
				</div>
				<div className="flex-grow">
					<div className="flex flex-col">
						<div className="overflow-x-auto">
							<div className="mb-4 flex items-center">
								<Button onClick={showCustomerSelectModal} className="mr-4">
									取引先選択
								</Button>
								{selectedCustomerName ? (
									<span>{selectedCustomerName}</span>
								) : (
									<span className="text-red-500">取引先を選択してください。</span>
								)}
							</div>
							<DeliverySlipTable
								deliverySlip={deliverySlip}
								handleChange={handleChange}
								showProductSelectModal={showProductSelectModal}
								addRow={addRow}
								removeRow={removeRow}
							/>
						</div>
					</div>
					<div className="flex justify-center pt-5">
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
				suggestions={suggestions}
				handleChangeCustomerInput={handleChangeCustomerInput}
				handleClickSuggestion={handleClickSuggestion}
				showFlag={customerModal}
				setModal={setCustomerModal}
			/>
		</>
	);
};

export default CreateDeliverySlip;
