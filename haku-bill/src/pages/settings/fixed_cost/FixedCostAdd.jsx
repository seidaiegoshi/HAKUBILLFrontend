import axios from "@/libs/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import Button from "@/components/Atoms/Button";

const FixedCostAdd = () => {
	const navigate = useNavigate();
	const [Name, setName] = useState([]);
	const [Price, setPrice] = useState([]);

	const handleChangeName = (e) => {
		setName(e.target.value);
	};

	const handleChangePrice = (e) => {
		setPrice(e.target.value);
	};

	const postProduct = () => {
		const requestUrl = "/fixed_cost";
		const params = new FormData();
		params.append("name", Name);
		params.append("price", Price);
		axios
			.post(requestUrl, params)
			.then((response) => {
				console.log(response);
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
								onChange={handleChangeName}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
								値段
							</label>
							<input
								type="number"
								name="price"
								id="price"
								placeholder="値段"
								onChange={handleChangePrice}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div>
							<Button onClick={postProduct} className="bg-blue-500  hover:bg-blue-600 text-white">
								{" "}
								登録
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FixedCostAdd;
