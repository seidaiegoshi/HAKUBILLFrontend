import axios from "./../../libs/axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "./../../components/Header";
import { Link } from "react-router-dom";

const Products = () => {
	const [products, setProducts] = useState([]);

	const fetchProducts = () => {
		const requestUrl = "/products";
		axios
			.get(requestUrl)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
			<Header />
			<div className="flex">
				<div className="flex-none">
					<Sidebar />
				</div>
				<div className="flex-initial">
					<div className="flex flex-col">
						<div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
							<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
								<div className="overflow-hidden">
									<Link
										to="/setting/product/new"
										className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
										追加
									</Link>
									<table className="min-w-full">
										<thead className="bg-white border-b">
											<tr>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													商品名
												</th>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													単位
												</th>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													原価
												</th>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
													価格
												</th>
											</tr>
										</thead>
										<tbody>
											{products.map((value) => (
												<tr key={value.id} className="bg-white border-b">
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{value.name}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{value.unit}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{Number(value.cost).toLocaleString("jp-JP") + "円"}
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

export default Products;
