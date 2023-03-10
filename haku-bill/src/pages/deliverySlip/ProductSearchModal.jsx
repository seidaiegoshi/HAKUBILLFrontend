import React, { useEffect, useState } from "react";
import ListBox from "./ListBlock";
import axios from "./../../libs/axios.js";

const ProductSearchModal = (props) => {
	const [categories, setCategories] = useState([]);

	const [showProducts, setsShowProducts] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState();

	const [selectedProduct, setSelectedProduct] = useState();

	const handleClickCategory = (index) => {
		setsShowProducts(true);
		setSelectedCategory(index);
	};

	const closeModal = () => {
		props.setModal(false);
	};

	const handleClickProduct = (id, name) => {
		setSelectedProduct(id);
		props.setProductName(props.rowIndex, "name", name);
	};

	const fetchProducts = () => {
		const requestUrl = "/products/categories";
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
	}, []);

	if (!props.showFlag) return <></>;
	return (
		<>
			<div
				id="overlay"
				className="fixed h-screen w-screen flex justify-center items-center top-0 left-0  bg-slate-900/50">
				<div id="modalContent" className="bg-white p-5 rounded-sm">
					<div className="flex justify-end w-full">
						<button
							onClick={closeModal}
							className=" uppercase m-2 shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">
							閉じる
						</button>
					</div>
					<div className="p-5">
						<div className="container flex flex-col items-center justify-center w-full mx-auto">
							カテゴリ
							<div>
								<ul className="grid grid-cols-3 gap-4">
									{categories.map((category, index) => {
										return (
											<li
												key={category.id}
												onClick={() => {
													handleClickCategory(index);
												}}
												className="flex flex-row mb-2 border-gray-400">
												<ListBox>{category.name}</ListBox>
											</li>
										);
									})}
								</ul>
							</div>
							商品名
							<div>
								<ul>
									{showProducts ? (
										<ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
											{categories[selectedCategory].products.map((product) => {
												return (
													<li
														key={product.id}
														onClick={() => {
															handleClickProduct(product.id, product.name);
														}}
														className="w-full px-4 py-2 cursor-pointer border-b border-gray-200 rounded-t-lg ">
														{product.name}
													</li>
												);
											})}
										</ul>
									) : (
										<></>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductSearchModal;
