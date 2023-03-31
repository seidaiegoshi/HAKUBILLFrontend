import axios from "@/libs/axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SettingSidebar from "@/pages/settings/SettingSidebar";
import TextInput from "@/components/Atoms/TextInput";

const ProductEdit = () => {
	const navigate = useNavigate();
	const { productId } = useParams();
	const [product, setProduct] = useState({
		name: "",
		product_category_id: "",
		unit: "",
		total_cost: "",
		price: "",
		gross_profit: "",
		gross_rate: "",
	});
	const [categories, setCategories] = useState([]);

	const fetchProducts = () => {
		const requestUrl = `/product/${productId}`;
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
		fetchProducts();
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
		const requestUrl = `/product/${productId}`;
		const params = {
			name: product.name,
			product_category_id: product.product_category_id,
			unit: product.unit,
			total_cost: product.total_cost,
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
								onChange={(e) => handleChange("product_category_id", e.target.value)}
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
								value={product.name}
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
								value={product.unit}
								onChange={(e) => handleChange("unit", e.target.value)}
								className="w-1/2 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="cost" className="mb-3 block text-base font-medium text-[#07074D]">
								原価
							</label>
							<TextInput
								type="number"
								name="total_cost"
								id="total_cost"
								value={product.total_cost}
								onChange={(e) => handleChange("total_cost", e.target.value)}
								placeholder="1商品あたりに必要な製造コスト(経費、人件費などは除く)"
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
								value={product.price}
								placeholder="販売価格(デフォルト)"
								onChange={(e) => handleChange("price", e.target.value)}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
								粗利
							</label>
							<p>{Math.floor(product.gross_profit)}</p>
						</div>
						<div className="mb-5">
							<label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
								粗利率
							</label>
							<p>{Math.floor(product.gross_rate * 100) + "%"}</p>
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
