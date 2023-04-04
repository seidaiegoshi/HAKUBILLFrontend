import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import Header from "@/components/Header";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "@/components/Atoms/ConfirmDeleteModal";
import { parseISO, format } from "date-fns";
import Button from "@/components/Atoms/Button";

const Customer = () => {
	const [customers, setCustomer] = useState([]);
	const [sortOrder, setSortOrder] = useState("desc");
	const [sortColumn, setSortColumn] = useState("updated_at");
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deleteCustomerId, setDeleteCustomerId] = useState(null);

	const fetchCustomer = () => {
		const requestUrl = "/customer";
		axios
			.get(requestUrl)
			.then((response) => {
				const newCustomer = response.data;
				setCustomer(newCustomer);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchCustomer();
	}, []);

	const navigate = useNavigate();

	const handleEditClick = (customerId) => {
		navigate(`/setting/customer/${customerId}/edit`);
	};

	const handleDeleteClick = (customerId) => {
		setDeleteCustomerId(customerId);
		setDeleteModalOpen(true);
	};

	const handleDeleteClose = () => {
		setDeleteModalOpen(false);
	};

	const handleDeleteConfirm = () => {
		const requestUrl = `/customer/${deleteCustomerId}`;
		axios
			.delete(requestUrl)
			.then((response) => {
				setDeleteModalOpen(false);
				fetchCustomer();
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

	const sortedCustomer = [...customers].sort((a, b) => {
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
										to="/setting/customer/new"
										className="inline-flex items-center bg-gray-100 border-0 m-3 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
										取引先を追加
									</Link>
									<table className="min-w-full table-auto mt-4">
										<thead className="bg-white border-b">
											<tr className="bg-gray-200">
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left cursor-pointer"
													onClick={() => handleSortClick("name")}>
													取引先名
													{sortColumn === "name" && (
														<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
													)}
												</th>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-2 text-left ">
													敬称
												</th>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-2 text-left ">
													住所
												</th>
												<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-2 text-left ">
													電話・FAX番号
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left cursor-pointer"
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
											{sortedCustomer.map((value) => (
												<tr key={value.id} className="bg-white border-b">
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{value.name}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{value.honorific}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														〒{value.post_code}
														<br />
														{value.address}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														電話番号:{value.telephone_number}
														<br />
														FAX:{value.fax_number}
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

export default Customer;
