/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

const PrintComponent = React.forwardRef((props, ref) => {
	const deliverySlipData = props.deliverySlipData;
	const toCommaStyle = (value) => {
		return Number(value).toLocaleString("jp-JP");
	};

	return (
		<>
			<div>
				<div ref={ref} css={printStyles}>
					<div className="relative mb-8">
						<h1 className="text-4xl absolute left-1/2 transform -translate-x-1/2">納品書</h1>
						<div className="text-right">
							<div>請求番号: {deliverySlipData.id}</div>
							<div>請求日: {deliverySlipData.publish_date}</div>
						</div>
					</div>
					<div className="mb-8">
						<div className="font-bold mb-2">送り先:</div>
						<div className="ml-4">
							{deliverySlipData.customer_name}
							<br />
							{deliverySlipData.customer_address}
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
						<p className="font-bold ">合計金額: {toCommaStyle(deliverySlipData.total_price)}</p>
					</div>
				</div>
			</div>
		</>
	);
});

const printStyles = css`
	transform: scale(0.7);
	transform-origin: top left;
	width: 210mm;
	height: 297mm;
	box-sizing: border-box;
	background-color: white;
	padding: 16px;
	margin-bottom: 16px;
	border: solid 2px #ccc;

	@media print {
		transform: scale(1);
		width: 210mm;
		height: 297mm;
		margin: 0 auto;
		page-break-after: always;
		overflow: hidden;
	}
`;

export default PrintComponent;
