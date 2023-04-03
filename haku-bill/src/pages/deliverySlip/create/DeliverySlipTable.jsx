import React from "react";
import TextInput from "@/components/Atoms/TextInput";
import Button from "@/components/Atoms/Button";

const DeliverySlipTable = ({ deliverySlip, handleChange, showProductSelectModal, addRow, removeRow }) => {
	return (
		<div className="py-2 inline-block min-w-full">
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
								{/* 商品名 */}
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									<div className="flex ">
										<TextInput
											type="text"
											value={item.product_name}
											onChange={(e) => handleChange(index, { product_name: e.target.value })}
										/>
										<Button
											onClick={() => showProductSelectModal(index)}
											className="block uppercase mx-1 shadow bg-gray-100 hover:bg-gray-200 focus:shadow-outline focus:outline-none text-base  px-4 rounded">
											選択する
										</Button>
									</div>
								</td>
								{/* 単位 */}
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									<TextInput
										type="text"
										value={item.unit}
										onChange={(e) => handleChange(index, { unit: e.target.value })}
									/>
								</td>
								{/* 単価 */}
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									<TextInput
										type="text"
										value={item.price}
										onChange={(e) => handleChange(index, { price: e.target.value })}
									/>
								</td>
								{/* 数量 */}
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									<TextInput
										type="text"
										value={item.quantity}
										onChange={(e) => handleChange(index, { quantity: e.target.value })}
									/>
								</td>
								{/* 小計 */}
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{Number(item.subtotal).toLocaleString("jp-JP")}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									<Button onClick={() => removeRow(index)} className="bg-red-500 hover:bg-red-600 text-white">
										削除
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="mt-3 flex justify-center">
				<Button onClick={addRow}> 行追加</Button>
			</div>
		</div>
	);
};
export default DeliverySlipTable;
