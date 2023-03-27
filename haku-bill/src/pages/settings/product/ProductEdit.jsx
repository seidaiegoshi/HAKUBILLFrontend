import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";

const ProductEdit = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [product, setProduct] = useState({
		name: "",
		product_category_id: "",
		unit: "",
		cost: "",
		price: "",
		tax_class: "",
		gross_profit: "",
		gross_rate: "",
	});
	const [categories, setCategories] = useState([]);

	const fetchProducts = () => {
		const requestUrl = `/product/${id}`;
		axios
			.get(requestUrl)
			.then((response) => {
				setProduct(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const fetchCategories = () => {
		const requestUrl = "/product/groupByCategories";
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
		fetchProducts();
		fetchCategories();
	}, []);

	const handleChange = (key, value) => {
		const newProduct = { ...product };
		newProduct[key] = value;
		newProduct.gross_profit = newProduct.price - newProduct.cost;
		newProduct.gross_rate = newProduct.gross_profit / newProduct.price;

		setProduct(newProduct);
	};

	const postProduct = () => {
		const requestUrl = `/product/${id}`;
		const params = {
			name: product.name,
			product_category_id: product.product_category_id,
			unit: product.unit,
			cost: product.cost,
			price: product.price,
			tax_class: product.tax_class,
			gross_profit: product.gross_profit,
			gross_rate: product.gross_rate,
		};
		console.log(params);
		axios
			.patch(requestUrl, params)
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
								value={product.product_category_id}
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
							<input
								type="text"
								name="name"
								id="name"
								placeholder="商品名"
								value={product.name}
								onChange={(e) => handleChange("name", e.target.value)}
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
								placeholder="単位(個、箱など)"
								value={product.unit}
								onChange={(e) => handleChange("unit", e.target.value)}
								className="w-1/2 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
								value={product.cost}
								onChange={(e) => handleChange("cost", e.target.value)}
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
								value={product.price}
								placeholder="販売価格(デフォルト)"
								onChange={(e) => handleChange("price", e.target.value)}
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
								value={product.tax_class}
								placeholder="税区分"
								onChange={(e) => handleChange("tax_class", e.target.value)}
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
							<button
								onClick={postProduct}
								className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
								商品情報を更新
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductEdit;
