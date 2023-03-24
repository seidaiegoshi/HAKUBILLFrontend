import axios from "./../../libs/axios";
import React, { useEffect, useState } from "react";
import SettingSidebar from "./SettingSidebar";
import Header from "./../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../../components/Atoms/ConfirmDeleteModal";
import { parseISO, format } from "date-fns";

const FixedCosts = () => {
	const [fixedCosts, setFixedCosts] = useState([]);
	const [sortOrder, setSortOrder] = useState("desc");
	const [sortColumn, setSortColumn] = useState("created_at");
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deleteFixedCostId, setDeleteFixedCost] = useState(null);

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

	const navigate = useNavigate();

	const handleEditClick = (id) => {
		navigate(`/setting/fixed_cost/${id}/edit`);
	};

	const handleDeleteClick = (fixedCostId) => {
		setDeleteFixedCost(fixedCostId);
		setDeleteModalOpen(true);
	};

	const handleDeleteClose = () => {
		setDeleteModalOpen(false);
	};

	const handleDeleteConfirm = () => {
		const requestUrl = `/fixed_cost/${deleteFixedCostId}`;
		axios
			.delete(requestUrl)
			.then((response) => {
				setDeleteModalOpen(false);
				fetchFixedCosts();
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

	const sortedFixedCosts = [...fixedCosts].sort((a, b) => {
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
							<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
								<div className="overflow-hidden">
									<Link
										to="/setting/fixed_cost/new"
										className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
										固定費を追加
									</Link>
									<table className="min-w-full">
										<thead className="bg-white border-b">
											<tr>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
													onClick={() => handleSortClick("name")}>
													名前
													{sortColumn === "name" && (
														<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
													)}
												</th>

												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
													onClick={() => handleSortClick("price")}>
													金額
													{sortColumn === "price" && (
														<span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
													)}
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
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
											{sortedFixedCosts.map((value) => (
												<tr key={value.id} className="bg-white border-b">
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{value.name}
													</td>

													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{Number(value.price).toLocaleString("jp-JP") + "円"}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{format(parseISO(value.updated_at), "yyyy-MM-dd")}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														<button
															onClick={() => handleEditClick(value.id)}
															className="bg-gray-100 hover:bg-gray-200 text-base  py-2 px-4
															rounded-lg">
															編集
														</button>
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														<button
															className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
															onClick={() => handleDeleteClick(value.id)}>
															削除
														</button>
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
