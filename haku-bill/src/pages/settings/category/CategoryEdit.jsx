import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import Button from "@/components/Atoms/Button";
import SortButton from "@/components/Atoms/SortButton";

const CategoryEdit = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [category, setProduct] = useState({
		name: "",
	});

	const fetchCategory = () => {
		const requestUrl = `/category/${id}`;
		axios
			.get(requestUrl)
			.then((response) => {
				setProduct(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchCategory();
	}, []);

	const handleChange = (key, value) => {
		const newCategory = { ...category };
		newCategory[key] = value;
		newCategory.gross_profit = newCategory.price - newCategory.total_cost;
		newCategory.gross_rate = newCategory.gross_profit / newCategory.price;

		setProduct(newCategory);
	};

	const updateCategory = () => {
		const requestUrl = `/category/${id}`;
		axios
			.patch(requestUrl, { name: category.name })
			.then((response) => {
				navigate("/setting/category");
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
								カテゴリ名
							</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="カテゴリ名"
								value={category.name}
								onChange={(e) => handleChange("name", e.target.value)}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>

						<div>
							<Button onClick={updateCategory} className="bg-blue-500  hover:bg-blue-600 text-white">
								カテゴリ情報を更新
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CategoryEdit;
