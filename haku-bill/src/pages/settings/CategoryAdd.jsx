import axios from "./../../libs/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import SettingSidebar from "./SettingSidebar";

const CategoryAdd = () => {
	const navigate = useNavigate();
	const [category, setCategory] = useState({
		name: "",
	});

	const handleChange = (key, value) => {
		const newCategory = { ...category };
		newCategory[key] = value;
		setCategory(newCategory);
	};

	const postCategory = () => {
		const requestUrl = "/category";
		const params = new FormData();
		params.append("name", category.name);
		axios
			.post(requestUrl, params)
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
								onChange={(e) => handleChange("name", e.target.value)}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>

						<div>
							<button
								onClick={postCategory}
								className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
								登録
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CategoryAdd;
