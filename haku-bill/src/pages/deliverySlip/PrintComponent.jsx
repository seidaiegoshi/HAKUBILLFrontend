/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { format, parse } from "date-fns";

const PrintComponent = React.forwardRef((props, ref) => {
	const deliverySlipData = props.deliverySlipData;
	const toCommaStyle = (value) => {
		return Number(value).toLocaleString("jp-JP");
	};

	return (
		<>
			<div css={previewStyle}>
				<div ref={ref} css={printStyles}>
					<div className="h-1/2 p-6 pt-8">
						<div className="relative mb-8">
							<h1 className="p-1 text-2xl absolute left-1/2 transform -translate-x-1/2 ring-black ring-2">
								納品書(控)
							</h1>
							<div className="text-right">
								<div>
									<span>
										請求日:
										{format(parse(deliverySlipData.publish_date, "yyyy-MM-dd", new Date()), "yyyy年MM月dd日")}
									</span>
									<span className="pl-3">No. {deliverySlipData.id}</span>
								</div>
							</div>
						</div>
						<div className="mb-8">
							<div className="ml-4">
								〒{deliverySlipData.customer_post_code}
								<br />
								{deliverySlipData.customer_address}
								<br />
								<br />
								{deliverySlipData.customer_name} 御中
							</div>
						</div>

						<table className="table-auto w-full mt-8">
							<thead>
								<tr>
									<th className="border border-gray-300 bg-gray-100 text-left px-4 font-bold">品目</th>
									<th className="border border-gray-300 bg-gray-100 text-right px-4 font-bold">数量</th>
									<th className="border border-gray-300 bg-gray-100 text-right px-4 font-bold">単位</th>
									<th className="border border-gray-300 bg-gray-100 text-right px-4 font-bold">単価</th>
									<th className="border border-gray-300 bg-gray-100 text-right px-4 font-bold">金額</th>
									{/* <th className="border border-gray-300 bg-gray-100 text-right px-4 font-bold">備考</th> */}
								</tr>
							</thead>
							<tbody>
								{deliverySlipData.contents.map((item, index) => (
									<tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}>
										<td className="border border-gray-300 px-4 ">{item.product_name}</td>
										<td className="border border-gray-300 text-right px-4 ">{toCommaStyle(item.quantity)}</td>
										<td className="border border-gray-300 text-right px-4 ">{item.unit}</td>
										<td className="border border-gray-300 text-right px-4 ">{toCommaStyle(item.price)}</td>
										<td className="border border-gray-300 text-right px-4 ">{toCommaStyle(item.subtotal)}</td>
										{/* <td className="border border-gray-300 text-right px-4 "></td> */}
									</tr>
								))}
							</tbody>
						</table>

						<div className="text-right mt-4">
							<p className="font-bold ">総額: {toCommaStyle(deliverySlipData.total_price)}</p>
						</div>
					</div>
					<hr />
					<div className="h-1/2 p-6 pt-8">
						<div className="relative mb-8">
							<h1 className="p-1 text-2xl absolute left-1/2 transform -translate-x-1/2 ring-black ring-2">
								納品書
							</h1>
							<div className="text-right">
								<div>
									<span>
										請求日:
										{format(parse(deliverySlipData.publish_date, "yyyy-MM-dd", new Date()), "yyyy年MM月dd日")}
									</span>
									<span className="pl-3">No. {deliverySlipData.id}</span>
								</div>
							</div>
						</div>
						<div className="mb-8">
							<div className="ml-4">
								〒{deliverySlipData.customer_post_code}
								<br />
								{deliverySlipData.customer_address}
								<br />
								<br />
								{deliverySlipData.customer_name} 御中
							</div>
						</div>

						<table className="table-auto w-full mt-8">
							<thead>
								<tr>
									<th className="border border-gray-300 bg-gray-100 text-left px-4 font-bold">品目</th>
									<th className="border border-gray-300 bg-gray-100 text-right px-4 font-bold">数量</th>
									<th className="border border-gray-300 bg-gray-100 text-right px-4 font-bold">単位</th>
									<th className="border border-gray-300 bg-gray-100 text-right px-4 font-bold">単価</th>
									<th className="border border-gray-300 bg-gray-100 text-right px-4 font-bold">金額</th>
									<th className="border border-gray-300 bg-gray-100 text-right px-4 font-bold">備考</th>
								</tr>
							</thead>
							<tbody>
								{deliverySlipData.contents.map((item, index) => (
									<tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}>
										<td className="border border-gray-300 px-4 ">{item.product_name}</td>
										<td className="border border-gray-300 text-right px-4 ">{toCommaStyle(item.quantity)}</td>
										<td className="border border-gray-300 text-right px-4 ">{item.unit}</td>
										<td className="border border-gray-300 text-right px-4 ">{toCommaStyle(item.price)}</td>
										<td className="border border-gray-300 text-right px-4 ">{toCommaStyle(item.subtotal)}</td>
										<td className="border border-gray-300 text-right px-4 "></td>
									</tr>
								))}
							</tbody>
						</table>

						<div className="text-right mt-4">
							<p className="font-bold ">総額: {toCommaStyle(deliverySlipData.total_price)}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
});

const previewStyle = css`
	transform: scale(0.7);
	transform-origin: top left;
	width: 210mm;
	height: 288mm;
	box-sizing: border-box;
	background-color: white;
	padding: 16px;
	margin-bottom: 16px;
	border: solid 2px #ccc;
`;

const printStyles = css`
	height: 288mm;

	@media print {
		html,
		body {
			height: 100vh; /* Use 100% here to support printing more than a single page*/
			margin: 0 !important;
			padding: 0 !important;
			overflow: hidden;
		}
		height: 288mm;
	}
`;

export default PrintComponent;
