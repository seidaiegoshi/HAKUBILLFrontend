import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import TextInput from "@/components/Atoms/TextInput";
import Button from "@/components/Atoms/Button";

const ProductAdd = () => {
	const navigate = useNavigate();
	const [product, setProduct] = useState({
		name: "",
		category_id: null,
		unit: "",
		total_cost: null,
		price: null,
		gross_profit: null,
		gross_rate: null,
	});

	const [categories, setCategories] = useState([]);

	const fetchCategories = () => {
		const requestUrl = "/category";
		axios
			.get(requestUrl)
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleChange = (key, value) => {
		const newProduct = { ...product };
		newProduct[key] = value;
		newProduct.gross_profit = newProduct.price - newProduct.total_cost;
		newProduct.gross_rate = newProduct.gross_profit / newProduct.price;

		setProduct(newProduct);
	};

	const postProduct = () => {
		const requestUrl = "/product";
		const params = new FormData();
		params.append("name", product.name);
		params.append("product_category_id", product.category_id);
		params.append("unit", product.unit);
		params.append("total_cost", product.total_cost);
		params.append("price", product.price);
		params.append("gross_profit", product.gross_profit);
		params.append("gross_rate", product.gross_rate);
		params.append("is_product", 1);
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
							<label htmlFor="category" className="mb-3 block text-base font-medium text-[#07074D]">
								カテゴリ
							</label>
							<select
								type="text"
								name="category"
								id="category"
								onChange={(e) => handleChange("category_id", e.target.value)}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
								<option value="">選択してください</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						</div>
						<div className="mb-5">
							<label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
								商品名
							</label>
							<TextInput
								type="text"
								name="name"
								id="name"
								placeholder="商品名"
								onChange={(e) => handleChange("name", e.target.value)}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="Unit" className="mb-3 block text-base font-medium text-[#07074D]">
								単位
							</label>
							<TextInput
								type="text"
								name="Unit"
								id="Unit"
								placeholder="単位(個、箱など)"
								onChange={(e) => handleChange("unit", e.target.value)}
								className="w-1/2 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="total_cost" className="mb-3 block text-base font-medium text-[#07074D]">
								原価
							</label>
							<TextInput
								type="number"
								name="total_cost"
								id="total_cost"
								onChange={(e) => handleChange("total_cost", e.target.value)}
								placeholder="材料費"
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
								価格
							</label>
							<TextInput
								type="number"
								name="price"
								id="price"
								placeholder="販売価格(デフォルト)"
								onChange={(e) => handleChange("price", e.target.value)}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
								粗利
							</label>
							<p>{product.gross_profit}</p>
						</div>
						<div className="mb-5">
							<label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
								粗利率
							</label>
							<p>{product.gross_rate * 100 + "%"}</p>
						</div>

						<div>
							<Button onClick={postProduct} className="bg-blue-500  hover:bg-blue-600 text-white">
								登録
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductAdd;
