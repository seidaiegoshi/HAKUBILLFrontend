import React from "react";
import ContentRow from "./ContentRow";

const DeliverySlipTable = ({ deliverySlip, handleChange, showProductSelectModal, addRow }) => {
	return (
		<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
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
							<ContentRow
								key={index}
								item={item}
								index={index}
								handleChange={handleChange}
								showProductSelectModal={showProductSelectModal}
							/>
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
	);
};
export default DeliverySlipTable;
