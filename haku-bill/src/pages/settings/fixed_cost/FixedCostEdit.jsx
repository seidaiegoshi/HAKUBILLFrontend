import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";

const FixedCostEdit = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [fixedCost, setFixedCost] = useState({
		name: "",
		price: "",
	});
	const [categories, setCategories] = useState([]);

	const fetchFixedCosts = () => {
		const requestUrl = `/fixed_cost/${id}`;
		axios
			.get(requestUrl)
			.then((response) => {
				setFixedCost(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchFixedCosts();
	}, []);

	const handleChange = (key, value) => {
		const newFixedCost = { ...fixedCost };
		newFixedCost[key] = value;

		setFixedCost(newFixedCost);
	};

	const patchFixedCost = () => {
		const requestUrl = `/fixed_cost/${id}`;
		axios
			.patch(requestUrl, { name: fixedCost.name, price: fixedCost.price })
			.then((response) => {
				navigate("/setting/fixed_cost");
			})
			.catch((e) => {
				console.log(e);
			})
			.finally();
	};

	return (
		<>
			<Header />
			<div className="flex flex-row">
				<div className="flex-none">
					<SettingSidebar />
				</div>
				<div className="flex flex-auto justify-start p-12">
					<div className="ml-0 w-full max-w-[550px]">
						<div className="mb-5">
							<label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
								固定費名
							</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="固定費名"
								value={fixedCost.name}
								onChange={(e) => handleChange("name", e.target.value)}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>

						<div className="mb-5">
							<label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
								金額
							</label>
							<input
								type="number"
								name="price"
								id="price"
								value={fixedCost.price}
								placeholder="金額"
								onChange={(e) => handleChange("price", e.target.value)}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>

						<div>
							<button
								onClick={patchFixedCost}
								className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
								固定費情報を更新
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FixedCostEdit;
