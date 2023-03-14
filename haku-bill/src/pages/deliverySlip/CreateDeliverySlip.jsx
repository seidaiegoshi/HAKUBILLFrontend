import React, { useState } from "react";
import Header from "./../../components/Header";
import SideButton from "./SideButton";
import TextInput from "../../components/Atoms/TextInput";
import ProductModal from "./ProductSearchModal";
import axios from "./../../libs/axios";
import { format } from "date-fns";

const CreateDeliverySlip = () => {
	const [productModal, setProductModal] = useState(false); //modalの状態管理
	const [rowIndex, setRowIndex] = useState(null);
	const [deliverySlip, setDeliverySlip] = useState({
		customer_id: null,
		customer_name: "",
		publish_date: "",
	});

	const [contents, setContents] = useState([
		{ id: 1, product_id: null, product_name: "", unit: "", price: 0, quantity: 0, subtotal: 0 },
	]);

	const showModal = (index) => {
		setRowIndex(index);
		setProductModal(true);
	};

	const handleChange = (index, obj) => {
		const newContents = [...contents];
		newContents[index] = { ...newContents[index], ...obj };
		newContents[index].subtotal = newContents[index].quantity * newContents[index].price;

		setContents(newContents);
	};

	const handleCustomerChange = (obj) => {
		const newCustomer = { ...deliverySlip, ...obj };
		console.log(obj);
		setDeliverySlip(newCustomer);
	};

	const postDeliverySlip = async () => {
		const dsUrl = "/delivery_slip";
		const DSParam = new FormData();
		let deliverySlipId = null;
		DSParam.append("customer_id", 1);
		DSParam.append("publish_date", format(new Date(), "yyyy-M-d"));

		await axios
			.post(dsUrl, DSParam)
			.then((response) => {
				deliverySlipId = response.data.id;
			})
			.catch((e) => {
				console.log(e);
			})
			.finally();

		const dcUrl = "/delivery_slip/contents";
		const contentsParam = new FormData();
		const data = contents.map((obj) => ({
			delivery_slip_id: deliverySlipId,
			product_id: obj.product_id,
			quantity: obj.quantity,
		}));
		axios
			.post(dcUrl, [...data])
			.then((response) => {
				console.log(response);
			})
			.catch((e) => {
				console.log(e);
			})
			.finally();
	};

	const addRow = () => {
		const newId = contents.length + 1;
		const newData = {
			id: newId,
			product_id: null,
			product_name: "",
			unit: "",
			price: 0,
			quantity: 0,
			subtotal: 0,
		};
		const newTableData = [...contents, newData];
		setContents(newTableData);
	};

	return (
		<>
			<Header />
			<SideButton register={postDeliverySlip} />
			<div className="flex flex-col">
				<div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
					<div>
						<label htmlFor="customer" className="mb-3 block text-base font-medium text-[#07074D]">
							取引先名
						</label>
						<TextInput
							id="customer"
							type="text"
							value={deliverySlip.customer_name}
							onChange={(e) => {
								handleCustomerChange({ customer_name: e.target.value });
							}}
						/>
					</div>

					<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
						<ProductModal
							showFlag={productModal}
							setModal={setProductModal}
							setProductName={handleChange}
							rowIndex={rowIndex}
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
											金額
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
									{contents.map((content, index) => (
										<tr key={content.id} className="bg-white border-b">
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												<div className="flex  ">
													<TextInput
														type="text"
														value={content.product_name}
														onChange={(e) => handleChange(index, { product_name: e.target.value })}
													/>
													<button
														onClick={() => {
															showModal(index);
														}}
														className="justify-between block uppercase mx-auto mt-3 shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">
														選択する
													</button>
												</div>
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												<TextInput
													type="text"
													value={content.unit}
													onChange={(e) => handleChange(index, { unit: e.target.value })}
												/>{" "}
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												<TextInput
													type="text"
													value={content.price}
													onChange={(e) => handleChange(index, { price: e.target.value })}
												/>
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												<TextInput
													type="text"
													value={content.quantity}
													onChange={(e) => handleChange(index, { quantity: e.target.value })}
												/>
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												{content.subtotal}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<button
							onClick={addRow}
							className="block uppercase mx-auto mt-3 shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">
							追加
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateDeliverySlip;
