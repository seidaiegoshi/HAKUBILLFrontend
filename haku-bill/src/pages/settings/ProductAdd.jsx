import axios from "./../../libs/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import SettingSidebar from "./SettingSidebar";

const ProductAdd = () => {
	const navigate = useNavigate();
	const [Name, setName] = useState([]);
	const [Unit, setUnit] = useState([]);
	const [Cost, setCost] = useState([]);
	const [Price, setPrice] = useState([]);
	const [Tax_class, setTax_class] = useState([]);

	const handleChangeName = (e) => {
		setName(e.target.value);
	};
	const handleChangeUnit = (e) => {
		setUnit(e.target.value);
	};
	const handleChangeCost = (e) => {
		setCost(e.target.value);
	};
	const handleChangePrice = (e) => {
		setPrice(e.target.value);
	};
	const handleChangeTax_class = (e) => {
		setTax_class(e.target.value);
	};

	const postProduct = () => {
		const requestUrl = "/product";
		const params = new FormData();
		params.append("name", Name);
		params.append("product_category_id", 1);
		params.append("unit", Unit);
		params.append("cost", Cost);
		params.append("price", Price);
		params.append("tax_class", Tax_class);
		axios
			.post(requestUrl, params)
			.then((response) => {
				console.log(response);
				navigate("/setting/product");
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
								商品名
							</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="商品名"
								onChange={handleChangeName}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="Unit" className="mb-3 block text-base font-medium text-[#07074D]">
								単位
							</label>
							<input
								type="text"
								name="Unit"
								id="Unit"
								placeholder="単位(個、本、袋、箱、ケースなど)"
								onChange={handleChangeUnit}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="cost" className="mb-3 block text-base font-medium text-[#07074D]">
								原価
							</label>
							<input
								type="number"
								name="cost"
								id="cost"
								onChange={handleChangeCost}
								placeholder="1商品あたりに必要な製造コスト(経費、人件費などは除く)"
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
								価格
							</label>
							<input
								type="number"
								name="price"
								id="price"
								placeholder="販売価格(デフォルト)"
								onChange={handleChangePrice}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="Tax_class" className="mb-3 block text-base font-medium text-[#07074D]">
								税区分
							</label>
							<input
								type="number"
								name="Tax_class"
								id="Tax_class"
								placeholder="税区分"
								onChange={handleChangeTax_class}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div>
							<button
								onClick={postProduct}
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

export default ProductAdd;
