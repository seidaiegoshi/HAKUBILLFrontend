import React, { useState } from "react";
import Header from "./../../components/Header";
import SideButton from "../../components/SideButton";
import TextInput from "../../components/Atoms/TextInput";

const CreateDeliverySlip = () => {
	// inputに入れる値
	const [text, setText] = useState("");
	// inputにフォーカスしているかどうか
	const [isFocus, setIsFocus] = useState(false);
	const [suggestions, setSuggestions] = useState([]);

	// inputフィールドのonChangeイベント
	const handleChange = (text) => {
		// 入力した値をもとにフィルターをかける。
		// 空の配列を用意
		let matches = [];
		// 入力する値が0文字より大きければ処理を行う
		if (text.length > 0) {
			matches = options.filter((opt) => {
				// new RegExp = パターンでテキストを検索するために使用
				const regex = new RegExp(`${text}`, "gi");
				return opt.text.match(regex);
			});
		}
		// フィルターをかけた配列をsuggestionsのステートに入れる
		setSuggestions(matches);
		setText(text);
	};

	const options = [
		{ id: 1, text: "React" },
		{ id: 2, text: "Ruby on Rails" },
		{ id: 3, text: "JavaScript" },
		{ id: 4, text: "TypeScript" },
		{ id: 5, text: "Go" },
		{ id: 6, text: "HTML" },
		{ id: 7, text: "CSS" },
	];

	return (
		<>
			<Header />
			<SideButton />
			<div className="flex flex-col">
				<div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
					<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
						<div className="overflow-hidden">
							<table className="min-w-full">
								<thead className="bg-white border-b-2">
									<tr>
										<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
											#
										</th>
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
									<tr className="bg-white-100 border-b">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											<TextInput
												onFocus={() => setIsFocus(true)}
												type="text"
												value={text}
												onChange={(e) => handleChange(e.target.value)}
											/>

											{isFocus && (
												<div className="shadow-lg shadow-slate-500/50 bg-white absolute">
													{suggestions?.map((suggestion, i) => (
														<p
															className="p-2"
															key={i}
															onClick={async () => {
																await setText(suggestion.text);
																await setIsFocus(false);
															}}>
															{suggestion.text}
														</p>
													))}
												</div>
											)}
										</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Otto</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											<TextInput />
										</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											<TextInput />
										</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@mdo</td>
									</tr>
									<tr className="bg-white border-b">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											<TextInput
												onFocus={() => setIsFocus(true)}
												type="text"
												value={text}
												onChange={(e) => handleChange(e.target.value)}
											/>

											{isFocus && (
												<div className="shadow-lg shadow-slate-500/50 bg-white absolute">
													{suggestions?.map((suggestion, i) => (
														<p
															className="p-2"
															key={i}
															onClick={async () => {
																await setText(suggestion.text);
																await setIsFocus(false);
															}}>
															{suggestion.text}
														</p>
													))}
												</div>
											)}
										</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Dillan</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@fat</td>
									</tr>
									<tr className="bg-white-100 border-b">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Mark</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Twen</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@twitter</td>
									</tr>
									<tr className="bg-white border-b">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Bob</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Dillan</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@fat</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateDeliverySlip;
