// PrintComponent.js
import React from "react";

const PrintComponent = React.forwardRef((props, ref) => {
	const deliverySlipData = props.deliverySlipData;
	const toCommaStyle = (value) => {
		return Number(value).toLocaleString("jp-JP");
	};

	return (
		<div className="container mx-auto p-8">
			<div className="print-container bg-white shadow-md rounded ">
				<div ref={ref} className="px-8 pt-6 pb-8 mb-4">
					<div className="relative mb-8">
						<h1 className="text-4xl absolute left-1/2 transform -translate-x-1/2">納品書</h1>
						<div className="text-right">
							<div>請求番号: {deliverySlipData.deliverySlipNumber}</div>
							<div>請求日: {deliverySlipData.publishDate}</div>
						</div>
					</div>
					<div className="mb-8">
						<div className="font-bold mb-2">送り先:</div>
						<div className="ml-4">
							{deliverySlipData.customerName}
							<br />
							{deliverySlipData.customerAddress}
						</div>
					</div>

					<table className="table-auto w-full mt-8">
						<thead>
							<tr>
								<th className="border border-gray-300 bg-gray-100 text-left px-4 py-2 font-bold">品目</th>
								<th className="border border-gray-300 bg-gray-100 text-right px-4 py-2 font-bold">単価</th>
								<th className="border border-gray-300 bg-gray-100 text-right px-4 py-2 font-bold">数量</th>
								<th className="border border-gray-300 bg-gray-100 text-right px-4 py-2 font-bold">金額</th>
							</tr>
						</thead>
						<tbody>
							{deliverySlipData.contents.map((item, index) => (
								<tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}>
									<td className="border border-gray-300 px-4 py-2">{item.product_name}</td>
									<td className="border border-gray-300 text-right px-4 py-2">{toCommaStyle(item.price)}</td>
									<td className="border border-gray-300 text-right px-4 py-2">
										{toCommaStyle(item.quantity)}
									</td>
									<td className="border border-gray-300 text-right px-4 py-2">
										{toCommaStyle(item.subtotal)}
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className="text-right mt-4">
						<p className="font-bold ">合計金額: {toCommaStyle(deliverySlipData.totalAmount)}</p>
					</div>
				</div>
			</div>
		</div>
	);
});

export default PrintComponent;
