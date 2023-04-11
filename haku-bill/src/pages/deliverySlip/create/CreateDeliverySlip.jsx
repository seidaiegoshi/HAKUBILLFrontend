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
import { useLocation } from "react-router-dom";

const CreateDeliverySlip = () => {
	const [searchWord, setSearchWord] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [customerModal, setCustomerModal] = useState(false);
	const [productModal, setProductModal] = useState(false); //modalの状態管理
	const [rowIndex, setRowIndex] = useState(null);
	const [posted, setPosted] = useState(false);

	const location = useLocation();
	const loadedDeliverySlip = location.state?.deliverySlip;

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

	let defaultDeliverySlip;
	loadedDeliverySlip
		? (defaultDeliverySlip = loadedDeliverySlip)
		: (defaultDeliverySlip = {
				customer_id: null,
				id: null,
				customer_name: "",
				customer_address: "",
				customer_post_code: "",
				publish_date: format(new Date(), "yyyy-M-d"),
				contents: [defaultContent],
				total_price: 0,
		  });

	const [deliverySlip, setDeliverySlip] = useState(defaultDeliverySlip);

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
				// console.log(response.data);
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

	const postDeliverySlip = () => {
		if (checkValidation()) {
			return;
		}
		const data = deliverySlip.contents;
		const param = {
			customer_id: deliverySlip.customer_id,
			customer_name: deliverySlip.customer_name,
			customer_address: deliverySlip.customer_address,
			customer_post_code: deliverySlip.customer_post_code,
			publish_date: deliverySlip.publish_date,
			contents: data,
			total_price: deliverySlip.total_price,
		};
		if (!posted) {
			const requestUrl = "/delivery_slip";
			axios
				.post(requestUrl, param)
				.then((response) => {
					console.log(response.data.id);
					setDeliverySlip((prevDeliverySlip) => ({
						...prevDeliverySlip,
						id: response.data.id,
					}));
					alert("登録しました");
					setPosted(true);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			const requestUrl = `/delivery_slip/${deliverySlip.id}`;
			axios
				.patch(requestUrl, param)
				.then((response) => {
					console.log(response.data);
					alert("更新しました");
					setPosted(true);
				})
				.catch((e) => {
					console.log(e);
				});
		}
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
		if (checkValidation()) {
			return;
		}
		handlePrint();
	};

	const showCustomerSelectModal = () => {
		setCustomerModal(true);
	};
	const removeRow = (index) => {
		const newContents = deliverySlip.contents.filter((_, i) => i !== index);
		setDeliverySlip({ ...deliverySlip, contents: newContents });
	};

	const checkValidation = () => {
		if (!deliverySlip.customer_id) {
			alert("取引先を選択してください。");
			return true;
		}
		if (!deliverySlip.contents.some((content) => content.product_id)) {
			alert("商品を設定してください。");
			return true;
		}
		if (deliverySlip.contents.some((content) => content.product_name === "")) {
			alert("商品名が空です");
			return true;
		}
		return false;
	};

	return (
		<>
			<Header />
			<SideButton postDeliverySlip={postDeliverySlip} handlePrint={printDeliverySlip} posted={posted} />
			<div className="flex">
				<div className="flex-none">
					<DeliverySlipSidebar />
				</div>
				<div className="flex-grow">
					<div className="flex flex-col">
						<div className="overflow-x-auto">
							<div className="mb-4 flex items-center">
								<Button
									onClick={showCustomerSelectModal}
									className="mr-4 bg-blue-500  hover:bg-blue-600 text-white">
									取引先選択
								</Button>
								{deliverySlip.customer_name ? (
									<span>{deliverySlip.customer_name}</span>
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
