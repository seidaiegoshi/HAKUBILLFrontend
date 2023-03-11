import React, { useState } from "react";
import Header from "./../../components/Header";
import SideButton from "../../components/SideButton";
import TextInput from "../../components/Atoms/TextInput";
import ProductModal from "./ProductSearchModal";
import axios from "./../../libs/axios";

const CreateDeliverySlip = () => {
	const [productModal, setProductModal] = useState(false); //modalの状態管理
	const [rowIndex, setRowIndex] = useState(null); //modalの状態管理

	const showModal = (index) => {
		setRowIndex(index);
		setProductModal(true);
	};

	const [contents, setContents] = useState([
		{ id: 1, product_id: null, product_name: "", unit: "", price: 0, quantity: 0, subtotal: 0 },
	]);

	const handleChange = (index, obj) => {
		const newContents = [...contents];
		newContents[index] = { ...newContents[index], ...obj };
		newContents[index].subtotal = newContents[index].quantity * newContents[index].price;

		setContents(newContents);
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
			<SideButton />
			<div className="flex flex-col">
				<div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
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
