import React, { useEffect, useRef, useState } from "react";
import Header from "./../../components/Header";
import SideButton from "./SideButton";
import TextInput from "../../components/Atoms/TextInput";
import ProductSelectModal from "./ProductSelectModal";
import axios from "./../../libs/axios";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import PrintComponent from "./PrintComponent";

const CreateDeliverySlip = () => {
	const [searchWord, setSearchWord] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [displayResult, setDisplayResult] = useState(false);

	const [productModal, setProductModal] = useState(false); //modalの状態管理
	const [rowIndex, setRowIndex] = useState(null);

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

	const [deliverySlip, setDeliverySlip] = useState({
		customerId: null,
		deliverySlipNumber: null,
		customerName: "",
		customerAddress: "",
		publishDate: format(new Date(), "yyyy-M-d"),
		contents: [defaultContent],
		totalPrice: 0,
	});

	const fetchDeliverySlipId = () => {
		const requestUrl = "/delivery_slip/create";
		axios
			.get(requestUrl)
			.then((response) => {
				const newDS = { ...deliverySlip };
				newDS.deliverySlipNumber = response.data + 1;
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
		const requestUrl = `customer/${word}`;
		let res;
		await axios
			.get(requestUrl)
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
		newDeliverySlip.customerId = customer.id;
		newDeliverySlip.customerName = customer.name;
		newDeliverySlip.customerAddress = customer.address;
		setSearchWord(customer.name);
		setDeliverySlip(newDeliverySlip);
		setDisplayResult(false);
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
			newDeliverySlip.contents[index].price - newDeliverySlip.contents[index].cost;
		newDeliverySlip.contents[index].subtotal_gross_profit =
			newDeliverySlip.contents[index].gross_profit * newDeliverySlip.contents[index].quantity;

		// 合計金額
		newDeliverySlip.totalPrice = newDeliverySlip.contents.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.subtotal;
		}, 0);
		console.log(newDeliverySlip.totalPrice);

		setDeliverySlip(newDeliverySlip);
	};

	const postDeliverySlip = async () => {
		const requestUrl = "/delivery_slip";
		// const param = new FormData();
		let deliverySlipId = null;
		const data = deliverySlip.contents;
		console.log(deliverySlip);
		const param = {
			customer_id: deliverySlip.customerId,
			customer_name: deliverySlip.customerName,
			customer_address: deliverySlip.customerAddress,
			publish_date: deliverySlip.publishDate,
			contents: data,
			total_price: deliverySlip.totalPrice,
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

	return (
		<>
			<Header />
			<SideButton register={postDeliverySlip} print={handlePrint} />

			<div className="flex flex-col">
				<div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
					<div>
						<label htmlFor="customer" className="mb-3 block text-base font-medium text-[#07074D]">
							取引先名
						</label>
						<TextInput
							id="customer"
							type="text"
							value={searchWord}
							onChange={(e) => handleChangeCustomerInput(e)}
						/>
						{displayResult && (
							<ul className="absolute bg-white ">
								{suggestions.map((item) => (
									<li
										key={item.id}
										onClick={() => {
											handleClickSuggestion(item);
										}}>
										{item.name}
									</li>
								))}
							</ul>
						)}
					</div>

					<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
						<ProductSelectModal
							showFlag={productModal}
							setModal={setProductModal}
							setProduct={handleChange}
							rowIndex={rowIndex}
							customerId={deliverySlip.customerId}
						/>
						<div className="overflow-hidden">
							<table className="min-w-full">
								<thead className="bg-white border-b-2">
									<tr>
										<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
											商品名
										</th>
										<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
											単位
										</th>
										<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
											単価
										</th>
										<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
											数量
										</th>
										<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
											小計
										</th>
									</tr>
								</thead>

								<tbody>
									{deliverySlip.contents.map((item, index) => (
										<tr key={index} className="bg-white border-b">
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												<div className="flex  ">
													<TextInput
														type="text"
														value={item.product_name}
														onChange={(e) => handleChange(index, { product_name: e.target.value })}
													/>
													<button
														onClick={() => {
															showProductSelectModal(index);
														}}
														className="justify-between block uppercase mx-auto mt-3 shadow bg-gray-100 hover:bg-gray-200 focus:shadow-outline focus:outline-none text-base  py-3 px-10 rounded">
														選択する
													</button>
												</div>
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												<TextInput
													type="text"
													value={item.unit}
													onChange={(e) => handleChange(index, { unit: e.target.value })}
												/>
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												<TextInput
													type="text"
													value={item.price}
													onChange={(e) => handleChange(index, { price: e.target.value })}
												/>
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												<TextInput
													type="text"
													value={item.quantity}
													onChange={(e) => handleChange(index, { quantity: e.target.value })}
												/>
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												{Number(item.subtotal).toLocaleString("jp-JP")}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<button
							onClick={addRow}
							className="block uppercase mx-auto mt-3 shadow bg-gray-100 hover:bg-gray-200 focus:shadow-outline focus:outline-none text-base  py-3 px-10 rounded">
							追加
						</button>
					</div>
				</div>
			</div>

			<div className="">
				<PrintComponent deliverySlipData={deliverySlip} ref={componentRef} />
			</div>
		</>
	);
};

export default CreateDeliverySlip;
