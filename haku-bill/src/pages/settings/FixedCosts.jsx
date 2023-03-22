import axios from "./../../libs/axios";
import React, { useEffect, useState } from "react";
import SettingSidebar from "./SettingSidebar";
import Header from "./../../components/Header";
import { Link } from "react-router-dom";

const FixedCosts = () => {
	const [fixedCosts, setFixedCosts] = useState([]);

	const fetchFixedCosts = () => {
		const requestUrl = "/fixed_cost";
		axios
			.get(requestUrl)
			.then((response) => {
				setFixedCosts(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchFixedCosts();
	}, []);

	return (
		<>
			<Header />
			<div className="flex">
				<div className="flex-none">
					<SettingSidebar />
				</div>
				<div className="flex-initial">
					<div className="flex flex-col">
						<div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
							<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
								<div className="overflow-hidden">
									<Link
										to="/setting/fixed_cost/new"
										className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
										追加
									</Link>
									<table className="min-w-full">
										<thead className="bg-white border-b">
											<tr>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													名前
												</th>

												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													金額
												</th>
											</tr>
										</thead>
										<tbody>
											{fixedCosts.map((value) => (
												<tr key={value.id} className="bg-white border-b">
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{value.name}
													</td>

													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{Number(value.price).toLocaleString("jp-JP") + "円"}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FixedCosts;
