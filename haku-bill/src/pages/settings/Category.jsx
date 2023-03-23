import axios from "../../libs/axios";
import React, { useEffect, useState } from "react";
import SettingSidebar from "./SettingSidebar";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const Category = () => {
	const [categories, setCategories] = useState([]);

	const fetchCategories = () => {
		const requestUrl = "/product/category";
		axios
			.get(requestUrl)
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchCategories();
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
										to="/setting/category/new"
										className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
										追加
									</Link>
									<table className="min-w-full">
										<thead className="bg-white border-b">
											<tr>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													カテゴリ名
												</th>
											</tr>
										</thead>
										<tbody>
											{categories.map((value) => (
												<tr key={value.id} className="bg-white border-b">
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{value.name}
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

export default Category;
