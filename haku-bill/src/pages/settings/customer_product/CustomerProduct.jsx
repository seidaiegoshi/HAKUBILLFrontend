import React, { useEffect, useState } from "react";
import SearchForm from "@/pages/settings/customer_product/SearchForm";
import axios from "@/libs/axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import ConfirmDeleteModal from "@/components/Atoms/ConfirmDeleteModal";
import { parseISO, format } from "date-fns";
import Button from "@/components/Atoms/Button";

const CustomerProduct = () => {
	const [searchWords, setSearchWords] = useState({ customer: "", product: "" });
	const [customerPrices, setCustomerPrices] = useState([]);
	const [sortOrder, setSortOrder] = useState("desc");
	const [sortColumn, setSortColumn] = useState("created_at");
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deleteCustomerPriceId, setDeleteCustomerPriceId] = useState(null);

	function onSearch({ customer, product }) {
		const requestUrl = "/customer/customer_price";

		const params = {};
		if (customer !== "") {
			params.customer_name = customer;
		}
		if (product !== "") {
			params.product_name = product;
		}

		axios
			.get(requestUrl, { params })
			.then((response) => {
				setCustomerPrices(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	useEffect(() => {
		onSearch(searchWords);
	}, []);

	const navigate = useNavigate();

	const handleEditClick = (id) => {
		navigate(`/setting/customer_product/${id}/edit`);
	};

	const handleDeleteClick = (customerPriceId) => {
		setDeleteCustomerPriceId(customerPriceId);
		setDeleteModalOpen(true);
	};

	const handleDeleteClose = () => {
		setDeleteModalOpen(false);
	};

	const handleDeleteConfirm = () => {
		const requestUrl = `/customer/product/${deleteCustomerPriceId}`;
		axios
			.delete(requestUrl)
			.then((response) => {
				setDeleteModalOpen(false);
				onSearch(searchWords);
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

	const sortedCustomerPrices = [...customerPrices].sort((a, b) => {
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
			<div className="h-screen flex">
				<div className="flex-none">
					<SettingSidebar />
				</div>
				<div className="flex flex-col p-2">
					<SearchForm search={onSearch} searchWords={setSearchWords} />
					<div className="overflow-y-auto h-80px">
						<table className="flex-1  min-w-full">
							<thead className="bg-white border-b-2 sticky top-0">
								<tr>
									<th
										scope="col"
										className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										onClick={() => handleSortClick("customer_name")}>
										顧客名
										{sortColumn === "customer_name" && (
											<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
										)}
									</th>
									<th
										scope="col"
										className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										onClick={() => handleSortClick("product_name")}>
										商品名
										{sortColumn === "product_name" && (
											<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
										)}
									</th>
									<th
										scope="col"
										className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										onClick={() => handleSortClick("price")}>
										価格
										{sortColumn === "price" && (
											<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
										)}
									</th>
									<th
										scope="col"
										className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										onClick={() => handleSortClick("updated_at")}>
										更新日
										{sortColumn === "updated_at" && (
											<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
										)}
									</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{sortedCustomerPrices.map((customerPrice) => (
									<tr key={customerPrice.id} className="bg-white border-b">
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{customerPrice.customer_name}
										</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{customerPrice.product_name}
										</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{Number(customerPrice.price).toLocaleString("jp-JP") + "円"}
										</td>
										<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
											{format(parseISO(customerPrice.updated_at), "yyyy-MM-dd")}
										</td>
										<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
											<Button onClick={() => handleEditClick(customerPrice.id)}>編集</Button>
										</td>
										<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
											<Button
												className="bg-red-500 hover:bg-red-600 text-white "
												onClick={() => handleDeleteClick(customerPrice.id)}>
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
		</>
	);
};

export default CustomerProduct;
