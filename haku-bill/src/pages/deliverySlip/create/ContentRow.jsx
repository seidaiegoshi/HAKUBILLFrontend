import React from "react";
import TextInput from "@/components/Atoms/TextInput";
import Button from "@/components/Atoms/Button";

const ContentRow = ({ item, index, handleChange, showProductSelectModal }) => {
	return (
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
		</tr>
	);
};

export default ContentRow;
