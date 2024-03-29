import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import Header from "@/components/Header";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "@/components/Atoms/ConfirmDeleteModal";
import { parseISO, format } from "date-fns";
import Button from "@/components/Atoms/Button";
import SortButton from "@/components/Atoms/SortButton";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [sortOrder, setSortOrder] = useState("desc");
	const [sortColumn, setSortColumn] = useState("updated_at");
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deleteProductId, setDeleteProductId] = useState(null);

	const fetchProducts = () => {
		const requestUrl = "/product";
		axios
			.get(requestUrl)
			.then((response) => {
				const newProducts = response.data;
				setProducts(newProducts);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const navigate = useNavigate();

	const handleEditClick = (productId) => {
		navigate(`/setting/product/${productId}/edit`);
	};

	const handleDeleteClick = (productId) => {
		setDeleteProductId(productId);
		setDeleteModalOpen(true);
	};

	const handleDeleteClose = () => {
		setDeleteModalOpen(false);
	};

	const handleDeleteConfirm = () => {
		const requestUrl = `/product/${deleteProductId}`;
		axios
			.delete(requestUrl)
			.then((response) => {
				setDeleteModalOpen(false);
				fetchProducts();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSortClick = (column) => {
		if (column === sortColumn) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortOrder("asc");
		}
	};

	const sortedProducts = [...products].sort((a, b) => {
		if (sortOrder === "asc") {
			return a[sortColumn] > b[sortColumn] ? 1 : -1;
		} else {
			return a[sortColumn] < b[sortColumn] ? 1 : -1;
		}
	});

	return (
		<>
			<Header />
			<ConfirmDeleteModal
				isOpen={deleteModalOpen}
				onClose={handleDeleteClose}
				onDelete={handleDeleteConfirm}
			/>

			<div className="flex">
				<div className="flex-none">
					<SettingSidebar />
				</div>
				<div className="flex-initial">
					<div className="flex flex-col">
						<div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
							<div className="p-2 inline-block min-w-full ">
								<div className="overflow-hidden">
									<Link
										to="/setting/product/new"
										className="inline-flex items-center bg-gray-100 border-0 m-3 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
										商品を追加
									</Link>
									<table className="min-w-full table-auto mt-4">
										<thead className="bg-white border-b">
											<tr className="">
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
													onClick={() => handleSortClick("name")}>
													<SortButton>
														商品名
														{sortColumn === "name" && (
															<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
														)}
													</SortButton>
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left cursor-pointer"
													onClick={() => handleSortClick("category_name")}>
													<SortButton>
														カテゴリ
														{sortColumn === "category_name" && (
															<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
														)}
													</SortButton>
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left cursor-pointer"
													onClick={() => handleSortClick("unit")}>
													<SortButton>
														単位
														{sortColumn === "unit" && (
															<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
														)}
													</SortButton>
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left cursor-pointer"
													onClick={() => handleSortClick("total_cost")}>
													<SortButton>
														原価
														{sortColumn === "total_cost" && (
															<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
														)}
													</SortButton>
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left cursor-pointer"
													onClick={() => handleSortClick("price")}>
													<SortButton>
														価格
														{sortColumn === "price" && (
															<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
														)}
													</SortButton>
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
													onClick={() => handleSortClick("gross_profit")}>
													<SortButton>
														粗利
														{sortColumn === "gross_profit" && (
															<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
														)}
													</SortButton>
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
													onClick={() => handleSortClick("gross_rate")}>
													<SortButton>
														粗利率
														{sortColumn === "gross_rate" && (
															<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
														)}
													</SortButton>
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
													onClick={() => handleSortClick("updated_at")}>
													<SortButton>
														更新日
														{sortColumn === "updated_at" && (
															<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
														)}
													</SortButton>
												</th>
												<th></th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{sortedProducts.map((value) => (
												<tr key={value.id} className="bg-white border-b">
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{value.name}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{value.category_name}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{value.unit}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{Number(value.total_cost).toLocaleString("jp-JP") + "円"}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{Number(value.price).toLocaleString("jp-JP") + "円"}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{Number(value.gross_profit).toLocaleString("jp-JP") + "円"}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{(value.gross_rate * 100).toFixed(1) + "%"}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{format(parseISO(value.updated_at), "yyyy-MM-dd")}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														<Button onClick={() => handleEditClick(value.id)}>編集</Button>
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														<Button
															className="bg-red-500 hover:bg-red-600 text-white"
															onClick={() => handleDeleteClick(value.id)}>
															削除
														</Button>
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
